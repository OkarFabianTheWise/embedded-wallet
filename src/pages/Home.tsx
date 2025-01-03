import React, { useState } from "react"
import EmbeddedWallet from "../embed/Embedded"
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { transferSol } from '../transaction/transfer';

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [transferStatus, setTransferStatus] = useState('');

  const dynamicContext = useDynamicContext();

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    setTransferStatus('Processing...');
    const signature = await transferSol(dynamicContext, toAddress, parseFloat(amount));
    if (signature) {
      setTransferStatus(`Transfer successful. Signature: ${signature}`);
    } else {
      setTransferStatus('Transfer failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1B3053] to-black flex flex-col items-center justify-between p-4">
      <h1 className="text-3xl text-yellow-400 mb-4">AGENT EMBEDDED EXAMPLE</h1>
      <EmbeddedWallet />
      <button 
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Transfer SOL
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-2xl mb-4">Transfer SOL</h2>
            <form onSubmit={handleTransfer}>
              <input
                type="text"
                placeholder="To Address"
                value={toAddress}
                onChange={(e) => setToAddress(e.target.value)}
                className="w-full p-2 mb-2 border rounded"
              />
              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 mb-2 border rounded"
              />
              <div className="flex justify-between">
                <button 
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Send
                </button>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
            {transferStatus && <p className="mt-4 text-center">{transferStatus}</p>}
          </div>
        </div>
      )}
      <a href="https://github.com/OkarFabianTheWise/embedded-wallet" className="text-2xl text-white mt-4">By: OrkarfabianThewise</a>
    </div>
  )
}

export default Home