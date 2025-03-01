import { useEffect, useState } from 'react'

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        invoke(channel: string, ...args: any[]): Promise<any>
      }
    }
  }
}

interface WeatherData {
  hourly: {
    temperature_2m: number[]
    time: string[]
  }
}

export default function WeatherModule() {
  const [temp, setTemp] = useState<number | null>(null)

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await window.electron.ipcRenderer.invoke('fetch-weather', 'Beijing')
      const currentHour = new Date().getHours()
      setTemp(data.hourly.temperature_2m[currentHour])
    }

    fetchWeather()
    const interval = setInterval(fetchWeather, 600000) // 10分钟更新
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="module weather-module">
      {temp !== null && <p>{temp}°C</p>}
    </div>
  )
}