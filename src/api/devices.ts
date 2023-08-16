import { Device } from '../types'

export async function fetchDevices(): Promise<Device[]> {
  const response = await fetch('/api/devices')
  if (!response.ok) {
    throw new Error('Failed to fetch devices')
  }
  const data = await response.json()
  return data
}
