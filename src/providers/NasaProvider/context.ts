import { createContext } from "react";
import type { DateRange } from "react-day-picker";
import type { NeoObjectsResponse } from "../../../types/index.ts";

interface NasaContextType {
	range: DateRange | undefined;
	selectRange: (range: DateRange | undefined) => void;
	isLoading: boolean;
	data: NeoObjectsResponse | null;
}

export const NasaContext = createContext<NasaContextType | null>(null);
