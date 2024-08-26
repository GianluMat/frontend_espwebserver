export interface MqttMessage {
  readonly sensor: string;
  readonly value: number;
  readonly unit: string;
  readonly timestamp: string;
  readonly device_id: string;
  readonly location: string;
}
