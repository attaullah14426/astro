import { NextRequest, NextResponse } from "next/server";
import { getBirthChart } from "@/lib/astrology-api";
import { BirthChartRequest } from "@/types/astrology";

export async function POST(req: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid birth details", details: "Malformed JSON body" },
        { status: 400 }
      );
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid birth details", details: "Request body must be a JSON object" },
        { status: 400 }
      );
    }

    const raw = body as Record<string, unknown>;
    const errors: string[] = [];

    const day = Number(raw.day);
    if (!Number.isInteger(day) || day < 1 || day > 31) {
      errors.push("Day must be an integer between 1 and 31");
    }

    const month = Number(raw.month);
    if (!Number.isInteger(month) || month < 1 || month > 12) {
      errors.push("Month must be an integer between 1 and 12");
    }

    const year = Number(raw.year);
    if (!Number.isInteger(year) || year < 1800 || year > 2200) {
      errors.push("Year must be a birth year between 1800 and 2200");
    }

    const hour = Number(raw.hour);
    if (!Number.isInteger(hour) || hour < 0 || hour > 23) {
      errors.push("Hour must be an integer between 0 and 23");
    }

    const min = Number(raw.min);
    if (!Number.isInteger(min) || min < 0 || min > 59) {
      errors.push("Minute must be an integer between 0 and 59");
    }

    const lat = Number(raw.lat);
    if (isNaN(lat) || lat < -90 || lat > 90) {
      errors.push("Latitude must be a valid number between -90 and 90");
    }

    const lon = Number(raw.lon);
    if (isNaN(lon) || lon < -180 || lon > 180) {
      errors.push("Longitude must be a valid number between -180 and 180");
    }

    const tzone = Number(raw.tzone);
    if (isNaN(tzone) || tzone < -14 || tzone > 14) {
      errors.push("Timezone offset must be a valid number between -14 and 14");
    }

    if (errors.length > 0) {
      return NextResponse.json(
        {
          error: "Invalid birth details",
          details: errors.join(", "),
        },
        { status: 400 }
      );
    }

    const payload: BirthChartRequest = {
      day,
      month,
      year,
      hour,
      min,
      lat,
      lon,
      tzone,
    };

    try {
      const data = await getBirthChart(payload);
      return NextResponse.json(data, { status: 200 });
    } catch (apiError: unknown) {
      const errMessage = apiError instanceof Error ? apiError.message : String(apiError);

      if (errMessage.includes("ASTROLOGY_API_KEY is not configured")) {
        return NextResponse.json(
          { error: "AstrologyAPI credentials are not configured" },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { error: "Unable to generate the birth chart", details: errMessage },
        { status: 502 }
      );
    }
  } catch (unexpectedError: unknown) {
    console.error("Unexpected server error:", unexpectedError);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
