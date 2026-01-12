import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import NasaProvider from "./providers/NasaProvider/NasaProvider.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<NasaProvider>
			<App />
		</NasaProvider>
	</StrictMode>
);
