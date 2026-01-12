import { NasaContext } from "@/providers/NasaProvider/context";
import { useContext } from "react";

export const useNasa = () => {
	const context = useContext(NasaContext);
	if (context === null) {
		throw new Error("useNasa must be used within a NasaProvider");
	}
	return context;
};
