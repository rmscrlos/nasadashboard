import { type FastifyPluginAsync } from "fastify";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { nasaRespondeToNeoObjects } from "./dto/index.ts";

const app: FastifyPluginAsync = async (fastify, _opts) => {
	await fastify.register(cors, {
		origin: true,
	});

	await fastify.register(swagger, {
		openapi: {
			openapi: "3.0.0",
			info: {
				title: "NASA NEO API",
				description: "API for fetching Near Earth Objects data from NASA",
				version: "1.0.0",
			},
		},
	});

	await fastify.register(swaggerUi, {
		routePrefix: "/docs",
	});

	// Declare a route
	fastify.get("/nasa/neo", {
		schema: {
			description: "Get Near Earth Objects for a date range",
			tags: ["NASA"],
			headers: {
				type: "object",
				required: ["start_date", "end_date"],
				properties: {
					start_date: { type: "string", format: "date", description: "Start date (YYYY-MM-DD)" },
					end_date: { type: "string", format: "date", description: "End date (YYYY-MM-DD)" },
				},
			},
			response: {
				200: {
					description: "Successful response",
					type: "object",
					properties: {
						neoObjects: {
							type: "array",
							items: {
								type: "object",
								properties: {
									name: { type: "string" },
									size: { type: "string" },
									closenessToEarth: { type: "string" },
									relativeVelocity: { type: "string" },
								},
							},
						},
						elementCount: { type: "number" },
					},
				},
			},
		},
	}, async (request) => {
		try {
			const startData = request.headers.start_date;
			const endData = request.headers.end_date;

			if (startData === undefined || endData === undefined) {
				throw new Error("start_date and end_date are required");
			}

			const apiKey = process.env.NASA_API_KEY || "DEMO_KEY";
			const response = await fetch(
				`https://api.nasa.gov/neo/rest/v1/feed?api_key=${apiKey}&start_date=${startData}&end_date=${endData}`
			);
			if (!response.ok) {
				throw new Error(`Error fetching NEO data: ${response.statusText}`);
			}
			const data = await response.json();

			const formattedData = nasaRespondeToNeoObjects(data);
			return formattedData;
		} catch (error) {
			fastify.log.error(error);
			throw new Error(
				`Failed to fetch NEO data - ${
					error instanceof Error ? error.message : "Unknown error"
				}`
			);
		}
	});
};

export default app;
