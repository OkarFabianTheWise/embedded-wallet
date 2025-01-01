import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { SolanaWalletConnectors } from "@dynamic-labs/solana";

export default function App() {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: "89996f6c-6fe8-4cdb-8c09-eecd285178e2",
        walletConnectors: [SolanaWalletConnectors],
      }}
    >
      <DynamicWidget />
    </DynamicContextProvider>
  );
}
