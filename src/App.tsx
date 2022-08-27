import { useEffect, useState } from 'react'

import './App.css'

type UAMParams = {
  res?: string
  uamip?: string
  uamport?: string
  challenge?: string
  called?: string
  mac?: string
  ip?: string
  nasid?: string
  sessionid?: string
  userurl?: string
}

function App() {
  //<login_url>
  // &res=<uam_handshake_state>
  // &uamip=<uam_ip_address>
  // &uamport=<uam_port>
  // &challenge=<chap_challenge_string>
  // &called=<called_sta_id>
  // &mac=<calling_sta_id>
  // &ip=<client_ip_address>
  // &nasid=<nas_gateway_id>
  // &sessionid=<session_id>
  // &userurl=<hotspot_detect_url>
  const [loading, setLoading] = useState<boolean>(false)
  const [uamParams, setUamParams] = useState<UAMParams | null>(null)

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const params = Object.fromEntries(searchParams)
    console.log({ params })
    setUamParams(params as UAMParams)
  }, [])

  useEffect(() => {
    console.log({ uamParams })
  }, [uamParams])

  const handleAuthticate = () => {
    if (
      uamParams &&
      uamParams?.uamip &&
      uamParams?.uamport &&
      uamParams?.mac &&
      uamParams?.challenge
    ) {
      setLoading(true)
      window.location.replace(
        `http://${uamParams?.uamip}:${uamParams?.uamport}/logon?username=${uamParams?.mac}&response=${uamParams?.challenge}`,
      )
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Otterdev: Cradlepoint UAM Authentication</p>
        <p>
          {uamParams &&
          uamParams?.uamip &&
          uamParams?.uamport &&
          uamParams?.mac &&
          uamParams?.challenge ? (
            <button type="button" disabled={loading} onClick={handleAuthticate}>
              Authenticate
            </button>
          ) : (
            <span>Invalid Login URL</span>
          )}
        </p>
      </header>
    </div>
  )
}

export default App
