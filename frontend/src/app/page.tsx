"use client";

import { useEffect, useState } from "react";
import { SensorApi } from "../api/generated";
import { components } from "../api/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

type SensorData = components["schemas"]["SensorData"];

type AggregatedSensor = {
  sensorId: number;
  lastValue: number;
  min: number;
  max: number;
  avg: number;
  lastUpdate: string;
  status: "OK" | "ERROR";
};

export default function Home() {
  const [data, setData] = useState<SensorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const fetchData = () => {
    const api = new SensorApi(undefined, "http://localhost:5000");

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
  const paginatedData = aggregated.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const formatDate = (iso: string) => new Date(iso).toLocaleString();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-16 px-8 bg-white dark:bg-black sm:items-start">
        {loading && <div>Загрузка...</div>}
        {error && <div className="text-red-500">Ошибка: {error}</div>}

        {!loading && (
          <>
            <div className="mb-2 text-sm text-gray-500">
              Всего датчиков: {aggregated.length}
            </div>

            <Table>
              <TableCaption>Данные с сенсоров (агрегированные)</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Sensor ID</TableHead>
                  <TableHead>Last Value</TableHead>
                  <TableHead>Min</TableHead>
                  <TableHead>Max</TableHead>
                  <TableHead>Avg</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Update</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((sensor) => (
                  <TableRow key={sensor.sensorId}>
                    <TableCell>{sensor.sensorId}</TableCell>
                    <TableCell>{sensor.lastValue}</TableCell>
                    <TableCell>{sensor.min}</TableCell>
                    <TableCell>{sensor.max}</TableCell>
                    <TableCell>{sensor.avg.toFixed(2)}</TableCell>
                    <TableCell
                      className={
                        sensor.status === "OK"
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {sensor.status}
                    </TableCell>
                    <TableCell>{formatDate(sensor.lastUpdate)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="mt-4 flex gap-2">
              <button
                className="px-2 py-1 border rounded disabled:opacity-50"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Prev
              </button>
              <span className="px-2 py-1">
                {page} / {totalPages || 1}
              </span>
              <button
                className="px-2 py-1 border rounded disabled:opacity-50"
                disabled={page === totalPages || totalPages === 0}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
