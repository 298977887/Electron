import TimeModule from './modules/TimeModule'
import WeatherModule from './modules/WeatherModule'
import './App.css'

export default function App() {
  return (
    <div className="mirror-container">
      <div className="top-left">
        <TimeModule />
      </div>
      <div className="bottom-right">
        <WeatherModule />
      </div>
    </div>
  )
}