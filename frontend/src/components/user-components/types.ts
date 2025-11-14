export type AggregatedSensor = {
  sensorId: number;
  lastValue: number;
  min: number;
  max: number;
  avg: number;
  lastUpdate: string;
  status: "OK" | "ERROR";
};

export interface SensorTableProps {
  data: AggregatedSensor[];
  page: number;
  pageSize: number;
  setPage: (page: number) => void;
  totalPages: number;
  loading: boolean;
  error: string | null;
  formatDate: (iso: string) => string;
}
