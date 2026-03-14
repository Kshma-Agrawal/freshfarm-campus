import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CaretLeft, CaretRight, Bell, Headset, Plus, ListChecks,
  CurrencyInr, CalendarBlank, Package, Trash, Check,
  MagnifyingGlass, Phone, ChatCircle, ArrowUpRight
} from '@phosphor-icons/react'
import { FarmerBottomNav } from './FarmerOnboardingPages'

function LogoBar({ onNotif }) {
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
        <button className="icon-btn" onClick={onNotif}><Bell size={22} /></button>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, sub }) {
  return (
    <div style={{ flex: 1, background: 'white', borderRadius: 'var(--radius)', padding: '14px 12px', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
      <div style={{ fontSize: 20, marginBottom: 4 }}>{icon}</div>
      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
      <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-dark)', margin: '4px 0 2px' }}>{value}</div>
      <div style={{ fontSize: 11, color: 'var(--text-light)' }}>{sub}</div>
    </div>
  )
}

// ── HOME (AFTER VERIFICATION, NO PRODUCE) ─────────────────────────
export function FarmerHomeEmptyPage() {
  const navigate = useNavigate()
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <LogoBar onNotif={() => navigate('/farmer/notifications')} />
      <div className="screen">
        <div style={{ padding: '22px 20px 16px' }}>
          <div style={{ display: 'flex', gap: 10 }}>
            <StatCard icon="💰" label="Earnings" value="₹0" sub="No change" />
            <StatCard icon="📦" label="Orders" value="0" sub="This month" />
            <StatCard icon="🏠" label="Inventory" value="0 Items" sub="Items listed" />
          </div>
        </div>

        {/* Empty state */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 32px', textAlign: 'center' }}>
          <div style={{ fontSize: 72, marginBottom: 16, opacity: 0.25 }}>🛒</div>
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>No produce added yet</div>
          <div style={{ fontSize: 14, color: 'var(--text-light)', lineHeight: 1.7, marginBottom: 32 }}>
            Add your first produce to start selling and reach customers.
          </div>
          <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => navigate('/farmer/add-produce')}>
            Add Produce
          </button>
        </div>
      </div>
      <FarmerBottomNav active="home" />
    </div>
  )
}

// ── HOME (WITH INVENTORY) ─────────────────────────────────────────
export function FarmerHomePage() {
  const navigate = useNavigate()
  const orders = [
    { id: '#FFC-12345', amount: '₹420.50', date: '30 Mar, 12:31 pm', status: 'Pending', items: ['🥕', '🥬', '🥕'] },
    { id: '#FFC-12346', amount: '₹420.50', date: '30 Mar, 12:31 pm', status: 'Out For Delivery', items: ['🥬', '🥕'] },
  ]
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <LogoBar onNotif={() => navigate('/farmer/notifications')} />
      <div className="screen">
        <div style={{ padding: '22px 20px 16px' }}>
          <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 16 }}>Good Morning, Harpal</div>
          <div style={{ display: 'flex', gap: 10 }}>
            <StatCard icon="💰" label="Earnings" value="₹10,000" sub="This month" />
            <StatCard icon="📦" label="Orders" value="12 NEW" sub="This month" />
            <StatCard icon="🏠" label="Inventory" value="20 Items" sub="Items listed" />
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ padding: '0 20px 20px' }}>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Quick Actions</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <button onClick={() => navigate('/farmer/add-produce')}
              style={{ padding: '18px 14px', background: 'var(--green-main)', borderRadius: 'var(--radius)', border: 'none', cursor: 'pointer', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, fontFamily: 'var(--font)' }}>
              <Plus size={22} weight="bold" color="white" />
              <span style={{ fontWeight: 600, fontSize: 14 }}>Add Produce</span>
            </button>
            {[
              { icon: '📋', label: 'View Orders', path: '/farmer/orders' },
              { icon: '💰', label: 'Earnings', path: '/farmer/earnings' },
              { icon: '📅', label: 'Saved Crop Plans', path: '/farmer/crop-planning' },
            ].map(({ icon, label, path }) => (
              <button key={label} onClick={() => navigate(path)}
                style={{ padding: '18px 14px', background: 'white', borderRadius: 'var(--radius)', border: '1.5px solid var(--border)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, fontFamily: 'var(--font)' }}>
                <span style={{ fontSize: 22 }}>{icon}</span>
                <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-dark)' }}>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div style={{ padding: '0 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ fontSize: 16, fontWeight: 700 }}>Recent Orders</div>
            <button onClick={() => navigate('/farmer/orders')} style={{ background: 'none', border: 'none', color: 'var(--green-main)', fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font)' }}>See All</button>
          </div>
          {orders.map(o => (
            <div key={o.id} onClick={() => navigate('/farmer/order/FF1023')}
              style={{ background: 'white', borderRadius: 'var(--radius)', padding: 16, marginBottom: 12, boxShadow: 'var(--shadow-sm)', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>Order {o.id}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-light)', marginTop: 2 }}>{o.amount} · {o.date}</div>
                </div>
                <Trash size={18} color="var(--red)" style={{ cursor: 'pointer' }} />
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 20, background: o.status === 'Pending' ? '#fff8e1' : '#e8f5e9', color: o.status === 'Pending' ? '#f57f17' : 'var(--green-main)' }}>{o.status}</span>
              <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                {o.items.map((item, i) => (
                  <div key={i} style={{ width: 40, height: 40, borderRadius: 8, background: 'var(--green-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{item}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <FarmerBottomNav active="home" />
    </div>
  )
}

// ── NOTIFICATIONS ─────────────────────────────────────────────────
export function FarmerNotificationsPage() {
  const navigate = useNavigate()
  const todayNotifs = [
    { icon: '📦', title: 'Order #FFC-12345 Received', desc: 'A new order has been placed for Organic Kale. Please confirm pickup.', time: '2 mins ago', dot: true },
    { icon: '⚠️', title: 'Price Update Required', desc: 'Seasonal market prices for tomatoes have changed. Update your listings.', time: '1 hour ago', dot: true },
    { icon: '💳', title: 'Payout Initiated', desc: 'Your earnings for the week of Oct 12-19 (₹450.00) are on the way.', time: '4 hours ago', dot: false },
  ]
  const yesterdayNotifs = [
    { icon: '⭐', title: 'New 5-Star Review', desc: '"The freshest spinach on campus!" - Sarah J. left you a review.', time: 'Yesterday, 4:15 PM', dot: false },
    { icon: '🚚', title: 'Order #FFC-12100 Picked Up', desc: 'The student courier has collected the order for Engineering Block.', time: 'Yesterday, 11:30 AM', dot: false },
  ]

  return (
    <div style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={20} weight="bold" /></button>
        <span style={{ fontSize: 18, fontWeight: 700 }}>Notification</span>
      </div>

      <div style={{ padding: '4px 0' }}>
        <div style={{ padding: '12px 20px 6px', fontSize: 11, fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>TODAY</div>
        {todayNotifs.map((n, i) => (
          <div key={i} style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', gap: 14, alignItems: 'flex-start', background: n.dot ? 'var(--green-pale)' : 'white' }}>
            <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{n.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ fontWeight: 700, fontSize: 14, flex: 1, paddingRight: 8 }}>{n.title}</div>
                {n.dot && <div style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--green-main)', flexShrink: 0, marginTop: 5 }} />}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-light)', lineHeight: 1.5, marginTop: 3 }}>{n.desc}</div>
              <div style={{ fontSize: 11, color: 'var(--text-light)', marginTop: 5 }}>{n.time}</div>
            </div>
          </div>
        ))}

        <div style={{ padding: '16px 20px 6px', fontSize: 11, fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>YESTERDAY</div>
        {yesterdayNotifs.map((n, i) => (
          <div key={i} style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{n.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{n.title}</div>
              <div style={{ fontSize: 13, color: 'var(--text-light)', lineHeight: 1.5, marginTop: 3 }}>{n.desc}</div>
              <div style={{ fontSize: 11, color: 'var(--text-light)', marginTop: 5 }}>{n.time}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '20px' }}>
        <button className="btn btn-primary">Confirm Schedule</button>
        <button className="btn btn-outline" style={{ marginTop: 12 }}>Cancel</button>
      </div>
    </div>
  )
}

// ── HELP & SUPPORT ────────────────────────────────────────────────
export function HelpSupportPage() {
  const navigate = useNavigate()
  const faqs = ['How to track my payout?', 'Adding new produce', 'Update farm profile details', 'Order pickup schedule']

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div className="page-header" style={{ background: 'var(--bg)' }}>
        <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={20} weight="bold" /></button>
        <span style={{ fontSize: 18, fontWeight: 700 }}>Help & Support</span>
      </div>
      <div style={{ padding: '8px 20px 100px' }}>
        {/* Search */}
        <div className="search-wrap" style={{ padding: '0 0 16px' }}>
          <div className="search-inner">
            <MagnifyingGlass className="search-icon-pos" size={18} />
            <input placeholder="Search for help topics" />
          </div>
        </div>

        {/* FAQ */}
        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '18px', marginBottom: 16, boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <Headset size={20} color="var(--green-main)" />
            <span style={{ fontWeight: 700, fontSize: 16 }}>FAQ</span>
          </div>
          {faqs.map(f => (
            <div key={f} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border)', cursor: 'pointer' }}>
              <span style={{ fontSize: 14 }}>{f}</span>
              <CaretRight size={16} color="var(--text-light)" />
            </div>
          ))}
        </div>

        {/* Contact Us */}
        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '18px', marginBottom: 16, boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 14 }}>Contact Us</div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button style={{ flex: 1, padding: '16px', borderRadius: 'var(--radius)', border: '1.5px solid var(--border)', background: 'var(--bg)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, fontFamily: 'var(--font)' }}>
              <ChatCircle size={24} color="var(--green-main)" />
              <span style={{ fontSize: 13, fontWeight: 600 }}>Live Chat</span>
            </button>
            <button style={{ flex: 1, padding: '16px', borderRadius: 'var(--radius)', border: '1.5px solid var(--border)', background: 'var(--bg)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, fontFamily: 'var(--font)' }}>
              <Phone size={24} color="var(--green-main)" />
              <span style={{ fontSize: 13, fontWeight: 600 }}>Call Support</span>
            </button>
          </div>
        </div>

        {/* Report */}
        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '18px', boxShadow: 'var(--shadow-sm)', marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 18 }}>⚠️</span>
              <span style={{ fontWeight: 700, fontSize: 15 }}>Report an Issue</span>
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--green-main)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font)' }}>
              Open form <ArrowUpRight size={14} />
            </button>
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-light)', lineHeight: 1.6 }}>Encountering technical problems? Let us know and we'll fix it.</div>
        </div>

        <button className="btn btn-primary" onClick={() => navigate('/farmer/home')}>Go to Dashboard</button>
        <button className="btn btn-outline" style={{ marginTop: 12 }} onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  )
}
