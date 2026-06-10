import React, { useState } from 'react';
import { TitleScreen } from './components/TitleScreen';
import { EternalGarden } from './components/EternalGarden';
import { CodexScreen } from './components/CodexScreen';
import { LeaderboardScreen } from './components/LeaderboardScreen';
import { AtelierScreen } from './components/AtelierScreen';
import { BloomScreen } from './components/BloomScreen';
import { Navigation } from './components/Navigation';
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { Sun } from 'lucide-react';
import { parseEther } from 'viem';

export type Screen = 'title' | 'garden' | 'codex' | 'leaderboard' | 'atelier' | 'bloom';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('title');
  const { isConnected } = useAccount();
  const { sendTransaction, data: hash, isPending } = useSendTransaction();
  const { isSuccess } = useWaitForTransactionReceipt({ hash });

  const sendGMTransaction = () => {
    sendTransaction({
      to: '0xcD0dd3716C5561De47a24949335dF8a8CD8F71a3',
      value: parseEther('0'),
      data: '0x474d' // 'GM' in hex
    });
  };

  return (
    <div className="w-full h-[100dvh] relative bg-black text-white font-sans overflow-hidden">
      {currentScreen === 'title' && <TitleScreen onStart={() => setCurrentScreen('garden')} />}
      
      {currentScreen !== 'title' && (
        <>
          <div className="absolute top-6 left-6 z-50 pointer-events-auto">
             {isConnected && (
                <button 
                  onClick={sendGMTransaction}
                  disabled={isPending}
                  className="px-3 py-2 rounded-lg bg-[#E8A020]/20 hover:bg-[#E8A020]/30 border border-[#E8A020]/40 text-[#E8A020] transition-colors flex items-center gap-2 font-['Cinzel'] text-xs font-bold disabled:opacity-50"
                >
                  <Sun size={16} />
                  {isPending ? "Confirming..." : isSuccess ? "GM Sent!" : "Say GM"}
                </button>
             )}
          </div>

          <div className="absolute inset-0 z-0">
            <EternalGarden isBackground={currentScreen !== 'garden'} onBloomComplete={() => setCurrentScreen('bloom')} />
          </div>
          
          <div className="absolute inset-0 z-10 pointer-events-none">
            {currentScreen === 'codex' && <div className="pointer-events-auto h-full"><CodexScreen onClose={() => setCurrentScreen('garden')} /></div>}
            {currentScreen === 'leaderboard' && <div className="pointer-events-auto h-full"><LeaderboardScreen onClose={() => setCurrentScreen('garden')} /></div>}
            {currentScreen === 'atelier' && <div className="pointer-events-auto h-full"><AtelierScreen onClose={() => setCurrentScreen('garden')} /></div>}
            {currentScreen === 'bloom' && <div className="pointer-events-auto h-full"><BloomScreen onClose={() => setCurrentScreen('garden')} /></div>}
          </div>

          {(currentScreen === 'garden' || currentScreen === 'codex' || currentScreen === 'leaderboard' || currentScreen === 'atelier') && (
            <Navigation currentScreen={currentScreen} setScreen={setCurrentScreen} />
          )}
        </>
      )}
    </div>
  );
}
