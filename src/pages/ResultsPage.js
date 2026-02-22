import React, { useState } from 'react';
import Ambient from '../components/Ambient';
import HeroIllustration from '../components/HeroIllustration';
import ColorWheel from '../components/ColorWheel';
import SkinTonePanel from '../components/SkinTonePanel';
import SaveProfileModal from '../components/SaveProfileModal';
import { CATEGORIES } from '../data/constants';

export default function ResultsPage({ user, setPage, setAuthMode, results, capturedImage, loadProfiles }) {
  const [activeTab, setActiveTab] = useState('jewelry');
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [avatarColors, setAvatarColors] = useState({
    skin: results.skinTone.hex,
    hair: results.recommendations.hair.colors[0]?.hex || '#3B1F0A',
    top: results.recommendations.clothing.colors[0]?.hex || '#9b7fe8',
    lipstick: results.recommendations.lipstick[0]?.hex || '#C45C75',
    blush: results.recommendations.blush[0]?.hex || '#E88070',
    eyeshadow: results.recommendations.eyeshadow[0]?.hex || '#8B7355',
    jewelry: results.recommendations.jewelry.metals[0]?.hex || '#FFD700',
    showNecklace: true,
    showEarrings: true,
    showRing: true
  });

  const recs = results.recommendations;
  const skinUndertone = results.skinTone?.undertone || 'neutral';
  const skinHex = results.skinTone?.hex || '#C8956C';

  return (
    <div className="app results-app">
      <Ambient />

      {saveModalOpen && (
        <SaveProfileModal
          onClose={() => setSaveModalOpen(false)}
          results={results}
          capturedImage={capturedImage}
          loadProfiles={loadProfiles}
        />
      )}

      <div className="results-nav">
        <div className="results-nav-left">
          <button className="back-btn inline" onClick={() => setPage(user ? 'dashboard' : 'landing')}>← {user ? 'Dashboard' : 'Home'}</button>
          <span className="nav-brand">Beauty Kit</span>
        </div>
        <div className="results-cat-nav">
          {CATEGORIES.map(cat => (
            <button key={cat.id} className={`cat-nav-btn ${activeTab === cat.id ? 'active' : ''}`} onClick={() => setActiveTab(cat.id)}>
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

      <div className="results-layout">
        {/* LEFT PANEL — real photo + skin tone panel */}
        <div className="avatar-panel">
          <div className="avatar-panel-header">
            <div className="skin-swatch-display" style={{ background: skinHex }} />
            <div>
              <div className="skin-tone-label">Your Skin Tone</div>
              <div className="skin-tone-name">{results.skinTone.name}</div>
              <div className="skin-badges">
                <span className="badge">{results.skinTone.undertone}</span>
                <span className="badge">{results.skinTone.depth}</span>
              </div>
            </div>
          </div>

          {/* REAL PHOTO with natural CSS makeup overlays */}
          <div className="avatar-container">
  <div className="avatar-bg-glow" />
  <HeroIllustration colors={avatarColors} />
</div>

          <p className="avatar-hint">Tap any swatch below to preview on your photo →</p>

          <div className="avatar-controls">
            {[
              { label: 'Outfit', key: 'top', arr: recs.clothing.colors.slice(0, 8) },
              { label: 'Hair', key: 'hair', arr: recs.hair.colors.slice(0, 8) },
              { label: 'Lips', key: 'lipstick', arr: recs.lipstick.slice(0, 8) },
              { label: 'Blush', key: 'blush', arr: recs.blush.slice(0, 6) },
              { label: 'Eyes', key: 'eyeshadow', arr: recs.eyeshadow.slice(0, 8) },
              { label: 'Jewels', key: 'jewelry', arr: recs.jewelry.metals },
            ].map(({ label, key, arr }) => (
              <div key={key} className="avatar-control-row">
                <span className="ctrl-label">{label}</span>
                <div className="ctrl-swatches">
                  {arr.map((c, i) => (
                    <div key={i} className={`ctrl-swatch ${avatarColors[key] === c.hex ? 'selected' : ''}`}
                      style={{ background: c.hex }} title={c.name}
                      onClick={() => setAvatarColors(prev => ({ ...prev, [key]: c.hex }))} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 12 Skin Tone Panel */}
          <SkinTonePanel
            detectedHex={skinHex}
            onSelect={tone => setAvatarColors(prev => ({ ...prev, skin: tone.hex }))}
          />
        </div>

        {/* RIGHT PANEL — category content */}
        <div className="recs-panel">
          <div className="tab-content">

            {/* JEWELLERY */}
            {activeTab === 'jewelry' && (
              <div className="rec-section">
                <div className="rec-section-header"><span className="rec-section-icon">💎</span><h3 className="rec-title">Jewellery Metals</h3></div>
                <div className="metal-grid">
                  {recs.jewelry.metals.map((m, i) => (
                    <div key={i} className={`metal-card ${avatarColors.jewelry === m.hex ? 'active-metal' : ''}`} onClick={() => setAvatarColors(prev => ({ ...prev, jewelry: m.hex }))}>
                      <div className="metal-swatch" style={{ background: `linear-gradient(135deg,${m.hex},${m.hex}99)` }}><div className="metal-shine" /></div>
                      <div className="metal-name">{m.name}</div>
                      <div className="star-rating">{'★'.repeat(m.rating)}{'☆'.repeat(5 - m.rating)}</div>
                      <div className="metal-note">{m.note}</div>
                    </div>
                  ))}
                </div>
                <h3 className="rec-title mt">Jewellery Styles</h3>
                <div className="style-tags">{recs.jewelry.styles.map((s, i) => <span key={i} className="style-tag">{s}</span>)}</div>
                <h3 className="rec-title mt">Best Gemstones</h3>
                <div className="style-tags">{recs.jewelry.gemstones.map((g, i) => <span key={i} className="gem-tag">{g}</span>)}</div>
                <div className="avoid-box"><span className="avoid-label">Avoid</span>{recs.jewelry.avoid}</div>
              </div>
            )}

            {/* CLOTHES — with color wheel */}
            {activeTab === 'clothing' && (
              <div className="rec-section">
                <div className="rec-section-header"><span className="rec-section-icon">👗</span><h3 className="rec-title">Your Color Palette</h3></div>

                {/* Interactive skin-matched color wheel */}
                <ColorWheel
                  skinUndertone={skinUndertone}
                  skinHex={skinHex}
                  onColorSelect={(hex, name) => setAvatarColors(prev => ({ ...prev, top: hex }))}
                />

                <h3 className="rec-title mt" style={{ marginBottom: '1rem' }}>Full Color Palette</h3>
                <div className="color-palette-grid">
                  {recs.clothing.colors.map((c, i) => (
                    <div key={i} className={`palette-chip ${avatarColors.top === c.hex ? 'active-chip' : ''}`} onClick={() => setAvatarColors(prev => ({ ...prev, top: c.hex }))}>
                      <div className="palette-swatch" style={{ background: c.hex }} />
                      <div className="palette-name">{c.name}</div>
                      <div className="palette-cat">{c.category}</div>
                    </div>
                  ))}
                </div>
                <h3 className="rec-title mt">Clothing Styles</h3>
                <div className="style-tags">{recs.clothing.styles.map((s, i) => <span key={i} className="style-tag">{s}</span>)}</div>
                <h3 className="rec-title mt">Best Fabrics</h3>
                <div className="style-tags">{recs.clothing.fabrics.map((f, i) => <span key={i} className="fabric-tag">{f}</span>)}</div>
                <h3 className="rec-title mt">Best Patterns</h3>
                <div className="style-tags">{recs.clothing.patterns.map((p, i) => <span key={i} className="fabric-tag">{p}</span>)}</div>
                <div className="avoid-box"><span className="avoid-label">Avoid</span>{Array.isArray(recs.clothing.avoid) ? recs.clothing.avoid.join(', ') : recs.clothing.avoid}</div>
              </div>
            )}

            {/* LIPSTICK */}
            {activeTab === 'lipstick' && (
              <div className="rec-section">
                <div className="rec-section-header"><span className="rec-section-icon">💄</span><h3 className="rec-title">Lipstick Shades</h3></div>
                <div className="shade-grid">
                  {recs.lipstick.map((l, i) => (
                    <div key={i} className={`shade-card ${avatarColors.lipstick === l.hex ? 'active-shade' : ''}`} onClick={() => setAvatarColors(prev => ({ ...prev, lipstick: l.hex }))}>
                      <div className="shade-preview" style={{ background: `linear-gradient(180deg,${l.hex}cc,${l.hex})` }}><div className="shade-shine" /></div>
                      <div className="shade-name">{l.name}</div>
                      <div className="shade-meta"><span className="finish-tag">{l.finish}</span><span className="vibe-tag">{l.vibe}</span></div>
                      <div className="shade-hex">{l.hex}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* BLUSH — natural airbrushed sweep preview */}
            {activeTab === 'blush' && (
              <div className="rec-section">
                <div className="rec-section-header"><span className="rec-section-icon">🌸</span><h3 className="rec-title">Blush Shades</h3></div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '1.25rem', letterSpacing: '0.04em' }}>
                  Preview shows a natural airbrushed cheekbone sweep — not a circle. Select a shade to see it blend on your photo.
                </p>
                <div className="shade-grid">
                  {recs.blush.map((b, i) => (
                    <div key={i} className={`shade-card ${avatarColors.blush === b.hex ? 'active-shade' : ''}`} onClick={() => setAvatarColors(prev => ({ ...prev, blush: b.hex }))}>
                      {/* Natural blush sweep preview via CSS pseudo-elements */}
                      <div className="shade-preview blush-preview" style={{ '--bp': b.hex }} />
                      <div className="shade-name">{b.name}</div>
                      <div className="shade-meta"><span className="finish-tag">{b.finish}</span></div>
                      <div className="shade-hex">{b.hex}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* EYESHADOW */}
            {activeTab === 'eyeshadow' && (
              <div className="rec-section">
                <div className="rec-section-header"><span className="rec-section-icon">✨</span><h3 className="rec-title">Eyeshadow Palette</h3></div>
                <div className="eye-palette-display">
                  {recs.eyeshadow.map((e, i) => (
                    <div key={i} className={`eye-pan ${avatarColors.eyeshadow === e.hex ? 'active-eye' : ''}`} onClick={() => setAvatarColors(prev => ({ ...prev, eyeshadow: e.hex }))}>
                      <div className="eye-pan-color" style={{ background: e.hex }}><div className="eye-pan-shine" /></div>
                      <div className="eye-pan-name">{e.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* HAIR */}
            {activeTab === 'hair' && (
              <div className="rec-section">
                <div className="rec-section-header"><span className="rec-section-icon">💇</span><h3 className="rec-title">Hair Colors</h3></div>
                <div className="hair-grid">
                  {recs.hair.colors.map((h, i) => (
                    <div key={i} className={`hair-card ${avatarColors.hair === h.hex ? 'active-hair' : ''}`} onClick={() => setAvatarColors(prev => ({ ...prev, hair: h.hex }))}>
                      <div className="hair-swatch" style={{ background: `linear-gradient(180deg,${h.hex}88,${h.hex})` }} />
                      <div className="hair-name">{h.name}</div>
                      <div className="hair-level">{h.level}</div>
                    </div>
                  ))}
                </div>
                <h3 className="rec-title mt">Hair Styles</h3>
                <div className="style-tags">{recs.hair.styles.map((s, i) => <span key={i} className="style-tag">{s}</span>)}</div>
                <h3 className="rec-title mt">Treatments</h3>
                <div className="style-tags">{recs.hair.treatments.map((t, i) => <span key={i} className="fabric-tag">{t}</span>)}</div>
                <div className="avoid-box"><span className="avoid-label">Avoid</span>{recs.hair.avoid}</div>
              </div>
            )}

          </div>
        </div>
      </div>

      <div className="results-footer">✦ Beauty Kit AI — Your personalized beauty intelligence</div>
    </div>
  );
}
