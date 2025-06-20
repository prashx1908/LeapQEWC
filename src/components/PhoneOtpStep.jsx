import React, { useState } from 'react';

function PhoneOtpStep({ visible, phone, otp, showOtpPopup, onPhoneSubmit, onOtpSubmit, onCloseOtpPopup }) {
  const [inputPhone, setInputPhone] = useState(phone || '');
  const [inputOtp, setInputOtp] = useState('');

  if (!visible) return null;

  return (
    <div style={{ minHeight: '80vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div className="question-card" style={{
        maxWidth: 400,
        width: '100%',
        background: 'rgba(255,255,255,0.98)',
        borderRadius: 24,
        boxShadow: '0 8px 32px rgba(99,102,241,0.10)',
        padding: '36px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0 auto',
        position: 'relative',
      }}>
        <h2 className="question-title" style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, textAlign: 'center', color: '#3730a3' }}>Verify Your Phone Number</h2>
        <div className="question-subtitle" style={{ fontSize: 16, color: '#6366f1', marginBottom: 18, textAlign: 'center' }}>We'll send you a verification code</div>
        <form
          onSubmit={e => {
            e.preventDefault();
            if (inputPhone.length === 10 && /^\d+$/.test(inputPhone)) {
              onPhoneSubmit(inputPhone);
            } else {
              alert('Please enter a valid 10-digit phone number');
            }
          }}
          style={{ width: '100%', maxWidth: 340, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginBottom: 18, background: 'rgba(99,102,241,0.07)', borderRadius: 14, boxShadow: '0 1px 4px rgba(99,102,241,0.04)' }}>
            <span style={{ fontSize: 16, fontWeight: 600, background: 'rgba(99,102,241,0.10)', borderRadius: '14px 0 0 14px', padding: '14px 12px', color: '#6366f1', borderRight: '1px solid #e5e7eb', letterSpacing: 1 }}>+91</span>
            <input
              type="tel"
              value={inputPhone}
              onChange={e => setInputPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="Enter your phone number"
              style={{
                width: '100%',
                padding: '14px 16px',
                border: 'none',
                borderRadius: '0 14px 14px 0',
                fontSize: 17,
                background: 'transparent',
                color: '#222',
                outline: 'none',
                fontWeight: 500,
                letterSpacing: 1,
                transition: 'box-shadow 0.2s',
              }}
              maxLength={10}
              required
            />
          </div>
          <button
            type="submit"
            style={{
              background: 'linear-gradient(90deg, #6366f1 0%, #a78bfa 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              padding: '13px 0',
              fontSize: 17,
              fontWeight: 700,
              cursor: 'pointer',
              marginTop: 8,
              width: '100%',
              boxShadow: '0 2px 8px rgba(99,102,241,0.08)',
              transition: 'background 0.2s',
              letterSpacing: 1,
            }}
          >
            Send OTP
          </button>
        </form>
      </div>
      {/* OTP Popup/Modal */}
      {showOtpPopup && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(99,102,241,0.10)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          animation: 'fadeIn 0.3s',
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #fff 80%, #e0e7ff 100%)',
            borderRadius: 22,
            boxShadow: '0 8px 32px rgba(99,102,241,0.13)',
            padding: '38px 30px',
            minWidth: 320,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            animation: 'bounceIn 0.5s',
          }}>
            <button
              onClick={onCloseOtpPopup}
              style={{
                position: 'absolute',
                top: 12,
                right: 16,
                background: 'none',
                border: 'none',
                fontSize: 22,
                color: '#888',
                cursor: 'pointer',
              }}
              aria-label="Close"
            >
              ×
            </button>
            <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10, textAlign: 'center', color: '#3730a3' }}>Enter OTP</h3>
            <div style={{ fontSize: 15, color: '#6366f1', marginBottom: 18, textAlign: 'center' }}>
              Enter the 6-digit code sent to your phone
            </div>
            <form
              onSubmit={e => {
                e.preventDefault();
                if (inputOtp.length === 6) {
                  onOtpSubmit(inputOtp);
                  setInputOtp('');
                } else {
                  alert('Please enter a 6-digit OTP');
                }
              }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}
            >
              <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
                {[0,1,2,3,4,5].map(i => (
                  <input
                    key={i}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={inputOtp[i] || ''}
                    onChange={e => {
                      const val = e.target.value.replace(/\D/g, '');
                      if (!val) return;
                      const arr = inputOtp.split('');
                      arr[i] = val;
                      const newOtp = arr.join('').slice(0, 6);
                      setInputOtp(newOtp);
                      // Move to next input
                      const next = document.getElementById(`otp-input-${i+1}`);
                      if (next) next.focus();
                    }}
                    id={`otp-input-${i}`}
                    style={{
                      width: 44,
                      height: 54,
                      fontSize: 26,
                      textAlign: 'center',
                      border: '2px solid #e0e7ff',
                      borderRadius: 10,
                      background: '#f3f4f6',
                      outline: 'none',
                      fontWeight: 700,
                      color: '#3730a3',
                      boxShadow: '0 1px 4px rgba(99,102,241,0.06)',
                      transition: 'border 0.2s',
                    }}
                  />
                ))}
              </div>
              <button
                type="submit"
                style={{
                  background: 'linear-gradient(90deg, #6366f1 0%, #a78bfa 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 12,
                  padding: '13px 0',
                  fontSize: 17,
                  fontWeight: 700,
                  cursor: 'pointer',
                  marginTop: 8,
                  width: '100%',
                  boxShadow: '0 2px 8px rgba(99,102,241,0.08)',
                  transition: 'background 0.2s',
                  letterSpacing: 1,
                }}
              >
                Verify OTP
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PhoneOtpStep; 