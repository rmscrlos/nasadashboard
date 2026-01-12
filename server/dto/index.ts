import type { ApiResponse, NeoObjectsResponse } from "../../types/index.ts";

export const nasaRespondeToNeoObjects = (
	data: ApiResponse
): NeoObjectsResponse => {
	const neoObjects: NeoObjectsResponse["neoObjects"] = Object.values(
		data.near_earth_objects
	)
		.flat()
		.map((neo) => {
			const name = neo.name;

			// Size range in meters
			const sizeMin = neo.estimated_diameter.meters.estimated_diameter_min.toLocaleString("en-US", { maximumFractionDigits: 2 });
			const sizeMax = neo.estimated_diameter.meters.estimated_diameter_max.toLocaleString("en-US", { maximumFractionDigits: 2 });
			const size = `${sizeMin} - ${sizeMax} meters`;

			// Closest approach calculation by distance
			const closestApproach = neo.close_approach_data.reduce(
				(closest, current) => {
					return parseFloat(closest.miss_distance.kilometers) <
						parseFloat(current.miss_distance.kilometers)
						? closest
						: current;
				}
			);
			const closenessToEarth = `${parseFloat(
				closestApproach.miss_distance.kilometers
			).toLocaleString("en-US", { maximumFractionDigits: 2 })} km`;

			const relativeVelocityKPH = parseFloat(
				closestApproach.relative_velocity.kilometers_per_hour
			).toLocaleString("en-US", { maximumFractionDigits: 2 });

			return {
				name,
				size,
				closenessToEarth,
				relativeVelocity: relativeVelocityKPH + " km/h",
			};
		})
		.sort((a, b) => {
			const distanceA = parseFloat(a.closenessToEarth.replace(/,/g, ""));
			const distanceB = parseFloat(b.closenessToEarth.replace(/,/g, ""));
			return distanceA - distanceB;
		});

	return {
		neoObjects,
		elementCount: data.element_count,
	};
};
