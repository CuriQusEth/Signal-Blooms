import React from 'react';
import { motion } from 'motion/react';

export function CodexScreen({ onClose }: { onClose: () => void }) {
    const signals = [
        { name: "Light", description: "The foundational signal. Fast, but lacks duration.", color: "bg-blue-200" },
        { name: "Pulse", description: "A rhythmic wave that encourages rapid blooming.", color: "bg-pink-400" },
        { name: "Resonance", description: "Bounces powerfully between garden nodes.", color: "bg-purple-500" },
        { name: "Prism", description: "Splits into multiple weaker signals upon impact.", color: "bg-gradient-to-r from-red-400 via-green-400 to-blue-400" },
        { name: "Void", description: "Absorbs nearby signals to grow a massive bloom.", color: "bg-zinc-800 border border-zinc-600" }
    ];

    return (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col p-6 pt-16 z-40 overflow-y-auto">
            <div className="max-w-md mx-auto w-full pb-24">
                <h2 className="font-serif text-3xl text-pink-200 mb-2">Signal Codex</h2>
                <p className="text-sm text-white/60 font-light mb-8">Knowledge of the Weaver</p>

                <div className="space-y-4">
                    {signals.map((sig, i) => (
                        <div key={sig.name} className="p-5 bg-white/5 border border-white/10 rounded-2xl flex gap-4">
                            <div className={`w-12 h-12 rounded-full flex-shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.2)] ${sig.color}`} />
                            <div>
                                <h3 className="font-serif tracking-wider text-lg mb-1">{sig.name} Signal</h3>
                                <p className="text-sm text-white/60 leading-relaxed font-light">{sig.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
