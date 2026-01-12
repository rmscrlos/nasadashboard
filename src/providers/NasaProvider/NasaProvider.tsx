import type { DateRange } from "react-day-picker";
import { NasaContext } from "./context";
import React, { useEffect } from "react";
import type { NeoObjectsResponse } from "../../../types/index.ts";

const NasaProvider = ({ children }: { children: React.ReactNode }) => {
	const [range, setRange] = React.useState<DateRange | undefined>(undefined);
	const [data, setData] = React.useState<NeoObjectsResponse | null>(null);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	const selectRange = (range: DateRange | undefined) => {
		if (!range) {
			setRange(undefined);
		}

		const rangeFrom = range?.from?.toLocaleDateString();
		const rangeTo = range?.to?.toLocaleDateString();

		if (rangeFrom === rangeTo) {
			setRange({ from: range?.from, to: undefined });
			return;
		}

		setRange(range);
	};

	const startDate = range?.from?.toISOString().split("T")[0];
	const endDate = range?.to?.toISOString().split("T")[0];

	useEffect(() => {
		const fetchData = async () => {
			if (startDate && endDate) {
				setIsLoading(true);
				const response = await fetch("http://localhost:3000/nasa/neo", {
					headers: {
						start_date: startDate,
						end_date: endDate,
					},
				});
				const result = await response.json();
				setData(result);
				setIsLoading(false);
			}
		};
		fetchData();
	}, [startDate, endDate]);

	console.log("NasaProvider data:", data);

	return (
		<NasaContext.Provider value={{ range, selectRange, data, isLoading }}>
			{children}
		</NasaContext.Provider>
	);
};

export default NasaProvider;
