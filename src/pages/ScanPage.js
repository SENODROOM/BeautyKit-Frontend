import React, { useState, useRef } from 'react';
import Ambient from '../components/Ambient';

export default function ScanPage({ user, setPage, setAuthMode, scanError, setScanError, analyzeImage, setCapturedImage, canvasRef }) {
  const [scanMode, setScanMode] = useState('upload');
  const [stream, setStream] = useState(null);
  const fileInputRef = useRef();
  const videoRef = useRef();

  function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      setCapturedImage(ev.target.result);
      analyzeImage(ev.target.result);
    };
    reader.readAsDataURL(file);
  }

  async function startCamera() {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      setStream(s);
      if (videoRef.current) videoRef.current.srcObject = s;
    } catch {
      setScanError('Camera access denied. Please use file upload.');
    }
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

  return (
    <div className="app">
      <Ambient />
      <nav className="nav">
        <span className="nav-brand">Beauty Kit</span>
        <div className="nav-actions">
          {user ? (
            <>
              <span className="nav-user">✦ {user.name}</span>
              <button className="btn-ghost small" onClick={() => setPage('dashboard')}>Dashboard</button>
            </>
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
          <button className={`mode-btn ${scanMode === 'upload' ? 'active' : ''}`} onClick={() => setScanMode('upload')}>Upload Photo</button>
          <button className={`mode-btn ${scanMode === 'camera' ? 'active' : ''}`} onClick={() => { setScanMode('camera'); startCamera(); }}>Live Camera</button>
        </div>
        {scanMode === 'upload' && (
          <div className="upload-zone" onClick={() => fileInputRef.current.click()}>
            <div className="upload-icon">⊕</div>
            <p className="upload-text">Click to upload your photo</p>
            <p className="upload-hint">JPG · PNG · WEBP  •  Natural light recommended</p>
            <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileUpload} />
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
}
