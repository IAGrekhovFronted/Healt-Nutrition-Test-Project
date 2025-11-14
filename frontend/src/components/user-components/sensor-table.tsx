import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export type AggregatedSensor = {
  sensorId: number;
  lastValue: number;
  min: number;
  max: number;
  avg: number;
  lastUpdate: string;
  status: "OK" | "ERROR";
};

type SensorTableProps = {
  data: AggregatedSensor[];
  page: number;
  pageSize: number;
  setPage: (page: number) => void;
  totalPages: number;
  loading: boolean;
  error: string | null;
  formatDate: (iso: string) => string;
};

export function SensorTable({
  data,
  page,
  pageSize,
  setPage,
  totalPages,
  loading,
  error,
  formatDate,
}: SensorTableProps) {
  return (
    <>
      {loading && <div>Загрузка...</div>}
      {error && <div className="text-red-500">Ошибка: {error}</div>}
      {!loading && (
        <>
          <div className="mb-2 text-sm text-gray-500">
            Всего датчиков: {data.length}
          </div>
          <Table>
            <TableCaption>Данные с сенсоров (агрегированные)</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID датчика</TableHead>
                <TableHead>Последнее значение</TableHead>
                <TableHead>Минимум</TableHead>
                <TableHead>Максимум</TableHead>
                <TableHead>Среднее</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Последнее обновление</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data
                .slice((page - 1) * pageSize, page * pageSize)
                .map((sensor) => (
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
              Назад
            </button>
            <span className="px-2 py-1">
              Страница {page} из {totalPages || 1}
            </span>
            <button
              className="px-2 py-1 border rounded disabled:opacity-50"
              disabled={page === totalPages || totalPages === 0}
              onClick={() => setPage(page + 1)}
            >
              Вперёд
            </button>
          </div>
        </>
      )}
    </>
  );
}
