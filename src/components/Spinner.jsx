import React from 'react';

const spinnerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  minHeight: 80,
};

const circleStyle = {
  width: 48,
  height: 48,
  border: '6px solid #e0e7ef',
  borderTop: '6px solid #443eff',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
};

// Add keyframes to the document head if not already present
if (typeof window !== 'undefined' && !document.getElementById('spinner-keyframes')) {
  const style = document.createElement('style');
  style.id = 'spinner-keyframes';
  style.innerHTML = `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
  document.head.appendChild(style);
}

const Spinner = () => (
  <div style={spinnerStyle} aria-label="Loading">
    <div style={circleStyle}></div>
  </div>
);

export default Spinner; 