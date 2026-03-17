import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Bell, Package, House, Leaf, ChartBar, ChatCircle, User, Truck, ClipboardText, Gear, MagnifyingGlass, ShoppingCart, Star, CurrencyDollar, MapPin, CaretLeft, CaretRight, Plus, Check, ArrowRight, Warning, Headset, Phone, Trash, ArrowSquareOut, CalendarBlank
} from '@phosphor-icons/react'
import { FarmerBottomNav } from './FarmerOnboardingPages'
import { TopNav, PageHeader } from '../components/UI'

function StatCard({ Icon, label, value, sub }) {
  return (
    <div className="stat-card">
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}>
        <Icon size={20} color="var(--primary)" />
      </div>
      <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-dark)', marginBottom: 2 }}>{value}</div>
      <div style={{ fontSize: 10, color: 'var(--text-subtle)' }}>{sub}</div>
    </div>
  )
}

// ── HOME EMPTY ────────────────────────────────────────────────────
export function FarmerHomeEmptyPage() {
  const navigate = useNavigate()
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <TopNav farmerMode={true} />
      <div className="screen">
        <div style={{ padding: '20px 16px 16px', display: 'flex', gap: 10 }}>
          <StatCard Icon={CurrencyDollar} label="Earnings" value="₹0" sub="No change" />
          <StatCard Icon={Package} label="Orders" value="0" sub="This month" />
          <StatCard Icon={ClipboardText} label="Inventory" value="0 Items" sub="Items listed" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: 64, marginBottom: 16, opacity: 0.2 }}><ShoppingCart size={20} /></div>
          <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>No produce added yet</div>
          <div style={{ fontSize: 13, color: 'var(--text-subtle)', lineHeight: 1.7, marginBottom: 28 }}>
            Add your first produce to start selling and reach customers.
          </div>
          <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => navigate('/farmer/add-produce')}>Add Produce</button>
        </div>
      </div>
      <FarmerBottomNav active="home" />
    </div>
  )
}

// ── HOME WITH INVENTORY ───────────────────────────────────────────
export function FarmerHomePage() {
  const navigate = useNavigate()
  const orders = [
    { id: '#FFC-12345', amount: '₹420.50', date: '30 Mar , 12:31 pm', status: 'Pending',         statusColor: '#f57f17', statusBg: '#fff8e1',
      imgs: ['https://images.unsplash.com/photo-1518977676405-3b7a4c3d3c92?w=80&q=80','https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=80&q=80','https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=80&q=80'] },
    { id: '#FFC-12345', amount: '₹420.50', date: '30 Mar , 12:31 pm', status: 'Out For Delivery', statusColor: 'var(--primary)', statusBg: 'var(--primary-light)',
      imgs: ['https://images.unsplash.com/photo-1518977676405-3b7a4c3d3c92?w=80&q=80','https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=80&q=80','https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=80&q=80'] },
  ]
  const quickActions = [
    { label: 'View Orders',      Icon: ClipboardText, path: '/farmer/orders',       green: false },
    { label: 'Earnings',         Icon: CurrencyDollar,   path: '/farmer/earnings',     green: false },
    { label: 'Saved Crop Plans', Icon: CalendarBlank, path: '/farmer/crop-planning', green: false },
  ]
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <TopNav farmerMode={true} />
      <div className="screen">
        {/* Stats */}
        <div style={{ padding: '20px 16px 16px' }}>
          <div style={{ display: 'flex', gap: 10 }}>
            <StatCard Icon={CurrencyDollar} label="Earnings" value="₹10,000" sub="This month" />
            <StatCard Icon={Package}     label="Orders"   value="12 NEW"  sub="This month" />
            <StatCard Icon={ClipboardText} label="Inventory" value="20 Items" sub="Items listed" />
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ padding: '0 16px 18px' }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Quick Actions</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {/* Add Produce – green */}
            <button onClick={() => navigate('/farmer/add-produce')}
              style={{ padding: '18px 14px', background: 'var(--primary)', borderRadius: '12px', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, fontFamily: 'var(--font)' }}>
              <Plus size={22} weight="bold" color="white" />
              <span style={{ fontWeight: 700, fontSize: 14, color: 'white' }}>Add Produce</span>
            </button>
            {quickActions.map(({ label, Icon, path }) => (
              <button key={label} onClick={() => navigate(path)}
                style={{ padding: '18px 14px', background: 'white', borderRadius: '12px', border: '1.5px solid var(--border)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, fontFamily: 'var(--font)' }}>
                <Icon size={22} color="var(--text-dark)" />
                <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-dark)', textAlign: 'center' }}>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div style={{ padding: '0 16px 18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Recent Orders</div>
            <button onClick={() => navigate('/farmer/orders')} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font)' }}>See All</button>
          </div>
          {orders.map((o, idx) => (
            <div key={idx} onClick={() => navigate('/farmer/order/1')}
              style={{ background: 'white', borderRadius: '12px', padding: '14px 14px', marginBottom: 10, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Check size={16} color="var(--primary)" weight="bold" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>Order {o.id}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-subtle)', marginTop: 1 }}>{o.amount} · {o.date}</div>
                  </div>
                </div>
                <Trash size={17} color="var(--error)" style={{ cursor: 'pointer', flexShrink: 0, marginTop: 2 }} />
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: o.statusBg, color: o.statusColor }}>{o.status}</span>
              <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                {o.imgs.map((src, i) => (
                  <div key={i} style={{ width: 44, height: 44, borderRadius: 8, overflow: 'hidden', background: 'var(--bg)' }}>
                    <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Inventory Status */}
        <div style={{ padding: '0 16px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Inventory Status</div>
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)' }}>85% capacity</span>
          </div>
          {[
            { label: 'Grains & Legumes', value: '450kg', pct: 80 },
            { label: 'Vegetables',       value: '120kg', pct: 30 },
          ].map(item => (
            <div key={item.label} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: 'var(--text-subtle)' }}>{item.label}</span>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{item.value}</span>
              </div>
              <div className="progress-bar-track">
                <div className="progress-bar-fill" style={{ width: `${item.pct}%` }} />
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
    { icon: <Package size={20} color="var(--primary)" />, title: 'Order #FFC-12345 Received', desc: 'A new order has been placed for Organic Kale. Please confirm pickup.', time: '2 mins ago', unread: true },
    { icon: <Warning size={20} color="var(--orange)" />, title: 'Price Update Required', desc: 'Seasonal market prices for tomatoes have changed. Update your listings.', time: '1 hour ago', unread: true },
    { icon: <CurrencyDollar size={20} color="var(--primary)" />, title: 'Payout Initiated', desc: 'Your earnings for the week of Oct 12-19 (₹450.00) are on the way.', time: '4 hours ago', unread: false },
  ]
  const yesterdayNotifs = [
    { icon: <span style={{ fontSize: 18 }}><Star size={16} weight="fill" color="#F4C652" /></span>, title: 'New 5-Star Review', desc: '"The freshest spinach on campus!" - Sarah J. left you a review.', time: 'Yesterday, 4:15 PM', unread: false },
    { icon: <Package size={20} color="var(--text-subtle)" />, title: 'Order #FFC-12100 Picked Up', desc: 'The student courier has collected the order for Engineering Block.', time: 'Yesterday, 11:30 AM', unread: false },
  ]

  const NotifRow = ({ n }) => (
    <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', display: 'flex', gap: 12, alignItems: 'flex-start', background: n.unread ? 'var(--primary-pale)' : 'white' }}>
      <div style={{ width: 40, height: 40, borderRadius: '50%', background: n.unread ? 'var(--primary-light)' : 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{n.icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 6 }}>
          <div style={{ fontWeight: 700, fontSize: 13, flex: 1 }}>{n.title}</div>
          {n.unread && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)', flexShrink: 0, marginTop: 4 }} />}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-subtle)', lineHeight: 1.5, marginTop: 3 }}>{n.desc}</div>
        <div style={{ fontSize: 11, color: 'var(--text-subtle)', marginTop: 5 }}>{n.time}</div>
      </div>
    </div>
  )

  return (
    <div style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={18} weight="bold" /></button>
        <span style={{ fontSize: 17, fontWeight: 700 }}>Notifications</span>
      </div>
      <div style={{ paddingBottom: 100 }}>
        <div style={{ padding: '12px 16px 6px', fontSize: 11, fontWeight: 700, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>TODAY</div>
        {todayNotifs.map((n, i) => <NotifRow key={i} n={n} />)}
        <div style={{ padding: '14px 16px 6px', fontSize: 11, fontWeight: 700, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>YESTERDAY</div>
        {yesterdayNotifs.map((n, i) => <NotifRow key={i} n={n} />)}
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
        <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={18} weight="bold" /></button>
        <span style={{ fontSize: 17, fontWeight: 700 }}>Help &amp; Support</span>
      </div>
      <div style={{ padding: '12px 16px 100px' }}>
        {/* Search */}
        <div className="search-bar" style={{ marginBottom: 16 }}>
          <MagnifyingGlass size={17} color="var(--text-subtle)" />
          <input placeholder="Search for help topics" />
        </div>

        {/* FAQ */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '16px 18px', marginBottom: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <Headset size={20} color="var(--primary)" />
            <span style={{ fontWeight: 700, fontSize: 15 }}>FAQ</span>
          </div>
          {faqs.map((f, i) => (
            <div key={f} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < faqs.length - 1 ? '1px solid var(--border)' : 'none', cursor: 'pointer' }}>
              <span style={{ fontSize: 14 }}>{f}</span>
              <CaretRight size={15} color="var(--text-subtle)" />
            </div>
          ))}
        </div>

        {/* Contact Us */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '16px 18px', marginBottom: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <Headset size={20} color="var(--primary)" />
            <span style={{ fontWeight: 700, fontSize: 15 }}>Contact Us</span>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button style={{ flex: 1, padding: '14px', borderRadius: '12px', border: '1.5px solid var(--border)', background: 'var(--bg)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, fontFamily: 'var(--font)' }}>
              <ChatCircle size={22} color="var(--primary)" />
              <span style={{ fontSize: 13, fontWeight: 700 }}>Live Chat</span>
            </button>
            <button style={{ flex: 1, padding: '14px', borderRadius: '12px', border: '1.5px solid var(--border)', background: 'var(--bg)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, fontFamily: 'var(--font)' }}>
              <Phone size={22} color="var(--primary)" />
              <span style={{ fontSize: 13, fontWeight: 700 }}>Call Support</span>
            </button>
          </div>
        </div>

        {/* Report an Issue */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '14px 18px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Warning size={18} color="var(--error)" />
              <span style={{ fontWeight: 700, fontSize: 14 }}>Report an Issue</span>
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font)' }}>
              Open form <ArrowSquareOut size={13} />
            </button>
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-subtle)', lineHeight: 1.6 }}>Encountering technical problems? Let us know and we'll fix it.</div>
        </div>

        <button className="btn btn-primary" onClick={() => navigate('/farmer/home')}>Go to Dashboard</button>
        <button className="btn btn-outline-grey" style={{ marginTop: 10 }} onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  )
}