import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CaretLeft, CaretRight, MapPin, Lock, Upload,
  House, User, Check, X, Bank, IdentificationCard,
  Headset, Bell
} from '@phosphor-icons/react'

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

// ── FARMER BOTTOM NAV ─────────────────────────────────────────────
export function FarmerBottomNav({ active = 'home' }) {
  const navigate = useNavigate()
  const items = [
    { key: 'home', icon: '🏠', label: 'Dashboard', path: '/farmer/home' },
    { key: 'farm', icon: '🏡', label: 'Farm', path: '/farmer/farm' },
    { key: 'resources', icon: '🌿', label: 'Resources', path: '/farmer/resources' },
    { key: 'orders', icon: '📋', label: 'Orders', path: '/farmer/orders' },
    { key: 'profile', icon: '👤', label: 'Profile', path: '/farmer/profile' },
  ]
  return (
    <nav className="bottom-nav">
      {items.map(({ key, icon, label, path }) => {
        const isActive = active === key
        return (
          <button key={key} className={`nav-item ${isActive ? 'active' : ''}`} onClick={() => navigate(path)}>
            <span className="nav-icon" style={{ fontSize: 22 }}>{icon}</span>
            <span>{label}</span>
            {isActive && <div className="nav-active-dot" />}
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
        <div style={{ padding: '22px 20px 12px' }}>
          <div style={{ fontSize: 22, fontWeight: 800 }}>Good Morning, Harpal</div>
        </div>

        {/* Hero image */}
        <div style={{ margin: '0 20px 20px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', height: 160, background: 'var(--green-light)' }}>
          <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80" alt="farm" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div style={{ textAlign: 'center', padding: '0 20px 28px' }}>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Set up your farm to start selling</div>
          <div style={{ fontSize: 14, color: 'var(--text-light)', lineHeight: 1.6 }}>Join the Fresh Farm Campus marketplace. Complete your profile to list your products and reach customers.</div>
        </div>

        {/* Setup steps */}
        <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button onClick={() => navigate('/farmer/add-farm')}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', background: 'var(--green-main)', borderRadius: 'var(--radius-lg)', border: 'none', cursor: 'pointer', color: 'white' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ fontSize: 22 }}>📋</span>
              <span style={{ fontWeight: 700, fontSize: 16, fontFamily: 'var(--font)' }}>Add Farm Details</span>
            </div>
            <CaretRight size={20} color="white" weight="bold" />
          </button>

          {[
            { icon: '📄', label: 'Document Verification' },
            { icon: '💳', label: 'Payment Setup' },
          ].map(({ icon, label }) => (
            <button key={label}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', background: 'white', borderRadius: 'var(--radius-lg)', border: '1.5px solid var(--border)', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ fontSize: 22 }}>{icon}</span>
                <span style={{ fontWeight: 600, fontSize: 15, fontFamily: 'var(--font)', color: 'var(--text-mid)' }}>{label}</span>
              </div>
              <Lock size={18} color="var(--text-light)" />
            </button>
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
  const [categories, setCategories] = useState(['Vegetables'])
  const allCats = ['Vegetables', 'Fruits', 'Dairy', 'Organic Grains', 'Manure', 'Seeds']

  const toggleCat = (c) => setCategories(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])

  return (
    <div style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={20} weight="bold" /></button>
        <span style={{ fontSize: 18, fontWeight: 700 }}>Add Farm Details</span>
      </div>
      <div style={{ padding: '20px 20px 100px' }}>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-mid)', marginBottom: 6, display: 'block' }}>Farm Name</label>
          <input className="input-field no-icon" placeholder="e.g. Green Valley Organic Farm" style={{ borderRadius: 'var(--radius)' }} />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-mid)', marginBottom: 6, display: 'block' }}>Owner Name</label>
          <input className="input-field no-icon" placeholder="e.g. Rahul Sharma" style={{ borderRadius: 'var(--radius)' }} />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-mid)', marginBottom: 6, display: 'block' }}>Location</label>
          <div className="input-wrap" style={{ marginBottom: 0 }}>
            <MapPin className="input-icon" size={18} weight="fill" color="var(--green-main)" />
            <input className="input-field" placeholder="Gurgaon, Haryana" />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, marginBottom: 18 }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-mid)', marginBottom: 6, display: 'block' }}>Farm Size (Acres)</label>
            <input className="input-field no-icon" placeholder="5" type="number" />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-mid)', marginBottom: 6, display: 'block' }}>Experience (Years)</label>
            <input className="input-field no-icon" placeholder="10" type="number" />
          </div>
        </div>

        <div style={{ marginBottom: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-mid)' }}>Categories</label>
            <span style={{ fontSize: 12, color: 'var(--text-light)' }}>Select Multiple</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {allCats.map(c => (
              <button key={c} onClick={() => toggleCat(c)}
                className={`chip ${categories.includes(c) ? 'chip-active' : 'chip-inactive'}`}
                style={{ padding: '8px 16px', fontSize: 13 }}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 28 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-mid)', marginBottom: 8, display: 'block' }}>Farm Photos</label>
          <div style={{ border: '2px dashed var(--border)', borderRadius: 'var(--radius)', padding: 20, textAlign: 'center', cursor: 'pointer', background: 'var(--bg)' }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>📷</div>
            <div style={{ fontSize: 13, color: 'var(--text-light)' }}>Upload farm photos</div>
          </div>
        </div>

        <button className="btn btn-primary" onClick={() => navigate('/farmer/documents')}>Add Farm</button>
        <button className="btn btn-outline" style={{ marginTop: 12 }} onClick={() => navigate(-1)}>Cancel</button>
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
    <div style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={20} weight="bold" /></button>
        <span style={{ fontSize: 18, fontWeight: 700 }}>Produce details</span>
      </div>
      <div style={{ padding: '20px 20px 100px' }}>
        {docs.map(doc => (
          <div key={doc.id} style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-dark)', marginBottom: 10, display: 'block' }}>{doc.label}</label>
            <div style={{ border: '2px dashed var(--border)', borderRadius: 'var(--radius)', padding: '28px 20px', textAlign: 'center', cursor: 'pointer', background: 'var(--bg)' }}>
              <div style={{ fontSize: 32, marginBottom: 8, color: 'var(--text-light)' }}>📄</div>
              <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-mid)', marginBottom: 4 }}>Upload Document</div>
              <div style={{ fontSize: 12, color: 'var(--text-light)' }}>{doc.hint}</div>
            </div>
          </div>
        ))}
        <button className="btn btn-primary" onClick={() => navigate('/farmer/payment-setup')}>Save Documents</button>
        <button className="btn btn-outline" style={{ marginTop: 12 }} onClick={() => navigate(-1)}>Cancel</button>
      </div>
    </div>
  )
}

// ── PAYMENT SETUP ─────────────────────────────────────────────────
export function PaymentSetupPage() {
  const navigate = useNavigate()
  return (
    <div style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={20} weight="bold" /></button>
        <span style={{ fontSize: 18, fontWeight: 700 }}>Payment Setup</span>
      </div>
      <div style={{ padding: '20px 20px 100px' }}>
        <p style={{ fontSize: 14, color: 'var(--text-light)', marginBottom: 24, lineHeight: 1.6 }}>
          Please enter your bank account details to receive payments for your farm products.
        </p>
        {[
          { label: 'Account Holder Name', placeholder: 'e.g. Rahul Sharma', type: 'text' },
          { label: 'Bank Name', placeholder: 'e.g. State Bank of India', type: 'text' },
          { label: 'Account Number', placeholder: '···· ···· ···· 1234', type: 'text' },
          { label: 'IFSC Code', placeholder: 'e.g. SBIN0001234', type: 'text' },
          { label: 'UPI ID (Optional)', placeholder: 'rahul@upi', type: 'text' },
        ].map(f => (
          <div key={f.label} style={{ marginBottom: 18 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-mid)', marginBottom: 6, display: 'block' }}>{f.label}</label>
            <input className="input-field no-icon" placeholder={f.placeholder} type={f.type} />
          </div>
        ))}
        <button className="btn btn-primary" onClick={() => navigate('/farmer/verification-submitted')}>Add Farm</button>
        <button className="btn btn-outline" style={{ marginTop: 12 }} onClick={() => navigate(-1)}>Cancel</button>
      </div>
    </div>
  )
}
