import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  CaretLeft, CaretRight, Check, CheckCircle, X, MapPin, CreditCard, Phone, ChatCircle, CalendarBlank, Truck, Package, ClipboardText, Star, Bell, DotsThreeVertical, User
} from '@phosphor-icons/react'
import { FarmerBottomNav } from './FarmerOnboardingPages'
import tomatoImg from '../assets/product-tomatoes.png'
import spinachImg from '../assets/product-spinach.jpg'
import carrotImg from '../assets/product-carrot.jpg'
import { TopNav, PageHeader } from '../components/UI'

// ── ORDER LIST ────────────────────────────────────────────────────
export function FarmerOrdersListPage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('All')
  const tabs = ['All', 'New', 'Preparing', 'Ready for Pickup', 'Out f…']

  const allOrders = [
    { id: '#FF1023', buyer: 'Rajesh Kumar', items: 3, time: 'Today at 1:30 PM', amount: 450, status: 'New' },
    { id: '#FF1024', buyer: 'Vinay Sharma', items: 3, time: 'Today at 1:30 PM', amount: 450, status: 'Preparing' },
    { id: '#FF1025', buyer: 'Anita Patel',  items: 2, time: 'Today at 2:00 PM', amount: 280, status: 'Ready' },
    { id: '#FF1026', buyer: 'Suresh Mehta', items: 4, time: 'Today at 11:00 AM', amount: 620, status: 'Out for Delivery' },
    { id: '#FF1027', buyer: 'Priya Singh',  items: 1, time: 'Yesterday at 4:00 PM', amount: 150, status: 'Completed' },
    { id: '#FF1028', buyer: 'Ravi Kumar',   items: 2, time: 'Yesterday at 2:30 PM', amount: 320, status: 'Cancelled' },
  ]

  const tabStatusMap = {
    'All': null,
    'New': 'New',
    'Preparing': 'Preparing',
    'Ready for Pickup': 'Ready',
    'Out f…': 'Out for Delivery',
  }

  const orders = tab === 'All' ? allOrders : allOrders.filter(o => o.status === tabStatusMap[tab])

  const statusStyle = {
    'New':              { bg: '#fff8e1', color: '#f57f17' },
    'Preparing':        { bg: 'var(--primary-light)', color: 'var(--primary)' },
    'Ready':            { bg: '#e3f2fd', color: '#1565c0' },
    'Out for Delivery': { bg: '#f3e5f5', color: '#7b1fa2' },
    'Completed':        { bg: '#e8f5e9', color: 'var(--primary-dark)' },
    'Cancelled':        { bg: '#ffebee', color: 'var(--error)' },
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ background: 'white', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={20} weight="bold" /></button>
          <span style={{ fontSize: 18, fontWeight: 700 }}>Orders</span>
        </div>
        <button className="icon-btn"><Bell size={22} /></button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', overflowX: 'auto', background: 'white', borderBottom: '1px solid var(--border)', scrollbarWidth: 'none', paddingLeft: 10 }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)}
            style={{ flexShrink: 0, padding: '13px 16px', background: 'none', border: 'none', borderBottom: `2px solid ${tab === t ? 'var(--primary)' : 'transparent'}`, color: tab === t ? 'var(--primary)' : 'var(--text-subtle)', fontWeight: tab === t ? 700 : 500, fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font)', whiteSpace: 'nowrap' }}>
            {t}
          </button>
        ))}
      </div>

      <div className="screen" style={{ paddingBottom: 100 }}>
        {orders.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-subtle)' }}>
            <Package size={48} color="var(--border)" style={{ marginBottom: 12 }} />
            <div style={{ fontWeight: 600, fontSize: 15 }}>No orders in this category</div>
          </div>
        )}
        {orders.map((o, i) => (
          <div key={i} style={{ background: 'white', margin: '12px 16px', borderRadius: '16px', padding: '16px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', cursor: 'pointer' }}
            onClick={() => navigate(`/farmer/order/${o.id.replace('#','')}`)}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 12 }}>
              <div style={{ width: 52, height: 52, borderRadius: '8px', overflow: 'hidden', background: 'var(--primary-light)', flexShrink: 0 }}><img src={tomatoImg} alt="order" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-subtle)', background: 'var(--bg)', padding: '2px 8px', borderRadius: 6 }}>Produce</span>
                    <span style={{ fontSize: 12, color: 'var(--text-subtle)', marginLeft: 6 }}>{o.id}</span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 20,
                    background: (statusStyle[o.status] || statusStyle['New']).bg,
                    color: (statusStyle[o.status] || statusStyle['New']).color }}>
                    {o.status}
                  </span>
                </div>
                <div style={{ fontWeight: 700, fontSize: 15, marginTop: 6 }}>{o.buyer}</div>
                <div style={{ fontSize: 12, color: 'var(--text-subtle)', marginTop: 2 }}>{o.items} Items • {o.time}</div>
                <div style={{ fontWeight: 700, fontSize: 15, marginTop: 4 }}>Rs. {o.amount}</div>
              </div>
            </div>
            <button className="btn btn-primary" style={{ padding: '11px' }} onClick={e => { e.stopPropagation(); navigate(`/farmer/order/${o.id.replace('#','')}`) }}>
              View Details
            </button>
          </div>
        ))}
      </div>
      <FarmerBottomNav active="orders" />
    </div>
  )
}

// ── ORDER DETAIL BASE ─────────────────────────────────────────────
function OrderDetailBase({ status, statusColor, children, cta, ctaSecondary, ctaAction, ctaSecondaryAction, showCancelBtn = false, navigate, id }) {
  const items = [
    { name: 'Fresh Lettuce', qty: '2Kg @ 80/kg', price: 'Rs 160' },
    { name: 'Organic Tomatoes', qty: '1.5Kg @ 60/kg', price: 'Rs 90' },
    { name: 'Spinach Bundle', qty: '1 Bundle @ 40 per bundle', price: 'Rs 40' },
  ]

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ background: 'white', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={20} weight="bold" /></button>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>Order #{id}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: statusColor || 'var(--text-subtle)' }}>{status}</div>
          </div>
        </div>
        <button className="icon-btn"><DotsThreeVertical size={22} /></button>
      </div>

      <div style={{ padding: '12px 16px 100px' }}>
        {/* Order header card */}
        <div style={{ background: 'white', borderRadius: '16px', padding: 16, marginBottom: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Fresh Farm Campus</div>
          <div style={{ fontSize: 13, color: 'var(--text-subtle)' }}>Order Id: #{id}</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            <span style={{ background: 'var(--primary-light)', color: 'var(--primary)', fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 8 }}>Produce</span>
            <span style={{ fontSize: 12, color: 'var(--text-subtle)' }}>Today at 1:30 PM</span>
          </div>
        </div>

        {/* Buyer */}
        <div style={{ background: 'white', borderRadius: '16px', padding: 16, marginBottom: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-subtle)', marginBottom: 12 }}>Buyers Information</div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}><User size={20} /></div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>Rajesh Kumar</div>
              <div style={{ fontSize: 12, color: 'var(--text-subtle)' }}>Hostel Room no.122, KRMU</div>
              <div style={{ fontSize: 12, color: 'var(--text-subtle)' }}>+91 8750567277</div>
            </div>
          </div>
        </div>

        {/* Extra content (tracking, etc.) */}
        {children}

        {/* Items */}
        <div style={{ background: 'white', borderRadius: '16px', padding: 16, marginBottom: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-subtle)', marginBottom: 12 }}>Items Ordered</div>
          {items.map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < items.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{item.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-subtle)', marginTop: 2 }}>{item.qty}</div>
              </div>
              <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--primary)' }}>{item.price}</div>
            </div>
          ))}
        </div>

        {/* Payment info for some states */}
        {status === 'New' && (
          <div style={{ background: 'white', borderRadius: '16px', padding: 16, marginBottom: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ flex: 1, borderRight: '1px solid var(--border)', paddingRight: 12 }}>
                <div style={{ fontSize: 11, color: 'var(--text-subtle)' }}>Delivery Method</div>
                <div style={{ fontWeight: 600, fontSize: 13, marginTop: 4 }}>🚚 Campus Delivery</div>
                <div style={{ fontSize: 11, color: 'var(--error)', marginTop: 2 }}>Partner not assigned</div>
              </div>
              <div style={{ flex: 1, paddingLeft: 12 }}>
                <div style={{ fontSize: 11, color: 'var(--text-subtle)' }}>Payment</div>
                <div style={{ display:"flex", alignItems:"center", gap:5, fontWeight: 600, fontSize: 13, marginTop: 4 }}><CreditCard size={14} /> Credit Card</div>
                <div style={{ display:"flex", alignItems:"center", gap:5, fontSize: 11, color: 'var(--primary)', marginTop: 2 }}><CheckCircle size={12} weight="fill" color="var(--primary)" /> Paid</div>
              </div>
            </div>
          </div>
        )}

        {/* Subtotal for preparing/pickup/delivery */}
        {['Preparing', 'Ready for Pickup', 'Out for Delivery'].includes(status) && (
          <div style={{ background: 'white', borderRadius: '16px', padding: 16, marginBottom: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            {[['Subtotal', 'Rs 160'], ['Service Charge', 'Rs 20']].map(([l, v]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 14, color: 'var(--text-subtle)' }}>{l}</span>
                <span style={{ fontSize: 14 }}>{v}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 15, borderTop: '1px solid var(--border)', paddingTop: 10 }}>
              <span>Total</span><span>Rs 180</span>
            </div>
          </div>
        )}

        {/* CTAs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
          {cta && <button className="btn btn-primary" onClick={ctaAction}>{cta}</button>}
          {ctaSecondary && <button className="btn btn-outline" onClick={ctaSecondaryAction}>{ctaSecondary}</button>}
          {showCancelBtn && (
            <button onClick={ctaSecondaryAction}
              style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--error)', fontWeight: 600, fontSize: 14, fontFamily: 'var(--font)', padding: '8px 0' }}>
              <X size={16} /> Cancel Order
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ── TRACKING STEPS ────────────────────────────────────────────────
function TrackingSteps({ currentStep }) {
  const steps = [
    { label: 'Order Placed', time: '12:30 PM' },
    { label: 'Packed', time: '12:45 PM' },
    { label: 'Out for Delivery', time: "Rahul is on his way", sub: true },
    { label: 'Delivered', time: 'Pending' },
  ]
  return (
    <div style={{ background: 'white', borderRadius: '16px', padding: 16, marginBottom: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
      {steps.map((s, i) => (
        <div key={i} className="tracking-step">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className={`step-dot ${i <= currentStep ? 'done' : 'pending'}`}>
              {i <= currentStep ? <Check size={13} color="white" weight="bold" /> : <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--text-subtle)' }} />}
            </div>
            {i < steps.length - 1 && <div className={`step-line ${i < currentStep ? 'done' : ''}`} />}
          </div>
          <div style={{ paddingTop: 2 }}>
            <div style={{ fontWeight: i <= currentStep ? 700 : 400, fontSize: 14, color: i <= currentStep ? 'var(--text-dark)' : 'var(--text-subtle)' }}>{s.label}</div>
            <div style={{ fontSize: 12, color: 'var(--text-subtle)', marginTop: 2 }}>{s.time}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function OrderDetailNewPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [showCancel, setShowCancel] = useState(false)
  return (
    <>
      <OrderDetailBase status="New" statusColor="var(--text-subtle)" navigate={navigate} id={id}
        cta="Start Preparing" ctaAction={() => navigate(`/farmer/order/${id}/preparing`)}
        showCancelBtn ctaSecondaryAction={() => setShowCancel(true)} />
      {showCancel && <CancelOrderModal onClose={() => setShowCancel(false)} onConfirm={() => navigate(`/farmer/order/${id}/cancelled`)} />}
    </>
  )
}

export function OrderDetailPreparingPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  return (
    <OrderDetailBase status="Preparing" statusColor="var(--primary)" navigate={navigate} id={id}
      cta="Mark Ready" ctaAction={() => navigate(`/farmer/order/${id}/ready`)}>
      <div style={{ background: 'white', borderRadius: '16px', padding: 16, marginBottom: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-subtle)' }}>Status</div>
          <span style={{ background: 'var(--primary-light)', color: 'var(--primary)', fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 8 }}>65% Prepared</span>
        </div>
        <div style={{ height: 8, borderRadius: 4, background: 'var(--bg)', overflow: 'hidden' }}>
          <div style={{ width: '65%', height: '100%', background: 'var(--primary)', borderRadius: 4 }} />
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:5, fontSize: 12, color: 'var(--text-subtle)', marginTop: 8 }}><MapPin size={12} weight="fill" /> Fresh Farm Campus - Main Kitchen</div>
      </div>
      <TrackingSteps currentStep={1} />
    </OrderDetailBase>
  )
}

export function OrderDetailReadyPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  return (
    <OrderDetailBase status="Ready to pickup" statusColor="var(--primary)" navigate={navigate} id={id}
      cta="Track Delivery Partner" ctaAction={() => navigate(`/farmer/order/${id}/delivery`)}>
      <TrackingSteps currentStep={2} />
    </OrderDetailBase>
  )
}

export function OrderDetailDeliveryPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  return (
    <OrderDetailBase status="Out for Delivery" statusColor="var(--primary)" navigate={navigate} id={id}
      cta="Track Delivery Partner" ctaAction={() => {}}>
      <TrackingSteps currentStep={2} />
      <div style={{ background: 'white', borderRadius: '16px', padding: 16, marginBottom: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--primary-light)', fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🧑</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Rahul Sharma</div>
            <div style={{ fontSize: 12, color: 'var(--text-subtle)' }}>On the way to you</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="contact-btn"><Phone size={16} /></button>
          <button className="contact-btn"><ChatCircle size={16} /></button>
        </div>
      </div>
    </OrderDetailBase>
  )
}

export function OrderDetailCancelledPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ background: 'white', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={20} weight="bold" /></button>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>Order #{id}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--error)' }}>Cancelled</div>
          </div>
        </div>
        <button className="icon-btn"><DotsThreeVertical size={22} /></button>
      </div>
      <div style={{ padding: '12px 16px 100px' }}>
        <div style={{ background: 'white', borderRadius: '16px', padding: 16, marginBottom: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Fresh Farm Campus</div>
          <div style={{ fontSize: 13, color: 'var(--text-subtle)', marginBottom: 8 }}>Order Id: #{id}</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <span style={{ background: 'var(--primary-light)', color: 'var(--primary)', fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 8 }}>Produce</span>
            <span style={{ fontSize: 12, color: 'var(--text-subtle)' }}>Mar 30, 2026</span>
          </div>
        </div>
        <div style={{ background: 'white', borderRadius: '16px', padding: 16, marginBottom: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <X size={18} color="var(--error)" weight="bold" />
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-subtle)', textTransform: 'uppercase' }}>REASON FOR CANCELLATION</span>
          </div>
          <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 16 }}>Out of Stock</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <CalendarBlank size={18} color="var(--text-subtle)" />
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-subtle)', textTransform: 'uppercase' }}>CANCELLED DATE</span>
          </div>
          <div style={{ fontWeight: 600, fontSize: 14, marginTop: 6 }}>Mar 30, 2026 • 12:45 PM</div>
        </div>
        <div style={{ background: 'white', borderRadius: '16px', padding: 16, marginBottom: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-subtle)', marginBottom: 12 }}>Buyers Information</div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}><User size={20} /></div>
            <div>
              <div style={{ fontWeight: 700 }}>Rajesh Kumar</div>
              <div style={{ fontSize: 12, color: 'var(--text-subtle)' }}>Hostel Room no.122, KRMU</div>
              <div style={{ fontSize: 12, color: 'var(--text-subtle)' }}>+91 8750567277</div>
            </div>
          </div>
        </div>
        {/* Items */}
        <div style={{ background: 'white', borderRadius: '16px', padding: 16, marginBottom: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-subtle)', marginBottom: 12 }}>Items Ordered</div>
          {[['Fresh Lettuce', '2Kg @ 80/kg', '', 'Rs 160'], ['Organic Tomatoes', '1.5Kg @ 60/kg', '', 'Rs 90'], ['Spinach Bundle', '1 Bundle @ 40 per bundle', '', 'Rs 40']].map(([n, q, e, p], i) => (
            <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: i < 2 ? '1px solid var(--border)' : 'none', alignItems: 'center' }}>
              <span style={{ fontSize: 24 }}>{e}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{n}</div>
                <div style={{ fontSize: 12, color: 'var(--text-subtle)' }}>{q}</div>
              </div>
              <div style={{ fontWeight: 700, color: 'var(--primary)' }}>{p}</div>
            </div>
          ))}
        </div>
        <div style={{ background: 'white', borderRadius: '16px', padding: '14px 16px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, cursor: 'pointer' }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14 }}>❓ Need help with this order?</div>
            <div style={{ fontSize: 12, color: 'var(--text-subtle)', marginTop: 2 }}>Encountering technical problems? Let us know and we'll fix it.</div>
          </div>
          <span style={{ fontSize: 18, color: 'var(--text-subtle)' }}>›</span>
        </div>
      </div>
    </div>
  )
}

export function OrderDetailCompletedPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ background: 'white', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={20} weight="bold" /></button>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>Order #{id}</div>
            <div style={{ fontSize: 12, color: 'var(--text-subtle)' }}>Delivered on October 24, 2023</div>
          </div>
        </div>
        <button className="icon-btn"><DotsThreeVertical size={22} /></button>
      </div>
      <div style={{ padding: '12px 16px 100px' }}>
        <div style={{ background: 'white', borderRadius: '16px', padding: '28px 16px', textAlign: 'center', marginBottom: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
            <Check size={32} color="white" weight="bold" />
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Order Delivered</div>
          <div style={{ fontSize: 14, color: 'var(--text-subtle)' }}>Your Order has been delivered</div>
        </div>

        {/* Tracking complete */}
        <div style={{ background: 'white', borderRadius: '16px', padding: 16, marginBottom: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          {[
            { label: 'Order Placed', time: '12:30 PM', done: true },
            { label: 'Packed', time: '12:45 PM', done: true },
            { label: 'Delivered', time: 'Delivered date: October 24, 2023 • 2:45 PM', done: true },
            { label: 'Payment Received', time: 'Transaction ID: FFC-TXN-99210', done: true },
          ].map((s, i, arr) => (
            <div key={i} className="tracking-step">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="step-dot done"><Check size={12} color="white" weight="bold" /></div>
                {i < arr.length - 1 && <div className="step-line done" />}
              </div>
              <div style={{ paddingTop: 2 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{s.label}</div>
                <div style={{ fontSize: 12, color: 'var(--text-subtle)', marginTop: 2 }}>{s.time}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: 'white', borderRadius: '16px', padding: 16, marginBottom: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-subtle)', marginBottom: 12 }}>Buyers Information</div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}><User size={20} /></div>
            <div>
              <div style={{ fontWeight: 700 }}>Rajesh Kumar</div>
              <div style={{ fontSize: 12, color: 'var(--text-subtle)' }}>Hostel Room no.122, KRMU</div>
              <div style={{ fontSize: 12, color: 'var(--text-subtle)' }}>+91 8750567277</div>
            </div>
          </div>
        </div>
        <button className="btn btn-primary">Download Receipt</button>
      </div>
    </div>
  )
}

// ── CANCEL ORDER MODAL ────────────────────────────────────────────
function CancelOrderModal({ onClose, onConfirm }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="modal-handle" />
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#ffebee', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
            <X size={28} color="var(--error)" weight="bold" />
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>Cancel Order</div>
          <div style={{ fontSize: 14, color: 'var(--text-subtle)', lineHeight: 1.6 }}>
            Please select a reason for canceling this order for <strong style={{ color: 'var(--primary)' }}>Fresh Farm Campus.</strong>
          </div>
        </div>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Reason for cancellation</div>
          <select style={{ width: '100%', padding: 14, border: '1.5px solid var(--border)', borderRadius: '12px', fontFamily: 'var(--font)', fontSize: 14, background: 'white', outline: 'none' }}>
            <option>Select a reason</option>
            <option>Out of Stock</option>
            <option>Price Change</option>
            <option>Delivery Issue</option>
            <option>Customer Request</option>
          </select>
        </div>
        <button className="btn btn-primary" onClick={onConfirm} style={{ marginBottom: 12 }}>Cancel Order</button>
        <button className="btn btn-outline" onClick={onClose}>Go Back</button>
      </div>
    </div>
  )
}
