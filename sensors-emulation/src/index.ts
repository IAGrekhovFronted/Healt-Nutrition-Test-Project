import express, { Request, Response } from "express";
import axios from "axios";

const app = express();

const API_URL = process.env.API_URL || "http://backend:8080/api/data";

const SENSORS: number[] = [1, 2, 3];

function generateSensorValue(): number {
  return Math.floor(Math.random() * 101); // 0–100
}

interface SensorPayload {
  sensorId: number;
  value: number;
  timestamp: string;
}

async function sendData(): Promise<void> {
  for (const id of SENSORS) {
    const payload: SensorPayload = {
      sensorId: id,
      value: generateSensorValue(),
      timestamp: new Date().toISOString(),
    };

    try {
      await axios.post(API_URL, payload);
      console.log(`Sent: sensor ${id} => ${payload.value}`);
    } catch (err: any) {
      console.error(`Failed to send sensor ${id}:`, err.message);
    }
  }
}

setInterval(sendData, 1000);

app.get("/", (req: Request, res: Response) => {
  res.send("Sensor producer running");
});

app.listen(3000, () => {
  console.log("Sensor producer started on port 3000");
});
