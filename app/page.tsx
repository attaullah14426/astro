"use client";

import React, { useState } from "react";
import BirthChartForm from "@/components/BirthChartForm";
import BirthChartResults from "@/components/BirthChartResults";
import { BirthChartRequest, BirthChartResponse } from "@/types/astrology";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<BirthChartResponse | null>(null);

  const handleSubmit = async (payload: BirthChartRequest) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/birth-chart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data.details
          ? `${data.error}: ${data.details}`
          : data.error || "Failed to generate birth chart";
        setError(errorMsg);
      } else {
        setResult(data);
      }
    } catch (err: unknown) {
      console.error("Client fetch error:", err);
      setError("An unexpected network error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container">
      <header className="site-header">
        <h1 className="site-title">Birth Chart</h1>
        <p className="site-subtitle">Next.js & AstrologyAPI</p>
      </header>

      {error && (
        <div className="alert-error" role="alert">
          <h3>Error</h3>
          <p>{error}</p>
        </div>
      )}

      <section aria-labelledby="form-heading">
        <h2 id="form-heading" className="section-title">
          Birth Details
        </h2>
        <BirthChartForm onSubmit={handleSubmit} isLoading={isLoading} />
      </section>

      {result && <BirthChartResults result={result} />}
    </main>
  );
}
