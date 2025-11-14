"use client";

import { useEffect, useState } from "react";
import { SensorApi } from "../api/generated";
import config from "../config";
import { components } from "../api/types";
import {
  SensorTable,
  AggregatedSensor,
} from "../components/user-components/sensor-table";

type SensorData = components["schemas"]["SensorData"];

export default function Home() {
  const [data, setData] = useState<SensorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const fetchData = () => {
    const api = new SensorApi(undefined, config.apiUrl);

    api
      .apiDataGet()
      .then((response) => {
        setData(response.data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || "Ошибка запроса");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const aggregated: AggregatedSensor[] = Object.values(
    data.reduce((acc: Record<number, AggregatedSensor>, item) => {
      const existing = acc[item.sensorId];
      const value = item.value;
      const timestamp = item.timestamp;

      if (!existing) {
        acc[item.sensorId] = {
          sensorId: item.sensorId,
          lastValue: value,
          min: value,
          max: value,
          avg: value,
          lastUpdate: timestamp,
          status: error ? "ERROR" : "OK",
        };
      } else {
        existing.lastValue = value;
        existing.min = Math.min(existing.min, value);
        existing.max = Math.max(existing.max, value);
        existing.avg = (existing.avg + value) / 2;
        existing.lastUpdate = timestamp;
        existing.status = error ? "ERROR" : "OK";
      }

      return acc;
    }, {})
  );

  const totalPages = Math.ceil(aggregated.length / pageSize);

  const formatDate = (iso: string) => new Date(iso).toLocaleString();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center py-16 px-8 bg-white dark:bg-black sm:items-start">
        <SensorTable
          data={aggregated}
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          totalPages={totalPages}
          loading={loading}
          error={error}
          formatDate={formatDate}
        />
      </main>
    </div>
  );
}
