import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CaretLeft, CaretRight, Gear, SignOut,
  Bank, Phone, Check, ClipboardText,
  Eye, EyeSlash, Funnel, Globe, Trash,
  ShieldCheck, CurrencyDollar, ShoppingBag,
  Headset, ChatCircle, BookmarkSimple,
  Moon, Warning, ArrowSquareOut, Plus,
  Tractor
} from '@phosphor-icons/react'
import { FarmerBottomNav } from './FarmerOnboardingPages'
import { TopNav } from '../components/UI'

const farmerImg = 'https://images.unsplash.com/photo-1595475038784-bbe439ff41e6?w=200&q=80'

// ── Reusable Toggle ───────────────────────────────────────────────
function Toggle({ on, onToggle }) {
  return (
    <button onClick={onToggle} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0 }}>
      <div style={{ width: 48, height: 26, borderRadius: 13, background: on ? 'var(--primary)' : '#ccc', position: 'relative', transition: 'background 0.2s' }}>
        <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'white', position: 'absolute', top: 3, left: on ? 25 : 3, transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
      </div>
    </button>
  )
}

// ── FARMER PROFILE ────────────────────────────────────────────────
export function FarmerProfilePage() {
  const navigate = useNavigate()
  const menuItems = [
    { Icon: Tractor,        label: 'Farm Details',        path: '/farmer/farm-details' },
    { Icon: BookmarkSimple, label: 'Bookmarks',           path: '/farmer/bookmarks' },
    { Icon: Bank,           label: 'Payment Details',     path: '/farmer/payment-details' },
    { Icon: ShieldCheck,    label: 'Verification Status', path: '/farmer/verification-pending' },
    { Icon: CurrencyDollar, label: 'Earnings',            path: '/farmer/earnings' },
    { Icon: ShoppingBag,    label: 'My Purchases',        path: '/farmer/my-purchases' },
    { Icon: Gear,           label: 'Settings',            path: '/farmer/settings' },
    { Icon: Headset,        label: 'Help & Support',      path: '/farmer/help' },
  ]
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <TopNav farmerMode={true} />
      <div className="screen">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '28px 20px 24px', background: 'white' }}>
          <div style={{ position: 'relative', marginBottom: 12 }}>
            <div style={{ width: 88, height: 88, borderRadius: '50%', overflow: 'hidden', border: '3px solid white', boxShadow: '0 2px 12px rgba(0,0,0,0.15)' }}>
              <img src={farmerImg} alt="Harpal Singh" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ position: 'absolute', bottom: 2, right: 2, width: 24, height: 24, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid white' }}>
              <Check size={12} color="white" weight="bold" />
            </div>
          </div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>Harpal Singh</div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--primary)', color: 'white', padding: '5px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600, marginTop: 8 }}>
            <Check size={13} weight="bold" /> Verified farmer
          </div>
        </div>
        <div style={{ marginTop: 12 }}>
          {menuItems.map(({ Icon, label, path }) => (
            <div key={label} className="profile-menu-item" onClick={() => navigate(path)}>
              <div className="profile-menu-icon">
                <Icon size={20} weight="duotone" color="var(--primary)" />
              </div>
              <span style={{ flex: 1, fontSize: 15, fontWeight: 500 }}>{label}</span>
              <CaretRight size={18} color="var(--text-subtle)" />
            </div>
          ))}
        </div>
      </div>
      <FarmerBottomNav active="profile" />
    </div>
  )
}

// ── FARM DETAILS (view) ───────────────────────────────────────────
export function FarmDetailsPage() {
  const navigate = useNavigate()
  const categories = ['Vegetables', 'Fruits', 'Manure']
  const photos = [
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=300&q=80',
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&q=80',
  ]
  return (
    <div style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={20} weight="bold" /></button>
        <span style={{ fontSize: 18, fontWeight: 700 }}>Farm Details</span>
      </div>
      <div style={{ padding: '16px 20px 100px' }}>
        {[
          { label: 'Farm Name', value: 'Green Valley Organic Farm' },
          { label: 'Owner Name', value: 'Harpal Singh' },
          { label: 'Location', value: 'Gurgaon, Haryana', prefix: '' },
        ].map(f => (
          <div key={f.label} style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-subtle)', marginBottom: 6, display: 'block', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{f.label}</label>
            <div style={{ padding: '14px 16px', background: 'var(--bg)', borderRadius: '12px', fontSize: 15, fontWeight: 500, color: 'var(--text-dark)' }}>
              {f.prefix}{f.value}
            </div>
          </div>
        ))}

        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          {[{ label: 'Farm Size (Acres)', value: '5' }, { label: 'Experience (Years)', value: '10' }].map(f => (
            <div key={f.label} style={{ flex: 1 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-subtle)', marginBottom: 6, display: 'block', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{f.label}</label>
              <div style={{ padding: '14px 16px', background: 'var(--bg)', borderRadius: '12px', fontSize: 15, fontWeight: 500 }}>{f.value}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-subtle)', marginBottom: 10, display: 'block', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Categories</label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {categories.map(c => (
              <span key={c} className="chip chip-active" style={{ padding: '7px 16px', fontSize: 13 }}>{c}</span>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 28 }}>
          <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-subtle)', marginBottom: 10, display: 'block', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Farm Photos</label>
          <div style={{ display: 'flex', gap: 10 }}>
            {photos.map((src, i) => (
              <div key={i} style={{ width: 100, height: 80, borderRadius: '8px', overflow: 'hidden' }}>
                <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>

        <button className="btn btn-primary" onClick={() => navigate('/farmer/edit-farm')}>Edit Details</button>
      </div>
    </div>
  )
}

// ── EDIT FARM DETAILS ─────────────────────────────────────────────
export function EditFarmDetailsPage() {
  const navigate = useNavigate()
  const [categories, setCategories] = useState(['Vegetables', 'Fruits', 'Manure'])
  const allCats = ['Vegetables', 'Fruits', 'Dairy', 'Manure', 'Seeds', 'Organic Grains']
  const toggle = (c) => setCategories(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c])

  return (
    <div style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={20} weight="bold" /></button>
        <span style={{ fontSize: 18, fontWeight: 700 }}>Edit Farm Details</span>
      </div>
      <div style={{ padding: '16px 20px 100px' }}>
        {[
          { label: 'Farm Name', val: 'Green Valley Organic Farm' },
          { label: 'Owner Name', val: 'Harpal Singh' },
          { label: 'Location', val: 'Gurgaon, Haryana' },
        ].map(f => (
          <div key={f.label} style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-subtle)', marginBottom: 6, display: 'block' }}>{f.label}</label>
            <input className="input-field no-icon" defaultValue={f.val} />
          </div>
        ))}
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          {[{ label: 'Farm Size (Acres)', val: '5' }, { label: 'Experience (Years)', val: '10' }].map(f => (
            <div key={f.label} style={{ flex: 1 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-subtle)', marginBottom: 6, display: 'block' }}>{f.label}</label>
              <input className="input-field no-icon" defaultValue={f.val} type="number" />
            </div>
          ))}
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-subtle)', marginBottom: 10, display: 'block' }}>Categories</label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {allCats.map(c => (
              <button key={c} onClick={() => toggle(c)} className={`chip ${categories.includes(c) ? 'chip-active' : 'chip-inactive'}`} style={{ padding: '8px 16px', fontSize: 13 }}>{c}</button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 28 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-subtle)', marginBottom: 10, display: 'block' }}>Farm Photos</label>
          <div style={{ display: 'flex', gap: 10 }}>
            {['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=300&q=80', 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&q=80'].map((src, i) => (
              <div key={i} style={{ width: 100, height: 80, borderRadius: '8px', overflow: 'hidden' }}>
                <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => navigate(-1)}>Save Changes</button>
        <button className="btn btn-outline" style={{ marginTop: 12 }} onClick={() => navigate(-1)}>Cancel</button>
      </div>
    </div>
  )
}

// ── PAYMENT DETAILS (view) ────────────────────────────────────────
export function PaymentDetailsPage() {
  const navigate = useNavigate()
  const [showAcct, setShowAcct] = useState(false)
  const fields = [
    { label: 'Account Holder Name', value: 'Rahul Sharma' },
    { label: 'Bank Name', value: 'State Bank of India' },
    { label: 'Account Number', value: showAcct ? '1234567890001234' : '···· ···· ···· 1234', toggleable: true },
    { label: 'IFSC Code', value: 'BIN0001234', copyable: true },
    { label: 'UPI ID (Optional)', value: 'rahul@upi', badge: 'Active' },
  ]
  return (
    <div style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={20} weight="bold" /></button>
        <span style={{ fontSize: 18, fontWeight: 700 }}>Payment Details</span>
      </div>
      <div style={{ padding: '16px 20px 100px' }}>
        {fields.map(f => (
          <div key={f.label} style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-subtle)', marginBottom: 6, display: 'block', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{f.label}</label>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', background: 'var(--bg)', borderRadius: '12px' }}>
              <span style={{ fontSize: 15, fontWeight: 500 }}>{f.value}</span>
              {f.toggleable && (
                <button onClick={() => setShowAcct(!showAcct)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-subtle)' }}>
                  {showAcct ? <EyeSlash size={18} /> : <Eye size={18} />}
                </button>
              )}
              {f.copyable && (
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-subtle)', fontSize: 16 }}><ClipboardText size={20} /></button>
              )}
              {f.badge && (
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--primary)', background: 'var(--primary-light)', padding: '3px 10px', borderRadius: 10 }}>{f.badge}</span>
              )}
            </div>
          </div>
        ))}
        <button className="btn btn-primary" onClick={() => navigate('/farmer/edit-payment')}>Edit Details</button>
      </div>
    </div>
  )
}

// ── EDIT PAYMENT DETAILS ──────────────────────────────────────────
export function EditPaymentDetailsPage() {
  const navigate = useNavigate()
  const [showAcct, setShowAcct] = useState(false)
  return (
    <div style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={20} weight="bold" /></button>
        <span style={{ fontSize: 18, fontWeight: 700 }}>Payment Details</span>
      </div>
      <div style={{ padding: '16px 20px 100px' }}>
        {[
          { label: 'Account Holder Name', val: 'Rahul Sharma', type: 'text' },
          { label: 'Bank Name', val: 'State Bank of India', type: 'text' },
        ].map(f => (
          <div key={f.label} style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-subtle)', marginBottom: 6, display: 'block' }}>{f.label}</label>
            <input className="input-field no-icon" defaultValue={f.val} type={f.type} />
          </div>
        ))}

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-subtle)', marginBottom: 6, display: 'block' }}>Account Number</label>
          <div className="input-wrap" style={{ marginBottom: 0 }}>
            <input className="input-field no-icon" defaultValue={showAcct ? '1234567890001234' : '···· ···· ···· 1234'} style={{ paddingRight: 44 }} />
            <button onClick={() => setShowAcct(!showAcct)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-subtle)' }}>
              {showAcct ? <EyeSlash size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {[
          { label: 'IFSC Code', val: 'BIN0001234', type: 'text' },
          { label: 'UPI ID (Optional)', val: 'rahul@upi', type: 'text' },
        ].map(f => (
          <div key={f.label} style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-subtle)', marginBottom: 6, display: 'block' }}>{f.label}</label>
            <input className="input-field no-icon" defaultValue={f.val} type={f.type} />
          </div>
        ))}

        <div style={{ marginTop: 12 }}>
          <button className="btn btn-primary" onClick={() => navigate(-1)}>Save Changes</button>
          <button className="btn btn-outline" style={{ marginTop: 12 }} onClick={() => navigate(-1)}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

// ── SETTINGS ──────────────────────────────────────────────────────
export function FarmerSettingsPage() {
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(false)
  const [notifs, setNotifs] = useState({ orders: true, marketing: false, features: true })

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: 40 }}>
      <div className="page-header" style={{ background: 'white' }}>
        <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={20} weight="bold" /></button>
        <span style={{ fontSize: 18, fontWeight: 700 }}>Settings</span>
      </div>

      {/* Avatar card — dashed blue border like screenshot */}
      <div style={{ margin: '16px 16px', border: '1.5px dashed #4A90D9', borderRadius: 14, background: 'white', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ position: 'relative', marginBottom: 10 }}>
          <div style={{ width: 76, height: 76, borderRadius: '50%', overflow: 'hidden', border: '3px solid white', boxShadow: '0 2px 12px rgba(0,0,0,0.15)' }}>
            <img src={farmerImg} alt="Harpal Singh" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ position: 'absolute', bottom: 2, right: 2, width: 22, height: 22, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid white' }}>
            <Check size={11} color="white" weight="bold" />
          </div>
        </div>
        <div style={{ fontWeight: 700, fontSize: 17 }}>Harpal Singh</div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'var(--primary)', color: 'white', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, marginTop: 6 }}>
          <Check size={11} weight="bold" /> Verified farmer
        </div>
      </div>

      {/* General */}
      <div style={{ background: 'white', marginBottom: 8 }}>
        <div style={{ padding: '10px 20px 4px', fontSize: 11, fontWeight: 700, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>GENERAL</div>
        <div className="profile-menu-item" style={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div className="profile-menu-icon"><Globe size={20} weight="duotone" color="var(--primary)" /></div>
            <span style={{ fontWeight: 500 }}>Language</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-subtle)', fontSize: 14 }}>
            English <CaretRight size={16} />
          </div>
        </div>
        <div className="profile-menu-item" style={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div className="profile-menu-icon"><Moon size={20} weight="duotone" color="var(--primary)" /></div>
            <span style={{ fontWeight: 500 }}>Dark Mode</span>
          </div>
          <Toggle on={darkMode} onToggle={() => setDarkMode(!darkMode)} />
        </div>
      </div>

      {/* Notifications */}
      <div style={{ background: 'white', marginBottom: 8 }}>
        <div style={{ padding: '10px 20px 4px', fontSize: 11, fontWeight: 700, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>NOTIFICATIONS</div>
        {[
          { key: 'orders',    label: 'Order updates',  desc: 'Real-time status of your farm deliveries' },
          { key: 'marketing', label: 'Marketing',       desc: 'Discounts, seasonal offers and newsletters' },
          { key: 'features',  label: 'New features',   desc: 'Learn about app updates and tools' },
        ].map(n => (
          <div key={n.key} className="profile-menu-item" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, fontSize: 15 }}>{n.label}</div>
              <div style={{ fontSize: 12, color: 'var(--text-subtle)', marginTop: 2 }}>{n.desc}</div>
            </div>
            <Toggle on={notifs[n.key]} onToggle={() => setNotifs(p => ({ ...p, [n.key]: !p[n.key] }))} />
          </div>
        ))}
      </div>

      {/* Account Actions */}
      <div style={{ background: 'white' }}>
        <div style={{ padding: '10px 20px 4px', fontSize: 11, fontWeight: 700, color: 'var(--error)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>ACCOUNT ACTIONS</div>
        <div className="profile-menu-item" onClick={() => navigate('/farmer/login')} style={{ gap: 14 }}>
          <div className="profile-menu-icon" style={{ background: '#ffebee' }}><SignOut size={18} color="var(--error)" /></div>
          <span style={{ fontWeight: 500, color: 'var(--text-dark)' }}>Log out</span>
        </div>
        <div className="profile-menu-item" style={{ gap: 14 }}>
          <div className="profile-menu-icon" style={{ background: '#ffebee' }}><Trash size={18} color="var(--error)" /></div>
          <span style={{ fontWeight: 500, color: 'var(--error)' }}>Delete Account</span>
        </div>
      </div>
    </div>
  )
}

// ── EARNINGS ──────────────────────────────────────────────────────
export function EarningsPage() {
  const navigate = useNavigate()
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const heights = [40, 65, 50, 90, 55, 70, 45]
  const transactions = [
    { date: '24 Feb 2026', label: 'Order #FFC- 12345', amount: '+₹1,200', positive: true },
    { date: '23 Feb 2026', label: 'Bank Payout', amount: '-₹4,500', positive: false },
    { date: '22 Feb 2026', label: 'Order #FFC- 12238', amount: '+₹800', positive: true },
  ]
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div className="page-header" style={{ background: 'var(--bg)' }}>
        <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={20} weight="bold" /></button>
        <span style={{ fontSize: 18, fontWeight: 700 }}>Earnings</span>
      </div>
      <div style={{ padding: '8px 16px 100px' }}>
        {/* Total earnings card */}
        <div style={{ background: 'var(--primary)', borderRadius: '16px', padding: '24px 20px', marginBottom: 16, color: 'white' }}>
          <div style={{ fontSize: 13, fontWeight: 600, opacity: 0.8, marginBottom: 6 }}>Total Earnings</div>
          <div style={{ fontSize: 36, fontWeight: 800, marginBottom: 10 }}>₹45,200</div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.2)', padding: '5px 12px', borderRadius: 20, fontSize: 13, fontWeight: 600 }}>
             12% increase from last month
          </div>
        </div>

        {/* Income breakdown */}
        <div style={{ background: 'white', borderRadius: '16px', padding: 16, marginBottom: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 14 }}>Income Breakdown</div>
          <div style={{ display: 'flex', gap: 12 }}>
            {[{ icon: <ShoppingBag size={20} />, label: 'PRODUCT SALES', value: '₹10,000', sub: 'This month' },
              { icon: <Tractor size={20} />, label: 'MATERIAL SALES', value: '₹13,200', sub: 'This month' }].map(c => (
              <div key={c.label} style={{ flex: 1, background: 'var(--bg)', borderRadius: '12px', padding: '14px 12px', textAlign: 'center' }}>
                <div style={{ fontSize: 22, marginBottom: 4 }}>{c.icon}</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{c.label}</div>
                <div style={{ fontSize: 18, fontWeight: 800, margin: '4px 0 2px' }}>{c.value}</div>
                <div style={{ fontSize: 11, color: 'var(--text-subtle)' }}>{c.sub}</div>
              </div>
            ))}
          </div>

          {/* Bar chart */}
          <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 80, marginTop: 20, paddingTop: 10 }}>
            {days.map((d, i) => (
              <div key={d} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ width: '100%', background: i === 3 ? 'var(--primary)' : 'var(--primary-light)', borderRadius: '4px 4px 0 0', height: `${heights[i]}%`, minHeight: 4 }} />
                <span style={{ fontSize: 9, color: i === 3 ? 'var(--primary)' : 'var(--text-subtle)', fontWeight: i === 3 ? 700 : 400 }}>{d}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent transactions */}
        <div style={{ background: 'white', borderRadius: '16px', padding: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ fontWeight: 700, fontSize: 16 }}>Recent Transactions</span>
            <button onClick={() => navigate('/farmer/transactions')} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font)' }}>See All</button>
          </div>
          {transactions.map((t, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < transactions.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: t.positive ? 'var(--primary-light)' : '#ffebee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                  {t.positive ? <Plus size={14} color='var(--primary)' /> : <Bank size={14} />}
                </div>
                <div>
                  <div style={{ fontSize: 12, color: 'var(--text-subtle)', marginBottom: 2 }}>{t.date}</div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{t.label}</div>
                </div>
              </div>
              <div style={{ fontWeight: 700, fontSize: 15, color: t.positive ? 'var(--primary)' : 'var(--error)' }}>{t.amount}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── TRANSACTION HISTORY ───────────────────────────────────────────
export function TransactionHistoryPage() {
  const navigate = useNavigate()
  const transactions = [
    { date: '24 Feb 2026', label: 'Order #FFC- 12345', amount: '+₹1,200', positive: true },
    { date: '23 Feb 2026', label: 'Bank Payout', amount: '-₹4,500', positive: false },
    { date: '22 Feb 2026', label: 'Order #FFC- 12238', amount: '+₹800', positive: true },
    { date: '21 Feb 2026', label: 'Order #FFC- 12355', amount: '+₹2,200', positive: true },
    { date: '19 Feb 2026', label: 'Order #FFC- 12365', amount: '+₹4,200', positive: true },
  ]
  return (
    <div style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={20} weight="bold" /></button>
        <span style={{ fontSize: 18, fontWeight: 700 }}>Transaction History</span>
        <button className="icon-btn" style={{ marginLeft: 'auto' }}><Funnel size={20} /></button>
      </div>
      <div style={{ paddingBottom: 100 }}>
        {transactions.map((t, i) => (
          <div key={i} onClick={() => navigate('/farmer/transaction/1')}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid var(--border)', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 42, height: 42, borderRadius: '50%', background: t.positive ? 'var(--primary-light)' : '#ffebee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                {t.positive ? <Plus size={14} color='var(--primary)' /> : <Bank size={14} />}
              </div>
              <div>
                <div style={{ fontSize: 13, color: 'var(--text-subtle)', marginBottom: 2 }}>{t.date}</div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{t.label}</div>
              </div>
            </div>
            <div style={{ fontWeight: 700, fontSize: 16, color: t.positive ? 'var(--primary)' : 'var(--error)' }}>{t.amount}</div>
          </div>
        ))}
      </div>
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 430, padding: '16px 20px 32px', background: 'white', boxShadow: '0 -2px 20px rgba(0,0,0,0.08)' }}>
        <button className="btn btn-primary">Export Statement</button>
      </div>
    </div>
  )
}

// ── TRANSACTION DETAIL ────────────────────────────────────────────
export function TransactionDetailPage() {
  const navigate = useNavigate()
  return (
    <div style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={20} weight="bold" /></button>
        <span style={{ fontSize: 18, fontWeight: 700 }}>Transaction Details</span>
      </div>
      <div style={{ padding: '28px 20px 100px', textAlign: 'center' }}>
        {/* Amount */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Check size={32} color="var(--primary)" weight="bold" />
          </div>
          <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--primary)' }}>+₹2,400</div>
          <span style={{ fontSize: 12, fontWeight: 700, background: 'var(--primary-light)', color: 'var(--primary)', padding: '4px 14px', borderRadius: 20, marginTop: 8, display: 'inline-block' }}>SETTLED</span>
          <div style={{ fontSize: 13, color: 'var(--text-subtle)', marginTop: 8 }}>Transaction ID: TXN_FF_99210</div>
          <div style={{ fontSize: 12, color: 'var(--text-subtle)', marginTop: 3 }}>Oct 24, 2023, 10:45 AM</div>
        </div>

        {/* Details */}
        <div style={{ background: 'var(--bg)', borderRadius: '16px', padding: '20px', textAlign: 'left', marginBottom: 16 }}>
          {[
            { label: 'Category', value: 'Produce Sales' },
            { label: 'Order Reference', value: '#FF1023' },
          ].map(r => (
            <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14, paddingBottom: 14, borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: 14, color: 'var(--text-subtle)' }}>{r.label}</span>
              <span style={{ fontWeight: 600, fontSize: 14 }}>{r.value}</span>
            </div>
          ))}
        </div>

        {/* Breakdown */}
        <div style={{ background: 'var(--bg)', borderRadius: '16px', padding: '20px', textAlign: 'left', marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 14 }}>BREAKDOWN</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Organic Tomatoes (20kg)</div>
              <div style={{ fontSize: 12, color: 'var(--text-subtle)' }}>Unit Price: ₹120/kg</div>
            </div>
            <div style={{ fontWeight: 700, fontSize: 15 }}>₹2,400</div>
          </div>
        </div>

        {/* Bank */}
        <div style={{ background: 'var(--bg)', borderRadius: '16px', padding: '16px 20px', textAlign: 'left', marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ fontSize: 24 }}><Bank size={20} /></div>
            <div>
              <div style={{ fontSize: 12, color: 'var(--text-subtle)', marginBottom: 2 }}>Payment Mode</div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>HDFC Bank</div>
              <div style={{ fontSize: 12, color: 'var(--text-subtle)' }}>Settled to Primary Account</div>
            </div>
          </div>
        </div>

        <button className="btn btn-primary">Download Receipt</button>
      </div>
    </div>
  )
}