export interface Device {
  id: number
  name: string
  location: string
  currentTemperature: number
  status: 'disconnected' | 'connected' | 'healthy' | 'error'
  temperatureDataPoint: TemperatureDataPoint[] | undefined
}

export interface TemperatureDataPoint {
  time: number
  temp: number
}
