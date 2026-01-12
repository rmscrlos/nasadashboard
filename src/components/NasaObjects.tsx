import { useNasa } from "@/providers/NasaProvider/useNasa";
import { Item, ItemContent, ItemHeader } from "./ui/item";

export const NasaObjects = () => {
	const { data } = useNasa();

	if (!data) {
		return (
			<Item variant="outline">
				<ItemHeader>No data available</ItemHeader>
			</Item>
		);
	}

	return (
		<div>
			<p className="italic text-sm pb-2">
				Total neo objects fetched: {data.elementCount}
			</p>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{data.neoObjects.map((neo) => (
					<Item variant="outline" key={neo.name}>
						<ItemHeader className="text-xl">{neo.name}</ItemHeader>
						<ItemContent>
							<p>
								<span className="font-bold">size: </span>
								{neo.size}
							</p>
							<p>
								<span className="font-bold">closeness to earth: </span>
								{neo.closenessToEarth}
							</p>
							<p>
								<span className="font-bold">relative velocity: </span>
								{neo.relativeVelocity}
							</p>
						</ItemContent>
					</Item>
				))}
			</div>
		</div>
	);
};
