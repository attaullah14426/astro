import React from "react";
import { BirthChartResponse } from "@/types/astrology";
import PlanetTable from "./PlanetTable";

interface BirthChartResultsProps {
  result: BirthChartResponse | null;
}

export const BirthChartResults: React.FC<BirthChartResultsProps> = ({ result }) => {
  if (!result) return null;

  const ascendant = result.ascendant;
  const moonSign = result.sign;

  return (
    <section className="results-container" aria-label="Birth Chart Results">
      <h2 className="section-title">Results</h2>

      {/* Overview Cards */}
      <div className="summary-card">
        <span className="summary-label">Overview</span>
        <div className="summary-grid">
          {ascendant && (
            <div className="summary-item">
              <span className="summary-label">Ascendant</span>
              <span className="summary-value">{String(ascendant)}</span>
            </div>
          )}

          {moonSign && (
            <div className="summary-item">
              <span className="summary-label">Moon Sign</span>
              <span className="summary-value">{String(moonSign)}</span>
            </div>
          )}

          {result.Naksahtra && (
            <div className="summary-item">
              <span className="summary-label">Nakshatra</span>
              <span className="summary-value">{String(result.Naksahtra)}</span>
            </div>
          )}

          {result.Tithi && (
            <div className="summary-item">
              <span className="summary-label">Tithi</span>
              <span className="summary-value">{String(result.Tithi)}</span>
            </div>
          )}

          {result.Yog && (
            <div className="summary-item">
              <span className="summary-label">Yog</span>
              <span className="summary-value">{String(result.Yog)}</span>
            </div>
          )}

          {result.Karan && (
            <div className="summary-item">
              <span className="summary-label">Karan</span>
              <span className="summary-value">{String(result.Karan)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Planetary Table */}
      <PlanetTable planets={result.planets} />

      {/* Raw API Output */}
      <div>
        <h3 className="subsection-title">Raw API Response</h3>
        <pre className="raw-code-block" tabIndex={0}>
          {JSON.stringify(result, null, 2)}
        </pre>
      </div>
    </section>
  );
};

export default BirthChartResults;
