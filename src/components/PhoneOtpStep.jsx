import React, { useState } from 'react';

function PhoneOtpStep({ visible, phone, otp, showOtpPopup, onPhoneSubmit, onOtpSubmit, onCloseOtpPopup }) {
  const [inputPhone, setInputPhone] = useState(phone || '');
  const [inputOtp, setInputOtp] = useState('');
  const [nonWhatsapp, setNonWhatsapp] = useState(false);

  if (!visible) return null;

  return (
    <div style={{ minHeight: '80vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'none' }}>
      <div className="question-card" style={{
        maxWidth: 420,
        width: '100%',
        background: '#fff',
        borderRadius: 32,
        boxShadow: '0 8px 32px rgba(74,144,226,0.10)',
        padding: '48px 32px 40px 32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0 auto',
        position: 'relative',
        gap: 0,
      }}>
        {!nonWhatsapp ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" style={{ width: 32, height: 32 }} />
              <h2 className="question-title" style={{ fontSize: 22, fontWeight: 800, textAlign: 'center', color: '#25D366', letterSpacing: '-0.01em', margin: 0 }}>
                Share your WhatsApp Number to receive your personalised Study Abroad Report
              </h2>
            </div>
            <div className="question-subtitle" style={{ fontSize: 16, color: '#888', marginBottom: 28, textAlign: 'center', fontWeight: 500 }}>Verify your WhatsApp Number</div>
            <form
              onSubmit={e => {
                e.preventDefault();
                if (inputPhone.length === 10 && /^\d+$/.test(inputPhone)) {
                  onPhoneSubmit(inputPhone);
                } else {
                  alert('Please enter a valid 10-digit phone number');
                }
              }}
              style={{ width: '100%', maxWidth: 340, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}
            >
              <div style={{ display: 'flex', alignItems: 'stretch', width: '100%', marginBottom: 24, background: '#f8f6f3', borderRadius: 18, boxShadow: '0 1px 4px rgba(74,144,226,0.04)', height: 52 }}>
                <span style={{ fontSize: 16, fontWeight: 600, background: '#eaf3fb', borderRadius: '18px 0 0 18px', padding: '0 14px', color: '#443eff', borderRight: '1px solid #e0e7ef', letterSpacing: 1, display: 'flex', alignItems: 'center', height: '100%' }}>+91</span>
                <input
                  type="tel"
                  value={inputPhone}
                  onChange={e => setInputPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="Enter your WhatsApp phone number"
                  style={{
                    width: '100%',
                    padding: '0 18px',
                    border: 'none',
                    borderRadius: '0 18px 18px 0',
                    fontSize: 18,
                    background: 'transparent',
                    color: '#222',
                    outline: 'none',
                    fontWeight: 500,
                    letterSpacing: 1,
                    transition: 'box-shadow 0.2s',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  maxLength={10}
                  required
                />
              </div>
              <button
                type="submit"
                style={{
                  background: '#25D366',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 999,
                  padding: '16px 0',
                  fontSize: 18,
                  fontWeight: 700,
                  cursor: 'pointer',
                  marginTop: 8,
                  width: '100%',
                  boxShadow: '0 4px 16px rgba(74,144,226,0.13)',
                  transition: 'background 0.2s',
                  letterSpacing: 1,
                }}
              >
                Send OTP
              </button>
            </form>
            <div style={{ marginTop: 18, textAlign: 'center', width: '100%' }}>
              <button
                type="button"
                onClick={() => setNonWhatsapp(true)}
                style={{
                  background: 'none',
                  color: '#443eff',
                  border: 'none',
                  fontSize: 15,
                  fontWeight: 600,
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  marginTop: 0,
                  width: '100%',
                  padding: 0,
                }}
              >
                Register with a non-WhatsApp phone number
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="question-title" style={{ fontSize: 22, fontWeight: 800, textAlign: 'center', color: '#443eff', letterSpacing: '-0.01em', marginBottom: 8 }}>
              Register with your phone number
            </h2>
            <div className="question-subtitle" style={{ fontSize: 16, color: '#888', marginBottom: 28, textAlign: 'center', fontWeight: 500 }}>Verify your phone number</div>
        <form
          onSubmit={e => {
            e.preventDefault();
            if (inputPhone.length === 10 && /^\d+$/.test(inputPhone)) {
              onPhoneSubmit(inputPhone);
            } else {
              alert('Please enter a valid 10-digit phone number');
            }
          }}
              style={{ width: '100%', maxWidth: 340, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}
        >
              <div style={{ display: 'flex', alignItems: 'stretch', width: '100%', marginBottom: 24, background: '#f8f6f3', borderRadius: 18, boxShadow: '0 1px 4px rgba(74,144,226,0.04)', height: 52 }}>
                <span style={{ fontSize: 16, fontWeight: 600, background: '#eaf3fb', borderRadius: '18px 0 0 18px', padding: '0 14px', color: '#443eff', borderRight: '1px solid #e0e7ef', letterSpacing: 1, display: 'flex', alignItems: 'center', height: '100%' }}>+91</span>
            <input
              type="tel"
              value={inputPhone}
              onChange={e => setInputPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="Enter your phone number"
              style={{
                width: '100%',
                    padding: '0 18px',
                border: 'none',
                    borderRadius: '0 18px 18px 0',
                    fontSize: 18,
                background: 'transparent',
                color: '#222',
                outline: 'none',
                fontWeight: 500,
                letterSpacing: 1,
                transition: 'box-shadow 0.2s',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
              }}
              maxLength={10}
              required
            />
          </div>
          <button
            type="submit"
            style={{
                  background: '#443eff',
              color: '#fff',
              border: 'none',
                  borderRadius: 999,
                  padding: '16px 0',
                  fontSize: 18,
              fontWeight: 700,
              cursor: 'pointer',
              marginTop: 8,
              width: '100%',
                  boxShadow: '0 4px 16px rgba(74,144,226,0.13)',
              transition: 'background 0.2s',
              letterSpacing: 1,
            }}
          >
            Send OTP
          </button>
        </form>
            <div style={{ marginTop: 18, textAlign: 'center', width: '100%' }}>
              <button
                type="button"
                onClick={() => setNonWhatsapp(false)}
                style={{
                  background: 'none',
                  color: '#25D366',
                  border: 'none',
                  fontSize: 15,
                  fontWeight: 600,
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  marginTop: 0,
                  width: '100%',
                  padding: 0,
                }}
              >
                Register with WhatsApp number
              </button>
            </div>
          </>
        )}
      </div>
      {/* OTP Popup/Modal */}
      {showOtpPopup && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(74,144,226,0.10)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          animation: 'fadeIn 0.3s',
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 32,
            boxShadow: '0 8px 32px rgba(74,144,226,0.13)',
            padding: '48px 36px 40px 36px',
            minWidth: 340,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            animation: 'bounceIn 0.5s',
            gap: 0,
          }}>
            <button
              onClick={onCloseOtpPopup}
              style={{
                position: 'absolute',
                top: 16,
                right: 20,
                background: 'none',
                border: 'none',
                fontSize: 26,
                color: '#aaa',
                cursor: 'pointer',
              }}
              aria-label="Close"
            >
              ×
            </button>
            <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 10, textAlign: 'center', color: '#443eff', letterSpacing: '-0.01em' }}>Enter OTP</h3>
            <div style={{ fontSize: 16, color: '#888', marginBottom: 24, textAlign: 'center', fontWeight: 500 }}>
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
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: 0 }}
            >
              <div style={{ display: 'flex', gap: 18, marginBottom: 28, justifyContent: 'center' }}>
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
                      width: 54,
                      height: 60,
                      fontSize: 28,
                      textAlign: 'center',
                      border: '2px solid #443eff',
                      borderRadius: 16,
                      background: '#f8f6f3',
                      outline: 'none',
                      fontWeight: 700,
                      color: '#443eff',
                      boxShadow: '0 2px 8px rgba(74,144,226,0.06)',
                      transition: 'border 0.2s',
                    }}
                  />
                ))}
              </div>
              <button
                type="submit"
                style={{
                  background: '#443eff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 999,
                  padding: '16px 0',
                  fontSize: 18,
                  fontWeight: 700,
                  cursor: 'pointer',
                  marginTop: 8,
                  width: '100%',
                  boxShadow: '0 4px 16px rgba(74,144,226,0.13)',
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