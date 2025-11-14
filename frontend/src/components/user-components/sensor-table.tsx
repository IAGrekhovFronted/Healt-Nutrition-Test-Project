import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { SensorData } from "@/src/api/generated";

interface SensorTableProps {
  data: SensorData[];
}

export function SensorTable({ data }: SensorTableProps) {
  const totalValue = data.reduce((sum, s) => sum + s.value, 0);

  return (
    <Table>
      <TableCaption>Current sensor readings</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Sensor ID</TableHead>
          <TableHead>Value</TableHead>
          <TableHead>Timestamp</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((sensor) => (
          <TableRow key={`${sensor.sensorId}-${sensor.timestamp}`}>
            <TableCell className="font-medium">{sensor.sensorId}</TableCell>
            <TableCell>{sensor.value.toFixed(2)}</TableCell>
            <TableCell>{new Date(sensor.timestamp).toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={1}>Total</TableCell>
          <TableCell className="text-right">{totalValue.toFixed(2)}</TableCell>
          <TableCell />
        </TableRow>
      </TableFooter>
    </Table>
  );
}
