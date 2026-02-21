import React, { useState, useRef, useCallback, useEffect } from 'react';
import './App.css';

const API = 'http://localhost:5000';

// ─────────────────────────────────────────────
// SVG AVATAR COMPONENT (used in dashboard/results only)
// ─────────────────────────────────────────────
function Avatar({ colors, gender = 'f' }) {
  const {
    skin = '#C8956C',
    hair = '#3B1F0A',
    top = '#9b7fe8',
    lipstick = '#C45C75',
    blush = 'rgba(255,150,120,0.35)',
    eyeshadow = '#8B7355',
    jewelry = '#FFD700',
    showNecklace = true,
    showEarrings = true,
    showRing = true,
  } = colors;

  return (
    <svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" className="avatar-svg">
      {/* Body / Shoulders */}
      <ellipse cx="100" cy="260" rx="55" ry="70" fill={top} />
      <ellipse cx="100" cy="220" rx="40" ry="35" fill={top} />

      {/* Necklace */}
      {showNecklace && (
        <g>
          <ellipse cx="100" cy="210" rx="22" ry="8" fill="none" stroke={jewelry} strokeWidth="2.5" />
          <circle cx="100" cy="218" r="4" fill={jewelry} />
          <circle cx="91" cy="215" r="2.5" fill={jewelry} />
          <circle cx="109" cy="215" r="2.5" fill={jewelry} />
        </g>
      )}

      {/* Ring on finger */}
      {showRing && (
        <ellipse cx="138" cy="248" rx="6" ry="3.5" fill="none" stroke={jewelry} strokeWidth="2" />
      )}

      {/* Neck */}
      <rect x="88" y="178" width="24" height="28" rx="8" fill={skin} />

      {/* Head */}
      <ellipse cx="100" cy="148" rx="44" ry="52" fill={skin} />

      {/* Ear shadows */}
      <ellipse cx="57" cy="152" rx="7" ry="10" fill={skin} />
      <ellipse cx="143" cy="152" rx="7" ry="10" fill={skin} />

      {/* Earrings */}
      {showEarrings && (
        <g>
          <circle cx="57" cy="156" r="5" fill={jewelry} opacity="0.9" />
          <circle cx="143" cy="156" r="5" fill={jewelry} opacity="0.9" />
          <line x1="57" y1="161" x2="57" y2="170" stroke={jewelry} strokeWidth="1.5" />
          <line x1="143" y1="161" x2="143" y2="170" stroke={jewelry} strokeWidth="1.5" />
          <circle cx="57" cy="172" r="3" fill={jewelry} opacity="0.8" />
          <circle cx="143" cy="172" r="3" fill={jewelry} opacity="0.8" />
        </g>
      )}

      {/* Hair — back layer */}
      <ellipse cx="100" cy="118" rx="44" ry="42" fill={hair} />
      {/* Long hair */}
      <path d="M56 140 Q40 190 50 240 Q58 220 58 200 Q62 180 65 165" fill={hair} />
      <path d="M144 140 Q160 190 150 240 Q142 220 142 200 Q138 180 135 165" fill={hair} />

      {/* Face skin on top of back hair */}
      <ellipse cx="100" cy="152" rx="40" ry="46" fill={skin} />

      {/* Forehead hair */}
      <path d="M62 130 Q75 100 100 98 Q125 100 138 130 Q130 118 118 115 Q100 108 82 115 Z" fill={hair} />

      {/* Eyebrows */}
      <path d="M76 128 Q84 124 92 126" stroke="#2a1a0a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M108 126 Q116 124 124 128" stroke="#2a1a0a" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Eye whites */}
      <ellipse cx="84" cy="138" rx="9" ry="6.5" fill="white" />
      <ellipse cx="116" cy="138" rx="9" ry="6.5" fill="white" />

      {/* Eyeshadow */}
      <ellipse cx="84" cy="134" rx="10" ry="5" fill={eyeshadow} opacity="0.4" />
      <ellipse cx="116" cy="134" rx="10" ry="5" fill={eyeshadow} opacity="0.4" />

      {/* Iris */}
      <circle cx="84" cy="138" r="5.5" fill="#3B2314" />
      <circle cx="116" cy="138" r="5.5" fill="#3B2314" />
      <circle cx="84" cy="138" r="3" fill="#1a0d06" />
      <circle cx="116" cy="138" r="3" fill="#1a0d06" />
      {/* Eye shine */}
      <circle cx="86" cy="136" r="1.5" fill="white" opacity="0.8" />
      <circle cx="118" cy="136" r="1.5" fill="white" opacity="0.8" />

      {/* Eyelashes top */}
      <path d="M75 133 Q84 129 93 133" stroke="#1a0d06" strokeWidth="1.5" fill="none" />
      <path d="M107 133 Q116 129 125 133" stroke="#1a0d06" strokeWidth="1.5" fill="none" />

      {/* Nose */}
      

      {/* Blush cheeks */}
      <ellipse cx="72" cy="158" rx="14" ry="9" fill={blush} />
      <ellipse cx="128" cy="158" rx="14" ry="9" fill={blush} />

      {/* Lips */}
      <path d="M88 172 Q94 168 100 170 Q106 168 112 172 Q106 173 100 172 Q94 173 88 172 Z" fill={lipstick} />
      <path d="M88 172 Q94 180 100 181 Q106 180 112 172 Q106 173 100 172 Q94 173 88 172 Z" fill={lipstick} />
      <ellipse cx="100" cy="175" rx="6" ry="2" fill="white" opacity="0.2" />

      {/* Clothing detail — collar */}
      <path d="M80 206 Q100 215 120 206" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
    </svg>
  );
}

// ─────────────────────────────────────────────
// HERO ILLUSTRATION — replaces avatar on landing
// ─────────────────────────────────────────────
function HeroIllustration() {
  return (
    <svg viewBox="0 0 400 520" xmlns="http://www.w3.org/2000/svg" className="hero-illustration">
      <defs>
        <radialGradient id="bgGlow" cx="50%" cy="60%" r="55%">
          <stop offset="0%" stopColor="#7c5cbf" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="#06060e" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="skinGrad" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#e8b896"/>
          <stop offset="100%" stopColor="#c4855a"/>
        </radialGradient>
        <radialGradient id="dressGrad" cx="50%" cy="20%" r="80%">
          <stop offset="0%" stopColor="#b08de8"/>
          <stop offset="100%" stopColor="#6a3ba8"/>
        </radialGradient>
        <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4a2010"/>
          <stop offset="100%" stopColor="#1a0808"/>
        </linearGradient>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0d060"/>
          <stop offset="100%" stopColor="#c49030"/>
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="softShadow">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000" floodOpacity="0.5"/>
        </filter>
        <clipPath id="bodyClip">
          <ellipse cx="200" cy="420" rx="120" ry="160"/>
        </clipPath>
      </defs>

      {/* Background glow */}
      <ellipse cx="200" cy="300" rx="200" ry="260" fill="url(#bgGlow)"/>

      {/* === DRESS / BODY === */}
      {/* Main dress shape */}
      <path d="M120 320 Q110 360 90 400 Q70 450 60 520 L340 520 Q330 450 310 400 Q290 360 280 320 Q260 310 200 308 Q140 310 120 320Z" fill="url(#dressGrad)" filter="url(#softShadow)"/>
      {/* Dress sheen overlay */}
      <path d="M145 325 Q135 365 120 410 Q140 395 160 380 Q170 350 165 325Z" fill="rgba(255,255,255,0.1)"/>
      {/* Dress neckline */}
      <path d="M162 318 Q180 330 200 328 Q220 330 238 318 Q220 315 200 316 Q180 315 162 318Z" fill="rgba(255,255,255,0.08)"/>

      {/* === JEWELRY === */}
      {/* Necklace chain */}
      <path d="M170 308 Q185 320 200 324 Q215 320 230 308" fill="none" stroke="url(#goldGrad)" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Pendant */}
      <circle cx="200" cy="326" r="7" fill="url(#goldGrad)" filter="url(#glow)"/>
      <circle cx="200" cy="326" r="3.5" fill="#f8e8a0"/>
      {/* Necklace beads */}
      <circle cx="178" cy="312" r="2.5" fill="url(#goldGrad)"/>
      <circle cx="187" cy="317" r="2.5" fill="url(#goldGrad)"/>
      <circle cx="213" cy="317" r="2.5" fill="url(#goldGrad)"/>
      <circle cx="222" cy="312" r="2.5" fill="url(#goldGrad)"/>

      {/* === NECK === */}
      <rect x="184" y="272" width="32" height="52" rx="14" fill="url(#skinGrad)"/>
      {/* Neck shadow */}
      <ellipse cx="200" cy="272" rx="14" ry="6" fill="rgba(0,0,0,0.12)"/>

      {/* === HEAD === */}
      <ellipse cx="200" cy="200" rx="80" ry="92" fill="url(#skinGrad)" filter="url(#softShadow)"/>

      {/* Ears */}
      <ellipse cx="122" cy="208" rx="12" ry="18" fill="#d4906a"/>
      <ellipse cx="278" cy="208" rx="12" ry="18" fill="#d4906a"/>
      {/* Inner ear */}
      <ellipse cx="122" cy="210" rx="7" ry="11" fill="#c07850"/>
      <ellipse cx="278" cy="210" rx="7" ry="11" fill="#c07850"/>

      {/* Earrings */}
      <circle cx="122" cy="220" r="7" fill="url(#goldGrad)" filter="url(#glow)"/>
      <line x1="122" y1="227" x2="122" y2="242" stroke="url(#goldGrad)" strokeWidth="2.5"/>
      <circle cx="122" cy="246" r="5" fill="url(#goldGrad)"/>
      <circle cx="278" cy="220" r="7" fill="url(#goldGrad)" filter="url(#glow)"/>
      <line x1="278" y1="227" x2="278" y2="242" stroke="url(#goldGrad)" strokeWidth="2.5"/>
      <circle cx="278" cy="246" r="5" fill="url(#goldGrad)"/>

      {/* === HAIR === */}
      {/* Back hair volume */}
      <ellipse cx="200" cy="165" rx="82" ry="78" fill="url(#hairGrad)"/>
      {/* Side curtains */}
      <path d="M122 190 Q100 250 108 340 Q118 300 122 260 Q126 230 128 205Z" fill="url(#hairGrad)"/>
      <path d="M278 190 Q300 250 292 340 Q282 300 278 260 Q274 230 272 205Z" fill="url(#hairGrad)"/>
      {/* Front face overlay */}
      <ellipse cx="200" cy="208" rx="74" ry="82" fill="url(#skinGrad)"/>
      {/* Top hairline */}
      <path d="M128 170 Q150 118 200 112 Q250 118 272 170 Q258 148 238 142 Q220 136 200 135 Q180 136 162 142 Q142 148 128 170Z" fill="url(#hairGrad)"/>
      {/* Side hair wisps */}
      <path d="M128 180 Q118 195 120 215 Q125 210 128 200Z" fill="url(#hairGrad)"/>
      <path d="M272 180 Q282 195 280 215 Q275 210 272 200Z" fill="url(#hairGrad)"/>

      {/* === FACE DETAILS === */}
      {/* Eyebrows — elegant arched */}
      <path d="M154 162 Q168 154 182 158" stroke="#2a1205" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <path d="M218 158 Q232 154 246 162" stroke="#2a1205" strokeWidth="4" fill="none" strokeLinecap="round"/>

      {/* Eye whites */}
      <ellipse cx="168" cy="180" rx="15" ry="10" fill="white"/>
      <ellipse cx="232" cy="180" rx="15" ry="10" fill="white"/>

      {/* Eyeshadow — smoky */}
      <ellipse cx="168" cy="174" rx="17" ry="8" fill="#7b5ea7" opacity="0.45"/>
      <ellipse cx="232" cy="174" rx="17" ry="8" fill="#7b5ea7" opacity="0.45"/>
      {/* Highlight under brow */}
      <ellipse cx="168" cy="170" rx="10" ry="3" fill="rgba(255,220,200,0.25)"/>
      <ellipse cx="232" cy="170" rx="10" ry="3" fill="rgba(255,220,200,0.25)"/>

      {/* Iris */}
      <circle cx="168" cy="180" r="9" fill="#3d2010"/>
      <circle cx="232" cy="180" r="9" fill="#3d2010"/>
      <circle cx="168" cy="180" r="5.5" fill="#1a0d06"/>
      <circle cx="232" cy="180" r="5.5" fill="#1a0d06"/>
      {/* Iris ring */}
      <circle cx="168" cy="180" r="9" fill="none" stroke="#5a3020" strokeWidth="1"/>
      <circle cx="232" cy="180" r="9" fill="none" stroke="#5a3020" strokeWidth="1"/>
      {/* Eye shine */}
      <circle cx="171" cy="177" r="2.5" fill="white" opacity="0.85"/>
      <circle cx="235" cy="177" r="2.5" fill="white" opacity="0.85"/>

      {/* Lashes */}
      <path d="M154 172 Q168 165 182 172" stroke="#1a0d06" strokeWidth="2.5" fill="none"/>
      <path d="M218 172 Q232 165 246 172" stroke="#1a0d06" strokeWidth="2.5" fill="none"/>
      {/* Lower lash hint */}
      <path d="M156 188 Q168 191 180 188" stroke="#1a0d06" strokeWidth="1" fill="none" opacity="0.4"/>
      <path d="M220 188 Q232 191 244 188" stroke="#1a0d06" strokeWidth="1" fill="none" opacity="0.4"/>

      {/* Nose */}
      <path d="M196 200 Q190 216 193 224 Q200 228 207 224 Q210 216 204 200" fill="none" stroke="rgba(0,0,0,0)" strokeWidth="0"/>
      
      {/* Nose bridge shadow */}
      <path d="M200 192 Q197 206 195 214" fill="none" stroke="rgba(100,60,20,0.1)" strokeWidth="3" strokeLinecap="round"/>

      {/* Blush */}
      <ellipse cx="148" cy="216" rx="24" ry="14" fill="rgba(255,130,100,0.22)"/>
      <ellipse cx="252" cy="216" rx="24" ry="14" fill="rgba(255,130,100,0.22)"/>

      {/* Lips */}
      {/* Upper lip */}
      <path d="M175 238 Q188 228 200 232 Q212 228 225 238 Q215 240 200 238 Q185 240 175 238Z" fill="#b83055"/>
      {/* Lower lip */}
      <path d="M175 238 Q185 254 200 256 Q215 254 225 238 Q215 240 200 238 Q185 240 175 238Z" fill="#d04468"/>
      {/* Lip shine */}
      <ellipse cx="200" cy="245" rx="10" ry="4" fill="rgba(255,255,255,0.2)"/>
      {/* Lip line */}
      <path d="M175 238 Q200 236 225 238" fill="none" stroke="#8a1835" strokeWidth="0.8"/>
      {/* Cupid's bow detail */}
      <path d="M184 238 Q192 232 200 234 Q208 232 216 238" fill="none" stroke="#8a1835" strokeWidth="0.8"/>

      {/* === FLOATING BEAUTY ELEMENTS === */}

      {/* Sparkle dots around figure */}
      <circle cx="88" cy="145" r="3" fill="#c4a84a" opacity="0.7" filter="url(#glow)">
        <animate attributeName="opacity" values="0.7;0.2;0.7" dur="3s" repeatCount="indefinite"/>
      </circle>
      <circle cx="312" cy="160" r="2" fill="#c4728a" opacity="0.6" filter="url(#glow)">
        <animate attributeName="opacity" values="0.6;0.15;0.6" dur="2.3s" repeatCount="indefinite"/>
      </circle>
      <circle cx="72" cy="280" r="2.5" fill="#c4a84a" opacity="0.5" filter="url(#glow)">
        <animate attributeName="opacity" values="0.5;0.1;0.5" dur="4s" repeatCount="indefinite"/>
      </circle>
      <circle cx="330" cy="290" r="3" fill="#7c5cbf" opacity="0.6" filter="url(#glow)">
        <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2.8s" repeatCount="indefinite"/>
      </circle>
      {/* Star sparkles */}
      <path d="M318 130 L321 138 L318 146 L315 138Z M312 136 L320 139 L328 136 L320 133Z" fill="#c4a84a" opacity="0.65" filter="url(#glow)">
        <animate attributeName="opacity" values="0.65;0.1;0.65" dur="3.5s" repeatCount="indefinite"/>
      </path>
      <path d="M78 190 L80 196 L78 202 L76 196Z M73 195 L79 197 L85 195 L79 193Z" fill="#c4728a" opacity="0.55" filter="url(#glow)">
        <animate attributeName="opacity" values="0.55;0.1;0.55" dur="2.7s" repeatCount="indefinite"/>
      </path>

      {/* Decorative arc lines */}
      <path d="M60 350 Q80 320 100 340" fill="none" stroke="rgba(196,168,74,0.12)" strokeWidth="1.5"/>
      <path d="M340 350 Q320 320 300 340" fill="none" stroke="rgba(196,168,74,0.12)" strokeWidth="1.5"/>
    </svg>
  );
}

// ─────────────────────────────────────────────
// PASSWORD STRENGTH CALCULATOR
// ─────────────────────────────────────────────
function calculatePasswordStrength(password) {
  if (!password) return { score: 0, label: '', color: '' };
  
  let score = 0;
  
  // Length check
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  
  // Character variety
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^a-zA-Z0-9]/.test(password)) score += 1;
  
  // Determine label and color
  if (score <= 2) return { score, label: 'Weak', color: '#ff6b6b' };
  if (score <= 4) return { score, label: 'Fair', color: '#feca57' };
  if (score <= 5) return { score, label: 'Good', color: '#48dbfb' };
  return { score, label: 'Strong', color: '#1dd1a1' };
}

// ─────────────────────────────────────────────
// API HELPERS
// ─────────────────────────────────────────────
function getToken() { return localStorage.getItem('bk_token'); }
function setToken(t) { localStorage.setItem('bk_token', t); }
function removeToken() { localStorage.removeItem('bk_token'); }

async function apiFetch(path, opts = {}) {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(opts.headers || {}) };
  const res = await fetch(`${API}${path}`, { ...opts, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

// ─────────────────────────────────────────────
// CATEGORY NAV TABS (shown after scan in results)
// ─────────────────────────────────────────────
const CATEGORIES = [
  { id: 'jewelry',  label: 'Jewellery', icon: '💎' },
  { id: 'clothing', label: 'Clothes',   icon: '👗' },
  { id: 'lipstick', label: 'Lipstick',  icon: '💄' },
  { id: 'blush',    label: 'Blush',     icon: '🌸' },
  { id: 'eyeshadow',label: 'Eyeshadow', icon: '✨' },
  { id: 'hair',     label: 'Hair',      icon: '💇' },
];

// ─────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState('landing');
  const [authMode, setAuthMode] = useState('signin');
  const [user, setUser] = useState(null);
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' });
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, label: '', color: '' });

  const [scanMode, setScanMode] = useState('upload');
  const [capturedImage, setCapturedImage] = useState(null);
  const [stream, setStream] = useState(null);
  const [results, setResults] = useState(null);
  const [scanError, setScanError] = useState('');
  const [activeTab, setActiveTab] = useState('jewelry');

  const [profiles, setProfiles] = useState([]);
  const [savingProfile, setSavingProfile] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [profileName, setProfileName] = useState('');
  const [selectedProfile, setSelectedProfile] = useState(null);

  const [avatarColors, setAvatarColors] = useState({
    skin: '#C8956C', hair: '#3B1F0A', top: '#9b7fe8',
    lipstick: '#C45C75', blush: 'rgba(255,150,120,0.35)',
    eyeshadow: '#8B7355', jewelry: '#FFD700',
    showNecklace: true, showEarrings: true, showRing: true
  });

  const fileInputRef = useRef();
  const videoRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    const token = getToken();
    if (token) {
      apiFetch('/api/auth/me').then(u => {
        setUser(u);
        loadProfiles();
      }).catch(() => removeToken());
    }
  }, []);

  // Update password strength when password changes
  useEffect(() => {
    if (authMode === 'signup') {
      const strength = calculatePasswordStrength(authForm.password);
      setPasswordStrength(strength);
    }
  }, [authForm.password, authMode]);

  async function loadProfiles() {
    try { const p = await apiFetch('/api/profiles'); setProfiles(p); } catch {}
  }

  async function handleAuth(e) {
    e.preventDefault();
    setAuthError(''); setAuthLoading(true);
    try {
      const endpoint = authMode === 'signup' ? '/api/auth/signup' : '/api/auth/signin';
      const body = authMode === 'signup'
        ? { name: authForm.name, email: authForm.email, password: authForm.password }
        : { email: authForm.email, password: authForm.password };
      const data = await apiFetch(endpoint, { method: 'POST', body: JSON.stringify(body) });
      setToken(data.token);
      setUser(data.user);
      await loadProfiles();
      setPage('dashboard');
    } catch (err) { setAuthError(err.message); }
    setAuthLoading(false);
  }

  function logout() {
    removeToken(); setUser(null); setProfiles([]);
    setResults(null); setCapturedImage(null); setPage('landing');
  }

  function extractSkinPixels(canvas, ctx, img) {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const d = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let rSum = 0, gSum = 0, bSum = 0, count = 0;
    const sx = Math.floor(canvas.width * 0.3), ex = Math.floor(canvas.width * 0.7);
    const sy = Math.floor(canvas.height * 0.2), ey = Math.floor(canvas.height * 0.8);
    for (let y = sy; y < ey; y += 3) {
      for (let x = sx; x < ex; x += 3) {
        const i = (y * canvas.width + x) * 4;
        const r = d[i], g = d[i+1], b = d[i+2];
        if (r > 60 && g > 40 && b > 20 && r > g && r > b && (r - Math.min(g,b)) > 10) {
          rSum += r; gSum += g; bSum += b; count++;
        }
      }
    }
    if (count < 10) {
      count = 0;
      for (let y = sy; y < ey; y += 5) for (let x = sx; x < ex; x += 5) {
        const i = (y * canvas.width + x) * 4;
        rSum += d[i]; gSum += d[i+1]; bSum += d[i+2]; count++;
      }
    }
    return { r: Math.round(rSum/count), g: Math.round(gSum/count), b: Math.round(bSum/count) };
  }

  const analyzeImage = useCallback(async (imageSrc) => {
    setPage('analyzing');
    try {
      const img = new Image();
      img.src = imageSrc;
      await new Promise((res, rej) => { img.onload = res; img.onerror = rej; });
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = img.width; canvas.height = img.height;
      const { r, g, b } = extractSkinPixels(canvas, ctx, img);
      const data = await apiFetch('/api/analyze-pixels', {
        method: 'POST', body: JSON.stringify({ r, g, b })
      });
      setResults(data);
      const skinHex = data.skinTone.hex;
      setAvatarColors(prev => ({
        ...prev,
        skin: skinHex,
        top: data.recommendations.clothing.colors[0]?.hex || '#9b7fe8',
        lipstick: data.recommendations.lipstick[0]?.hex || '#C45C75',
        blush: data.recommendations.blush[0]?.hex || 'rgba(255,150,120,0.35)',
        eyeshadow: data.recommendations.eyeshadow[0]?.hex || '#8B7355',
        jewelry: data.recommendations.jewelry.metals[0]?.hex || '#FFD700',
        hair: data.recommendations.hair.colors[0]?.hex || '#3B1F0A',
      }));
      setActiveTab('jewelry');
      setPage('results');
    } catch (err) {
      setScanError('Analysis failed. Please try again.');
      setPage('scan');
    }
  }, []);

  function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => { setCapturedImage(ev.target.result); analyzeImage(ev.target.result); };
    reader.readAsDataURL(file);
  }

  async function startCamera() {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      setStream(s);
      if (videoRef.current) videoRef.current.srcObject = s;
    } catch { setScanError('Camera access denied. Please use file upload.'); }
  }

  function capturePhoto() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    ctx.drawImage(videoRef.current, 0, 0);
    const imgData = canvas.toDataURL('image/jpeg');
    setCapturedImage(imgData);
    if (stream) stream.getTracks().forEach(t => t.stop());
    analyzeImage(imgData);
  }

  async function saveProfile() {
    if (!profileName.trim()) return;
    setSavingProfile(true);
    try {
      await apiFetch('/api/profiles', {
        method: 'POST',
        body: JSON.stringify({ profileName: profileName.trim(), skinTone: results.skinTone, recommendations: results.recommendations, avatar: capturedImage })
      });
      await loadProfiles();
      setSaveModalOpen(false);
      setProfileName('');
    } catch (err) { alert(err.message); }
    setSavingProfile(false);
  }

  async function deleteProfile(id) {
    if (!window.confirm('Delete this profile?')) return;
    try { await apiFetch(`/api/profiles/${id}`, { method: 'DELETE' }); await loadProfiles(); } catch {}
  }

  function loadProfile(profile) {
    setResults({ skinTone: profile.skinTone, recommendations: profile.recommendations });
    setCapturedImage(profile.avatar);
    const recs = profile.recommendations;
    setAvatarColors({
      skin: profile.skinTone.hex,
      hair: recs.hair.colors[0]?.hex || '#3B1F0A',
      top: recs.clothing.colors[0]?.hex || '#9b7fe8',
      lipstick: recs.lipstick[0]?.hex || '#C45C75',
      blush: recs.blush[0]?.hex || 'rgba(255,150,120,0.35)',
      eyeshadow: recs.eyeshadow[0]?.hex || '#8B7355',
      jewelry: recs.jewelry.metals[0]?.hex || '#FFD700',
    });
    setSelectedProfile(profile);
    setPage('results');
  }

  // ─────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────

  // ── LANDING ──
  if (page === 'landing') return (
    <div className="app landing-app">
      <Ambient />

      {/* STICKY NAV */}
      <nav className="nav">
        <span className="nav-brand">Beauty Kit</span>
        <div className="nav-actions">
          <button className="btn-ghost" onClick={() => { setAuthMode('signin'); setPage('auth'); }}>Sign In</button>
          <button className="btn-primary" onClick={() => { setAuthMode('signup'); setPage('auth'); }}>Get Started</button>
        </div>
      </nav>

      {/* SECTION 1 — HERO */}
      <section className="hero-section">
        <div className="hero-bg-grid" />
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-eyebrow">
              <span className="eyebrow-dot" />
              AI-Powered Beauty Intelligence
            </div>
            <h1 className="hero-headline">
              Discover the<br/>
              Colors That<br/>
              <em>Were Made</em><br/>
              For You.
            </h1>
            <p className="hero-body">
              Beauty Kit reads your skin's unique undertone and depth, then builds a complete beauty profile — from the metals that make you glow to the lip shade that turns heads.
            </p>
            <div className="hero-cta-row">
              <button className="cta-pill" onClick={() => { setAuthMode('signup'); setPage('auth'); }}>
                Begin Your Analysis
                <span className="cta-arrow">→</span>
              </button>
              <button className="cta-ghost" onClick={() => setPage('scan')}>
                Try without account
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat"><span className="stat-num">6</span><span className="stat-label">Beauty Categories</span></div>
              <div className="stat-div"/>
              <div className="stat"><span className="stat-num">50+</span><span className="stat-label">Color Recommendations</span></div>
              <div className="stat-div"/>
              <div className="stat"><span className="stat-num">10+</span><span className="stat-label">Skin Tones</span></div>
            </div>
          </div>

          {/* ── RIGHT: Illustrated Woman ── */}
          <div className="hero-right">
            <div className="hero-avatar-frame">
              <div className="frame-ring frame-ring-1"/>
              <div className="frame-ring frame-ring-2"/>
              <div className="frame-corner fc-tl"/>
              <div className="frame-corner fc-tr"/>
              <div className="frame-corner fc-bl"/>
              <div className="frame-corner fc-br"/>
              <div className="hero-illus-inner">
                <HeroIllustration />
              </div>
              <div className="avatar-card avatar-card-1">
                <div className="avc-dot" style={{background:'#FFD700'}}/>
                <span>Gold Jewellery</span>
              </div>
              <div className="avatar-card avatar-card-2">
                <div className="avc-dot" style={{background:'#b83055'}}/>
                <span>Berry Lip</span>
              </div>
              <div className="avatar-card avatar-card-3">
                <div className="avc-dot" style={{background:'#7b5ea7'}}/>
                <span>Smoky Eyeshadow</span>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-scroll-hint">
          <div className="scroll-line"/>
          <span>Discover More</span>
          <div className="scroll-line"/>
        </div>
      </section>

      {/* SECTION 2 — WHAT YOU GET */}
      <section className="features-section">
        <div className="features-inner">
          <div className="section-eyebrow">What Beauty Kit Gives You</div>
          <h2 className="section-headline">A Complete Beauty<br/><em>Transformation</em> — In Seconds.</h2>
          <p className="section-body">Six expertly curated categories, each with wide-ranging recommendations tailored precisely to your skin's warm, cool, or neutral undertone.</p>

          <div className="feat-grid">
            {[
              { icon:'💎', title:'Jewellery', sub:'Metals, Styles & Gemstones', desc:'Know exactly which metals make your skin radiate — gold, silver, rose gold, mixed — and which statement styles suit your aesthetic.' },
              { icon:'👗', title:'Clothes', sub:'16 Colors · 8 Styles · Fabrics', desc:'A full color palette, fashion style directions, the best fabrics for your look, and patterns that photograph beautifully on you.' },
              { icon:'💄', title:'Lipstick', sub:'8 Shades with Finish & Vibe', desc:'From bold velvet berries to peachy gloss nudes — each shade rated for finish type and occasion vibe.' },
              { icon:'🌸', title:'Blush', sub:'6 Shades with Placement Tips', desc:'The exact flush tones that make your cheekbones pop without looking muddy or washed out.' },
              { icon:'✨', title:'Eyeshadow', sub:'8-Pan Custom Palette', desc:'A complete eyeshadow palette of 8 shades built specifically for your eye shape and undertone to create depth and dimension.' },
              { icon:'💇', title:'Hair', sub:'9 Shades · Styles · Treatments', desc:'The hair colors that frame your face beautifully, plus style suggestions and salon treatment recommendations.' },
            ].map((f,i) => (
              <div key={i} className="feat-card" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="feat-icon">{f.icon}</div>
                <div className="feat-title">{f.title}</div>
                <div className="feat-sub">{f.sub}</div>
                <div className="feat-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — HOW IT WORKS */}
      <section className="how-section">
        <div className="how-inner">
          <div className="section-eyebrow">Simple Process</div>
          <h2 className="section-headline">Three Steps to Your<br/><em>Perfect Palette.</em></h2>

          <div className="steps-row">
            {[
              { num:'01', title:'Upload or Capture', desc:'Take a photo of your face or inner wrist in natural daylight, or upload an existing photo from your gallery.' },
              { num:'02', title:'AI Analysis', desc:'Our skin tone engine samples thousands of pixels, detects your undertone and depth using dermatology-standard color science.' },
              { num:'03', title:'Explore & Save', desc:'Browse your full beauty profile, preview colors live on your avatar, then save it to your account to revisit anytime.' },
            ].map((s,i) => (
              <div key={i} className="step-card">
                <div className="step-num">{s.num}</div>
                <div className="step-line"/>
                <div className="step-title">{s.title}</div>
                <div className="step-desc">{s.desc}</div>
              </div>
            ))}
          </div>

          <div className="undertone-showcase">
            <div className="section-eyebrow" style={{marginBottom:'2.5rem'}}>The Three Undertones</div>
            <div className="undertone-row">
              {[
                { label:'Warm', tone:'Golden Beige', skin:'#C89060', jewelry:'Gold', cloth:'Terracotta, Olive, Camel', lip:'Coral & Brick', hair:'Honey & Auburn', swatches:['#FFD700','#C65D3C','#808000','#C4922A'] },
                { label:'Cool', tone:'Fair Cool', skin:'#E8C4B0', jewelry:'Silver', cloth:'Navy, Lavender, Emerald', lip:'Berry & Mauve', hair:'Ash & Platinum', swatches:['#C0C0C0','#283593','#B39DDB','#800020'] },
                { label:'Neutral', tone:'Natural Beige', skin:'#D4A882', jewelry:'Rose Gold', cloth:'Dusty Rose, Sage, Teal', lip:'Rose & Mauve', hair:'Chestnut & Mocha', swatches:['#B76E79','#D4A5A5','#8FBC8F','#8B4513'] },
              ].map((u,i) => (
                <div key={i} className="undertone-card">
                  <div className="undertone-skin" style={{background:u.skin}}/>
                  <div className="undertone-label">{u.label}</div>
                  <div className="undertone-tone">{u.tone}</div>
                  <div className="undertone-details">
                    <div className="ud-row"><span className="ud-k">Jewellery</span><span>{u.jewelry}</span></div>
                    <div className="ud-row"><span className="ud-k">Colors</span><span>{u.cloth}</span></div>
                    <div className="ud-row"><span className="ud-k">Lips</span><span>{u.lip}</span></div>
                    {u.hair && <div className="ud-row"><span className="ud-k">Hair</span><span>{u.hair}</span></div>}
                  </div>
                  <div className="undertone-swatches">
                    {u.swatches.map((s,j) => <div key={j} className="ut-swatch" style={{background:s}}/>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — AVATAR FEATURE */}
      <section className="avatar-feature-section">
        <div className="avatar-feature-inner">
          <div className="af-left">
            <div className="section-eyebrow">Live Preview</div>
            <h2 className="section-headline">Watch Your Look<br/>Come to Life.</h2>
            <p className="section-body">Every color you select instantly updates your personalized avatar. Try different lip shades, swap outfit colors, change your hair — see the full picture before you commit to a look.</p>
            <ul className="af-bullets">
              {['Jewellery visible on earrings, necklace & ring','Hair color updates in real-time','Outfit, blush & eyeshadow all reflected','Save multiple looks with custom names'].map((b,i) => (
                <li key={i} className="af-bullet"><span className="bullet-check">✦</span>{b}</li>
              ))}
            </ul>
          </div>
          <div className="af-right">
            <div className="af-avatar-wrap">
              <div className="af-avatar-bg"/>
              <Avatar colors={{ skin:'#B08060', hair:'#1C1C1C', top:'#283593', lipstick:'#8B008B', blush:'rgba(200,140,180,0.45)', eyeshadow:'#36454F', jewelry:'#C0C0C0', showNecklace:true, showEarrings:true, showRing:true }} />
              <div className="af-label">Cool undertone — Silver jewellery, Navy outfit, Berry lip</div>
            </div>
            <div className="af-avatar-wrap" style={{marginTop:'1.5rem'}}>
              <div className="af-avatar-bg warm"/>
              <Avatar colors={{ skin:'#C8956C', hair:'#C4922A', top:'#808000', lipstick:'#FF6B5B', blush:'rgba(255,160,100,0.4)', eyeshadow:'#CD7F32', jewelry:'#FFD700', showNecklace:true, showEarrings:true, showRing:true }} />
              <div className="af-label">Warm undertone — Gold jewellery, Olive outfit, Coral lip</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — FINAL CTA */}
      <section className="final-cta-section">
        <div className="final-cta-inner">
          <div className="final-ornament">✦</div>
          <h2 className="final-headline">Your Most Flattering<br/><em>Colors Are Waiting.</em></h2>
          <p className="final-body">Join Beauty Kit and build a beauty profile that's uniquely, scientifically yours. Free to start. No guesswork required.</p>
          <div className="final-btns">
            <button className="cta-pill large" onClick={() => { setAuthMode('signup'); setPage('auth'); }}>
              Create Your Free Account
              <span className="cta-arrow">→</span>
            </button>
            <button className="cta-ghost" onClick={() => setPage('scan')}>
              Scan Without Signing Up
            </button>
          </div>
        </div>
        <footer className="site-footer">
          <span className="footer-brand">Beauty Kit</span>
          <span className="footer-copy">Beauty intelligence, powered by science.</span>
        </footer>
      </section>
    </div>
  );

  // ── AUTH ──
  if (page === 'auth') return (
    <div className="app">
      <Ambient />
      <div className="auth-page">
        <div className="auth-card">
          <button className="back-btn" onClick={() => setPage('landing')}>← Back</button>
          <div className="auth-brand">Beauty Kit</div>
          <h2 className="auth-title">{authMode === 'signup' ? 'Create Account' : 'Welcome Back'}</h2>
          <p className="auth-sub">{authMode === 'signup' ? 'Start your beauty intelligence journey' : 'Sign in to your beauty profiles'}</p>
          {authError && <div className="error-box">{authError}</div>}
          <form onSubmit={handleAuth} className="auth-form">
            {authMode === 'signup' && (
              <div className="field">
                <label>Full Name</label>
                <input type="text" placeholder="Your name" value={authForm.name}
                  onChange={e => setAuthForm({...authForm, name: e.target.value})} required />
              </div>
            )}
            <div className="field">
              <label>Email</label>
              <input type="email" placeholder="your@email.com" value={authForm.email}
                onChange={e => setAuthForm({...authForm, email: e.target.value})} required />
            </div>
            <div className="field">
              <label>Password</label>
              <div className="password-input-wrapper">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  value={authForm.password}
                  onChange={e => setAuthForm({...authForm, password: e.target.value})} 
                  required 
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
              {authMode === 'signup' && authForm.password && (
                <div className="password-strength">
                  <div className="strength-bars">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                      <div 
                        key={i} 
                        className={`strength-bar ${i <= passwordStrength.score ? 'active' : ''}`}
                        style={{ backgroundColor: i <= passwordStrength.score ? passwordStrength.color : '' }}
                      />
                    ))}
                  </div>
                  {passwordStrength.label && (
                    <div className="strength-label" style={{ color: passwordStrength.color }}>
                      {passwordStrength.label}
                    </div>
                  )}
                </div>
              )}
            </div>
            <button type="submit" className="btn-primary full" disabled={authLoading}>
              {authLoading ? 'Please wait...' : authMode === 'signup' ? 'Create Account' : 'Sign In'}
            </button>
          </form>
          <p className="auth-switch">
            {authMode === 'signup' ? 'Already have an account? ' : "Don't have an account? "}
            <button onClick={() => { 
              setAuthMode(authMode === 'signup' ? 'signin' : 'signup'); 
              setAuthError(''); 
              setShowPassword(false);
              setPasswordStrength({ score: 0, label: '', color: '' });
            }}>
              {authMode === 'signup' ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  // ── DASHBOARD ──
  if (page === 'dashboard') return (
    <div className="app">
      <Ambient />
      <nav className="nav">
        <span className="nav-brand">Beauty Kit</span>
        <div className="nav-actions">
          <span className="nav-user">✦ {user?.name}</span>
          <button className="btn-ghost small" onClick={logout}>Sign Out</button>
        </div>
      </nav>
      <div className="dashboard">
        <div className="dash-header">
          <div>
            <h2 className="dash-title">Your Beauty Profiles</h2>
            <p className="dash-sub">Save multiple skin analysis results for different people or occasions.</p>
          </div>
          <button className="btn-primary" onClick={() => setPage('scan')}>+ New Scan</button>
        </div>
        {profiles.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">◈</div>
            <h3>No profiles yet</h3>
            <p>Scan your skin tone to create your first beauty profile.</p>
            <button className="btn-primary" onClick={() => setPage('scan')}>Start Your First Scan</button>
          </div>
        ) : (
          <div className="profiles-grid">
            {profiles.map(p => (
              <div key={p.id} className="profile-card" onClick={() => loadProfile(p)}>
                <div className="profile-avatar-sm">
                  <Avatar colors={{
                    skin: p.skinTone.hex,
                    hair: p.recommendations.hair.colors[0]?.hex || '#3B1F0A',
                    top: p.recommendations.clothing.colors[0]?.hex || '#9b7fe8',
                    lipstick: p.recommendations.lipstick[0]?.hex || '#C45C75',
                    blush: p.recommendations.blush[0]?.hex || 'rgba(255,150,120,0.35)',
                    eyeshadow: p.recommendations.eyeshadow[0]?.hex || '#8B7355',
                    jewelry: p.recommendations.jewelry.metals[0]?.hex || '#FFD700',
                  }} />
                </div>
                <div className="profile-info">
                  <div className="profile-name">{p.profileName}</div>
                  <div className="profile-tone">{p.skinTone.name}</div>
                  <div className="profile-badges">
                    <span className="mini-badge">{p.skinTone.undertone}</span>
                    <span className="mini-badge">{p.skinTone.depth}</span>
                  </div>
                  <div className="profile-swatch" style={{ background: p.skinTone.hex }} />
                </div>
                <button className="profile-delete" onClick={e => { e.stopPropagation(); deleteProfile(p.id); }}>✕</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // ── SCAN ──
  if (page === 'scan') return (
    <div className="app">
      <Ambient />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <nav className="nav">
        <span className="nav-brand">Beauty Kit</span>
        <div className="nav-actions">
          {user ? (
            <><span className="nav-user">✦ {user.name}</span>
            <button className="btn-ghost small" onClick={() => setPage('dashboard')}>Dashboard</button></>
          ) : (
            <button className="btn-ghost small" onClick={() => { setAuthMode('signin'); setPage('auth'); }}>Sign In</button>
          )}
        </div>
      </nav>
      <div className="scan-page">
        <button className="back-btn" onClick={() => setPage(user ? 'dashboard' : 'landing')}>← Back</button>
        <h2 className="section-title">Scan Your Skin</h2>
        <p className="section-sub">Best results in natural daylight — aim your camera at your cheek or inner wrist.</p>
        {scanError && <div className="error-box">{scanError}</div>}
        <div className="scan-modes">
          <button className={`mode-btn ${scanMode==='upload'?'active':''}`} onClick={() => setScanMode('upload')}>Upload Photo</button>
          <button className={`mode-btn ${scanMode==='camera'?'active':''}`} onClick={() => { setScanMode('camera'); startCamera(); }}>Live Camera</button>
        </div>
        {scanMode === 'upload' && (
          <div className="upload-zone" onClick={() => fileInputRef.current.click()}>
            <div className="upload-icon">⊕</div>
            <p className="upload-text">Click to upload your photo</p>
            <p className="upload-hint">JPG · PNG · WEBP  •  Natural light recommended</p>
            <input ref={fileInputRef} type="file" accept="image/*" style={{ display:'none' }} onChange={handleFileUpload} />
          </div>
        )}
        {scanMode === 'camera' && (
          <div className="camera-zone">
            <div className="video-wrap">
              <video ref={videoRef} autoPlay playsInline className="camera-feed" />
              <div className="face-guide" />
            </div>
            <button className="capture-btn" onClick={capturePhoto}><span className="capture-inner" /></button>
            <p className="upload-hint">Align your face and tap the button</p>
          </div>
        )}
      </div>
    </div>
  );

  // ── ANALYZING ──
  if (page === 'analyzing') return (
    <div className="app">
      <Ambient />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <div className="analyzing-page">
        {capturedImage && (
          <div className="scan-preview-wrap">
            <img src={capturedImage} alt="Scanning" className="scan-preview" />
            <div className="scan-line-wrap"><div className="scan-line" /></div>
          </div>
        )}
        <div className="spinner" />
        <h2 className="analyzing-title">Analyzing Your Skin</h2>
        <p className="analyzing-sub">Detecting undertones · Measuring depth · Building your palette</p>
        <div className="dots"><span/><span/><span/></div>
      </div>
    </div>
  );

  // ── RESULTS ──
  if (page === 'results' && results) {
    const recs = results.recommendations;

    return (
      <div className="app results-app">
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        <Ambient />

        {/* Save Modal */}
        {saveModalOpen && (
          <div className="modal-overlay" onClick={() => setSaveModalOpen(false)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <h3 className="modal-title">Save This Profile</h3>
              <p className="modal-sub">Give this beauty profile a name to save it to your account.</p>
              <input
                className="modal-input" type="text"
                placeholder="e.g. Summer Look, Mom, Wedding Day..."
                value={profileName}
                onChange={e => setProfileName(e.target.value)}
                onKeyDown={e => e.key==='Enter' && saveProfile()}
                autoFocus
              />
              <div className="modal-btns">
                <button className="btn-ghost" onClick={() => setSaveModalOpen(false)}>Cancel</button>
                <button className="btn-primary" onClick={saveProfile} disabled={savingProfile}>
                  {savingProfile ? 'Saving...' : 'Save Profile'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── RESULTS NAV — with category tabs ── */}
        <div className="results-nav">
          <div className="results-nav-left">
            <button className="back-btn inline" onClick={() => setPage(user ? 'dashboard' : 'landing')}>
              ← {user ? 'Dashboard' : 'Home'}
            </button>
            <span className="nav-brand">Beauty Kit</span>
          </div>

          {/* Category nav tabs */}
          <div className="results-cat-nav">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={`cat-nav-btn ${activeTab === cat.id ? 'active' : ''}`}
                onClick={() => setActiveTab(cat.id)}
              >
                <span className="cat-nav-icon">{cat.icon}</span>
                <span className="cat-nav-label">{cat.label}</span>
              </button>
            ))}
          </div>

          <div className="results-nav-right">
            {user && <button className="btn-primary small" onClick={() => setSaveModalOpen(true)}>💾 Save Profile</button>}
            {!user && <button className="btn-outline small" onClick={() => { setAuthMode('signup'); setPage('auth'); }}>Sign Up to Save</button>}
          </div>
        </div>

        {/* Main Results Layout */}
        <div className="results-layout">
          {/* LEFT: Avatar Panel */}
          <div className="avatar-panel">
            <div className="avatar-panel-header">
              <div className="skin-swatch-display" style={{ background: results.skinTone.hex }} />
              <div>
                <div className="skin-tone-label">Your Skin Tone</div>
                <div className="skin-tone-name">{results.skinTone.name}</div>
                <div className="skin-badges">
                  <span className="badge">{results.skinTone.undertone}</span>
                  <span className="badge">{results.skinTone.depth}</span>
                </div>
              </div>
            </div>

            <div className="avatar-container">
              <div className="avatar-bg-glow" />
              <Avatar colors={avatarColors} />
            </div>

            <div className="avatar-controls">
              <p className="avatar-hint">Click any color below to preview it on the avatar →</p>
              <div className="avatar-control-row">
                <span className="ctrl-label">Outfit</span>
                <div className="ctrl-swatches">
                  {recs.clothing.colors.slice(0,8).map((c,i) => (
                    <div key={i} className={`ctrl-swatch ${avatarColors.top===c.hex?'selected':''}`}
                      style={{ background: c.hex }} title={c.name}
                      onClick={() => setAvatarColors(prev => ({...prev, top: c.hex}))} />
                  ))}
                </div>
              </div>
              <div className="avatar-control-row">
                <span className="ctrl-label">Hair</span>
                <div className="ctrl-swatches">
                  {recs.hair.colors.slice(0,8).map((c,i) => (
                    <div key={i} className={`ctrl-swatch ${avatarColors.hair===c.hex?'selected':''}`}
                      style={{ background: c.hex }} title={c.name}
                      onClick={() => setAvatarColors(prev => ({...prev, hair: c.hex}))} />
                  ))}
                </div>
              </div>
              <div className="avatar-control-row">
                <span className="ctrl-label">Lips</span>
                <div className="ctrl-swatches">
                  {recs.lipstick.slice(0,8).map((c,i) => (
                    <div key={i} className={`ctrl-swatch ${avatarColors.lipstick===c.hex?'selected':''}`}
                      style={{ background: c.hex }} title={c.name}
                      onClick={() => setAvatarColors(prev => ({...prev, lipstick: c.hex}))} />
                  ))}
                </div>
              </div>
              <div className="avatar-control-row">
                <span className="ctrl-label">Blush</span>
                <div className="ctrl-swatches">
                  {recs.blush.slice(0,6).map((c,i) => (
                    <div key={i} className={`ctrl-swatch ${avatarColors.blush===c.hex?'selected':''}`}
                      style={{ background: c.hex }} title={c.name}
                      onClick={() => setAvatarColors(prev => ({...prev, blush: c.hex}))} />
                  ))}
                </div>
              </div>
              <div className="avatar-control-row">
                <span className="ctrl-label">Eyes</span>
                <div className="ctrl-swatches">
                  {recs.eyeshadow.slice(0,8).map((c,i) => (
                    <div key={i} className={`ctrl-swatch ${avatarColors.eyeshadow===c.hex?'selected':''}`}
                      style={{ background: c.hex }} title={c.name}
                      onClick={() => setAvatarColors(prev => ({...prev, eyeshadow: c.hex}))} />
                  ))}
                </div>
              </div>
              <div className="avatar-control-row">
                <span className="ctrl-label">Jewels</span>
                <div className="ctrl-swatches">
                  {recs.jewelry.metals.map((c,i) => (
                    <div key={i} className={`ctrl-swatch ${avatarColors.jewelry===c.hex?'selected':''}`}
                      style={{ background: c.hex }} title={c.name}
                      onClick={() => setAvatarColors(prev => ({...prev, jewelry: c.hex}))} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Recommendations Panel — driven by activeTab set from nav */}
          <div className="recs-panel">
            {/* Small tab bar inside panel (mirrors nav, for reference) */}
            <div className="tab-content">

              {/* JEWELLERY */}
              {activeTab==='jewelry' && (
                <div className="rec-section">
                  <div className="rec-section-header">
                    <span className="rec-section-icon">💎</span>
                    <h3 className="rec-title">Jewellery Metals</h3>
                  </div>
                  <div className="metal-grid">
                    {recs.jewelry.metals.map((m,i) => (
                      <div key={i} className={`metal-card ${avatarColors.jewelry===m.hex?'active-metal':''}`}
                        onClick={() => setAvatarColors(prev => ({...prev, jewelry: m.hex}))}>
                        <div className="metal-swatch" style={{ background: `linear-gradient(135deg, ${m.hex}, ${m.hex}99)` }}>
                          <div className="metal-shine" />
                        </div>
                        <div className="metal-name">{m.name}</div>
                        <div className="star-rating">{'★'.repeat(m.rating)}{'☆'.repeat(5-m.rating)}</div>
                        <div className="metal-note">{m.note}</div>
                      </div>
                    ))}
                  </div>
                  <h3 className="rec-title mt">Jewellery Styles</h3>
                  <div className="style-tags">
                    {recs.jewelry.styles.map((s,i) => <span key={i} className="style-tag">{s}</span>)}
                  </div>
                  <h3 className="rec-title mt">Best Gemstones</h3>
                  <div className="style-tags">
                    {recs.jewelry.gemstones.map((g,i) => <span key={i} className="gem-tag">{g}</span>)}
                  </div>
                  <div className="avoid-box">
                    <span className="avoid-label">Avoid</span>
                    {recs.jewelry.avoid}
                  </div>
                </div>
              )}

              {/* CLOTHES */}
              {activeTab==='clothing' && (
                <div className="rec-section">
                  <div className="rec-section-header">
                    <span className="rec-section-icon">👗</span>
                    <h3 className="rec-title">Your Color Palette</h3>
                  </div>
                  <div className="color-palette-grid">
                    {recs.clothing.colors.map((c,i) => (
                      <div key={i} className={`palette-chip ${avatarColors.top===c.hex?'active-chip':''}`}
                        onClick={() => setAvatarColors(prev => ({...prev, top: c.hex}))}>
                        <div className="palette-swatch" style={{ background: c.hex }} />
                        <div className="palette-name">{c.name}</div>
                        <div className="palette-cat">{c.category}</div>
                      </div>
                    ))}
                  </div>
                  <h3 className="rec-title mt">Clothing Styles For You</h3>
                  <div className="style-tags">
                    {recs.clothing.styles.map((s,i) => <span key={i} className="style-tag">{s}</span>)}
                  </div>
                  <h3 className="rec-title mt">Best Fabrics</h3>
                  <div className="style-tags">
                    {recs.clothing.fabrics.map((f,i) => <span key={i} className="fabric-tag">{f}</span>)}
                  </div>
                  <h3 className="rec-title mt">Best Patterns</h3>
                  <div className="style-tags">
                    {recs.clothing.patterns.map((p,i) => <span key={i} className="fabric-tag">{p}</span>)}
                  </div>
                  <div className="avoid-box">
                    <span className="avoid-label">Avoid</span>
                    {Array.isArray(recs.clothing.avoid) ? recs.clothing.avoid.join(', ') : recs.clothing.avoid}
                  </div>
                </div>
              )}

              {/* LIPSTICK */}
              {activeTab==='lipstick' && (
                <div className="rec-section">
                  <div className="rec-section-header">
                    <span className="rec-section-icon">💄</span>
                    <h3 className="rec-title">Lipstick Shades</h3>
                  </div>
                  <div className="shade-grid">
                    {recs.lipstick.map((l,i) => (
                      <div key={i} className={`shade-card ${avatarColors.lipstick===l.hex?'active-shade':''}`}
                        onClick={() => setAvatarColors(prev => ({...prev, lipstick: l.hex}))}>
                        <div className="shade-preview" style={{ background: `linear-gradient(180deg, ${l.hex}cc, ${l.hex})` }}>
                          <div className="shade-shine" />
                        </div>
                        <div className="shade-name">{l.name}</div>
                        <div className="shade-meta">
                          <span className="finish-tag">{l.finish}</span>
                          <span className="vibe-tag">{l.vibe}</span>
                        </div>
                        <div className="shade-hex">{l.hex}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* BLUSH */}
              {activeTab==='blush' && (
                <div className="rec-section">
                  <div className="rec-section-header">
                    <span className="rec-section-icon">🌸</span>
                    <h3 className="rec-title">Blush Shades</h3>
                  </div>
                  <div className="shade-grid">
                    {recs.blush.map((b,i) => (
                      <div key={i} className={`shade-card ${avatarColors.blush===b.hex?'active-shade':''}`}
                        onClick={() => setAvatarColors(prev => ({...prev, blush: b.hex}))}>
                        <div className="shade-preview blush-preview" style={{ background: `radial-gradient(circle, ${b.hex}, ${b.hex}88)` }} />
                        <div className="shade-name">{b.name}</div>
                        <div className="shade-meta">
                          <span className="finish-tag">{b.finish}</span>
                        </div>
                        <div className="shade-hex">{b.hex}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* EYESHADOW */}
              {activeTab==='eyeshadow' && (
                <div className="rec-section">
                  <div className="rec-section-header">
                    <span className="rec-section-icon">✨</span>
                    <h3 className="rec-title">Eyeshadow Palette</h3>
                  </div>
                  <div className="eye-palette-display">
                    {recs.eyeshadow.map((e,i) => (
                      <div key={i} className={`eye-pan ${avatarColors.eyeshadow===e.hex?'active-eye':''}`}
                        onClick={() => setAvatarColors(prev => ({...prev, eyeshadow: e.hex}))}>
                        <div className="eye-pan-color" style={{ background: e.hex }}>
                          <div className="eye-pan-shine" />
                        </div>
                        <div className="eye-pan-name">{e.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* HAIR */}
              {activeTab==='hair' && (
                <div className="rec-section">
                  <div className="rec-section-header">
                    <span className="rec-section-icon">💇</span>
                    <h3 className="rec-title">Hair Colors</h3>
                  </div>
                  <div className="hair-grid">
                    {recs.hair.colors.map((h,i) => (
                      <div key={i} className={`hair-card ${avatarColors.hair===h.hex?'active-hair':''}`}
                        onClick={() => setAvatarColors(prev => ({...prev, hair: h.hex}))}>
                        <div className="hair-swatch" style={{ background: `linear-gradient(180deg, ${h.hex}88, ${h.hex})` }} />
                        <div className="hair-name">{h.name}</div>
                        <div className="hair-level">{h.level}</div>
                      </div>
                    ))}
                  </div>
                  <h3 className="rec-title mt">Hair Styles</h3>
                  <div className="style-tags">
                    {recs.hair.styles.map((s,i) => <span key={i} className="style-tag">{s}</span>)}
                  </div>
                  <h3 className="rec-title mt">Treatments</h3>
                  <div className="style-tags">
                    {recs.hair.treatments.map((t,i) => <span key={i} className="fabric-tag">{t}</span>)}
                  </div>
                  <div className="avoid-box">
                    <span className="avoid-label">Avoid</span>
                    {recs.hair.avoid}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        <div className="results-footer">✦ Beauty Kit AI — Your personalized beauty intelligence</div>
      </div>
    );
  }

  return null;
}

function Ambient() {
  return (
    <div className="ambient" aria-hidden>
      <div className="orb orb-1"/><div className="orb orb-2"/><div className="orb orb-3"/>
    </div>
  );
}