import React from "react";

interface AvatarProps {
  state: "idle" | "talking" | "thinking" | "happy";
  className?: string;
}

// Theme-aligned colors
const EYE_COLOR = "#38bdf8"; // matches accent/sky highlight
const GLOW_COLOR = "rgba(56, 189, 248, 0.25)";

export const Avatar: React.FC<AvatarProps> = ({ state, className = "w-48 h-48" }) => {
  return (
    <div className={`relative ${className} transition-all duration-500`}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-premium-lg">
        {/* Shadow */}
        <ellipse cx="50" cy="90" rx="28" ry="4" fill="rgba(0,0,0,0.06)" />

        {/* Main Body (Backpack style) */}
        <rect
          x="25"
          y="30"
          width="50"
          height="50"
          rx="14"
          className={`transition-all duration-300 ${state === "thinking" ? "animate-bounce" : ""} fill-accent`}
        />

        {/* Face Plate */}
        <rect
          x="32"
          y="38"
          width="36"
          height="24"
          rx="8"
          className="fill-stone-900"
        />

        {/* Eyes */}
        <g className="transition-all duration-300">
          {state === "thinking" ? (
            <>
              <circle cx="43" cy="50" r="2" fill={EYE_COLOR} className="animate-pulse" />
              <circle cx="57" cy="50" r="2" fill={EYE_COLOR} className="animate-pulse" style={{ animationDelay: "0.2s" }} />
            </>
          ) : state === "talking" ? (
            <>
              <rect x="40" y="48" width="6" height="2" rx="1" fill={EYE_COLOR} className="animate-pulse" />
              <rect x="54" y="48" width="6" height="2" rx="1" fill={EYE_COLOR} className="animate-pulse" />
            </>
          ) : state === "happy" ? (
            <>
              <path d="M40 52 Q43 48 46 52" stroke={EYE_COLOR} strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M54 52 Q57 48 60 52" stroke={EYE_COLOR} strokeWidth="2" fill="none" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="43" cy="50" r="2.5" fill={EYE_COLOR} />
              <circle cx="57" cy="50" r="2.5" fill={EYE_COLOR} />
            </>
          )}
        </g>

        {/* Mouth/Voice Line */}
        {state === "talking" && (
          <path
            d="M45 56 Q50 58 55 56"
            stroke={EYE_COLOR}
            strokeWidth="1"
            fill="none"
            className="animate-[pulse_0.5s_ease-in-out_infinite]"
          />
        )}

        {/* Antenna */}
        <line x1="50" y1="30" x2="50" y2="20" stroke="#1c1917" strokeWidth="2.5" strokeLinecap="round" />
        <circle
          cx="50"
          cy="18"
          r="4"
          className={state === "thinking" ? "fill-amber-400 animate-ping" : "fill-stone-900"}
        />
      </svg>

      {/* Halo Effect for Happy/Talking */}
      {(state === "talking" || state === "happy") && (
        <div
          className="absolute inset-0 rounded-full blur-2xl -z-10 animate-pulse"
          style={{ background: GLOW_COLOR }}
        />
      )}
    </div>
  );
};

