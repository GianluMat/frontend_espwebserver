export interface Sensor {
  readonly sensor: string;
  readonly value: number;
  readonly timestamp?: Date;
}
