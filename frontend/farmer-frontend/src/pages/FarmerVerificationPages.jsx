import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CaretLeft, CaretRight, Check, Clock, Leaf, MagnifyingGlass,
  ShieldCheck, Phone, ChatCircle, Headset, Bell, MapPin, Star
} from '@phosphor-icons/react'
import { FarmerBottomNav } from './FarmerOnboardingPages'

function LogoBar() {
  return (
    <div className="top-nav">
      <div className="logo-area">
        <div className="logo-circle" style={{ width: 38, height: 38 }}>
          <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
            <path d="M20 4C20 4 8 10 8 22C8 28.627 13.373 34 20 34C26.627 34 32 28.627 32 22C32 10 20 4 20 4Z" fill="white" fillOpacity="0.9"/>
            <path d="M20 18V30" stroke="var(--green-main)" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div>
          <div className="logo-text">Fresh Farms</div>
          <div className="logo-sub">Campus</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button className="icon-btn"><Headset size={22} /></button>
        <button className="icon-btn"><Bell size={22} /></button>
      </div>
    </div>
  )
}

// ── VERIFICATION SUBMITTED CARD ───────────────────────────────────
export function VerificationSubmittedPage() {
  const navigate = useNavigate()
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--bg)', padding: 24 }}>
      <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '40px 28px', textAlign: 'center', boxShadow: 'var(--shadow-lg)', width: '100%', maxWidth: 360 }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <Clock size={36} color="var(--green-main)" weight="fill" />
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Verification Submitted</div>
        <div style={{ fontSize: 14, color: 'var(--text-light)', lineHeight: 1.7, marginBottom: 24 }}>
          We have received your documents and are reviewing them. This usually takes 24-48 hours.
        </div>
        <button onClick={() => navigate('/farmer/home-pending')}
          style={{ padding: '10px 28px', borderRadius: 'var(--radius)', border: '1.5px solid var(--border)', background: 'white', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font)' }}>
          Ongoing
        </button>
      </div>
    </div>
  )
}

// ── HOME BEFORE VERIFICATION ──────────────────────────────────────
export function FarmerHomePendingPage() {
  const navigate = useNavigate()
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <LogoBar />
      <div className="screen">
        <div style={{ padding: '22px 20px 12px' }}>
          <div style={{ fontSize: 22, fontWeight: 800 }}>Good Morning, Harpal</div>
        </div>

        {/* Pending state illustration */}
        <div style={{ margin: '16px 20px', background: 'white', borderRadius: 'var(--radius-lg)', padding: '36px 20px', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', position: 'relative' }}>
            <Leaf size={36} color="var(--green-light)" />
            <div style={{ position: 'absolute', bottom: 4, right: 4, width: 22, height: 22, borderRadius: '50%', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MagnifyingGlass size={13} color="var(--text-light)" />
            </div>
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Review in Progress</div>
          <div style={{ fontSize: 13, color: 'var(--text-light)', lineHeight: 1.7 }}>
            This usually takes 24-48 hours.<br />We'll notify you once approved.
          </div>
        </div>

        {/* Actions */}
        <div style={{ padding: '8px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button onClick={() => navigate('/farmer/add-farm')}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', background: 'var(--green-main)', borderRadius: 'var(--radius-lg)', border: 'none', cursor: 'pointer', color: 'white' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ fontSize: 22 }}>📋</span>
              <span style={{ fontWeight: 700, fontSize: 15, fontFamily: 'var(--font)' }}>View Farm Details</span>
            </div>
            <CaretRight size={20} color="white" weight="bold" />
          </button>
          {[
            { icon: '📄', label: 'View Verification Status', path: '/farmer/verification-pending' },
            { icon: '📎', label: 'Update Documents', path: '/farmer/documents' },
          ].map(({ icon, label, path }) => (
            <button key={label} onClick={() => navigate(path)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', background: 'white', borderRadius: 'var(--radius-lg)', border: '1.5px solid var(--border)', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ fontSize: 22 }}>{icon}</span>
                <span style={{ fontWeight: 600, fontSize: 15, fontFamily: 'var(--font)', color: 'var(--text-dark)' }}>{label}</span>
              </div>
              <CaretRight size={18} color="var(--text-light)" />
            </button>
          ))}
        </div>
      </div>
      <FarmerBottomNav active="home" />
    </div>
  )
}

// ── VERIFICATION PENDING ──────────────────────────────────────────
export function VerificationPendingPage() {
  const navigate = useNavigate()
  return (
    <div style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={20} weight="bold" /></button>
        <span style={{ fontSize: 18, fontWeight: 700 }}>Verification Pending</span>
      </div>
      <div style={{ padding: '20px' }}>
        {/* Status illustration */}
        <div style={{ background: 'var(--bg)', borderRadius: 'var(--radius-lg)', padding: '36px 20px', textAlign: 'center', marginBottom: 20 }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: 'var(--shadow-sm)', position: 'relative' }}>
            <Leaf size={36} color="var(--green-light)" />
            <div style={{ position: 'absolute', bottom: 4, right: 4, width: 22, height: 22, borderRadius: '50%', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MagnifyingGlass size={13} color="var(--text-light)" />
            </div>
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Review in Progress</div>
          <div style={{ fontSize: 13, color: 'var(--text-light)', lineHeight: 1.7 }}>
            This usually takes 24-48 hours.<br />We'll notify you once approved.
          </div>
        </div>

        {/* Application info */}
        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: 20, boxShadow: 'var(--shadow-sm)', marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>Profile #FFC-V8921</div>
              <div style={{ fontSize: 12, color: 'var(--text-light)', marginTop: 2 }}>Application Status</div>
            </div>
            <span style={{ background: '#fff8e1', color: '#f57f17', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>Pending</span>
          </div>
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { icon: '📅', label: 'Submitted on', value: '30 Mar' },
              { icon: '📅', label: 'Est. completion', value: '01 Apr' },
              { icon: '🛡️', label: 'ID Verification', value: '✅ Done' },
            ].map(r => (
              <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: 'var(--text-light)' }}>{r.icon} {r.label}</span>
                <span style={{ fontWeight: 600 }}>{r.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Support */}
        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '16px 20px', boxShadow: 'var(--shadow-sm)', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>👩</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Support Team</div>
              <div style={{ fontSize: 12, color: 'var(--text-light)' }}>Always here to help you</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="contact-btn"><Phone size={16} /></button>
            <button className="contact-btn"><ChatCircle size={16} /></button>
          </div>
        </div>

        <button className="btn btn-primary">Contact Support</button>
        <button className="btn btn-outline" style={{ marginTop: 12 }}>Refresh Status</button>
      </div>
    </div>
  )
}

// ── ACCOUNT VERIFIED ──────────────────────────────────────────────
export function AccountVerifiedPage() {
  const navigate = useNavigate()
  return (
    <div style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={20} weight="bold" /></button>
        <span style={{ fontSize: 18, fontWeight: 700 }}>Account Verified</span>
      </div>
      <div style={{ padding: '32px 20px 0', textAlign: 'center' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--green-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <Check size={40} color="white" weight="bold" />
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Verification Successful!</div>
        <div style={{ fontSize: 14, color: 'var(--text-light)', lineHeight: 1.7, marginBottom: 32 }}>
          Your farmer profile has been verified.<br />You are now ready to reach consumers directly.
        </div>
      </div>

      {/* Farmer card */}
      <div style={{ margin: '0 20px 32px', background: 'var(--bg)', borderRadius: 'var(--radius-lg)', padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--green-light)', overflow: 'hidden', position: 'relative' }}>
            <div style={{ fontSize: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>🧑‍🌾</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontWeight: 700, fontSize: 16 }}>Harpal Singh</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--green-main)', background: 'var(--green-light)', padding: '2px 8px', borderRadius: 10 }}>VERIFIED</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-light)', marginTop: 3 }}>
              <MapPin size={12} weight="fill" /> Gurgaon, Haryana
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
              <Star size={13} weight="fill" color="#F4C652" />
              <span style={{ fontSize: 13, fontWeight: 600 }}>4.5</span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-outline" style={{ flex: 1, padding: '12px' }}>View Profile</button>
          <button className="btn btn-primary" style={{ flex: 1, padding: '12px' }}>Edit Details</button>
        </div>
      </div>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button className="btn btn-primary" onClick={() => navigate('/farmer/home')}>Start Selling</button>
        <button className="btn btn-outline" onClick={() => navigate('/farmer/home')}>Go to Dashboard</button>
      </div>
    </div>
  )
}
