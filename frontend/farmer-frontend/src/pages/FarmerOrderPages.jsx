import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CaretLeft, DotsThreeVertical, Bell, Check,
  Phone, ChatCircle, MapPin, Package, X
} from '@phosphor-icons/react'
import { FarmerBottomNav } from './FarmerOnboardingPages'

// ── ORDER LIST ────────────────────────────────────────────────────
export function FarmerOrdersListPage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('All')
  const tabs = ['All', 'New', 'Preparing', 'Ready for Pickup', 'Out f…']

  const orders = [
    { id: '#FF1023', buyer: 'Rajesh Kumar', items: 3, time: 'Today at 1:30 PM', amount: 450, status: 'New', img: '🥬' },
    { id: '#FF1024', buyer: 'Vinay Sharma', items: 3, time: 'Today at 1:30 PM', amount: 450, status: 'Preparing', img: '🥬' },
    { id: '#FF1024', buyer: 'Vinay Sharma', items: 3, time: 'Today at 1:30 PM', amount: 450, status: 'Ready', img: '🥬' },
  ]

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
            style={{ flexShrink: 0, padding: '13px 16px', background: 'none', border: 'none', borderBottom: `2px solid ${tab === t ? 'var(--green-main)' : 'transparent'}`, color: tab === t ? 'var(--green-main)' : 'var(--text-light)', fontWeight: tab === t ? 700 : 500, fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font)', whiteSpace: 'nowrap' }}>
            {t}
          </button>
        ))}
      </div>

      <div className="screen" style={{ paddingBottom: 100 }}>
        {orders.map((o, i) => (
          <div key={i} style={{ background: 'white', margin: '12px 16px', borderRadius: 'var(--radius-lg)', padding: '16px', boxShadow: 'var(--shadow-sm)', cursor: 'pointer' }}
            onClick={() => navigate('/farmer/order/FF1023')}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 12 }}>
              <div style={{ width: 52, height: 52, borderRadius: 'var(--radius-sm)', background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>{o.img}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-light)', background: 'var(--bg)', padding: '2px 8px', borderRadius: 6 }}>Produce</span>
                    <span style={{ fontSize: 12, color: 'var(--text-light)', marginLeft: 6 }}>{o.id}</span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 20,
                    background: o.status === 'New' ? '#fff8e1' : o.status === 'Preparing' ? '#e8f5e9' : '#e3f2fd',
                    color: o.status === 'New' ? '#f57f17' : o.status === 'Preparing' ? 'var(--green-main)' : '#1565c0' }}>
                    {o.status}
                  </span>
                </div>
                <div style={{ fontWeight: 700, fontSize: 15, marginTop: 6 }}>{o.buyer}</div>
                <div style={{ fontSize: 12, color: 'var(--text-light)', marginTop: 2 }}>{o.items} Items • {o.time}</div>
                <div style={{ fontWeight: 700, fontSize: 15, marginTop: 4 }}>Rs. {o.amount}</div>
              </div>
            </div>
            <button className="btn btn-primary" style={{ padding: '11px' }} onClick={e => { e.stopPropagation(); navigate('/farmer/order/FF1023') }}>
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
function OrderDetailBase({ status, statusColor, children, cta, ctaSecondary, ctaAction, ctaSecondaryAction, showCancelBtn = false, navigate }) {
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
            <div style={{ fontSize: 16, fontWeight: 700 }}>Order #FF1023</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: statusColor || 'var(--text-light)' }}>{status}</div>
          </div>
        </div>
        <button className="icon-btn"><DotsThreeVertical size={22} /></button>
      </div>

      <div style={{ padding: '12px 16px 100px' }}>
        {/* Order header card */}
        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: 16, marginBottom: 12, boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Fresh Farm Campus</div>
          <div style={{ fontSize: 13, color: 'var(--text-light)' }}>Order Id: #FF1023</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            <span style={{ background: 'var(--green-light)', color: 'var(--green-main)', fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 8 }}>Produce</span>
            <span style={{ fontSize: 12, color: 'var(--text-light)' }}>Today at 1:30 PM</span>
          </div>
        </div>

        {/* Buyer */}
        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: 16, marginBottom: 12, boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-light)', marginBottom: 12 }}>Buyers Information</div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>👤</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>Rajesh Kumar</div>
              <div style={{ fontSize: 12, color: 'var(--text-light)' }}>Hostel Room no.122, KRMU</div>
              <div style={{ fontSize: 12, color: 'var(--text-light)' }}>+91 8750567277</div>
            </div>
          </div>
        </div>

        {/* Extra content (tracking, etc.) */}
        {children}

        {/* Items */}
        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: 16, marginBottom: 12, boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-mid)', marginBottom: 12 }}>Items Ordered</div>
          {items.map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < items.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{item.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-light)', marginTop: 2 }}>{item.qty}</div>
              </div>
              <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--green-main)' }}>{item.price}</div>
            </div>
          ))}
        </div>

        {/* Payment info for some states */}
        {status === 'New' && (
          <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: 16, marginBottom: 12, boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ flex: 1, borderRight: '1px solid var(--border)', paddingRight: 12 }}>
                <div style={{ fontSize: 11, color: 'var(--text-light)' }}>Delivery Method</div>
                <div style={{ fontWeight: 600, fontSize: 13, marginTop: 4 }}>🚚 Campus Delivery</div>
                <div style={{ fontSize: 11, color: 'var(--red)', marginTop: 2 }}>Partner not assigned</div>
              </div>
              <div style={{ flex: 1, paddingLeft: 12 }}>
                <div style={{ fontSize: 11, color: 'var(--text-light)' }}>Payment</div>
                <div style={{ fontWeight: 600, fontSize: 13, marginTop: 4 }}>💳 Credit Card</div>
                <div style={{ fontSize: 11, color: 'var(--green-main)', marginTop: 2 }}>✅ Paid</div>
              </div>
            </div>
          </div>
        )}

        {/* Subtotal for preparing/pickup/delivery */}
        {['Preparing', 'Ready for Pickup', 'Out for Delivery'].includes(status) && (
          <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: 16, marginBottom: 12, boxShadow: 'var(--shadow-sm)' }}>
            {[['Subtotal', 'Rs 160'], ['Service Charge', 'Rs 20']].map(([l, v]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 14, color: 'var(--text-light)' }}>{l}</span>
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
              style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--red)', fontWeight: 600, fontSize: 14, fontFamily: 'var(--font)', padding: '8px 0' }}>
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
    <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: 16, marginBottom: 12, boxShadow: 'var(--shadow-sm)' }}>
      {steps.map((s, i) => (
        <div key={i} className="tracking-step">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className={`step-dot ${i <= currentStep ? 'done' : 'pending'}`}>
              {i <= currentStep ? <Check size={13} color="white" weight="bold" /> : <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--text-light)' }} />}
            </div>
            {i < steps.length - 1 && <div className={`step-line ${i < currentStep ? 'done' : ''}`} />}
          </div>
          <div style={{ paddingTop: 2 }}>
            <div style={{ fontWeight: i <= currentStep ? 700 : 400, fontSize: 14, color: i <= currentStep ? 'var(--text-dark)' : 'var(--text-light)' }}>{s.label}</div>
            <div style={{ fontSize: 12, color: 'var(--text-light)', marginTop: 2 }}>{s.time}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function OrderDetailNewPage() {
  const navigate = useNavigate()
  const [showCancel, setShowCancel] = useState(false)
  return (
    <>
      <OrderDetailBase status="New" statusColor="var(--text-light)" navigate={navigate}
        cta="Start Preparing" ctaAction={() => navigate('/farmer/order/FF1023/preparing')}
        showCancelBtn ctaSecondaryAction={() => setShowCancel(true)} />
      {showCancel && <CancelOrderModal onClose={() => setShowCancel(false)} onConfirm={() => navigate('/farmer/order/FF1023/cancelled')} />}
    </>
  )
}

export function OrderDetailPreparingPage() {
  const navigate = useNavigate()
  return (
    <OrderDetailBase status="Preparing" statusColor="var(--green-main)" navigate={navigate}
      cta="Mark Ready" ctaAction={() => navigate('/farmer/order/FF1023/ready')}>
      <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: 16, marginBottom: 12, boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-mid)' }}>Status</div>
          <span style={{ background: 'var(--green-light)', color: 'var(--green-main)', fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 8 }}>65% Prepared</span>
        </div>
        <div style={{ height: 8, borderRadius: 4, background: 'var(--bg)', overflow: 'hidden' }}>
          <div style={{ width: '65%', height: '100%', background: 'var(--green-main)', borderRadius: 4 }} />
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-light)', marginTop: 8 }}>📍 Fresh Farm Campus - Main Kitchen</div>
      </div>
      <TrackingSteps currentStep={1} />
    </OrderDetailBase>
  )
}

export function OrderDetailReadyPage() {
  const navigate = useNavigate()
  return (
    <OrderDetailBase status="Ready to pickup" statusColor="var(--green-main)" navigate={navigate}
      cta="Track Delivery Partner" ctaAction={() => navigate('/farmer/order/FF1023/delivery')}>
      <TrackingSteps currentStep={2} />
    </OrderDetailBase>
  )
}

export function OrderDetailDeliveryPage() {
  const navigate = useNavigate()
  return (
    <OrderDetailBase status="Out for Delivery" statusColor="var(--green-mid)" navigate={navigate}
      cta="Track Delivery Partner" ctaAction={() => {}}>
      <TrackingSteps currentStep={2} />
      <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: 16, marginBottom: 12, boxShadow: 'var(--shadow-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--green-light)', fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🧑</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Rahul Sharma</div>
            <div style={{ fontSize: 12, color: 'var(--text-light)' }}>On the way to you</div>
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
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ background: 'white', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={20} weight="bold" /></button>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>Order #FF1023</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--red)' }}>Cancelled</div>
          </div>
        </div>
        <button className="icon-btn"><DotsThreeVertical size={22} /></button>
      </div>
      <div style={{ padding: '12px 16px 100px' }}>
        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: 16, marginBottom: 12, boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Fresh Farm Campus</div>
          <div style={{ fontSize: 13, color: 'var(--text-light)', marginBottom: 8 }}>Order Id: #FF1023</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <span style={{ background: 'var(--green-light)', color: 'var(--green-main)', fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 8 }}>Produce</span>
            <span style={{ fontSize: 12, color: 'var(--text-light)' }}>Mar 30, 2026</span>
          </div>
        </div>
        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: 16, marginBottom: 12, boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <X size={18} color="var(--red)" weight="bold" />
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase' }}>REASON FOR CANCELLATION</span>
          </div>
          <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 16 }}>Out of Stock</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 18 }}>📅</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase' }}>CANCELLED DATE</span>
          </div>
          <div style={{ fontWeight: 600, fontSize: 14, marginTop: 6 }}>Mar 30, 2026 • 12:45 PM</div>
        </div>
        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: 16, marginBottom: 12, boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-mid)', marginBottom: 12 }}>Buyers Information</div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>👤</div>
            <div>
              <div style={{ fontWeight: 700 }}>Rajesh Kumar</div>
              <div style={{ fontSize: 12, color: 'var(--text-light)' }}>Hostel Room no.122, KRMU</div>
              <div style={{ fontSize: 12, color: 'var(--text-light)' }}>+91 8750567277</div>
            </div>
          </div>
        </div>
        {/* Items */}
        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: 16, marginBottom: 12, boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-mid)', marginBottom: 12 }}>Items Ordered</div>
          {[['Fresh Lettuce', '2Kg @ 80/kg', '🥬', 'Rs 160'], ['Organic Tomatoes', '1.5Kg @ 60/kg', '🍅', 'Rs 90'], ['Spinach Bundle', '1 Bundle @ 40 per bundle', '🥬', 'Rs 40']].map(([n, q, e, p], i) => (
            <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: i < 2 ? '1px solid var(--border)' : 'none', alignItems: 'center' }}>
              <span style={{ fontSize: 24 }}>{e}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{n}</div>
                <div style={{ fontSize: 12, color: 'var(--text-light)' }}>{q}</div>
              </div>
              <div style={{ fontWeight: 700, color: 'var(--green-main)' }}>{p}</div>
            </div>
          ))}
        </div>
        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '14px 16px', boxShadow: 'var(--shadow-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, cursor: 'pointer' }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14 }}>❓ Need help with this order?</div>
            <div style={{ fontSize: 12, color: 'var(--text-light)', marginTop: 2 }}>Encountering technical problems? Let us know and we'll fix it.</div>
          </div>
          <span style={{ fontSize: 18, color: 'var(--text-light)' }}>›</span>
        </div>
      </div>
    </div>
  )
}

export function OrderDetailCompletedPage() {
  const navigate = useNavigate()
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ background: 'white', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={20} weight="bold" /></button>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>Order #FF1023</div>
            <div style={{ fontSize: 12, color: 'var(--text-light)' }}>Delivered on October 24, 2023</div>
          </div>
        </div>
        <button className="icon-btn"><DotsThreeVertical size={22} /></button>
      </div>
      <div style={{ padding: '12px 16px 100px' }}>
        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '28px 16px', textAlign: 'center', marginBottom: 12, boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--green-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
            <Check size={32} color="white" weight="bold" />
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Order Delivered</div>
          <div style={{ fontSize: 14, color: 'var(--text-light)' }}>Your Order has been delivered</div>
        </div>

        {/* Tracking complete */}
        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: 16, marginBottom: 12, boxShadow: 'var(--shadow-sm)' }}>
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
                <div style={{ fontSize: 12, color: 'var(--text-light)', marginTop: 2 }}>{s.time}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: 16, marginBottom: 20, boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-mid)', marginBottom: 12 }}>Buyers Information</div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>👤</div>
            <div>
              <div style={{ fontWeight: 700 }}>Rajesh Kumar</div>
              <div style={{ fontSize: 12, color: 'var(--text-light)' }}>Hostel Room no.122, KRMU</div>
              <div style={{ fontSize: 12, color: 'var(--text-light)' }}>+91 8750567277</div>
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
            <X size={28} color="var(--red)" weight="bold" />
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>Cancel Order</div>
          <div style={{ fontSize: 14, color: 'var(--text-light)', lineHeight: 1.6 }}>
            Please select a reason for canceling this order for <strong style={{ color: 'var(--green-main)' }}>Fresh Farm Campus.</strong>
          </div>
        </div>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Reason for cancellation</div>
          <select style={{ width: '100%', padding: 14, border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', fontFamily: 'var(--font)', fontSize: 14, background: 'white', outline: 'none' }}>
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
