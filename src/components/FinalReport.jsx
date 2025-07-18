import React from "react";
import './FinalReport.css';
import { 
  Target,
  BookOpen, 
  TrendingUp,
  Award,
  Users,
  Star,
  Globe,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign
} from "lucide-react";
import html2pdf from 'html2pdf.js';

const PieChart = ({ percentage, title, description }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
  
  return (
    <div className="fr-chart-card">
      <div className="fr-chart-title">{title}</div>
      <div className="fr-pie-chart">
        <svg viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="10"
          />
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="#6366f1"
            strokeWidth="10"
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
          />
        </svg>
        <div className="fr-pie-chart-label">{percentage}%</div>
      </div>
      <div className="fr-chart-desc">{description}</div>
    </div>
  );
};

const FinalReport = ({ userData }) => {
  userData = userData || {
    name: "Your Name",
    email: "your@email.com",
    country: "UK"
  };

  // Determine program and data based on country
  // Now: UK = MBA, USA = CS
  const isUK = (userData.country || '').toLowerCase() === 'uk';
  const program = isUK ? 'MBA' : 'Computer Science';
  const tableProgram = isUK ? 'UK Masters (MBA)' : 'USA Masters (CS)';

  // Alumni data
  const alumni = isUK ? [
    {
      name: "Amit Patel",
      details: [
        { label: "Undergrad", value: "B.Com, Mumbai University" },
        { label: "UK Degree", value: "MBA, London Business School (2022-24)" },
        { label: "Scholarship", value: "Dean's Scholarship (£20,000)" },
        { label: "Part-time earnings", value: "£12,000 (consulting intern)" },
        { label: "Loan Taken", value: "£40,000" },
        { label: "Current role", value: "Product Manager, Google UK" },
        { label: "Current salary", value: "£70,000/yr" },
        { label: "Loan repayment", value: "24 months" }
      ]
    },
    {
      name: "Sara Thomas",
      details: [
        { label: "Undergrad", value: "BBA, Christ University" },
        { label: "UK Degree", value: "MBA, Oxford Said (2021-23)" },
        { label: "Scholarship", value: "Said Fellowship (£25,000)" },
        { label: "Part-time earnings", value: "£10,000 (teaching assistant)" },
        { label: "Loan Taken", value: "£35,000" },
        { label: "Current role", value: "Strategy Analyst, Amazon UK" },
        { label: "Current salary", value: "£65,000/yr" },
        { label: "Loan repayment", value: "22 months" }
      ]
    },
    {
      name: "Rohan Gupta",
      details: [
        { label: "Undergrad", value: "B.E. Mechanical, VIT" },
        { label: "UK Degree", value: "MBA, Cambridge Judge (2020-22)" },
        { label: "Scholarship", value: "Merit Scholarship (£18,000)" },
        { label: "Part-time earnings", value: "£8,000 (research assistant)" },
        { label: "Loan Taken", value: "£45,000" },
        { label: "Current role", value: "Business Analyst, McKinsey UK" },
        { label: "Current salary", value: "£80,000/yr" },
        { label: "Loan repayment", value: "20 months" }
      ]
    }
  ] : [
    {
      name: "Arjun Mehta",
      details: [
        { label: "Undergrad", value: "B.Eng Electrical Engineering, IIT Madras" },
        { label: "US Degree", value: "MS Computer Science, MIT (2022-24)" },
        { label: "Scholarship", value: "20% tuition waiver (~$10,000)" },
        { label: "Part-time earnings", value: "$18,000 (teaching assistant)" },
        { label: "Loan Taken", value: "$60,000" },
        { label: "Current role", value: "Software Engineer, Google USA" },
        { label: "Current salary", value: "$120,000/yr" },
        { label: "Loan repayment", value: "18 months" }
      ]
    },
    {
      name: "Priya Singh",
      details: [
        { label: "Undergrad", value: "B.Tech Electrical Engineering, Delhi Technological University" },
        { label: "US Degree", value: "MS Data Science, Stanford (2021-23)" },
        { label: "Scholarship", value: "Stanford Fellowship ($15,000)" },
        { label: "Part-time earnings", value: "$15,000 (lab assistant)" },
        { label: "Loan Taken", value: "$55,000" },
        { label: "Current role", value: "Data Scientist, Amazon USA" },
        { label: "Current salary", value: "$110,000/yr" },
        { label: "Loan repayment", value: "24 months" }
      ]
    },
    {
      name: "Rahul Desai",
      details: [
        { label: "Undergrad", value: "B.Tech Electrical Engineering, NIT Trichy" },
        { label: "US Degree", value: "MS Artificial Intelligence, Carnegie Mellon (2020-22)" },
        { label: "Scholarship", value: "15% tuition waiver ($12,000)" },
        { label: "Part-time earnings", value: "$12,000 (graduate researcher)" },
        { label: "Loan Taken", value: "$65,000" },
        { label: "Current role", value: "ML Engineer, Meta USA" },
        { label: "Current salary", value: "$130,000/yr" },
        { label: "Loan repayment", value: "20 months" }
      ]
    }
  ];

  // Policy data
  const policies = isUK ? [
    {
      icon: <CheckCircle size={32} />,
      title: "Post-Study Work Visa Retained at Two Years",
      desc: "Despite proposals to cut the Graduate Route to six months, the UK government confirmed the two-year post-study work visa remains intact.",
      impact: "You get 24 months to find a sponsored role."
    },
    {
      icon: <Globe size={32} />,
      title: "India-UK Free Trade Agreement Benefits",
      desc: "The recently ratified FTA streamlines visa paperwork, mutual recognition of degrees, and eases social-security contributions for Indian students on internships.",
      impact: "Smoother job/intern transitions."
    },
    {
      icon: <AlertCircle size={32} />,
      title: "Dependant Visa Rules Tightened",
      desc: "From 1 Jan 2024, taught-master's students can no longer bring spouses or children on a Student Route visa.",
      impact: "Plan solo study or explore research tracks for dependants."
    }
  ] : [
    {
      icon: <CheckCircle size={32} />,
      title: "STEM OPT Extension Available",
      desc: "After your CS degree, you may be eligible for up to 3 years of work authorization in the US via OPT and STEM OPT.",
      impact: "You get more time to find a sponsored role."
    },
    {
      icon: <Globe size={32} />,
      title: "US-India Higher Ed Collaboration",
      desc: "Recent MoUs between US and Indian institutions make credit transfer and research collaboration easier.",
      impact: "More exchange and dual-degree opportunities."
    },
    {
      icon: <AlertCircle size={32} />,
      title: "H-1B Lottery Remains Competitive",
      desc: "Securing a work visa after graduation is still subject to the H-1B lottery and employer sponsorship.",
      impact: "Plan for multiple job applications and backup options."
    }
  ];

  const scholarships = [
    {
      name: "Chevening Scholarship",
      details: [
        "Full tuition fees + £18,000 living stipend + return airfare",
        "Success rate: 40%",
        "No. of Leap students claimed: 1200+"
      ]
    },
    {
      name: "Commonwealth Master's Scholarship",
      details: [
        "Full tuition + £1121/month maintenance allowance + travel to/from UK",
        "Success rate: 30%",
        "No. of Leap students claimed: 800+"
      ]
    },
    {
      name: "Edinburgh Global Research Scholarship",
      details: [
        "£12,000 contribution toward tuition",
        "Success rate: 60%",
        "No. of Leap students claimed: 4000+"
      ]
    }
  ];

  // Executive summary
  const executiveSummary = isUK
    ? "A 12-month UK MBA lets you build global business skills, leadership experience, and a powerful alumni network—while spending £40-60K all-in and repaying any loan within two years of landing your first job."
    : "A 24-month US master's in Computer Science lets you tap into the world’s top tech ecosystem, access high-paying roles, and build a global career—while investing $60-80K all-in and typically repaying your loan within 2-3 years of graduation.";

  // Five High-Impact Advantages
  const advantages = isUK
    ? [
        {
          icon: <Clock size={40} />,
          title: "1-Year MBA, 2-Year Value",
          desc: "Accelerated program, lower living costs, and faster return to the workforce."
        },
        {
          icon: <TrendingUp size={40} />,
          title: "Global Business Hub",
          desc: "London and UK cities offer access to top finance, consulting, and tech firms."
        },
        {
          icon: <BookOpen size={40} />,
          title: "Leadership & Soft Skills Focus",
          desc: "UK MBAs emphasize leadership, teamwork, and real-world business projects over standardized test scores."
        },
        {
          icon: <CheckCircle size={40} />,
          title: "High Visa & Job Success",
          desc: "Clear criteria plus robust pre-departure support give you a statistical advantage."
        },
        {
          icon: <DollarSign size={40} />,
          title: "£9-12/hr Part-Time Work",
          desc: "20hrs/week can offset a major chunk of living expenses."
        }
      ]
    : [
        {
          icon: <Clock size={40} />,
          title: "2-Year STEM Master's, Lifetime Value",
          desc: "Gain advanced tech skills, research experience, and a powerful alumni network."
        },
        {
          icon: <TrendingUp size={40} />,
          title: "H-1B & OPT Pathways",
          desc: "Up to 3 years of work authorization post-MS via OPT and STEM OPT extensions."
        },
        {
          icon: <BookOpen size={40} />,
          title: "GRE Flexibility",
          desc: "Many top US CS programs now offer test waivers or accept a broad range of scores."
        },
        {
          icon: <CheckCircle size={40} />,
          title: "Top Tech Recruiters",
          desc: "Access to FAANG, Fortune 500, and top startups in the US tech ecosystem."
        },
        {
          icon: <DollarSign size={40} />,
          title: "$20-30/hr Part-Time Work",
          desc: "On-campus jobs and internships help offset living expenses."
        }
      ];

  // Dynamic outlook section
  const outlook = isUK
    ? {
        admitChance: 85,
        postWork: "Post-MBA global business roles",
        salary: "£45-55K/year",
        roles: [
          "Management Consultant",
          "Product Manager",
          "Strategy Analyst",
          "Finance Associate",
          "Operations Manager"
        ],
        recruiters: [
          "McKinsey UK",
          "Amazon UK",
          "Barclays",
          "Google UK",
          "Unilever"
        ],
        expert: "A strong MBA profile boosts admission odds, and UK MBAs are highly valued by global employers."
      }
    : {
        admitChance: 85,
        postWork: "Post-graduation high-paying tech jobs",
        salary: "$90-120K/year",
        roles: [
          "Software Engineer",
          "Machine Learning Engineer",
          "Embedded Systems Developer",
          "DevOps/Site Reliability Engineer",
          "Cloud Solutions Architect"
        ],
        recruiters: [
          "Google USA",
          "Amazon USA",
          "Microsoft",
          "Meta",
          "Nvidia"
        ],
        expert: "A strong CS background boosts admission odds, and US CS roles are both in high demand and among the top-paid."
      };

  // Country-specific FAQs
  const faqs = isUK
    ? [
        {
          q: "Are there ample jobs post-MBA?",
          a: "Most MBA graduates land roles in consulting, tech, or finance—success correlates with networking, leadership, and project experience.",
          tip: "Leverage business school career services and alumni networks to secure internships and interviews early."
        },
        {
          q: "Are the living costs out of control?",
          a: "Costs vary significantly by city—places like Manchester or Glasgow can be 30–40% cheaper than London.",
          tip: "Share housing, cook in bulk, and use student discounts to stretch your budget."
        },
        {
          q: "Have the Visa and health-surcharge fees increased?",
          a: "While fees rose in 2024, early applications lock in lower rates, and some universities offer hardship grants.",
          tip: "Apply for your visa (and pay the Immigration Health Surcharge) as soon as your CAS arrives to minimize costs."
        },
        {
          q: "Can I get PR after graduation?",
          a: "Direct PR isn’t automatic—you must convert your Graduate Route visa into a Skilled Worker visa and work for five years before applying for Indefinite Leave to Remain (equivalent to PR).",
          tip: "Target employers on the Shortage Occupation List and focus on high-demand skills to increase sponsorship chances."
        }
      ]
    : [
        {
          q: "Are there ample jobs post-graduation?",
          a: "Most CS graduates land skilled tech roles—success correlates with project work, internships, and networking.",
          tip: "Build a strong GitHub/portfolio and use university career fairs to connect with recruiters."
        },
        {
          q: "Are the living costs out of control?",
          a: "Costs vary by city—Austin or Pittsburgh can be 30–40% cheaper than San Francisco or New York.",
          tip: "Share housing, cook in bulk, and use student discounts to stretch your budget."
        },
        {
          q: "Have the Visa and health-surcharge fees increased?",
          a: "While fees rose in 2024, early applications lock in lower rates, and some universities offer hardship grants.",
          tip: "Apply for your visa and pay the SEVIS fee as soon as your I-20 arrives to minimize costs."
        },
        {
          q: "Can I get a Green Card after graduation?",
          a: "Direct PR isn’t automatic—you must convert your OPT to an H-1B and work for several years before applying for a Green Card.",
          tip: "Target employers with strong immigration support and focus on high-demand tech skills."
        }
      ];

  return (
    <div className="fr-bg">
      <div className="fr-container">
        <div className="fr-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
            <div>
              <h1 className="fr-title">Study Abroad Final Report</h1>
              <p className="fr-subtitle">Personalized recommendations for your international education journey</p>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              <button 
                onClick={() => {
                  // Download PDF functionality
                  const element = document.querySelector('.fr-container');
                  const opt = {
                    margin: 1,
                    filename: `Study_Abroad_Report_${userData.name || 'User'}.pdf`,
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
                  };
                  
                  html2pdf().set(opt).from(element).save();
                }}
                style={{
                  background: '#443eff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 20px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 2px 8px rgba(68, 62, 255, 0.2)',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#3730a3'}
                onMouseOut={(e) => e.currentTarget.style.background = '#443eff'}
              >
                📄 Download Report
              </button>
              <button 
                onClick={() => {
                  // Book masterclass functionality
                  window.open('https://leapscholar.com/masterclass', '_blank');
                }}
                style={{
                  background: '#fff',
                  color: '#443eff',
                  border: '2px solid #443eff',
                  borderRadius: '8px',
                  padding: '12px 20px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#443eff';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = '#fff';
                  e.currentTarget.style.color = '#443eff';
                }}
              >
                🎓 Book a Masterclass
              </button>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="fr-section">
          <div className="fr-section-header">
            <Target size={24} />
              Executive Summary
          </div>
          <div className="fr-section-content">
            <div className="fr-executive-summary">
              {executiveSummary}
            </div>
          </div>
        </div>

        {/* Course Fit & Career Outlook */}
        <div className="fr-section fr-compact fr-fit-row">
          <div className="fr-section-header">
            <BookOpen size={24} />
            Course Fit & Career Outlook
          </div>
          <div className="fr-section-content">
            <div className="fr-outlook-grid">
              <PieChart 
                percentage={outlook.admitChance} 
                title="HIGH ADMIT CHANCES" 
                description="Relevance with Past Background"
              />
              <div className="fr-outlook-card">
                <div className="fr-outlook-title">HIGH POST WORK OPPORTUNITY</div>
                <div className="fr-outlook-value">{outlook.postWork}</div>
              </div>
              <div className="fr-outlook-card">
                <div className="fr-outlook-title">AVERAGE STARTING SALARY</div>
                <div className="fr-outlook-value fr-salary-highlight">{outlook.salary}</div>
              </div>
              <div className="fr-outlook-card">
                <div className="fr-outlook-title">Roles in Demand</div>
                <ul className="fr-roles-list">
                  {outlook.roles.map((role, idx) => <li key={idx}>{role}</li>)}
                </ul>
              </div>
              <div className="fr-outlook-card">
                <div className="fr-outlook-title">Top Recruiters</div>
                <ul className="fr-roles-list">
                  {outlook.recruiters.map((rec, idx) => <li key={idx}>{rec}</li>)}
                </ul>
              </div>
            </div>
            <div className="fr-expert">
              <strong>Expert take:</strong> {outlook.expert}
            </div>
          </div>
        </div>

        {/* Investment vs Return */}
        <div className="fr-section fr-compact">
          <div className="fr-section-header">
            <DollarSign size={24} />
            Investment vs. Return (₹, 5-Year Horizon)
          </div>
          <div className="fr-section-content">
            <table className="fr-table">
              <thead>
                <tr>
                  <th>Path</th>
                  <th>Upfront cost</th>
                  <th>Chances of Admission/Hiring</th>
                  <th>Growth Opportunities</th>
                  <th>Yr-1 Salary</th>
                  <th>Yr-5 Salary</th>
                  <th>5-Yr Corpus</th>
                  <th>Net Savings</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Continue in an Indian job</td>
                  <td>-</td>
                  <td>High</td>
                  <td>Low-moderate</td>
                  <td>₹ 3-6 L</td>
                  <td>₹ 10 - 15 L</td>
                  <td>₹ 0.4 - 0.6 Cr</td>
                  <td>₹ 15-20 Lakhs</td>
                </tr>
                <tr>
                  <td>Short upskilling course</td>
                  <td>₹2-3 Lakhs</td>
                  <td>High</td>
                  <td>Moderate</td>
                  <td>₹ 10 L</td>
                  <td>₹ 20 - 30 L</td>
                  <td>₹ 0.7 - 0.9 Cr</td>
                  <td>₹ 40-50 Lakhs</td>
                </tr>
                <tr>
                  <td>{isUK ? "MBA from Tier-1 college (IIM/ISB)" : "MTech from India"}</td>
                  <td>₹30L</td>
                  <td>Very low (&lt;5-10%)</td>
                  <td>Moderate-High</td>
                  <td>₹ 20-30 L</td>
                  <td>₹ 50 - 60 L</td>
                  <td>₹ 1.5 - 2 Cr</td>
                  <td>₹ 70-90 Lakhs</td>
                </tr>
                <tr className="fr-table-highlight">
                  <td>{tableProgram}</td>
                  <td>₹30-40 L (Tuition+living)</td>
                  <td>Moderate - High (&gt;70%)</td>
                  <td>Moderate-High</td>
                  <td>₹ 35-45 L</td>
                  <td>₹ 60 - 70 L</td>
                  <td>₹ 2 - 2.5 Cr</td>
                  <td>₹ 100-120 Lakhs</td>
                </tr>
              </tbody>
            </table>

            <div className="fr-section-header" style={{ background: 'transparent', color: '#10182f', padding: '1rem 0', fontSize: '1.2rem' }}>
              How You'll Fund It
            </div>
            
            <div className="fr-funding-grid">
              <div className="fr-funding-card">
                <div className="fr-funding-title">Expenses</div>
                <div className="fr-funding-item">Tuition cost: ~₹20-30 Lakhs</div>
                <div className="fr-funding-item">Living cost: ~₹10-12 Lakhs</div>
              </div>
              <div className="fr-funding-card">
                <div className="fr-funding-title">Savings (during course)</div>
                <div className="fr-funding-item">Scholarships (15-25% scholarships) = ~₹5 Lakhs</div>
                <div className="fr-funding-item">Part-time job earnings = ₹8-9 Lakhs</div>
              </div>
              <div className="fr-funding-card">
                <div className="fr-funding-title">Net Investment required</div>
                <div className="fr-funding-item">~15-20 Lakhs</div>
                <div className="fr-funding-item">• 90% of this amount can be taken up as Loan</div>
                <div className="fr-funding-item">• Average repayment duration for all our students is just 1.5-2 years post-graduation</div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Scholarships */}
        <div className="fr-section">
          <div className="fr-section-header">
            <Award size={24} />
            Key Scholarships
          </div>
          <div className="fr-section-content">
            <div className="fr-scholarships-grid">
              {scholarships.map((scholarship, index) => (
                <div key={index} className="fr-scholarship-card">
                  <div className="fr-scholarship-title">{scholarship.name}</div>
                  {scholarship.details.map((detail, idx) => (
                    <div key={idx} className="fr-scholarship-item">{detail}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Proven Alumni Trajectory */}
        <div className="fr-section">
          <div className="fr-section-header">
            <Users size={24} />
            Proven Alumni Trajectory
          </div>
          <div className="fr-section-content">
            <div className="fr-alumni-grid">
              {alumni.map((alum, index) => (
                <div key={index} className="fr-alumni-card">
                  <div className="fr-alumni-name">{alum.name}</div>
                  {alum.details.map((detail, idx) => (
                    <div key={idx} className="fr-alumni-detail">
                      <span className="fr-alumni-label">{detail.label}:</span> {detail.value}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Five High-Impact Advantages */}
        <div className="fr-section">
          <div className="fr-section-header">
            <Star size={24} />
            Five High-Impact Advantages
          </div>
          <div className="fr-section-content">
            <div className="fr-advantages-grid">
              {advantages.map((advantage, index) => (
                <div key={index} className="fr-advantage-card">
                  <div className="fr-advantage-icon">{advantage.icon}</div>
                  <div className="fr-advantage-title">{advantage.title}</div>
                  <div className="fr-advantage-desc">{advantage.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Policy Updates & Latest News Snapshot */}
        <div className="fr-section">
          <div className="fr-section-header">
            <Globe size={24} />
            Policy Updates & Latest News Snapshot
          </div>
          <div className="fr-section-content">
            <div className="fr-policies-grid">
              {policies.map((policy, index) => (
                <div key={index} className="fr-policy-card">
                  <div className="fr-policy-icon">{policy.icon}</div>
                  <div className="fr-policy-title">{policy.title}</div>
                  <div className="fr-policy-desc">{policy.desc}</div>
                  <div className="fr-impact">
                    <strong>Impact on you:</strong> {policy.impact}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Top Questions by Students - Answered */}
        <div className="fr-section">
          <div className="fr-section-header">
            <CheckCircle size={24} />
            Top Questions by Students - Answered
          </div>
          <div className="fr-section-content">
            <div className="fr-faq-grid">
              {faqs.map((faq, idx) => (
                <div className="fr-faq-card" key={idx}>
                  <div className="fr-faq-question">{faq.q}</div>
                  <div className="fr-faq-answer">{faq.a}</div>
                  <div className="fr-faq-tip"><b>Expert tip:</b> {faq.tip}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalReport; 
