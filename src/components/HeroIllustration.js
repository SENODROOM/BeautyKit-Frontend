import React from 'react';

export default function HeroIllustration() {
  return (
    <svg viewBox="0 0 400 520" xmlns="http://www.w3.org/2000/svg" className="hero-illustration">
      <defs>
        <radialGradient id="bgGlow" cx="50%" cy="60%" r="55%"><stop offset="0%" stopColor="#7c5cbf" stopOpacity="0.35" /><stop offset="100%" stopColor="#06060e" stopOpacity="0" /></radialGradient>
        <radialGradient id="skinGrad" cx="50%" cy="35%" r="65%"><stop offset="0%" stopColor="#e8b896" /><stop offset="100%" stopColor="#c4855a" /></radialGradient>
        <radialGradient id="dressGrad" cx="50%" cy="20%" r="80%"><stop offset="0%" stopColor="#b08de8" /><stop offset="100%" stopColor="#6a3ba8" /></radialGradient>
        <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#4a2010" /><stop offset="100%" stopColor="#1a0808" /></linearGradient>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#f0d060" /><stop offset="100%" stopColor="#c49030" /></linearGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="3" result="coloredBlur" /><feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <filter id="softShadow"><feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000" floodOpacity="0.5" /></filter>
      </defs>
      <ellipse cx="200" cy="300" rx="200" ry="260" fill="url(#bgGlow)" />
      <path d="M120 320 Q110 360 90 400 Q70 450 60 520 L340 520 Q330 450 310 400 Q290 360 280 320 Q260 310 200 308 Q140 310 120 320Z" fill="url(#dressGrad)" filter="url(#softShadow)" />
      <path d="M170 308 Q185 320 200 324 Q215 320 230 308" fill="none" stroke="url(#goldGrad)" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="200" cy="326" r="7" fill="url(#goldGrad)" filter="url(#glow)" /><circle cx="200" cy="326" r="3.5" fill="#f8e8a0" />
      <circle cx="178" cy="312" r="2.5" fill="url(#goldGrad)" /><circle cx="222" cy="312" r="2.5" fill="url(#goldGrad)" />
      <rect x="184" y="272" width="32" height="52" rx="14" fill="url(#skinGrad)" />
      <ellipse cx="200" cy="200" rx="80" ry="92" fill="url(#skinGrad)" filter="url(#softShadow)" />
      <ellipse cx="122" cy="208" rx="12" ry="18" fill="#d4906a" /><ellipse cx="278" cy="208" rx="12" ry="18" fill="#d4906a" />
      <circle cx="122" cy="220" r="7" fill="url(#goldGrad)" filter="url(#glow)" />
      <line x1="122" y1="227" x2="122" y2="242" stroke="url(#goldGrad)" strokeWidth="2.5" />
      <circle cx="122" cy="246" r="5" fill="url(#goldGrad)" />
      <circle cx="278" cy="220" r="7" fill="url(#goldGrad)" filter="url(#glow)" />
      <line x1="278" y1="227" x2="278" y2="242" stroke="url(#goldGrad)" strokeWidth="2.5" />
      <circle cx="278" cy="246" r="5" fill="url(#goldGrad)" />
      <ellipse cx="200" cy="165" rx="82" ry="78" fill="url(#hairGrad)" />
      <path d="M122 190 Q100 250 108 340 Q118 300 122 260 Q126 230 128 205Z" fill="url(#hairGrad)" />
      <path d="M278 190 Q300 250 292 340 Q282 300 278 260 Q274 230 272 205Z" fill="url(#hairGrad)" />
      <ellipse cx="200" cy="208" rx="74" ry="82" fill="url(#skinGrad)" />
      <path d="M128 170 Q150 118 200 112 Q250 118 272 170 Q258 148 238 142 Q220 136 200 135 Q180 136 162 142 Q142 148 128 170Z" fill="url(#hairGrad)" />
      <path d="M154 162 Q168 154 182 158" stroke="#2a1205" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M218 158 Q232 154 246 162" stroke="#2a1205" strokeWidth="4" fill="none" strokeLinecap="round" />
      <ellipse cx="168" cy="180" rx="15" ry="10" fill="white" /><ellipse cx="232" cy="180" rx="15" ry="10" fill="white" />
      <ellipse cx="168" cy="174" rx="17" ry="8" fill="#7b5ea7" opacity="0.45" />
      <ellipse cx="232" cy="174" rx="17" ry="8" fill="#7b5ea7" opacity="0.45" />
      <circle cx="168" cy="180" r="9" fill="#3d2010" /><circle cx="232" cy="180" r="9" fill="#3d2010" />
      <circle cx="168" cy="180" r="5.5" fill="#1a0d06" /><circle cx="232" cy="180" r="5.5" fill="#1a0d06" />
      <circle cx="171" cy="177" r="2.5" fill="white" opacity="0.85" /><circle cx="235" cy="177" r="2.5" fill="white" opacity="0.85" />
      <path d="M154 172 Q168 165 182 172" stroke="#1a0d06" strokeWidth="2.5" fill="none" />
      <path d="M218 172 Q232 165 246 172" stroke="#1a0d06" strokeWidth="2.5" fill="none" />
      <ellipse cx="148" cy="216" rx="24" ry="14" fill="rgba(255,130,100,0.22)" />
      <ellipse cx="252" cy="216" rx="24" ry="14" fill="rgba(255,130,100,0.22)" />
      <path d="M175 238 Q188 228 200 232 Q212 228 225 238 Q215 240 200 238 Q185 240 175 238Z" fill="#b83055" />
      <path d="M175 238 Q185 254 200 256 Q215 254 225 238 Q215 240 200 238 Q185 240 175 238Z" fill="#d04468" />
      <ellipse cx="200" cy="245" rx="10" ry="4" fill="rgba(255,255,255,0.2)" />
      <circle cx="88" cy="145" r="3" fill="#c4a84a" opacity="0.7" filter="url(#glow)">
        <animate attributeName="opacity" values="0.7;0.2;0.7" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="312" cy="160" r="2" fill="#c4728a" opacity="0.6" filter="url(#glow)">
        <animate attributeName="opacity" values="0.6;0.15;0.6" dur="2.3s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
