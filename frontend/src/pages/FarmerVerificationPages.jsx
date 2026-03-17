import { useNavigate } from 'react-router-dom'
import {
  CaretLeft, CaretRight, Check, CheckCircle, Clock, Warning, ShieldCheck, ChatCircle, IdentificationBadge, Leaf, MagnifyingGlass, MapPin, Phone, Star, CalendarBlank
} from '@phosphor-icons/react'
import { FarmerBottomNav } from './FarmerOnboardingPages'
import { TopNav, PageHeader } from '../components/UI'

// ── VERIFICATION SUBMITTED ────────────────────────────────────────
export function VerificationSubmittedPage() {
  const navigate = useNavigate()
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ background: 'white', borderRadius: '24px', padding: '40px 24px', textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.12)', width: '100%', maxWidth: 360 }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <Clock size={34} color="var(--primary)" weight="fill" />
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Verification Submitted</div>
        <div style={{ fontSize: 14, color: 'var(--text-subtle)', lineHeight: 1.7, marginBottom: 28 }}>
          We have received your documents and are reviewing them. This usually takes 24-48 hours.
        </div>
        <button onClick={() => navigate('/farmer/home-pending')}
          style={{ padding: '10px 32px', borderRadius: '12px', border: '1.5px solid var(--border)', background: 'white', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font)' }}>
          Ongoing
        </button>
      </div>
    </div>
  )
}

// ── HOME PENDING ──────────────────────────────────────────────────
export function FarmerHomePendingPage() {
  const navigate = useNavigate()
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <TopNav farmerMode={true} />
      <div className="screen">
        <div style={{ padding: '20px 16px 14px' }}>
          <div style={{ fontSize: 20, fontWeight: 800 }}>Good Morning, Harpal</div>
        </div>

        {/* Review card */}
        <div style={{ margin: '0 16px 16px', background: 'white', borderRadius: '16px', padding: '32px 20px', textAlign: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', position: 'relative' }}>
            <Leaf size={34} color="var(--primary-light)" weight="fill" />
            <div style={{ position: 'absolute', bottom: 2, right: 2, width: 22, height: 22, borderRadius: '50%', background: 'white', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MagnifyingGlass size={12} color="var(--text-subtle)" />
            </div>
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Review in Progress</div>
          <div style={{ fontSize: 13, color: 'var(--text-subtle)', lineHeight: 1.65 }}>
            This usually takes 24-48 hours.<br />We'll notify you once approved.
          </div>
        </div>

        {/* Actions */}
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button onClick={() => navigate('/farmer/farm-details')}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px', background: 'var(--primary)', borderRadius: '12px', border: 'none', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 10.5L12 3L21 10.5V20C21 20.552 20.552 21 20 21H15V15H9V21H4C3.448 21 3 20.552 3 20V10.5Z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <span style={{ fontWeight: 700, fontSize: 14, fontFamily: 'var(--font)', color: 'white' }}>View Farm Details</span>
            </div>
            <CaretRight size={18} color="white" weight="bold" />
          </button>
          {[
            { icon: <IdentificationBadge size={18} color="var(--text-subtle)" />, label: 'View Verification Status', path: '/farmer/verification-pending' },
            { icon: <ShieldCheck size={18} color="var(--text-subtle)" />, label: 'Update Documents', path: '/farmer/documents' },
          ].map(({ icon, label, path }) => (
            <button key={label} onClick={() => navigate(path)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px', background: 'white', borderRadius: '12px', border: '1.5px solid var(--border)', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
                <span style={{ fontWeight: 600, fontSize: 14, fontFamily: 'var(--font)', color: 'var(--text-dark)' }}>{label}</span>
              </div>
              <CaretRight size={16} color="var(--text-subtle)" />
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
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div className="page-header" style={{ background: 'white' }}>
        <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={18} weight="bold" /></button>
        <span style={{ fontSize: 17, fontWeight: 700 }}>Verification Pending</span>
      </div>
      <div style={{ padding: '16px 16px 100px' }}>
        {/* Status illustration */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '32px 20px', textAlign: 'center', marginBottom: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', position: 'relative' }}>
            <Leaf size={34} color="var(--primary-light)" weight="fill" />
            <div style={{ position: 'absolute', bottom: 2, right: 2, width: 22, height: 22, borderRadius: '50%', background: 'white', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MagnifyingGlass size={12} color="var(--text-subtle)" />
            </div>
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Review in Progress</div>
          <div style={{ fontSize: 13, color: 'var(--text-subtle)', lineHeight: 1.65 }}>
            This usually takes 24-48 hours.<br />We'll notify you once approved.
          </div>
        </div>

        {/* Application card */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '16px 18px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 14, marginBottom: 14, borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IdentificationBadge size={20} color="var(--primary)" />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>Profile #FFC-V8921</div>
                <div style={{ fontSize: 12, color: 'var(--text-subtle)', marginTop: 1 }}>Application Status</div>
              </div>
            </div>
            <span style={{ background: '#fff8e1', color: 'var(--orange)', padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700 }}>Pending</span>
          </div>
          {[
            { Icon: CalendarBlank, label: 'Submitted on',    value: '30 Mar' },
            { Icon: CalendarBlank, label: 'Est. completion', value: '01 Apr' },
            { Icon: ShieldCheck,   label: 'ID Verification', value: 'Done', green: true },
          ].map(r => (
            <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <r.Icon size={15} color="var(--text-subtle)" />
                <span style={{ fontSize: 13, color: 'var(--text-subtle)' }}>{r.label}</span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: r.green ? 'var(--primary)' : 'var(--text-dark)' }}>
                {r.green && '✓ '}{r.value}
              </span>
            </div>
          ))}
        </div>

        {/* Support card */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '14px 18px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>👩‍💼</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>Support Team</div>
              <div style={{ fontSize: 12, color: 'var(--text-subtle)', marginTop: 1 }}>Always here to help you</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="contact-btn"><Phone size={16} color="var(--text-subtle)" /></button>
            <button className="contact-btn"><ChatCircle size={16} color="var(--text-subtle)" /></button>
          </div>
        </div>

        <button className="btn btn-primary">Contact Support</button>
        <button className="btn btn-outline-grey" style={{ marginTop: 10 }}>Refresh Status</button>
      </div>
    </div>
  )
}

// ── ACCOUNT VERIFIED ──────────────────────────────────────────────
export function AccountVerifiedPage() {
  const navigate = useNavigate()
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div className="page-header" style={{ background: 'white' }}>
        <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={18} weight="bold" /></button>
        <span style={{ fontSize: 17, fontWeight: 700 }}>Account Verified</span>
      </div>
      <div style={{ padding: '24px 16px 0' }}>
        {/* Success card */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '36px 20px', textAlign: 'center', marginBottom: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <Check size={36} color="white" weight="bold" />
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 10 }}>Verification Successful!</div>
          <div style={{ fontSize: 14, color: 'var(--text-subtle)', lineHeight: 1.7 }}>
            Your farmer profile has been verified.<br />You are now ready to reach consumers directly.
          </div>
        </div>

        {/* Farmer card */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '18px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>🧑‍</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                <span style={{ fontWeight: 700, fontSize: 16 }}>Harpal Singh</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--primary)', background: 'var(--primary-light)', padding: '2px 7px', borderRadius: 10, letterSpacing: '0.03em' }}>VERIFIED</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 12, color: 'var(--text-subtle)', marginBottom: 4 }}>
                <MapPin size={11} weight="fill" /> Gurgaon, Haryana
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Star size={13} weight="fill" color="#F4C652" />
                <span style={{ fontSize: 13, fontWeight: 600 }}>4.5</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-outline-grey" style={{ flex: 1, height: 42, fontSize: 14 }}>View Profile</button>
            <button className="btn btn-primary" style={{ flex: 1, height: 42, fontSize: 14 }}>Edit Details</button>
          </div>
        </div>

        <button className="btn btn-primary" onClick={() => navigate('/farmer/home')}>Start Selling</button>
        <button className="btn btn-outline-grey" style={{ marginTop: 10 }} onClick={() => navigate('/farmer/home')}>Go to Dashboard</button>
      </div>
    </div>
  )
}
