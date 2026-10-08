import React from "react";
import { PlanetItem } from "@/types/astrology";

interface PlanetTableProps {
  planets: PlanetItem[];
}

export const PlanetTable: React.FC<PlanetTableProps> = ({ planets }) => {
  if (!planets || planets.length === 0) return null;

  const formatRetrograde = (planet: PlanetItem): string => {
    if (planet.isRetro === "true" || planet.isRetro === true) {
      return "Yes";
    }
    if (planet.isRetro === "false" || planet.isRetro === false) {
      return "No";
    }
    return "No";
  };

  return (
    <div>
      <h3 className="subsection-title">Planetary Positions</h3>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th scope="col">Planet</th>
              <th scope="col">Sign</th>
              <th scope="col">Nakshatra</th>
              <th scope="col">House</th>
              <th scope="col">Retrograde</th>
            </tr>
          </thead>
          <tbody>
            {planets.map((planet, index) => (
              <tr key={planet.id ?? index}>
                <td>
                  <strong>{planet.name}</strong>
                </td>
                <td>{planet.sign ?? "—"}</td>
                <td>{planet.nakshatra ?? "—"}</td>
                <td className="mono">{planet.house !== undefined ? String(planet.house) : "—"}</td>
                <td>{formatRetrograde(planet)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlanetTable;
