// // transaction/transfer.ts
// import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
// import { isSolanaWallet } from '@dynamic-labs/solana';

// import { Connection, PublicKey, SystemProgram, TransactionMessage, VersionedTransaction, VersionedTransactionResponse } from "@solana/web3.js";

// const { primaryWallet } = useDynamicContext();

// if(!primaryWallet || !isSolanaWallet(primaryWallet)) {
//   return;
// }

// const connection: Connection = await primaryWallet.getConnection();

// const fromKey = new PublicKey(primaryWallet.address);
// const toKey = new PublicKey(address);
// const amountInLamports = Number(amount) * 1000000000;

// const instructions = [
//   SystemProgram.transfer({
//     fromPubkey: fromKey,
//     lamports: amountInLamports,
//     toPubkey: toKey,
//   }),
// ];

// const blockhash = await connection.getLatestBlockhash();

// // create v0 compatible message
// const messageV0 = new TransactionMessage({
//   instructions,
//   payerKey: fromKey,
//   recentBlockhash: blockhash.blockhash,
// }).compileToV0Message();

// const transferTransaction = new VersionedTransaction(messageV0);

// const signer = await primaryWallet.getSigner();

// await signer
//   .signAndSendTransaction(transferTransaction)
//   .then((res: any) => {
//     console.log(
//       `Transaction successful: https://solscan.io/tx/${res.signature}?cluster=devnet`,
//     );
//   })
//   .catch((reason: any) => {
//     console.error(reason);
//   });

import { isSolanaWallet } from '@dynamic-labs/solana';
import { Connection, PublicKey, SystemProgram, TransactionMessage, VersionedTransaction } from "@solana/web3.js";

export async function transferSol(
  context: any,
  toAddress: string,
  amount: number
): Promise<string | null> {
  const { primaryWallet } = context;

  if (!primaryWallet || !isSolanaWallet(primaryWallet)) {
    console.error("No Solana wallet available");
    return null;
  }

  try {
    const connection: Connection = await primaryWallet.getConnection();

    const fromKey = new PublicKey(primaryWallet.address);
    const toKey = new PublicKey(toAddress);
    const amountInLamports = Number(amount) * 1000000000;

    const instructions = [
      SystemProgram.transfer({
        fromPubkey: fromKey,
        lamports: amountInLamports,
        toPubkey: toKey,
      }),
    ];

    const blockhash = await connection.getLatestBlockhash();

    // create v0 compatible message
    const messageV0 = new TransactionMessage({
      instructions,
      payerKey: fromKey,
      recentBlockhash: blockhash.blockhash,
    }).compileToV0Message();

    const transferTransaction = new VersionedTransaction(messageV0);

    const signer = await primaryWallet.getSigner();

    const res = await signer.signAndSendTransaction(transferTransaction);
    console.log(
      `Transaction successful: https://solscan.io/tx/${res.signature}?cluster=devnet`
    );
    return res.signature;
  } catch (error) {
    console.error("Transaction failed:", error);
    return null;
  }
}