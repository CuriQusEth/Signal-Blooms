import React from 'react';

export function AtelierScreen({ onClose }: { onClose: () => void }) {
    return (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col p-6 pt-16 z-40">
            <div className="max-w-md mx-auto w-full h-full flex flex-col">
                <h2 className="font-serif text-3xl text-pink-200 mb-2">Weaver's Atelier</h2>
                <p className="text-sm text-white/60 font-light mb-8">Evolve your garden tools</p>

                <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <div className="w-24 h-24 rounded-full border border-dashed border-white/20 flex items-center justify-center mb-6">
                        <span className="text-2xl opacity-50">✨</span>
                    </div>
                    <h3 className="font-serif text-xl mb-2">Daily Celestial Gift</h3>
                    <p className="text-white/50 text-sm mb-8">Return tomorrow for a special Prism signal.</p>

                    <button className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white/40 cursor-not-allowed uppercase tracking-widest text-xs">
                        Unlock New Biome (Requires Lvl 5)
                    </button>
                </div>
            </div>
        </div>
    );
}
