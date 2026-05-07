import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAccount, useConnect, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { parseEther } from 'viem';

export function LeaderboardScreen({ onClose }: { onClose: () => void }) {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { sendTransaction, data: hash, isPending } = useSendTransaction();
  const { isSuccess } = useWaitForTransactionReceipt({ hash });

  // Mock Leaderboard Data
  const leaders = [
    { rank: 1, address: '0x1A2b...3C4d', score: 98402, title: 'Grand Weaver' },
    { rank: 2, address: '0x5E6f...7G8h', score: 85200, title: 'Prism Master' },
    { rank: 3, address: '0x9I0j...1K2l', score: 71040, title: 'Resonance Adept' },
  ];

  const handleSayGM = () => {
     sendTransaction({
         to: '0x0000000000000000000000000000000000000000',
         value: parseEther('0'),
         data: '0x474d' // 'GM' in hex
     });
  };

  return (
    <div className="absolute inset-0 bg-black/60 backdrop-blur-xl flex flex-col p-6 pt-16 z-40">
      <h2 className="font-serif text-3xl text-pink-200 mb-6 text-center">Greatest Weavers</h2>
      
      {!isConnected ? (
        <div className="flex-1 flex flex-col items-center justify-center">
            <p className="text-white/60 mb-6 text-center max-w-xs font-light">Sign in with Ethereum to view your global ranking and garden score.</p>
            <button 
                onClick={() => connect({ connector: injected() })}
                className="px-8 py-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-colors uppercase tracking-widest text-sm"
            >
                Connect Wallet
            </button>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto w-full max-w-md mx-auto space-y-4">
            <div className="p-4 bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-pink-500/30 rounded-2xl mb-8">
                <p className="text-xs text-pink-200/60 uppercase tracking-widest mb-1">Your Rank</p>
                <div className="flex items-end justify-between">
                    <p className="font-serif text-2xl">#42</p>
                    <p className="text-sm font-mono text-white/50">{address?.slice(0,6)}...{address?.slice(-4)}</p>
                </div>
            </div>

            {leaders.map((l) => (
                <div key={l.rank} className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="w-8 text-center font-serif text-xl text-white/40">#{l.rank}</div>
                    <div className="flex-1">
                        <p className="font-mono text-sm text-white/80">{l.address}</p>
                        <p className="text-xs text-pink-300/80 mt-1">{l.title}</p>
                    </div>
                    <div className="text-right">
                        <p className="font-sans font-bold text-lg">{l.score.toLocaleString()}</p>
                        <p className="text-[10px] text-white/30 uppercase">Bloom Score</p>
                    </div>
                </div>
            ))}
        </div>
      )}

      {/* Button to Say GM */}
      {isConnected && (
         <div className="mt-auto mb-20 flex justify-center w-full max-w-md mx-auto">
            <button 
                onClick={handleSayGM}
                disabled={isPending}
                className="w-full py-4 rounded-xl bg-blue-600/20 border border-blue-500/50 text-blue-200 uppercase tracking-wider text-sm font-bold hover:bg-blue-600/40 transition-colors disabled:opacity-50"
            >
                {isPending ? 'Confirming...' : isSuccess ? 'GM Said on Chain!' : 'Say GM On-Chain'}
            </button>
         </div>
      )}

    </div>
  );
}
