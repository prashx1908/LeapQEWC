import React, { useState } from 'react';

export default function ContactDetailsStep({ onSubmit, initialDetails = {} }) {
  const [name, setName] = useState(initialDetails.name || '');
  const [email, setEmail] = useState(initialDetails.email || '');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({ name: name.trim(), email: email.trim() });
    }
  };

  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        background: '#fff',
        borderRadius: 28,
        boxShadow: '0 8px 32px rgba(99,102,241,0.13)',
        maxWidth: 480,
        width: '100%',
        padding: '48px 36px 36px 36px',
        margin: '0 auto',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: '#1e293b', marginBottom: 10, letterSpacing: 0.2 }}>
          Almost there! Let's get your details
        </h2>
        <div style={{ color: '#374151', fontSize: 17, marginBottom: 32, fontWeight: 500 }}>
          We'll use this to send you your personalized study abroad report
        </div>
        
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Name Input */}
          <div style={{ textAlign: 'left' }}>
            <label style={{ 
              display: 'block', 
              fontSize: 16, 
              fontWeight: 600, 
              color: '#374151', 
              marginBottom: 8 
            }}>
              Full Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              style={{
                width: '100%',
                padding: '16px 18px',
                border: errors.name ? '2px solid #dc2626' : '2px solid #e5e7eb',
                borderRadius: 12,
                fontSize: 16,
                background: '#f9fafb',
                color: '#1e293b',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s',
              }}
            />
            {errors.name && (
              <div style={{ color: '#dc2626', fontSize: 14, marginTop: 6, fontWeight: 500 }}>
                {errors.name}
              </div>
            )}
          </div>

          {/* Email Input */}
          <div style={{ textAlign: 'left' }}>
            <label style={{ 
              display: 'block', 
              fontSize: 16, 
              fontWeight: 600, 
              color: '#374151', 
              marginBottom: 8 
            }}>
              Email Address *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              style={{
                width: '100%',
                padding: '16px 18px',
                border: errors.email ? '2px solid #dc2626' : '2px solid #e5e7eb',
                borderRadius: 12,
                fontSize: 16,
                background: '#f9fafb',
                color: '#1e293b',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s',
              }}
            />
            {errors.email && (
              <div style={{ color: '#dc2626', fontSize: 14, marginTop: 6, fontWeight: 500 }}>
                {errors.email}
              </div>
            )}
          </div>
        </div>

        <div style={{ marginTop: 32, width: '100%' }}>
          <button
            onClick={handleSubmit}
            style={{
              width: '100%',
              background: 'linear-gradient(90deg, #6366f1 0%, #a78bfa 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              padding: '16px 0',
              fontSize: 17,
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(99,102,241,0.08)',
              transition: 'background 0.2s',
              letterSpacing: 1,
            }}
          >
            Get My Report
          </button>
        </div>

        <div style={{ 
          background: '#f0f9ff', 
          color: '#0369a1', 
          padding: '16px 20px', 
          borderRadius: 12, 
          margin: '24px 0 0 0',
          fontSize: 15,
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          textAlign: 'left'
        }}>
          <span style={{ fontSize: 20 }}>🔒</span>
          Your information is secure and will only be used to send your personalized report
        </div>
      </div>
    </div>
  );
} 