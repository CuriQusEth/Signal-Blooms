import React from 'react';
import { motion } from 'motion/react';

export function TitleScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#05010a] overflow-hidden">
      {/* Background atmospheric blobs */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] rounded-full bg-purple-900/40 blur-[100px]"
      />
      <motion.div 
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute w-[60vw] h-[60vw] max-w-[400px] max-h-[400px] rounded-full bg-pink-700/30 blur-[80px] translate-x-1/2 translate-y-1/2"
      />

      <div className="z-10 text-center flex flex-col items-center px-6">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="font-serif text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-white to-pink-200 tracking-wider mb-4"
        >
          SIGNAL
          <br/>
          BLOOM
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 2, delay: 1 }}
          className="font-sans text-sm md:text-base text-purple-200 uppercase tracking-[0.3em] mb-16 max-w-sm"
        >
          A Weaver's Journey
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 2 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="relative px-12 py-4 rounded-full overflow-hidden group border border-white/20 bg-white/5 backdrop-blur-md"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
          <span className="relative font-serif font-semibold text-lg tracking-widest text-pink-100 uppercase">
            Enter Garden
          </span>
        </motion.button>
      </div>
    </div>
  );
}
