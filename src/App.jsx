import './styles/App.css'
import Header from './Header.jsx'
import Calendar from './Calendar.jsx'

function App() {

  return (
    <>
      <Header/>
      <div className='app-body'>
      <Calendar />
      </div>
    </>
  )
}

export default App
