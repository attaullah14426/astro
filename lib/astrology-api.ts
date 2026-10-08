import { BirthChartRequest, BirthChartResponse } from "@/types/astrology";

export async function getBirthChart(
  payload: BirthChartRequest
): Promise<BirthChartResponse> {
  const userId = process.env.ASTROLOGY_USER_ID || "";
  const apiKey = process.env.ASTROLOGY_API_KEY || "";

  if (!apiKey || apiKey.trim() === "" || apiKey === "YOUR_ACCESS_TOKEN") {
    throw new Error("ASTROLOGY_API_KEY is not configured");
  }

  const authString = `${userId.trim()}:${apiKey.trim()}`;
  const authHeader = `Basic ${Buffer.from(authString).toString("base64")}`;

  const headers: Record<string, string> = {
    Authorization: authHeader,
    "Content-Type": "application/json",
    "x-astrologyapi-key": apiKey.trim(),
  };

  async function callEndpoint(endpoint: string) {
    const url = `https://json.astrologyapi.com/v1/${endpoint}`;
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      console.error(`AstrologyAPI ${endpoint} failed with status ${response.status}:`, errorText);
      throw new Error(`${endpoint} failed (${response.status}): ${errorText}`);
    }

    const data = await response.json();

    if (data && typeof data === "object" && !Array.isArray(data)) {
      if (data.status === false || data.errorMessage || data.error) {
        const msg = data.errorMessage || data.msg || data.error || `${endpoint} returned an error`;
        throw new Error(msg);
      }
    }

    return data;
  }

  const [planets, astro] = await Promise.all([
    callEndpoint("planets"),
    callEndpoint("astro_details"),
  ]);

  return {
    planets: Array.isArray(planets) ? planets : [],
    ...(typeof astro === "object" && astro !== null ? astro : {}),
  };
}
