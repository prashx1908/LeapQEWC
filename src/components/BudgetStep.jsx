import React, { useState } from 'react';

const countryComparison = [
  { code: 'usa', flag: '🇺🇸', country: 'USA', budget: '₹35L+', roi: 'High', speciality: 'Top Tech & Business, Global Careers', min: 35 },
  { code: 'canada', flag: '🇨🇦', country: 'Canada', budget: '₹15L - ₹25L', roi: 'High', speciality: 'Easy PR, High ROI', min: 15 },
  { code: 'uk', flag: '🇬🇧', country: 'UK', budget: '₹15L - ₹25L', roi: 'High', speciality: 'Global Recognition, 2yr Work Permit', min: 15 },
  { code: 'ireland', flag: '🇮🇪', country: 'Ireland', budget: '₹15L - ₹20L', roi: 'Very High', speciality: 'EU Access, Tech Hub', min: 15 },
  { code: 'newzealand', flag: '🇳🇿', country: 'New Zealand', budget: '₹15L - ₹20L', roi: 'Good', speciality: 'Quality of Life, 3yr Work Permit', min: 15 },
  { code: 'germany', flag: '🇩🇪', country: 'Germany', budget: '₹15L - ₹18L', roi: 'Excellent', speciality: 'Low/No Tuition, Research', min: 15 },
  { code: 'australia', flag: '🇦🇺', country: 'Australia', budget: '₹18L - ₹28L', roi: 'High', speciality: 'Post-Study Work, PR Path', min: 15 },
  { code: 'france', flag: '🇫🇷', country: 'France', budget: '₹15L - ₹18L', roi: 'Good', speciality: 'Affordable Tuition, Culture', min: 15 },
  { code: 'netherlands', flag: '🇳🇱', country: 'Netherlands', budget: '₹15L - ₹22L', roi: 'High', speciality: 'Innovation Hub', min: 15 },
  { code: 'sweden', flag: '🇸🇪', country: 'Sweden', budget: '₹15L - ₹20L', roi: 'Good', speciality: 'Research Focus', min: 15 },
  { code: 'denmark', flag: '🇩🇰', country: 'Denmark', budget: '₹15L - ₹22L', roi: 'Good', speciality: 'Quality of Life', min: 15 },
  { code: 'italy', flag: '🇮🇹', country: 'Italy', budget: '₹15L', roi: 'Good', speciality: 'Low Tuition', min: 15 },
  { code: 'spain', flag: '🇪🇸', country: 'Spain', budget: '₹15L - ₹16L', roi: 'Good', speciality: 'Cultural Experience', min: 15 },
  { code: 'singapore', flag: '🇸🇬', country: 'Singapore', budget: '₹20L - ₹30L', roi: 'High', speciality: 'Asian Business Hub', min: 15 },
  { code: 'switzerland', flag: '🇨🇭', country: 'Switzerland', budget: '₹22L - ₹35L', roi: 'Excellent', speciality: 'Top Hospitality', min: 15 },
];

function filterCountriesByBacklog(backlogCount) {
  if (backlogCount > 15) {
    return [];
  }
  return countryComparison.filter(row => {
    if (row.code === 'usa' && backlogCount > 10) return false;
    if (row.code === 'canada' && backlogCount > 10) return false;
    if (row.code === 'ireland' && backlogCount > 7) return false;
    if (row.code === 'newzealand' && backlogCount > 8) return false;
    return true;
  });
}

function getCountryEligibility(backlogCount) {
  if (backlogCount > 15) {
    return countryComparison.map(c => ({ ...c, isEligible: false, reason: 'More than 15 backlogs' }));
  }
  return countryComparison.map(row => {
    if (row.code === 'usa' && backlogCount > 10) return { ...row, isEligible: false, reason: '>10 Backlogs' };
    if (row.code === 'canada' && backlogCount > 10) return { ...row, isEligible: false, reason: '>10 Backlogs' };
    if (row.code === 'ireland' && backlogCount > 7) return { ...row, isEligible: false, reason: '>7 Backlogs' };
    if (row.code === 'newzealand' && backlogCount > 8) return { ...row, isEligible: false, reason: '>8 Backlogs' };
    return { ...row, isEligible: true, reason: '' };
  });
}

const BudgetStep = ({ country, backlogCount = 0, onBudgetSelected }) => {
  const [selected, setSelected] = useState(null);
  const [showSorry, setShowSorry] = useState(false);
  const [showComparison, setShowComparison] = useState(country === 'any');
  const [showUsaExploreModal, setShowUsaExploreModal] = useState(false);

  // Special flow for open to any country
  if (country === 'any') {
    // Backlog logic
    if (backlogCount > 15) {
      return (
        <Modal large onClose={() => {}}>
          <div style={{ fontWeight: 800, fontSize: 24, color: '#dc2626', marginBottom: 18 }}>Disqualified for all countries</div>
          <div style={{ color: '#374151', fontSize: 18, fontWeight: 500 }}>Sorry, with more than 15 backlogs, you are not eligible for any country in our list.</div>
        </Modal>
      );
    }
    const eligibleCountries = filterCountriesByBacklog(backlogCount);
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: '#fff', borderRadius: 28, boxShadow: '0 8px 32px rgba(99,102,241,0.13)', maxWidth: 700, width: '100%', padding: '48px 36px 36px 36px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: '#1e293b', marginBottom: 10, letterSpacing: 0.2 }}>What is your planned investment range for tuition fees <span style={{ fontWeight: 600, color: '#6366f1' }}>(excluding living expenses)</span></h2>
          <div style={{ background: '#e0f2fe', color: '#0c4a6e', borderRadius: 12, padding: '14px 18px', fontSize: 16, margin: '22px 0 32px 0', textAlign: 'left', fontWeight: 500, boxShadow: '0 2px 8px #38bdf833' }}>
            <b>💡 Why we ask this:</b> To help you understand realistic budgets and make the best choice for your study abroad journey.
          </div>
          {showComparison && (
            <Modal onClose={() => setShowComparison(false)} large>
              <div style={{ fontWeight: 800, fontSize: 22, color: '#1e293b', marginBottom: 18 }}>Compare Countries & Budgets</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center', maxHeight: '60vh', overflowY: 'auto' }}>
                {eligibleCountries.map(row => (
                  <CountryCard key={row.code} {...row} />
                ))}
              </div>
              <button className="primary-btn" style={{ marginTop: 28 }} onClick={() => setShowComparison(false)}>Choose Budget Range</button>
            </Modal>
          )}
          {!showComparison && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 22, width: '100%' }}>
              <BudgetCard
                icon="👑"
                title="Can invest a minimum of ₹35L"
                subtitle="Access to top universities in USA and other top destinations"
                selected={selected === '35L'}
                onClick={() => { setSelected('35L'); onBudgetSelected && onBudgetSelected('35L'); }}
              />
              <BudgetCard
                icon="✅"
                title="Can invest a minimum of ₹15L"
                subtitle="Access to good universities in UK, Ireland, Canada, etc."
                selected={selected === '15L'}
                onClick={() => { setSelected('15L'); setShowUsaExploreModal(true); }}
              />
              <BudgetCard
                icon="ℹ️"
                title="Cannot invest a minimum of ₹15L"
                subtitle="Currently, we require a minimum investment of ₹15L for any country"
                selected={selected === 'cannot15'}
                onClick={() => { setSelected('cannot15'); setShowSorry(true); }}
              />
            </div>
          )}
        </div>
        {/* USA Explore Other Countries Modal */}
        {showUsaExploreModal && (
          <Modal onClose={() => setShowUsaExploreModal(false)} large>
            <div style={{ fontWeight: 800, fontSize: 22, color: '#1e293b', marginBottom: 12 }}>Explore Other Countries</div>
            <div style={{ color: '#374151', fontSize: 17, marginBottom: 22, fontWeight: 500 }}>
              An investment of at least ₹35L is recommended for USA. With a ₹15L budget, you can explore these other great countries.
            </div>

            {console.log('Country eligibility:', getCountryEligibility(backlogCount))}
            <div style={{ maxHeight: '50vh', overflowY: 'auto', padding: '10px 0' }}>
              <div style={{ fontWeight: 700, fontSize: 18, color: '#1e293b', marginBottom: 18, textAlign: 'left', borderBottom: '2px solid #e5e7eb', paddingBottom: 8 }}>Available Countries for You</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
                {getCountryEligibility(backlogCount).filter(c => c.isEligible && c.code !== 'usa').length === 0 ? (
                  <div style={{ color: '#64748b', fontSize: 16, margin: '24px 0' }}>No eligible countries available for your profile.</div>
                ) : (
                  getCountryEligibility(backlogCount).filter(c => c.isEligible && c.code !== 'usa').map(row => (
                    <CountryCard key={row.code} {...row} />
                  ))
                )}
              </div>

              <div style={{ fontWeight: 700, fontSize: 18, color: '#475569', margin: '32px 0 18px 0', textAlign: 'left', borderBottom: '2px solid #e5e7eb', paddingBottom: 8 }}>Unavailable due to Backlogs</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
                {getCountryEligibility(backlogCount).filter(c => !c.isEligible).length === 0 ? (
                  <div style={{ color: '#64748b', fontSize: 16, margin: '24px 0' }}>No ineligible countries for your profile.</div>
                ) : (
                  getCountryEligibility(backlogCount).filter(c => !c.isEligible).map(row => (
                    <DisabledCountryCard key={row.code} {...row} />
                  ))
                )}
              </div>
            </div>

            <div style={{ marginTop: 28, display: 'flex', justifyContent: 'center', gap: 16 }}>
              <button
                className="secondary-btn"
                onClick={() => {
                  setShowUsaExploreModal(false);
                  setSelected('35L');
                  onBudgetSelected && onBudgetSelected('35L');
                }}
              >
                Go back and select ₹35L for USA
              </button>
              <button
                className="primary-btn"
                onClick={() => {
                  setShowUsaExploreModal(false);
                  onBudgetSelected && onBudgetSelected('15L');
                }}
              >
                Continue with ₹15L for other countries
              </button>
            </div>
          </Modal>
        )}
        {/* Sorry popup */}
        {showSorry && (
          <Modal onClose={() => setShowSorry(false)}>
            <div style={{ fontSize: 54, marginBottom: 20 }}>😔</div>
            <div style={{ fontWeight: 800, fontSize: 22, color: '#1e293b', marginBottom: 12 }}>We're Sorry</div>
            <div style={{ color: '#374151', fontSize: 17, marginBottom: 18, fontWeight: 500 }}>
              Sorry, we require a minimum investment of ₹15L for any country.
            </div>
            <div style={{ color: '#64748b', fontSize: 15, marginBottom: 30 }}>
              If you can stretch your budget, you can access our flow for other countries.
            </div>
            <button onClick={() => setShowSorry(false)} className="primary-btn">Close</button>
          </Modal>
        )}
      </div>
    );
  }

  // USA logic
  if (country === 'usa') {
    if (backlogCount > 10) {
      return (
        <Modal onClose={() => {}}>
          <div style={{ fontWeight: 800, fontSize: 24, color: '#dc2626', marginBottom: 18 }}>Not Eligible for USA</div>
          <div style={{ color: '#374151', fontSize: 18, fontWeight: 500 }}>
            Based on your academic details, you are not eligible for USA universities (more than 10 backlogs).
          </div>
        </Modal>
      );
    }
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none' }}>
        <div style={{ background: '#fff', borderRadius: 28, boxShadow: '0 8px 32px rgba(99,102,241,0.13)', maxWidth: 480, width: '100%', padding: '48px 36px 36px 36px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: '#1e293b', marginBottom: 10, letterSpacing: 0.2 }}>What is your planned investment range for tuition fees <span style={{ fontWeight: 600, color: '#6366f1' }}>(excluding living expenses)</span></h2>
          <div style={{ background: '#e0f2fe', color: '#0c4a6e', borderRadius: 12, padding: '14px 18px', fontSize: 16, margin: '22px 0 32px 0', textAlign: 'left', fontWeight: 500, boxShadow: '0 2px 8px #38bdf833' }}>
            <b>💡 Why we ask this:</b> To understand your investment plan for your education abroad. This will help us suggest the best options for you.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22, width: '100%' }}>
            <BudgetCard
              icon="✅"
              title="Can invest minimum ₹35L"
              subtitle="Access to top universities in USA"
              selected={selected === '35L'}
              onClick={() => { setSelected('35L'); onBudgetSelected && onBudgetSelected('35L'); }}
            />
            <BudgetCard
              icon="✅"
              title="Can invest minimum ₹15L"
              subtitle="Access to good universities in UK, IRELAND, CANADA"
              selected={selected === '15L'}
              onClick={() => { setSelected('15L'); setShowUsaExploreModal(true); }}
            />
            <BudgetCard
              icon="ℹ️"
              title="Cannot invest minimum ₹15L"
              subtitle="Let's explore other countries"
              selected={selected === 'cannot15'}
              onClick={() => { setSelected('cannot15'); setShowSorry(true); }}
            />
          </div>
        </div>
        {/* USA Explore Other Countries Modal */}
        {showUsaExploreModal && (
          <Modal onClose={() => setShowUsaExploreModal(false)} large>
            <div style={{ fontWeight: 800, fontSize: 22, color: '#1e293b', marginBottom: 12 }}>Explore Other Countries</div>
            <div style={{ color: '#374151', fontSize: 17, marginBottom: 22, fontWeight: 500 }}>
              An investment of at least ₹35L is recommended for USA. With a ₹15L budget, you can explore these other great countries.
            </div>

            {console.log('Country eligibility:', getCountryEligibility(backlogCount))}
            <div style={{ maxHeight: '50vh', overflowY: 'auto', padding: '10px 0' }}>
              <div style={{ fontWeight: 700, fontSize: 18, color: '#1e293b', marginBottom: 18, textAlign: 'left', borderBottom: '2px solid #e5e7eb', paddingBottom: 8 }}>Available Countries for You</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
                {getCountryEligibility(backlogCount).filter(c => c.isEligible && c.code !== 'usa').length === 0 ? (
                  <div style={{ color: '#64748b', fontSize: 16, margin: '24px 0' }}>No eligible countries available for your profile.</div>
                ) : (
                  getCountryEligibility(backlogCount).filter(c => c.isEligible && c.code !== 'usa').map(row => (
                    <CountryCard key={row.code} {...row} />
                  ))
                )}
              </div>

              <div style={{ fontWeight: 700, fontSize: 18, color: '#475569', margin: '32px 0 18px 0', textAlign: 'left', borderBottom: '2px solid #e5e7eb', paddingBottom: 8 }}>Unavailable due to Backlogs</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
                {getCountryEligibility(backlogCount).filter(c => !c.isEligible).length === 0 ? (
                  <div style={{ color: '#64748b', fontSize: 16, margin: '24px 0' }}>No ineligible countries for your profile.</div>
                ) : (
                  getCountryEligibility(backlogCount).filter(c => !c.isEligible).map(row => (
                    <DisabledCountryCard key={row.code} {...row} />
                  ))
                )}
              </div>
            </div>

            <div style={{ marginTop: 28, display: 'flex', justifyContent: 'center', gap: 16 }}>
              <button
                className="secondary-btn"
                onClick={() => {
                  setShowUsaExploreModal(false);
                  setSelected('35L');
                  onBudgetSelected && onBudgetSelected('35L');
                }}
              >
                Go back and select ₹35L for USA
              </button>
              <button
                className="primary-btn"
                onClick={() => {
                  setShowUsaExploreModal(false);
                  onBudgetSelected && onBudgetSelected('15L');
                }}
              >
                Continue with ₹15L for other countries
              </button>
            </div>
          </Modal>
        )}
        {/* Sorry popup */}
        {showSorry && (
          <Modal onClose={() => setShowSorry(false)}>
            <div style={{ fontSize: 54, marginBottom: 20 }}>😔</div>
            <div style={{ fontWeight: 800, fontSize: 22, color: '#1e293b', marginBottom: 12 }}>We're Sorry</div>
            <div style={{ color: '#374151', fontSize: 17, marginBottom: 18, fontWeight: 500 }}>
              We are unable to serve your purpose at this time.
            </div>
            <div style={{ color: '#64748b', fontSize: 15, marginBottom: 30 }}>
              Our current programs require a minimum investment that matches your selected budget range.
            </div>
            <button onClick={() => setShowSorry(false)} className="primary-btn">Close</button>
          </Modal>
        )}
      </div>
    );
  }

  // Not sure or open to any country: render nothing or a placeholder
  if (country === 'not-sure') {
    return null; // Or a placeholder if needed
  }

  // All other countries: show two options
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 28, boxShadow: '0 8px 32px rgba(99,102,241,0.13)', maxWidth: 480, width: '100%', padding: '48px 36px 36px 36px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: '#1e293b', marginBottom: 10, letterSpacing: 0.2 }}>What is your planned investment range for tuition fees <span style={{ fontWeight: 600, color: '#6366f1' }}>(excluding living expenses)</span></h2>
        <div style={{ background: '#e0f2fe', color: '#0c4a6e', borderRadius: 12, padding: '14px 18px', fontSize: 16, margin: '22px 0 32px 0', textAlign: 'left', fontWeight: 500, boxShadow: '0 2px 8px #38bdf833' }}>
          <b>💡 Why we ask this:</b> To understand your investment plan for your education abroad. This will help us suggest the best options for you.
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, width: '100%' }}>
          <BudgetCard
            icon="✅"
            title="Can invest minimum ₹15L"
            subtitle="Best options for quality education"
            selected={selected === '15L'}
            onClick={() => { setSelected('15L'); onBudgetSelected && onBudgetSelected('15L'); }}
          />
          <BudgetCard
            icon="ℹ️"
            title="Cannot invest minimum ₹15L"
            subtitle="Currently, we require a minimum investment of ₹15L"
            selected={selected === 'cannot15'}
            onClick={() => { setSelected('cannot15'); setShowSorry(true); }}
          />
        </div>
      </div>
      {/* Sorry popup */}
      {showSorry && (
        <Modal onClose={() => setShowSorry(false)}>
          <div style={{ fontSize: 54, marginBottom: 20 }}>😔</div>
          <div style={{ fontWeight: 800, fontSize: 22, color: '#1e293b', marginBottom: 12 }}>We're Sorry</div>
          <div style={{ color: '#374151', fontSize: 17, marginBottom: 18, fontWeight: 500 }}>
            We are unable to serve your purpose at this time.
          </div>
          <div style={{ color: '#64748b', fontSize: 15, marginBottom: 30 }}>
            Our current programs require a minimum investment that matches your selected budget range.
          </div>
          <button onClick={() => setShowSorry(false)} className="primary-btn">Close</button>
        </Modal>
      )}
    </div>
  );
};

function CountryCard({ flag, country, budget, roi, speciality }) {
  return (
    <div style={{
      background: '#f8fafc',
      borderRadius: 16,
      padding: 22,
      minWidth: 220,
      maxWidth: 220,
      minHeight: 220,
      maxHeight: 220,
      boxSizing: 'border-box',
      boxShadow: '0 2px 8px #6366f111',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: 0,
      border: '2px solid #e0e7ff',
      justifyContent: 'center',
    }}>
      <div style={{ fontSize: 38, marginBottom: 8 }}>{flag}</div>
      <div style={{ fontWeight: 800, fontSize: 20, color: '#1e293b', marginBottom: 4 }}>{country}</div>
      <div style={{ color: '#6366f1', fontSize: 16, marginBottom: 2, fontWeight: 700 }}>{budget}</div>
      <div style={{ color: '#0c4a6e', fontSize: 15, marginBottom: 2, fontWeight: 600 }}>ROI: {roi}</div>
      <div style={{ color: '#64748b', fontSize: 15, marginBottom: 8, textAlign: 'center' }}>{speciality}</div>
    </div>
  );
}

function DisabledCountryCard({ flag, country, reason }) {
  return (
    <div style={{
      background: '#f1f5f9',
      borderRadius: 16,
      padding: 22,
      minWidth: 220,
      maxWidth: 220,
      minHeight: 220,
      maxHeight: 220,
      boxSizing: 'border-box',
      border: '2px dashed #94a3b8',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: 0.7,
    }}>
      <div style={{ fontSize: 38, marginBottom: 8 }}>{flag}</div>
      <div style={{ fontWeight: 800, fontSize: 20, color: '#475569', marginBottom: 8 }}>{country}</div>
      <div style={{ color: '#dc2626', fontSize: 15, fontWeight: 600, textAlign: 'center', background: '#fee2e2', padding: '4px 8px', borderRadius: 6 }}>
        Ineligible: {reason}
      </div>
    </div>
  );
}

function BudgetCard({ icon, title, subtitle, selected, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: 'pointer',
        background: selected ? '#f3f4f6' : '#fff',
        border: selected ? '2.5px solid #6366f1' : '2px solid #e5e7eb',
        borderRadius: 18,
        padding: '28px 18px',
        textAlign: 'center',
        boxShadow: selected ? '0 4px 16px #6366f122' : '0 1px 4px #6366f111',
        transition: 'all 0.18s',
        fontSize: 18,
        fontWeight: 600,
        color: '#1e293b',
        outline: selected ? '2px solid #a78bfa' : 'none',
        marginBottom: 0,
        position: 'relative',
      }}
      className="budget-card"
    >
      <div style={{ fontSize: 28, marginBottom: 10 }}>{icon}</div>
      <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 6 }}>{title}</div>
      <div style={{ color: '#64748b', fontWeight: 500, fontSize: 16 }}>{subtitle}</div>
    </div>
  );
}

function Modal({ children, onClose, large }) {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0008', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}>
      <div style={{ background: '#fff', borderRadius: 22, maxWidth: large ? 900 : 420, width: large ? '95%' : '100%', padding: large ? 40 : 32, boxShadow: '0 8px 32px rgba(99,102,241,0.13)', textAlign: 'center', position: 'relative', transition: 'all 0.2s' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 18, right: 22, background: 'none', border: 'none', fontSize: 28, color: '#64748b', cursor: 'pointer' }}>×</button>
        {large ? (
          <div style={{ maxHeight: '70vh', overflowY: 'auto', paddingRight: 8 }}>
            {children}
          </div>
        ) : (
          children
        )}
      </div>
      <style>{`
        .primary-btn {
          background: linear-gradient(90deg, #6366f1 0%, #a78bfa 100%);
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 12px 24px;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          box-shadow: 0 2px 8px #6366f122;
          margin: 0 4px;
          transition: filter 0.18s, box-shadow 0.18s;
        }
        .primary-btn:hover {
          filter: brightness(1.08);
          box-shadow: 0 4px 16px #6366f144;
        }
      `}</style>
    </div>
  );
}

export default BudgetStep; 