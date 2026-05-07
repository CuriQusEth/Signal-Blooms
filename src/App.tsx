import React, { useState } from 'react';
import { TitleScreen } from './components/TitleScreen';
import { EternalGarden } from './components/EternalGarden';
import { CodexScreen } from './components/CodexScreen';
import { LeaderboardScreen } from './components/LeaderboardScreen';
import { AtelierScreen } from './components/AtelierScreen';
import { BloomScreen } from './components/BloomScreen';
import { Navigation } from './components/Navigation';

export type Screen = 'title' | 'garden' | 'codex' | 'leaderboard' | 'atelier' | 'bloom';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('title');

  return (
    <div className="w-full h-[100dvh] relative bg-black text-white font-sans overflow-hidden">
      {currentScreen === 'title' && <TitleScreen onStart={() => setCurrentScreen('garden')} />}
      
      {currentScreen !== 'title' && (
        <>
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
