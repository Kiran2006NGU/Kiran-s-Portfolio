import React from 'react';
import { motion } from 'framer-motion';

interface WalkingWhiteRobotProps {
  size?: number;
  isInteractive?: boolean;
}

export const WalkingWhiteRobot: React.FC<WalkingWhiteRobotProps> = ({ size = 68, isInteractive = true }) => {
  return (
    <div className="relative flex items-center justify-center select-none" style={{ width: size, height: size + 8 }}>
      {/* Walking Robot Container */}
      <motion.div
        animate={{
          y: [0, -4, 0],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative flex flex-col items-center cursor-pointer"
      >
        {/* Antenna Light */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] z-20 -mb-0.5"
        />

        {/* Antenna Stem */}
        <div className="w-1 h-2 bg-slate-300 rounded-t-sm z-10" />

        {/* Robot Head */}
        <div className="relative w-11 h-8 bg-gradient-to-b from-white via-slate-100 to-slate-200 rounded-2xl border border-slate-300/80 shadow-md flex items-center justify-center overflow-hidden z-10">
          {/* Ear Bolts */}
          <div className="absolute -left-1 w-1.5 h-3 bg-slate-300 rounded-l-md" />
          <div className="absolute -right-1 w-1.5 h-3 bg-slate-300 rounded-r-md" />

          {/* Glowing Visor Screen */}
          <div className="w-8 h-4.5 bg-slate-950 rounded-lg flex items-center justify-center gap-1.5 px-1 border border-cyan-500/30 shadow-inner">
            {/* Left Eye */}
            <motion.div
              animate={{
                scaleY: [1, 1, 0.1, 1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                times: [0, 0.9, 0.93, 0.96, 1]
              }}
              className="w-2 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]"
            />
            {/* Right Eye */}
            <motion.div
              animate={{
                scaleY: [1, 1, 0.1, 1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                times: [0, 0.9, 0.93, 0.96, 1]
              }}
              className="w-2 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]"
            />
          </div>
        </div>

        {/* Neck */}
        <div className="w-3 h-1 bg-slate-400 rounded-sm z-0 -my-0.5" />

        {/* Robot Body */}
        <div className="relative w-12 h-10 bg-gradient-to-b from-white via-slate-100 to-slate-200 rounded-2xl border border-slate-300/80 shadow-lg flex flex-col items-center justify-center z-10">
          {/* Chest Arc Reactor Core */}
          <motion.div
            animate={{
              boxShadow: [
                '0 0 4px #06b6d4',
                '0 0 10px #38bdf8',
                '0 0 4px #06b6d4'
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
            className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 border border-white flex items-center justify-center shadow-md"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
          </motion.div>

          {/* Left Arm Walking Motion */}
          <motion.div
            animate={{
              rotate: [18, -18, 18],
              y: [0, -1, 0]
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -left-2 top-1.5 origin-top w-2.5 h-6 bg-gradient-to-b from-white to-slate-200 rounded-full border border-slate-300 shadow-sm"
          />

          {/* Right Arm Walking Motion */}
          <motion.div
            animate={{
              rotate: [-18, 18, -18],
              y: [0, -1, 0]
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -right-2 top-1.5 origin-top w-2.5 h-6 bg-gradient-to-b from-white to-slate-200 rounded-full border border-slate-300 shadow-sm"
          />
        </div>

        {/* Robot Legs (Walking Animation) */}
        <div className="relative w-9 h-4 flex justify-between px-1 z-0 -mt-1">
          {/* Left Leg */}
          <motion.div
            animate={{
              rotate: [-22, 22, -22],
              y: [0, -2, 0]
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="origin-top flex flex-col items-center"
          >
            <div className="w-2.5 h-3 bg-slate-200 border border-slate-300 rounded-b-sm" />
            <div className="w-3.5 h-2 bg-gradient-to-r from-slate-300 to-white border border-slate-400 rounded-full -mt-0.5 shadow-xs" />
          </motion.div>

          {/* Right Leg */}
          <motion.div
            animate={{
              rotate: [22, -22, 22],
              y: [-2, 0, -2]
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="origin-top flex flex-col items-center"
          >
            <div className="w-2.5 h-3 bg-slate-200 border border-slate-300 rounded-b-sm" />
            <div className="w-3.5 h-2 bg-gradient-to-r from-slate-300 to-white border border-slate-400 rounded-full -mt-0.5 shadow-xs" />
          </motion.div>
        </div>
      </motion.div>

      {/* Ground Shadow Walking Pulse */}
      <motion.div
        animate={{
          scaleX: [0.75, 1, 0.75],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-0 w-10 h-2 bg-black/40 blur-xs rounded-full z-0"
      />
    </div>
  );
};
