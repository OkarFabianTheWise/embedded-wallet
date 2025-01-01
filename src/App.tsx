import React from "react"
import EmbeddedWallet from "./embed/Embedded"

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1B3053] to-black flex flex-col items-center justify-between"> {/*back ground setup */}
      <h1 className="text-3xl text-yellow">AGENT EMBEDDED EXAMPLE</h1>
      <EmbeddedWallet />
      <a href="https://github.com/OkarFabianTheWise/embedded-wallet" className="text-2xl">By: OrkarfabianThewise</a>
    </div>
  )
}

export default App
