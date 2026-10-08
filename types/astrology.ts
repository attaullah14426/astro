export interface BirthChartRequest {
  day: number;
  month: number;
  year: number;
  hour: number;
  min: number;
  lat: number;
  lon: number;
  tzone: number;
}

export interface BirthChartFormData {
  day: number | string;
  month: number | string;
  year: number | string;
  hour: number | string;
  min: number | string;
  lat: number | string;
  lon: number | string;
  tzone: number | string;
}

export interface PlanetItem {
  id: number;
  name: string;
  fullDegree?: number;
  normDegree?: number;
  speed?: number;
  isRetro?: boolean | string;
  sign?: string;
  signLord?: string;
  nakshatra?: string;
  nakshatraLord?: string;
  nakshatra_pad?: number;
  house?: number;
  is_planet_set?: boolean;
  planet_awastha?: string;
  [key: string]: unknown;
}

export interface AstroDetails {
  ascendant?: string;
  sign?: string; // Moon Sign
  SignLord?: string;
  Naksahtra?: string;
  NaksahtraLord?: string;
  Charan?: number;
  Tithi?: string;
  Yog?: string;
  Karan?: string;
  tatva?: string;
  name_alphabet?: string;
  paya?: string;
  [key: string]: unknown;
}

export interface BirthChartResponse extends AstroDetails {
  planets: PlanetItem[];
  [key: string]: unknown;
}

export interface ApiErrorResponse {
  error: string;
  details?: string | string[];
}
