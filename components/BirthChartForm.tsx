"use client";

import React, { useState } from "react";
import { BirthChartFormData, BirthChartRequest } from "@/types/astrology";

interface BirthChartFormProps {
  onSubmit: (payload: BirthChartRequest) => void;
  isLoading: boolean;
}

export const BirthChartForm: React.FC<BirthChartFormProps> = ({
  onSubmit,
  isLoading,
}) => {
  const [formData, setFormData] = useState<BirthChartFormData>({
    day: 22,
    month: 7,
    year: 1992,
    hour: 9,
    min: 21,
    lat: 25.31668,
    lon: 83.01042,
    tzone: 5.5,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const requestPayload: BirthChartRequest = {
      day: Number(formData.day),
      month: Number(formData.month),
      year: Number(formData.year),
      hour: Number(formData.hour),
      min: Number(formData.min),
      lat: Number(formData.lat),
      lon: Number(formData.lon),
      tzone: Number(formData.tzone),
    };

    onSubmit(requestPayload);
  };

  return (
    <form className="birth-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        {/* Date of Birth */}
        <div className="form-row-3">
          <div className="form-group">
            <label htmlFor="day" className="form-label">
              Day
            </label>
            <input
              id="day"
              name="day"
              type="number"
              min={1}
              max={31}
              required
              value={formData.day}
              onChange={handleChange}
              disabled={isLoading}
              className="form-input"
            />
            <span className="form-hint">1 – 31</span>
          </div>

          <div className="form-group">
            <label htmlFor="month" className="form-label">
              Month
            </label>
            <input
              id="month"
              name="month"
              type="number"
              min={1}
              max={12}
              required
              value={formData.month}
              onChange={handleChange}
              disabled={isLoading}
              className="form-input"
            />
            <span className="form-hint">1 – 12</span>
          </div>

          <div className="form-group">
            <label htmlFor="year" className="form-label">
              Year
            </label>
            <input
              id="year"
              name="year"
              type="number"
              min={1800}
              max={2200}
              required
              value={formData.year}
              onChange={handleChange}
              disabled={isLoading}
              className="form-input"
            />
            <span className="form-hint">e.g. 1992</span>
          </div>
        </div>

        {/* Time of Birth */}
        <div className="form-row-2">
          <div className="form-group">
            <label htmlFor="hour" className="form-label">
              Hour (24-hour)
            </label>
            <input
              id="hour"
              name="hour"
              type="number"
              min={0}
              max={23}
              required
              value={formData.hour}
              onChange={handleChange}
              disabled={isLoading}
              className="form-input"
            />
            <span className="form-hint">0 – 23</span>
          </div>

          <div className="form-group">
            <label htmlFor="min" className="form-label">
              Minute
            </label>
            <input
              id="min"
              name="min"
              type="number"
              min={0}
              max={59}
              required
              value={formData.min}
              onChange={handleChange}
              disabled={isLoading}
              className="form-input"
            />
            <span className="form-hint">0 – 59</span>
          </div>
        </div>

        {/* Coordinates */}
        <div className="form-row-3">
          <div className="form-group">
            <label htmlFor="lat" className="form-label">
              Latitude
            </label>
            <input
              id="lat"
              name="lat"
              type="number"
              step="any"
              min={-90}
              max={90}
              required
              value={formData.lat}
              onChange={handleChange}
              disabled={isLoading}
              className="form-input"
            />
            <span className="form-hint">-90.0 to 90.0</span>
          </div>

          <div className="form-group">
            <label htmlFor="lon" className="form-label">
              Longitude
            </label>
            <input
              id="lon"
              name="lon"
              type="number"
              step="any"
              min={-180}
              max={180}
              required
              value={formData.lon}
              onChange={handleChange}
              disabled={isLoading}
              className="form-input"
            />
            <span className="form-hint">-180.0 to 180.0</span>
          </div>

          <div className="form-group">
            <label htmlFor="tzone" className="form-label">
              Timezone Offset
            </label>
            <input
              id="tzone"
              name="tzone"
              type="number"
              step="any"
              min={-14}
              max={14}
              required
              value={formData.tzone}
              onChange={handleChange}
              disabled={isLoading}
              className="form-input"
            />
            <span className="form-hint">UTC offset (e.g. 5.5)</span>
          </div>
        </div>
      </div>

      <button type="submit" disabled={isLoading} className="btn-submit">
        {isLoading ? "Loading..." : "Get Chart"}
      </button>
    </form>
  );
};

export default BirthChartForm;
