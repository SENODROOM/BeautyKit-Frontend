import React from 'react';
import Ambient from '../components/Ambient';
import HeroIllustration from '../components/HeroIllustration';


export default function LandingPage({ setPage, setAuthMode }) {
  return (
    <div className="app landing-app">
      <Ambient />
      <nav className="nav">
        <span className="nav-brand">Beauty Kit</span>
        <div className="nav-actions">
          <button className="btn-ghost" onClick={() => { setAuthMode('signin'); setPage('auth'); }}>Sign In</button>
          <button className="btn-primary" onClick={() => { setAuthMode('signup'); setPage('auth'); }}>Get Started</button>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-bg-grid" />
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-eyebrow"><span className="eyebrow-dot" />AI-Powered Beauty Intelligence</div>
            <h1 className="hero-headline">Discover the<br />Colors That<br /><em>Were Made</em><br />For You.</h1>
            <p className="hero-body">Beauty Kit reads your skin's unique undertone and depth, then builds a complete beauty profile — from metals that make you glow to the lip shade that turns heads.</p>
            <div className="hero-cta-row">
              <button className="cta-pill" onClick={() => { setAuthMode('signup'); setPage('auth'); }}>Begin Your Analysis<span className="cta-arrow">→</span></button>
              <button className="cta-ghost" onClick={() => setPage('scan')}>Try without account</button>
            </div>
            <div className="hero-stats">
              <div className="stat"><span className="stat-num">6</span><span className="stat-label">Beauty Categories</span></div>
              <div className="stat-div" />
              <div className="stat"><span className="stat-num">50+</span><span className="stat-label">Color Recommendations</span></div>
              <div className="stat-div" />
              <div className="stat"><span className="stat-num">12</span><span className="stat-label">Skin Tones</span></div>
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-avatar-frame">
              <div className="frame-ring frame-ring-1" /><div className="frame-ring frame-ring-2" />
              <div className="frame-corner fc-tl" /><div className="frame-corner fc-tr" />
              <div className="frame-corner fc-bl" /><div className="frame-corner fc-br" />
              <div className="hero-illus-inner"><HeroIllustration /></div>
              <div className="avatar-card avatar-card-1"><div className="avc-dot" style={{ background: '#FFD700' }} /><span>Gold Jewellery</span></div>
              <div className="avatar-card avatar-card-2"><div className="avc-dot" style={{ background: '#b83055' }} /><span>Berry Lip</span></div>
              <div className="avatar-card avatar-card-3"><div className="avc-dot" style={{ background: '#7b5ea7' }} /><span>Smoky Eyeshadow</span></div>
            </div>
          </div>
        </div>
        <div className="hero-scroll-hint"><div className="scroll-line" /><span>Discover More</span><div className="scroll-line" /></div>
      </section>

      <section className="features-section">
        <div className="features-inner">
          <div className="section-eyebrow">What Beauty Kit Gives You</div>
          <h2 className="section-headline">A Complete Beauty<br /><em>Transformation</em> — In Seconds.</h2>
          <p className="section-body">Six expertly curated categories, each with recommendations tailored precisely to your skin across 12 shade profiles.</p>
          <div className="feat-grid">
            {[
              { icon: '💎', title: 'Jewellery', sub: 'Metals, Styles & Gemstones', desc: 'Know exactly which metals make your skin radiate — gold, silver, rose gold — and which statement styles suit your aesthetic.' },
              { icon: '👗', title: 'Clothes', sub: 'Color Wheel · 16 Colors · 8 Styles', desc: 'A skin-matched interactive color wheel, full palette, style directions, fabrics and patterns.' },
              { icon: '💄', title: 'Lipstick', sub: '8 Shades with Finish & Vibe', desc: 'From bold velvet berries to peachy gloss nudes — each shade rated for finish and occasion vibe.' },
              { icon: '🌸', title: 'Blush', sub: 'Natural Airbrushed Blending', desc: 'Swept-cheekbone blush previews, not circles — the exact flush tones that make your cheekbones pop.' },
              { icon: '✨', title: 'Eyeshadow', sub: '8-Pan Custom Palette', desc: 'A complete eyeshadow palette built specifically for your undertone to create depth and dimension.' },
              { icon: '💇', title: 'Hair', sub: '9 Shades · Styles · Treatments', desc: 'Hair colors that frame your face beautifully, plus style suggestions and salon treatment recommendations.' },
            ].map((f, i) => (
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

      <section className="how-section">
        <div className="how-inner">
          <div className="section-eyebrow">Simple Process</div>
          <h2 className="section-headline">Three Steps to Your<br /><em>Perfect Palette.</em></h2>
          <div className="steps-row">
            {[
              { num: '01', title: 'Upload or Capture', desc: 'Take a photo in natural daylight or upload an existing image from your gallery.' },
              { num: '02', title: 'AI Analysis', desc: 'Our engine samples thousands of pixels, detecting undertone and depth via dermatology-standard color science.' },
              { num: '03', title: 'Explore & Save', desc: 'Browse 6 categories, preview colors on your real photo, save profiles anytime.' },
            ].map((s, i) => (
              <div key={i} className="step-card">
                <div className="step-num">{s.num}</div><div className="step-line" />
                <div className="step-title">{s.title}</div><div className="step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
          <div className="undertone-showcase">
            <div className="section-eyebrow" style={{ marginBottom: '2.5rem' }}>The Three Undertones</div>
            <div className="undertone-row">
              {[
                { label: 'Warm', tone: 'Golden Beige', skin: '#C89060', jewelry: 'Gold', cloth: 'Terracotta, Olive, Camel', lip: 'Coral & Brick', swatches: ['#FFD700', '#C65D3C', '#808000', '#C4922A'] },
                { label: 'Cool', tone: 'Fair Cool', skin: '#E8C4B0', jewelry: 'Silver', cloth: 'Navy, Lavender, Emerald', lip: 'Berry & Mauve', swatches: ['#C0C0C0', '#283593', '#B39DDB', '#800020'] },
                { label: 'Neutral', tone: 'Natural Beige', skin: '#D4A882', jewelry: 'Rose Gold', cloth: 'Dusty Rose, Sage, Teal', lip: 'Rose & Mauve', swatches: ['#B76E79', '#D4A5A5', '#8FBC8F', '#8B4513'] },
              ].map((u, i) => (
                <div key={i} className="undertone-card">
                  <div className="undertone-skin" style={{ background: u.skin }} />
                  <div className="undertone-label">{u.label}</div>
                  <div className="undertone-tone">{u.tone}</div>
                  <div className="undertone-details">
                    <div className="ud-row"><span className="ud-k">Jewellery</span><span>{u.jewelry}</span></div>
                    <div className="ud-row"><span className="ud-k">Colors</span><span>{u.cloth}</span></div>
                    <div className="ud-row"><span className="ud-k">Lips</span><span>{u.lip}</span></div>
                  </div>
                  <div className="undertone-swatches">{u.swatches.map((s, j) => <div key={j} className="ut-swatch" style={{ background: s }} />)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="avatar-feature-section">
        <div className="avatar-feature-inner">
          <div className="af-left">
            <div className="section-eyebrow">Live Preview</div>
            <h2 className="section-headline">Watch Your Look<br />Come to Life.</h2>
            <p className="section-body">Your scanned photo becomes the canvas. Blush sweeps naturally across your real cheekbones, lip color tints your actual lips, and our color wheel surfaces the clothing shades tuned to your exact skin tone.</p>
            <ul className="af-bullets">
              {['Real photo display with natural makeup overlays', 'Blush blends as a swept airbrushed cheekbone flush', 'Skin-matched clothing color wheel with 22 hues', '12 skin tone profiles with metals, lips, eyes & more'].map((b, i) => (
                <li key={i} className="af-bullet"><span className="bullet-check">✦</span>{b}</li>
              ))}
            </ul>
          </div>
          <div className="af-right">
            <div className="af-avatar-wrap">
              <div className="af-avatar-bg" />
              <HeroIllustration colors={{ skin: '#B08060', hair: '#1C1C1C', top: '#283593', lipstick: '#8B008B', blush: 'rgba(200,140,180,0.45)', eyeshadow: '#36454F', jewelry: '#C0C0C0', showNecklace: true, showEarrings: true, showRing: true }} />
              <div className="af-label">Cool undertone — Silver jewellery, Navy outfit, Berry lip</div>
            </div>
            <div className="af-avatar-wrap" style={{ marginTop: '1.5rem' }}>
              <div className="af-avatar-bg warm" />
              <HeroIllustration colors={{ skin: '#C8956C', hair: '#C4922A', top: '#808000', lipstick: '#FF6B5B', blush: 'rgba(255,160,100,0.4)', eyeshadow: '#CD7F32', jewelry: '#FFD700', showNecklace: true, showEarrings: true, showRing: true }} />
              <div className="af-label">Warm undertone — Gold jewellery, Olive outfit, Coral lip</div>
            </div>
          </div>
        </div>
      </section>

      <section className="final-cta-section">
        <div className="final-cta-inner">
          <div className="final-ornament">✦</div>
          <h2 className="final-headline">Your Most Flattering<br /><em>Colors Are Waiting.</em></h2>
          <p className="final-body">Join Beauty Kit and build a beauty profile that's uniquely, scientifically yours. Free to start. No guesswork required.</p>
          <div className="final-btns">
            <button className="cta-pill large" onClick={() => { setAuthMode('signup'); setPage('auth'); }}>Create Your Free Account<span className="cta-arrow">→</span></button>
            <button className="cta-ghost" onClick={() => setPage('scan')}>Scan Without Signing Up</button>
          </div>
        </div>
        <footer className="site-footer">
          <span className="footer-brand">Beauty Kit</span>
          <span className="footer-copy">Beauty intelligence, powered by science.</span>
        </footer>
      </section>
    </div>
  );
}
