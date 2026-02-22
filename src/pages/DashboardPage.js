import React from 'react';
import Ambient from '../components/Ambient';
import Avatar from '../components/Avatar';

export default function DashboardPage({ user, logout, setPage, profiles, loadProfile, deleteProfile }) {
  return (
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
                    blush: p.recommendations.blush[0]?.hex || '#E88070',
                    eyeshadow: p.recommendations.eyeshadow[0]?.hex || '#8B7355',
                    jewelry: p.recommendations.jewelry.metals[0]?.hex || '#FFD700'
                  }} />
                </div>
                <div className="profile-name">{p.profileName}</div>
                <div className="profile-tone">{p.skinTone.name}</div>
                <div className="profile-badges">
                  <span className="mini-badge">{p.skinTone.undertone}</span>
                  <span className="mini-badge">{p.skinTone.depth}</span>
                </div>
                <div className="profile-swatch" style={{ background: p.skinTone.hex }} />
                <button className="profile-delete" onClick={e => { e.stopPropagation(); deleteProfile(p.id); }}>✕</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
