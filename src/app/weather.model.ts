export interface WeatherObject {
	day: string
	description: string;
	icon: string;
	temperature: string;
	wind: string;
}

export type LegendData = {
	desc_en: string;
	variants: string[] | null
}

export interface YrResponse {
	properties: {
		meta: {
			units: {
				wind_speed: string;
				air_temperature: string;
			}
		}
		timeseries: {
			time: string;
			data: {
				instant: {
					details: {
						air_temperature: number;
						wind_speed: number;
					}
				},
				next_1_hours?: {
					summary: {
						symbol_code: string;
					},
				},
				next_6_hours?: {
					summary: {
						symbol_code: string;
					},
				}
			}
		}[]
	}
}