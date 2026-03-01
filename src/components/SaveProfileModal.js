import React, { useState } from 'react';
import { apiFetch } from '../utils/api';

export default function SaveProfileModal({ onClose, results, capturedImage, loadProfiles }) {
  const [profileName, setProfileName] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);

  async function saveProfile() {
    if (!profileName.trim()) return;
    setSavingProfile(true);
    try {
      await apiFetch('/api/profiles', {
        method: 'POST',
        body: JSON.stringify({
          profileName: profileName.trim(),
          skinTone: results.skinTone,
          recommendations: results.recommendations,
          avatar: capturedImage
        })
      });
      await loadProfiles();
      onClose();
      setProfileName('');
    } catch (err) {
      alert(err.message);
    }
    setSavingProfile(false);
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h3 className="modal-title">Save This Profile</h3>
        <p className="modal-sub">Give this beauty profile a name to save it to your account.</p>
        <input className="modal-input" type="text" placeholder="e.g. Summer Look, Wedding Day..." value={profileName} onChange={e => setProfileName(e.target.value)} onKeyDown={e => e.key === 'Enter' && saveProfile()} autoFocus />
        <div className="modal-btns">
          <button className="btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={saveProfile} disabled={savingProfile}>{savingProfile ? 'Saving...' : 'Save Profile'}</button>
        </div>
      </div>
    </div>
  );
}
