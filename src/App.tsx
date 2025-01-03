import React from 'react';
import Home from './pages/Home';
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import { SolanaWalletConnectors } from '@dynamic-labs/solana';

const App: React.FC = () => {
  return (
    <DynamicContextProvider
        settings={{
          environmentId: "89996f6c-6fe8-4cdb-8c09-eecd285178e2",
          walletConnectors: [SolanaWalletConnectors],
        }}
      >
      <div>
        <Home />
      </div>
    </DynamicContextProvider>
  );
};

export default App;