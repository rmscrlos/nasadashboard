import { useNasa } from "@/providers/NasaProvider/useNasa";

export const PickerRangeLabel = () => {
	const { range } = useNasa();

	if (!range) {
		return <span>Pick a date</span>;
	}

	return (
		<>
			{range.from && (
				<span>
					{range.from.toLocaleDateString(undefined, {
						month: "short",
						day: "numeric",
						year: "numeric",
					})}
				</span>
			)}
			{range.to && (
				<>
					{" "}
					-{" "}
					<span>
						{range.to.toLocaleDateString(undefined, {
							month: "short",
							day: "numeric",
							year: "numeric",
						})}
					</span>
				</>
			)}
		</>
	);
};
