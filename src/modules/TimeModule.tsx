import { useEffect, useState } from 'react'

export default function TimeModule() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="module time-module">
      <h1>{time}</h1>
    </div>
  )
}