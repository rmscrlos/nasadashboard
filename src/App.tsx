import { DatePicker } from "./components/DatePicker";
import { NasaObjects } from "./components/NasaObjects";
import { useNasa } from "./providers/NasaProvider/useNasa";

function App() {
	const { isLoading } = useNasa();
	return (
		<div className="flex flex-col gap-20 items-center p-10">
			<DatePicker />

			{isLoading ? <div>Loading...</div> : <NasaObjects />}
		</div>
	);
}

export default App;
