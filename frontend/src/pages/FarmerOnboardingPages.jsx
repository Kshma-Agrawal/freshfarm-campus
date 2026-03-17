import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  House, ClipboardText, Bag, Leaf, User, CaretLeft, CaretRight, Check, MapPin, Camera, Plus, Bell, Headset, UserCircle, Lock, Upload, CreditCard, FileText, Barn
} from '@phosphor-icons/react'
import { LogoCircle } from './FarmerAuthPages'
import logoImg from '../assets/logo.png'

// ── Shared LogoBar ────────────────────────────────────────────────
export function LogoBar({ onHelp, onNotif }) {
  const navigate = useNavigate()
  return (
    <div className="top-nav">
      <div className="logo-area">
        <img src={logoImg} alt="Fresh Farms Campus" style={{ width: 38, height: 38, borderRadius: '50%', objectFit: 'cover' }} />
        <div>
          <div className="logo-text">Fresh Farms</div>
          <div className="logo-sub">Campus</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button className="icon-btn" onClick={() => navigate('/farmer/help')}><Headset size={20} /></button>
        <button className="icon-btn" onClick={() => navigate('/farmer/notifications')}><Bell size={20} /></button>
      </div>
    </div>
  )
}

// ── FARMER BOTTOM NAV ─────────────────────────────────────────────
export function FarmerBottomNav({ active = 'home' }) {
  const navigate = useNavigate()
  const items = [
    { key: 'home',      Icon: House,         label: 'Dashboard', path: '/farmer/home' },
    { key: 'farm',      Icon: Barn,          label: 'Farm',      path: '/farmer/farm' },
    { key: 'resources', Icon: Leaf,           label: 'Resources', path: '/farmer/resources' },
    { key: 'orders',    Icon: ClipboardText,  label: 'Orders',    path: '/farmer/orders' },
    { key: 'profile',   Icon: UserCircle, label: 'Profile', path: '/farmer/profile' },
  ]
  return (
    <nav className="bottom-nav">
      {items.map(({ key, Icon, label, path }) => {
        const isActive = active === key
        const color = isActive ? 'var(--primary)' : '#aaa'
        return (
          <button key={key} className={`nav-item ${isActive ? 'active' : ''}`} onClick={() => navigate(path)}>
            <Icon size={22} color={color} weight={isActive ? 'fill' : 'regular'} />
            <span>{label}</span>
          </button>
        )
      })}
    </nav>
  )
}

// ── DASHBOARD BEFORE SETUP ────────────────────────────────────────
export function FarmerDashboardBeforeSetupPage() {
  const navigate = useNavigate()
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <LogoBar />
      <div className="screen">
        <div style={{ padding: '20px 16px 16px' }}>
          <div style={{ fontSize: 20, fontWeight: 800 }}>Good Morning, Harpal</div>
        </div>
        <div style={{ margin: '0 16px 16px', borderRadius: '16px', overflow: 'hidden', height: 170 }}>
          <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80" alt="farm" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ textAlign: 'center', padding: '0 20px 24px' }}>
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Set up your farm to start selling</div>
          <div style={{ fontSize: 13, color: 'var(--text-subtle)', lineHeight: 1.65 }}>Join the Fresh Farm Campus marketplace. Complete your profile to list your products and reach customers.</div>
        </div>
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button onClick={() => navigate('/farmer/add-farm')} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px', background: 'var(--primary)', borderRadius: '12px', border: 'none', cursor: 'pointer', color: 'white' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <ClipboardText size={20} color="white" />
              <span style={{ fontWeight: 700, fontSize: 15, fontFamily: 'var(--font)' }}>Add Farm Details</span>
            </div>
            <CaretRight size={18} color="white" weight="bold" />
          </button>
          {[
            { Icon: FileText, label: 'Document Verification' },
            { Icon: CreditCard, label: 'Payment Setup' },
          ].map(({ Icon, label }) => (
            <div key={label} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px', background: 'white', borderRadius: '12px', border: '1.5px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Icon size={20} color="var(--text-subtle)" />
                <span style={{ fontWeight: 600, fontSize: 14, fontFamily: 'var(--font)', color: 'var(--text-subtle)' }}>{label}</span>
              </div>
              <Lock size={16} color="var(--text-subtle)" />
            </div>
          ))}
        </div>
      </div>
      <FarmerBottomNav active="home" />
    </div>
  )
}

// ── ADD FARM DETAILS ──────────────────────────────────────────────
export function AddFarmDetailsPage() {
  const navigate = useNavigate()
  const [cats, setCats] = useState(['Vegetables'])
  const allCats = ['Vegetables', 'Fruits', 'Dairy', 'Organic Grains', 'Manure', 'Seeds']
  const toggle = c => setCats(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c])
  return (
    <div style={{ background: 'white', minHeight: '100vh' }}>
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={18} weight="bold" /></button>
        <span style={{ fontSize: 17, fontWeight: 700 }}>Add Farm Details</span>
      </div>
      <div style={{ padding: '16px 16px 100px' }}>
        {[{ label: 'Farm Name', ph: 'e.g. Green Valley Organic Farm' }, { label: 'Owner Name', ph: 'e.g. Rahul Sharma' }].map(f => (
          <div key={f.label} style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-subtle)', marginBottom: 6, display: 'block' }}>{f.label}</label>
            <input className="input-field no-icon" placeholder={f.ph} />
          </div>
        ))}
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-subtle)', marginBottom: 6, display: 'block' }}>Location</label>
          <div style={{ position: 'relative' }}>
            <MapPin size={17} color="var(--text-subtle)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            <input className="input-field" placeholder="Gurgaon, Haryana" />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
          {[{ label: 'Farm Size (Acres)', ph: '5' }, { label: 'Experience (Years)', ph: '10' }].map(f => (
            <div key={f.label} style={{ flex: 1 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-subtle)', marginBottom: 6, display: 'block' }}>{f.label}</label>
              <input className="input-field no-icon" placeholder={f.ph} type="number" />
            </div>
          ))}
        </div>
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-subtle)' }}>Categories</label>
            <span style={{ fontSize: 12, color: 'var(--text-subtle)' }}>Select Multiple</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {allCats.map(c => (
              <button key={c} onClick={() => toggle(c)} className={`chip ${cats.includes(c) ? 'chip-active' : 'chip-inactive'}`}>{c}</button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-subtle)', marginBottom: 8, display: 'block' }}>Farm Photos</label>
          <div className="upload-box">
            <Upload size={24} color="var(--text-subtle)" />
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-subtle)' }}>Upload farm photos</div>
            <div style={{ fontSize: 12, color: 'var(--text-subtle)' }}>PNG, JPG (Max. 5MB)</div>
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/farmer/documents')}>Add Farm</button>
        <button className="btn btn-outline-grey" style={{ marginTop: 10 }} onClick={() => navigate(-1)}>Cancel</button>
      </div>
    </div>
  )
}

// ── DOCUMENT UPLOAD ───────────────────────────────────────────────
export function DocumentUploadPage() {
  const navigate = useNavigate()
  const docs = [
    { id: 'land', label: 'Farm Land Certificate', hint: 'PDF, PNG or JPG (Max. 5MB)' },
    { id: 'organic', label: 'Organic Certification', hint: 'Valid organic farming certificate' },
    { id: 'fssai', label: 'FSSAI License', hint: 'Food safety and standards license' },
  ]
  return (
    <div style={{ background: 'white', minHeight: '100vh' }}>
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={18} weight="bold" /></button>
        <span style={{ fontSize: 17, fontWeight: 700 }}>Document Upload</span>
      </div>
      <div style={{ padding: '16px 16px 100px' }}>
        {docs.map(doc => (
          <div key={doc.id} style={{ marginBottom: 18 }}>
            <label style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-dark)', marginBottom: 8, display: 'block' }}>{doc.label}</label>
            <div className="upload-box" style={{ padding: '24px 16px' }}>
              <Upload size={22} color="var(--text-subtle)" />
              <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-subtle)' }}>Upload Document</div>
              <div style={{ fontSize: 12, color: 'var(--text-subtle)' }}>{doc.hint}</div>
            </div>
          </div>
        ))}
        <button className="btn btn-primary" style={{ marginTop: 8 }} onClick={() => navigate('/farmer/payment-setup')}>Save Documents</button>
        <button className="btn btn-outline-grey" style={{ marginTop: 10 }} onClick={() => navigate(-1)}>Cancel</button>
      </div>
    </div>
  )
}

// ── PAYMENT SETUP ─────────────────────────────────────────────────
export function PaymentSetupPage() {
  const navigate = useNavigate()
  const fields = [
    { label: 'Account Holder Name', ph: 'e.g. Rahul Sharma' },
    { label: 'Bank Name', ph: 'e.g. State Bank of India' },
    { label: 'Account Number', ph: '···· ···· ···· 1234' },
    { label: 'IFSC Code', ph: 'e.g. SBIN0001234' },
    { label: 'UPI ID (Optional)', ph: 'rahul@upi' },
  ]
  return (
    <div style={{ background: 'white', minHeight: '100vh' }}>
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={18} weight="bold" /></button>
        <span style={{ fontSize: 17, fontWeight: 700 }}>Payment Setup</span>
      </div>
      <div style={{ padding: '16px 16px 100px' }}>
        <p style={{ fontSize: 13, color: 'var(--text-subtle)', marginBottom: 22, lineHeight: 1.65 }}>
          Please enter your bank account details to receive payments for your farm products.
        </p>
        {fields.map(f => (
          <div key={f.label} style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-subtle)', marginBottom: 6, display: 'block' }}>{f.label}</label>
            <input className="input-field no-icon" placeholder={f.ph} />
          </div>
        ))}
        <div style={{ marginTop: 8 }}>
          <button className="btn btn-primary" onClick={() => navigate('/farmer/verification-submitted')}>Add Farm</button>
          <button className="btn btn-outline-grey" style={{ marginTop: 10 }} onClick={() => navigate(-1)}>Cancel</button>
        </div>
      </div>
    </div>
  )
}