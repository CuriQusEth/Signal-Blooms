import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useAccount, useConnect, useDisconnect, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { BUILDER_CODE, ATTRIBUTION_CODE } from '../lib/erc8021';
import { parseEther } from 'viem';
import confetti from 'canvas-confetti';
import { Sun } from 'lucide-react';

export function BloomScreen({ onClose }: { onClose: () => void }) {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  
  const { sendTransaction: recordTx, data: hash, isPending } = useSendTransaction();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash });

  const { sendTransaction: gmTx, data: gmHash, isPending: isGMPending } = useSendTransaction();
  const { isSuccess: isQMConfirmed } = useWaitForTransactionReceipt({ hash: gmHash });

  useEffect(() => {
     confetti({
         particleCount: 150,
         spread: 100,
         origin: { y: 0.6 },
         colors: ['#ff00ea', '#9d00ff', '#ffffff']
     });
  }, []);

  const handleRecordMasterpiece = () => {
    if (!isConnected) {
      connect({ connector: injected() });
      return;
    }
    
    // Simulate "Record this Masterpiece" transaction on Base
    // Using a simple 0 value transaction with an unformatted data hex payload as a demonstration
    // of an on chain action that carries the 8021 attribution code in a theoretical contract call.
    recordTx({
      to: '0x0000000000000000000000000000000000000000', // Burn/Null address or Target Contract
      value: parseEther('0'),
      // Example payload formatting assuming hex format for a hypothetical contract
      data: `0xDEADBEEF000000000000000000000000000000000000000000000000000000000000000` as `0x${string}` 
    });
  };

  const handleSayGM = () => {
    if (!isConnected) return;
    gmTx({
      to: '0xcD0dd3716C5561De47a24949335dF8a8CD8F71a3',
      value: parseEther('0'),
      data: '0x474d' // 'GM' 
    });
  };

  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-6 z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md bg-white/5 border border-purple-500/30 rounded-3xl p-8 flex flex-col items-center text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />
        
        <h2 className="font-serif text-4xl text-transparent bg-clip-text bg-gradient-to-b from-white to-pink-200 mb-2 relative z-10">
          Garden in Full Bloom
        </h2>
        <p className="text-purple-200/80 mb-8 font-light relative z-10">
          Your signals have resonated in perfect harmony.
        </p>

        <div className="w-full relative z-10 mb-8 aspect-square rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center overflow-hidden">
             {/* Thumbnail of their masterpiece would go here */}
             <div className="w-full h-full animate-pulse bg-gradient-to-tr from-purple-900/20 to-pink-900/20" />
             <SparklesIcon className="absolute text-pink-300/50 w-16 h-16" />
        </div>

        <div className="flex flex-col gap-4 w-full relative z-10">
          <button
            onClick={handleRecordMasterpiece}
            disabled={isPending || isConfirming}
            className="w-full relative px-6 py-4 rounded-xl overflow-hidden group border border-pink-500/50 bg-gradient-to-r from-pink-600/20 to-purple-600/20 hover:from-pink-600/40 hover:to-purple-600/40 transition-all text-pink-100 uppercase tracking-wider text-sm font-bold flex items-center justify-center gap-2"
          >
            {isPending ? 'Confirming...' : isConfirming ? 'Blooming On-Chain...' : isConfirmed ? 'Masterpiece Recorded' : 'Record Masterpiece'}
          </button>

          {isConnected && (
            <button
              onClick={handleSayGM}
              disabled={isGMPending}
              className="w-full justify-center px-3 py-4 rounded-xl bg-[#E8A020]/20 hover:bg-[#E8A020]/30 border border-[#E8A020]/40 text-[#E8A020] transition-colors flex items-center gap-2 font-['Cinzel'] text-sm font-bold disabled:opacity-50 tracking-widest uppercase"
            >
              <Sun size={20} />
              {isGMPending ? 'Confirming...' : isQMConfirmed ? 'GM Sent!' : 'Say GM'}
            </button>
          )}
        </div>

        {isConfirmed && (
            <p className="text-xs text-green-400 mt-4 relative z-10">
              Transaction successful! (Builder: {BUILDER_CODE})
            </p>
        )}

        <button 
          onClick={onClose}
          className="mt-6 text-sm text-white/50 hover:text-white transition-colors relative z-10 uppercase tracking-widest"
        >
          Return to Garden
        </button>
      </motion.div>
    </div>
  );
}

function SparklesIcon(props: any) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
    )
}
