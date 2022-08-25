import { useState } from 'react'
import './App.css'

function App() {
  const [auth, setauth] = useState(false)

  return (
    <div className="App">
      <header className="App-header">
        <p>Otterdev: Cradlepoint UAM Authentication</p>
        <p>
          <button type="button" disabled={auth} onClick={() => setauth(true)}>
            Authenticate
          </button>
        </p>
      </header>
    </div>
  )
}

export default App
