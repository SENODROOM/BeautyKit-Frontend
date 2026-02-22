import React from 'react';

export default function Avatar({ colors }) {
  const { skin = '#C8956C', hair = '#3B1F0A', top = '#9b7fe8', lipstick = '#C45C75',
    blush = 'rgba(255,150,120,0.35)', eyeshadow = '#8B7355', jewelry = '#FFD700',
    showNecklace = true, showEarrings = true, showRing = true } = colors;
  
  return (
    <svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" className="avatar-svg">
      <ellipse cx="100" cy="260" rx="55" ry="70" fill={top} /><ellipse cx="100" cy="220" rx="40" ry="35" fill={top} />
      {showNecklace && <g><ellipse cx="100" cy="210" rx="22" ry="8" fill="none" stroke={jewelry} strokeWidth="2.5" />
        <circle cx="100" cy="218" r="4" fill={jewelry} /><circle cx="91" cy="215" r="2.5" fill={jewelry} /><circle cx="109" cy="215" r="2.5" fill={jewelry} /></g>}
      {showRing && <ellipse cx="138" cy="248" rx="6" ry="3.5" fill="none" stroke={jewelry} strokeWidth="2" />}
      <rect x="88" y="178" width="24" height="28" rx="8" fill={skin} />
      <ellipse cx="100" cy="148" rx="44" ry="52" fill={skin} />
      <ellipse cx="57" cy="152" rx="7" ry="10" fill={skin} /><ellipse cx="143" cy="152" rx="7" ry="10" fill={skin} />
      {showEarrings && <g><circle cx="57" cy="156" r="5" fill={jewelry} opacity="0.9" /><circle cx="143" cy="156" r="5" fill={jewelry} opacity="0.9" />
        <line x1="57" y1="161" x2="57" y2="170" stroke={jewelry} strokeWidth="1.5" /><line x1="143" y1="161" x2="143" y2="170" stroke={jewelry} strokeWidth="1.5" />
        <circle cx="57" cy="172" r="3" fill={jewelry} opacity="0.8" /><circle cx="143" cy="172" r="3" fill={jewelry} opacity="0.8" /></g>}
      <ellipse cx="100" cy="118" rx="44" ry="42" fill={hair} />
      <path d="M56 140 Q40 190 50 240 Q58 220 58 200 Q62 180 65 165" fill={hair} />
      <path d="M144 140 Q160 190 150 240 Q142 220 142 200 Q138 180 135 165" fill={hair} />
      <ellipse cx="100" cy="152" rx="40" ry="46" fill={skin} />
      <path d="M62 130 Q75 100 100 98 Q125 100 138 130 Q130 118 118 115 Q100 108 82 115 Z" fill={hair} />
      <path d="M76 128 Q84 124 92 126" stroke="#2a1a0a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M108 126 Q116 124 124 128" stroke="#2a1a0a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="84" cy="138" rx="9" ry="6.5" fill="white" /><ellipse cx="116" cy="138" rx="9" ry="6.5" fill="white" />
      <ellipse cx="84" cy="134" rx="10" ry="5" fill={eyeshadow} opacity="0.4" />
      <ellipse cx="116" cy="134" rx="10" ry="5" fill={eyeshadow} opacity="0.4" />
      <circle cx="84" cy="138" r="5.5" fill="#3B2314" /><circle cx="116" cy="138" r="5.5" fill="#3B2314" />
      <circle cx="84" cy="138" r="3" fill="#1a0d06" /><circle cx="116" cy="138" r="3" fill="#1a0d06" />
      <circle cx="86" cy="136" r="1.5" fill="white" opacity="0.8" /><circle cx="118" cy="136" r="1.5" fill="white" opacity="0.8" />
      <path d="M75 133 Q84 129 93 133" stroke="#1a0d06" strokeWidth="1.5" fill="none" />
      <path d="M107 133 Q116 129 125 133" stroke="#1a0d06" strokeWidth="1.5" fill="none" />
      <ellipse cx="72" cy="158" rx="14" ry="9" fill={blush} /><ellipse cx="128" cy="158" rx="14" ry="9" fill={blush} />
      <path d="M88 172 Q94 168 100 170 Q106 168 112 172 Q106 173 100 172 Q94 173 88 172 Z" fill={lipstick} />
      <path d="M88 172 Q94 180 100 181 Q106 180 112 172 Q106 173 100 172 Q94 173 88 172 Z" fill={lipstick} />
      <ellipse cx="100" cy="175" rx="6" ry="2" fill="white" opacity="0.2" />
    </svg>
  );
}
