import React, { useState, useRef, useCallback, useEffect } from 'react';
import './App.css';

const API = 'http://localhost:5000';

// ─────────────────────────────────────────────
// SVG AVATAR COMPONENT
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
      <path d="M97 148 Q94 158 97 163 Q100 165 103 163 Q106 158 103 148" fill="none" stroke={skin} strokeWidth="0" />
      <ellipse cx="96" cy="161" rx="5" ry="3" fill="none" stroke={`rgba(0,0,0,0.12)`} strokeWidth="1.2" />
      <ellipse cx="104" cy="161" rx="5" ry="3" fill="none" stroke={`rgba(0,0,0,0.12)`} strokeWidth="1.2" />

      {/* Blush cheeks */}
      <ellipse cx="72" cy="158" rx="14" ry="9" fill={blush} />
      <ellipse cx="128" cy="158" rx="14" ry="9" fill={blush} />

      {/* Lips */}
      {/* Upper lip */}
      <path d="M88 172 Q94 168 100 170 Q106 168 112 172 Q106 173 100 172 Q94 173 88 172 Z" fill={lipstick} />
      {/* Lower lip */}
      <path d="M88 172 Q94 180 100 181 Q106 180 112 172 Q106 173 100 172 Q94 173 88 172 Z" fill={lipstick} />
      {/* Lip shine */}
      <ellipse cx="100" cy="175" rx="6" ry="2" fill="white" opacity="0.2" />

      {/* Clothing detail — collar */}
      <path d="M80 206 Q100 215 120 206" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
    </svg>
  );
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
// MAIN APP
// ─────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState('landing'); // landing | auth | scan | analyzing | results | dashboard
  const [authMode, setAuthMode] = useState('signin');
  const [user, setUser] = useState(null);
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' });
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

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

  // Avatar state
  const [avatarColors, setAvatarColors] = useState({
    skin: '#C8956C', hair: '#3B1F0A', top: '#9b7fe8',
    lipstick: '#C45C75', blush: 'rgba(255,150,120,0.35)',
    eyeshadow: '#8B7355', jewelry: '#FFD700',
    showNecklace: true, showEarrings: true, showRing: true
  });

  const fileInputRef = useRef();
  const videoRef = useRef();
  const canvasRef = useRef();

  // Check existing session
  useEffect(() => {
    const token = getToken();
    if (token) {
      apiFetch('/api/auth/me').then(u => {
        setUser(u);
        loadProfiles();
      }).catch(() => removeToken());
    }
  }, []);

  async function loadProfiles() {
    try { const p = await apiFetch('/api/profiles'); setProfiles(p); } catch {}
  }

  // ── AUTH ──
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

  // ── SKIN ANALYSIS ──
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
      // Update avatar with detected skin tone
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
      top: recs.clothing.colors[0]?.hex || '#9b7fe8',
      lipstick: recs.lipstick[0]?.hex || '#C45C75',
      blush: recs.blush[0]?.hex || 'rgba(255,150,120,0.35)',
      eyeshadow: recs.eyeshadow[0]?.hex || '#8B7355',
      jewelry: recs.jewelry.metals[0]?.hex || '#FFD700',
      hair: recs.hair.colors[0]?.hex || '#3B1F0A',
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
        <span className="nav-brand">BeauKit</span>
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
              BeauKit reads your skin's unique undertone and depth, then builds a complete beauty profile — from the metals that make you glow to the lip shade that turns heads.
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
              <div className="stat"><span className="stat-num">3</span><span className="stat-label">Skin Undertones</span></div>
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-avatar-frame">
              <div className="frame-ring frame-ring-1"/>
              <div className="frame-ring frame-ring-2"/>
              <div className="frame-corner fc-tl"/>
              <div className="frame-corner fc-tr"/>
              <div className="frame-corner fc-bl"/>
              <div className="frame-corner fc-br"/>
              <div className="hero-avatar-inner">
                <Avatar colors={{ skin:'#C8956C', hair:'#C4922A', top:'#C65D3C', lipstick:'#C05A3A', blush:'rgba(255,160,100,0.4)', eyeshadow:'#CD7F32', jewelry:'#FFD700', showNecklace:true, showEarrings:true, showRing:true }} />
              </div>
              <div className="avatar-card avatar-card-1">
                <div className="avc-dot" style={{background:'#FFD700'}}/>
                <span>Gold Jewelry</span>
              </div>
              <div className="avatar-card avatar-card-2">
                <div className="avc-dot" style={{background:'#C05A3A'}}/>
                <span>Terracotta Lip</span>
              </div>
              <div className="avatar-card avatar-card-3">
                <div className="avc-dot" style={{background:'#C4922A'}}/>
                <span>Honey Hair</span>
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
          <div className="section-eyebrow">What BeauKit Gives You</div>
          <h2 className="section-headline">A Complete Beauty<br/><em>Transformation</em> — In Seconds.</h2>
          <p className="section-body">Six expertly curated categories, each with wide-ranging recommendations tailored precisely to your skin's warm, cool, or neutral undertone.</p>

          <div className="feat-grid">
            {[
              { icon:'💎', title:'Jewelry', sub:'Metals, Styles & Gemstones', desc:'Know exactly which metals make your skin radiate — gold, silver, rose gold, mixed — and which statement styles suit your aesthetic.' },
              { icon:'👗', title:'Clothing', sub:'16 Colors · 8 Styles · Fabrics', desc:'A full color palette, fashion style directions, the best fabrics for your look, and patterns that photograph beautifully on you.' },
              { icon:'💄', title:'Lipstick', sub:'8 Shades with Finish & Vibe', desc:'From bold velvet berries to peachy gloss nudes — each shade rated for finish type and occasion vibe.' },
              { icon:'🌸', title:'Blush', sub:'6 Shades with Placement Tips', desc:'The exact flush tones that make your cheekbones pop without looking muddy or washed out.' },
              { icon:'✨', title:'Eyeshadow', sub:'8-Pan Custom Palette', desc:'A complete eyeshadow palette of 8 shades built specifically for your eye shape and undertone to create depth and dimension.' },
              { icon:'💇', title:'Hair Color', sub:'9 Shades · Styles · Treatments', desc:'The hair colors that frame your face beautifully, plus style suggestions and salon treatment recommendations.' },
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
                    <div className="ud-row"><span className="ud-k">Jewelry</span><span>{u.jewelry}</span></div>
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
              {['Jewelry visible on earrings, necklace & ring','Hair color updates in real-time','Outfit, blush & eyeshadow all reflected','Save multiple looks with custom names'].map((b,i) => (
                <li key={i} className="af-bullet"><span className="bullet-check">✦</span>{b}</li>
              ))}
            </ul>
          </div>
          <div className="af-right">
            <div className="af-avatar-wrap">
              <div className="af-avatar-bg"/>
              <Avatar colors={{ skin:'#B08060', hair:'#1C1C1C', top:'#283593', lipstick:'#8B008B', blush:'rgba(200,140,180,0.45)', eyeshadow:'#36454F', jewelry:'#C0C0C0', showNecklace:true, showEarrings:true, showRing:true }} />
              <div className="af-label">Cool undertone — Silver jewelry, Navy outfit, Berry lip</div>
            </div>
            <div className="af-avatar-wrap" style={{marginTop:'1.5rem'}}>
              <div className="af-avatar-bg warm"/>
              <Avatar colors={{ skin:'#C8956C', hair:'#C4922A', top:'#808000', lipstick:'#FF6B5B', blush:'rgba(255,160,100,0.4)', eyeshadow:'#CD7F32', jewelry:'#FFD700', showNecklace:true, showEarrings:true, showRing:true }} />
              <div className="af-label">Warm undertone — Gold jewelry, Olive outfit, Coral lip</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — FINAL CTA */}
      <section className="final-cta-section">
        <div className="final-cta-inner">
          <div className="final-ornament">✦</div>
          <h2 className="final-headline">Your Most Flattering<br/><em>Colors Are Waiting.</em></h2>
          <p className="final-body">Join BeauKit and build a beauty profile that's uniquely, scientifically yours. Free to start. No guesswork required.</p>
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
          <span className="footer-brand">BeauKit</span>
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
          <div className="auth-brand">BeauKit</div>
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
              <input type="password" placeholder="••••••••" value={authForm.password}
                onChange={e => setAuthForm({...authForm, password: e.target.value})} required />
            </div>
            <button type="submit" className="btn-primary full" disabled={authLoading}>
              {authLoading ? 'Please wait...' : authMode === 'signup' ? 'Create Account' : 'Sign In'}
            </button>
          </form>
          <p className="auth-switch">
            {authMode === 'signup' ? 'Already have an account? ' : "Don't have an account? "}
            <button onClick={() => { setAuthMode(authMode === 'signup' ? 'signin' : 'signup'); setAuthError(''); }}>
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
        <span className="nav-brand">BeauKit</span>
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
        <span className="nav-brand">BeauKit</span>
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
    const tabs = [
      { id:'jewelry', label:'Jewelry', icon:'💎' },
      { id:'clothing', label:'Clothing', icon:'👗' },
      { id:'lipstick', label:'Lipstick', icon:'💄' },
      { id:'blush', label:'Blush', icon:'🌸' },
      { id:'eyeshadow', label:'Eyeshadow', icon:'✨' },
      { id:'hair', label:'Hair', icon:'💇' },
    ];

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

        {/* Results Header */}
        <div className="results-nav">
          <button className="back-btn inline" onClick={() => setPage(user ? 'dashboard' : 'landing')}>← {user ? 'Dashboard' : 'Home'}</button>
          <span className="nav-brand">BeauKit</span>
          <div className="nav-actions">
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
                      style={{ background: c.hex }}
                      title={c.name}
                      onClick={() => setAvatarColors(prev => ({...prev, top: c.hex}))} />
                  ))}
                </div>
              </div>
              <div className="avatar-control-row">
                <span className="ctrl-label">Hair</span>
                <div className="ctrl-swatches">
                  {recs.hair.colors.slice(0,8).map((c,i) => (
                    <div key={i} className={`ctrl-swatch ${avatarColors.hair===c.hex?'selected':''}`}
                      style={{ background: c.hex }}
                      title={c.name}
                      onClick={() => setAvatarColors(prev => ({...prev, hair: c.hex}))} />
                  ))}
                </div>
              </div>
              <div className="avatar-control-row">
                <span className="ctrl-label">Lips</span>
                <div className="ctrl-swatches">
                  {recs.lipstick.slice(0,8).map((c,i) => (
                    <div key={i} className={`ctrl-swatch ${avatarColors.lipstick===c.hex?'selected':''}`}
                      style={{ background: c.hex }}
                      title={c.name}
                      onClick={() => setAvatarColors(prev => ({...prev, lipstick: c.hex}))} />
                  ))}
                </div>
              </div>
              <div className="avatar-control-row">
                <span className="ctrl-label">Blush</span>
                <div className="ctrl-swatches">
                  {recs.blush.slice(0,6).map((c,i) => (
                    <div key={i} className={`ctrl-swatch ${avatarColors.blush===c.hex?'selected':''}`}
                      style={{ background: c.hex }}
                      title={c.name}
                      onClick={() => setAvatarColors(prev => ({...prev, blush: c.hex}))} />
                  ))}
                </div>
              </div>
              <div className="avatar-control-row">
                <span className="ctrl-label">Eyes</span>
                <div className="ctrl-swatches">
                  {recs.eyeshadow.slice(0,8).map((c,i) => (
                    <div key={i} className={`ctrl-swatch ${avatarColors.eyeshadow===c.hex?'selected':''}`}
                      style={{ background: c.hex }}
                      title={c.name}
                      onClick={() => setAvatarColors(prev => ({...prev, eyeshadow: c.hex}))} />
                  ))}
                </div>
              </div>
              <div className="avatar-control-row">
                <span className="ctrl-label">Jewels</span>
                <div className="ctrl-swatches">
                  {recs.jewelry.metals.map((c,i) => (
                    <div key={i} className={`ctrl-swatch ${avatarColors.jewelry===c.hex?'selected':''}`}
                      style={{ background: c.hex }}
                      title={c.name}
                      onClick={() => setAvatarColors(prev => ({...prev, jewelry: c.hex}))} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Recommendations Panel */}
          <div className="recs-panel">
            <div className="tab-nav">
              {tabs.map(t => (
                <button key={t.id} className={`tab-btn ${activeTab===t.id?'active':''}`} onClick={() => setActiveTab(t.id)}>
                  <span>{t.icon}</span><span>{t.label}</span>
                </button>
              ))}
            </div>

            <div className="tab-content">

              {/* JEWELRY */}
              {activeTab==='jewelry' && (
                <div className="rec-section">
                  <h3 className="rec-title">Jewelry Metals</h3>
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

                  <h3 className="rec-title mt">Jewelry Styles</h3>
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

              {/* CLOTHING */}
              {activeTab==='clothing' && (
                <div className="rec-section">
                  <h3 className="rec-title">Your Color Palette</h3>
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
                  <h3 className="rec-title">Lipstick Shades</h3>
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
                  <h3 className="rec-title">Blush Shades</h3>
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
                  <h3 className="rec-title">Eyeshadow Palette</h3>
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
                  <h3 className="rec-title">Hair Colors</h3>
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

        <div className="results-footer">✦ BeauKit AI — Your personalized beauty intelligence</div>
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
