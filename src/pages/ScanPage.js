import React, { useState, useRef } from 'react';
import Ambient from '../components/Ambient';
import ColorPicker from '../components/ColorPicker';
import { apiFetch } from '../utils/api';

export default function ScanPage({ user, setPage, setAuthMode, scanError, setScanError, analyzeImage, setCapturedImage, canvasRef, setResults }) {
  const [scanMode, setScanMode] = useState('upload');
  const [stream, setStream] = useState(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [tempImage, setTempImage] = useState(null);
  const fileInputRef = useRef();
  const videoRef = useRef();

  function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      setTempImage(ev.target.result);
      setShowColorPicker(true);
    };
    reader.readAsDataURL(file);
  }

  async function handleColorSelect({ color, skinTone }) {
    setShowColorPicker(false);
    setCapturedImage(tempImage);
    
    // Convert hex to RGB
    const r = parseInt(color.hex.slice(1, 3), 16);
    const g = parseInt(color.hex.slice(3, 5), 16);
    const b = parseInt(color.hex.slice(5, 7), 16);
    
    try {
      // Call backend to get full recommendations
      const data = await apiFetch('/api/analyze-pixels', {
        method: 'POST',
        body: JSON.stringify({ r, g, b })
      });
      
      // Merge backend response with detailed shades from constants
      const detailedRecs = buildRecommendationsFromSkinTone(skinTone, color.hex);
      
      setResults({
        skinTone: {
          ...data.skinTone,
          // Use the selected color hex instead of backend's calculated hex
          hex: color.hex
        },
        recommendations: {
          ...data.recommendations,
          // Override with detailed shades from constants if available
          lipstick: detailedRecs.lipstick,
          blush: detailedRecs.blush,
          eyeshadow: detailedRecs.eyeshadow,
          hair: {
            ...data.recommendations.hair,
            colors: detailedRecs.hair.colors
          }
        }
      });
    } catch (err) {
      // Fallback: build minimal results from skin tone
      setResults({
        skinTone: {
          name: skinTone.name,
          hex: color.hex,
          undertone: skinTone.undertone,
          depth: skinTone.depth
        },
        recommendations: buildRecommendationsFromSkinTone(skinTone, color.hex)
      });
    }
    setPage('results');
  }

  function buildRecommendationsFromSkinTone(skinTone, hex) {
    const isWarm = skinTone.undertone === 'Warm';
    const isCool = skinTone.undertone === 'Cool';
    
    return {
      jewelry: {
        metals: [
          { name: isWarm ? 'Gold' : 'Silver', hex: isWarm ? '#FFD700' : '#C0C0C0', rating: 5, note: 'Best match for your undertone' },
          { name: isWarm ? 'Rose Gold' : 'Platinum', hex: isWarm ? '#B76E79' : '#E5E4E2', rating: 4, note: 'Great alternative' },
          { name: isWarm ? 'Copper' : 'White Gold', hex: isWarm ? '#B87333' : '#F5F5F5', rating: 4, note: 'Stylish choice' },
          { name: 'Mixed Metals', hex: '#C0C0C0', rating: 3, note: 'Versatile option' }
        ],
        styles: ['Classic', 'Elegant', 'Modern', 'Statement'],
        gemstones: skinTone.swatches || ['#FFD700', '#C0C0C0', '#B76E79', '#50C878'],
        avoid: isWarm ? 'Silver tones' : 'Yellow gold'
      },
      clothing: {
        colors: (skinTone.swatches || []).map((c, i) => ({ name: `Color ${i+1}`, hex: c, category: 'Best' })),
        styles: ['Classic', 'Modern', 'Elegant', 'Casual'],
        fabrics: ['Cotton', 'Silk', 'Linen', 'Cashmere'],
        patterns: ['Solid', 'Subtle', 'Minimal', 'Textured'],
        avoid: skinTone.avoidColors ? skinTone.avoidColors.split(', ') : []
      },
      lipstick: skinTone.lipstick || [
        { name: isWarm ? 'Coral' : 'Berry', hex: isWarm ? '#FF6B4A' : '#8B1A3C', finish: 'Cream', vibe: 'Natural' },
        { name: isWarm ? 'Peach' : 'Rose', hex: isWarm ? '#FFDAB9' : '#C45C75', finish: 'Matte', vibe: 'Elegant' }
      ],
      blush: skinTone.blush || [
        { name: isWarm ? 'Apricot' : 'Pink', hex: isWarm ? '#FBCEB1' : '#FFB6C1', finish: 'Powder' }
      ],
      eyeshadow: skinTone.eyeshadow || [
        { name: 'Neutral', hex: isWarm ? '#D4A574' : '#9B8B7A' },
        { name: 'Accent', hex: isWarm ? '#8B4513' : '#6B5B95' }
      ],
      hair: {
        colors: skinTone.hair || [
          { name: 'Natural', hex: '#3B1F0A', level: 'Level 3' },
          { name: 'Highlight', hex: '#8B5A2B', level: 'Level 6' }
        ],
        styles: ['Natural', 'Soft waves', 'Sleek', 'Textured'],
        treatments: ['Moisturizing', 'Color protect', 'Deep conditioning'],
        avoid: 'Harsh bleaching'
      }
    };
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

        {showColorPicker && tempImage && (
          <ColorPicker
            imageSrc={tempImage}
            onColorSelect={handleColorSelect}
            onCancel={() => {
              setShowColorPicker(false);
              setTempImage(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
