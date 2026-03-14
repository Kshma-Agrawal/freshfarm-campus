import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CaretLeft, CaretRight, CaretDown, MagnifyingGlass,
  Bookmark, BookmarkSimple, ShareNetwork, TrendUp, ArrowUpRight
} from '@phosphor-icons/react'
import { FarmerBottomNav } from './FarmerOnboardingPages'

// ── COUNSELLING MAIN ──────────────────────────────────────────────
export function CounsellingPage() {
  const navigate = useNavigate()
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div className="top-nav">
        <div className="logo-area">
          <div className="logo-circle" style={{ width: 38, height: 38 }}>
            <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
              <path d="M20 4C20 4 8 10 8 22C8 28.627 13.373 34 20 34C26.627 34 32 28.627 32 22C32 10 20 4 20 4Z" fill="white" fillOpacity="0.9"/>
              <path d="M20 18V30" stroke="var(--green-main)" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div><div className="logo-text">Fresh Farms</div><div className="logo-sub">Campus</div></div>
        </div>
        <button className="icon-btn">🔔</button>
      </div>
      <div className="screen">
        <div style={{ padding: '16px 20px' }}>
          <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>Fresh Farm Campus</div>
          <div style={{ fontSize: 14, color: 'var(--text-light)', marginBottom: 20 }}>Expert guidance for your agricultural journey.</div>
        </div>
        {[
          { img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80', title: '📈 Demand Insights', desc: 'Analyze current market trends and predict upcoming crop demand for better profits.', cta: 'View Insights', path: '/farmer/demand-insights' },
          { img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80', title: '📅 Crop Planning', desc: 'Personalized calendars for your soil type, season, and regional climate conditions.', cta: 'Start Planning', path: '/farmer/crop-planning' },
        ].map((card, i) => (
          <div key={i} style={{ margin: '0 16px 16px', background: 'white', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ height: 160, overflow: 'hidden' }}>
              <img src={card.img} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>{card.title}</div>
              <div style={{ fontSize: 13, color: 'var(--text-light)', lineHeight: 1.6, marginBottom: 14 }}>{card.desc}</div>
              <button className="btn btn-primary" onClick={() => navigate(card.path)}>{card.cta}</button>
            </div>
          </div>
        ))}
      </div>
      <FarmerBottomNav active="resources" />
    </div>
  )
}

// ── DEMAND INSIGHTS ───────────────────────────────────────────────
export function DemandInsightsPage() {
  const navigate = useNavigate()
  const crops = [
    { name: 'WHEAT', h: 60 }, { name: 'CORN', h: 80 }, { name: 'SOY', h: 50 }, { name: 'RICE', h: 90 }, { name: 'OATS', h: 40 }
  ]
  const prices = [
    { name: 'Organic Kale', img: '🥬', price: '40/kg', change: '+4%', up: true },
    { name: 'Avocados', img: '🥑', price: '50/kg', change: '-2%', up: false },
    { name: 'Tomatoes', img: '🍅', price: '35/kg', change: '+8%', up: true },
    { name: 'Baby Spinach', img: '🌿', price: '55/kg', change: '+1%', up: true },
  ]
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div className="page-header" style={{ background: 'var(--bg)' }}>
        <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={20} weight="bold" /></button>
        <span style={{ fontSize: 18, fontWeight: 700 }}>Demand Insights</span>
      </div>
      <div style={{ padding: '8px 16px 100px' }}>
        {/* Filters */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'white', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font)', fontSize: 13, cursor: 'pointer' }}>
            📍 Gurgaon, Ha… <CaretDown size={14} />
          </button>
          <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'white', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font)', fontSize: 13, cursor: 'pointer' }}>
            🌱 Spring 2026 <CaretDown size={14} />
          </button>
        </div>

        {/* Trending crops chart */}
        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '16px', marginBottom: 16, boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>MARKET OVERVIEW</div>
              <div style={{ fontSize: 17, fontWeight: 700, marginTop: 4 }}>Trending Crops</div>
            </div>
            <span style={{ background: '#e8f5e9', color: 'var(--green-main)', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 20 }}>📈 +12.4%</span>
          </div>
          {/* Bar chart */}
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', height: 100, marginBottom: 8 }}>
            {crops.map((c, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ width: '100%', background: i === 3 ? 'var(--green-main)' : 'var(--green-light)', borderRadius: '6px 6px 0 0', height: `${c.h}%`, minHeight: 8, transition: 'height 0.3s' }} />
                <span style={{ fontSize: 9, color: 'var(--text-light)', fontWeight: 600 }}>{c.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Price index */}
        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: 16, marginBottom: 16, boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ fontWeight: 700, fontSize: 16 }}>Price Index</span>
            <button style={{ background: 'none', border: 'none', color: 'var(--green-main)', fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font)' }}>View Details</button>
          </div>
          {prices.map((p, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '10px 0', borderBottom: i < prices.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--green-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{p.img}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-light)' }}>Retail Avg.</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{p.price}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: p.up ? 'var(--green-main)' : 'var(--red)' }}>{p.change}</div>
              </div>
            </div>
          ))}
        </div>

        {/* High demand */}
        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: 16, boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ fontWeight: 700, fontSize: 16 }}>High Demand Items</span>
            <button style={{ background: 'none', border: 'none', color: 'var(--green-main)', fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font)' }}>See All</button>
          </div>
          {[
            { name: 'Tomatoes', note: 'Short supply in Sacramento', img: '🍅', badge: 'Critical', badgeColor: 'var(--red)' },
            { name: 'Baby Spinach', note: 'Growing demand', img: '🌿', badge: 'High', badgeColor: '#f57f17' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '10px 0', borderBottom: i < 1 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--green-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{item.img}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{item.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-light)' }}>{item.note}</div>
              </div>
              <span style={{ background: item.badgeColor, color: 'white', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20 }}>{item.badge}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── CROP PLANNING ─────────────────────────────────────────────────
export function CropPlanningPage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('plans')
  const plans = [
    { name: 'Spring Wheat 2024', detail: 'North Block - 42 Acres • Organic', edited: '2H AGO', status: 'OPTIMIZED', color: 'var(--green-main)' },
    { name: 'Summer Barley 2024', detail: 'East Field - 30 Acres • Conventional', edited: '1H AGO', status: 'PLANNED', color: 'var(--green-mid)' },
    { name: 'Fall Rye 2024', detail: 'West Plot - 25 Acres • Sustainable', edited: '3H AGO', status: 'SCHEDULED', color: '#1565c0' },
    { name: 'Winter Oats 2024', detail: 'South Range - 40 Acres • Heirloom', edited: '4H AGO', status: 'IN PROGRESS', color: '#f57f17' },
  ]
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div className="page-header" style={{ background: 'var(--bg)' }}>
        <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={20} weight="bold" /></button>
        <span style={{ fontSize: 18, fontWeight: 700 }}>Crop Planning</span>
      </div>
      <div style={{ padding: '4px 16px 100px' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          <button className={`chip ${tab === 'plans' ? 'chip-active' : 'chip-inactive'}`} onClick={() => setTab('plans')} style={{ padding: '10px 24px' }}>Crop plans</button>
          <button className={`chip ${tab === 'templates' ? 'chip-active' : 'chip-inactive'}`} onClick={() => setTab('templates')} style={{ padding: '10px 24px' }}>Templates</button>
        </div>
        <div className="search-inner" style={{ marginBottom: 16 }}>
          <MagnifyingGlass className="search-icon-pos" size={18} />
          <input placeholder="Searcg Saved Plans" style={{ padding: '12px 12px 12px 42px', width: '100%', background: 'transparent', border: 'none', fontFamily: 'var(--font)', fontSize: 14, outline: 'none' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontWeight: 700, fontSize: 15 }}>Active Crop Cycles</span>
          <span style={{ fontSize: 13, color: 'var(--text-light)' }}>{plans.length} Total</span>
        </div>
        {plans.map((p, i) => (
          <div key={i} style={{ background: 'white', borderRadius: 'var(--radius)', padding: '14px 16px', marginBottom: 10, boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 3 }}>{p.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-light)', marginBottom: 6 }}>{p.detail}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 11, color: 'var(--text-light)' }}>🕐 EDITED {p.edited}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: p.color }}>● {p.status}</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => navigate('/farmer/create-plan')}>✏️</button>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--red)' }}>🗑</button>
            </div>
          </div>
        ))}
        <button className="btn btn-primary" onClick={() => navigate('/farmer/create-plan')}>
          + Create New Plan
        </button>
      </div>
    </div>
  )
}

// ── CREATE PLAN ───────────────────────────────────────────────────
export function CreatePlanPage() {
  const navigate = useNavigate()
  const [crop, setCrop] = useState('')
  const crops = ['Wheat', 'Corn', 'Rice', 'Soybean', 'Kale', 'Tomatoes', 'Spinach', 'Carrots']
  const stats = [
    { label: 'BEST SEASON', value: 'Monsoon (July-Oct)' },
    { label: 'EXPECTED YIELD', value: '2.5 Tons/Acre' },
    { label: 'ESTIMATED PRICE', value: '$1,200/Ton' },
    { label: 'REQUIRED INPUTS', value: 'Seeds, Fertilizer, Water' },
  ]
  return (
    <div style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={20} weight="bold" /></button>
        <span style={{ fontSize: 18, fontWeight: 700 }}>Create Plan</span>
      </div>
      <div style={{ padding: '0 0 100px' }}>
        {/* Hero */}
        <div style={{ margin: '0 20px 20px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', height: 180, position: 'relative' }}>
          <img src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80" alt="farm" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', bottom: 14, left: 14, right: 14, background: 'rgba(0,0,0,0.6)', borderRadius: 8, padding: '8px 14px' }}>
            <div style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>Maximize your harvest with data-driven insights</div>
          </div>
        </div>

        <div style={{ padding: '0 20px' }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-mid)', marginBottom: 10 }}>Select a Crop</div>
          <select value={crop} onChange={e => setCrop(e.target.value)}
            style={{ width: '100%', padding: '14px', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', fontFamily: 'var(--font)', fontSize: 14, background: 'white', outline: 'none', marginBottom: 20 }}>
            <option value="">Choose a crop to begin with</option>
            {crops.map(c => <option key={c}>{c}</option>)}
          </select>

          {/* Stats grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
            {stats.map((s, i) => (
              <div key={i} style={{ background: 'var(--bg)', borderRadius: 'var(--radius)', padding: '14px', textAlign: 'center' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{s.label}</div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{s.value}</div>
              </div>
            ))}
          </div>
          <button className="btn btn-primary">Save to Plan</button>
        </div>
      </div>
    </div>
  )
}

// ── BEST PRACTICES ────────────────────────────────────────────────
export function BestPracticesPage() {
  const navigate = useNavigate()
  const [cat, setCat] = useState('All')
  const cats = ['All', 'Farming', 'Storage']
  const articles = [
    { title: 'Organic farming', desc: 'Learn the fundamentals of pesticide-free crop cultivation and soil health management for better yields.', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80', saved: false },
    { title: 'Dairy hygiene', desc: 'Essential standards for maintaining clean facilities, sanitized equipment, and healthy livestock.', img: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=80', saved: true },
  ]
  const [savedStates, setSavedStates] = useState(articles.map(a => a.saved))

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div className="page-header" style={{ background: 'var(--bg)' }}>
        <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={20} weight="bold" /></button>
        <span style={{ fontSize: 18, fontWeight: 700 }}>Best Practices</span>
      </div>
      <div style={{ padding: '8px 16px 100px' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {cats.map(c => <button key={c} onClick={() => setCat(c)} className={`chip ${cat === c ? 'chip-active' : 'chip-inactive'}`} style={{ padding: '8px 20px', fontSize: 13 }}>{c}</button>)}
        </div>
        {articles.map((a, i) => (
          <div key={i} style={{ background: 'white', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: 16, boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ height: 170, position: 'relative', overflow: 'hidden' }}>
              <img src={a.img} alt={a.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <button onClick={() => setSavedStates(prev => prev.map((s, j) => j === i ? !s : s))}
                style={{ position: 'absolute', top: 12, right: 12, width: 36, height: 36, borderRadius: '50%', background: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)' }}>
                <Bookmark size={18} weight={savedStates[i] ? 'fill' : 'regular'} color={savedStates[i] ? 'var(--green-main)' : 'var(--text-dark)'} />
              </button>
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>{a.title}</div>
              <div style={{ fontSize: 13, color: 'var(--text-light)', lineHeight: 1.6, marginBottom: 14 }}>{a.desc}</div>
              <button className="btn btn-primary" onClick={() => navigate('/farmer/article/1')}>Read more</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── ARTICLE DETAIL ────────────────────────────────────────────────
export function ArticleDetailPage() {
  const navigate = useNavigate()
  return (
    <div style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={20} weight="bold" /></button>
        <span style={{ fontSize: 18, fontWeight: 700 }}>Organic Farming</span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <button className="icon-btn"><Bookmark size={22} /></button>
          <button className="icon-btn"><ShareNetwork size={22} /></button>
        </div>
      </div>

      <div style={{ height: 240, overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80" alt="Vertical farming" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          {['TECHNOLOGY', 'SUSTAINABILITY'].map(tag => (
            <span key={tag} style={{ fontSize: 11, fontWeight: 700, color: 'var(--green-main)', background: 'var(--green-light)', padding: '4px 10px', borderRadius: 6 }}>{tag}</span>
          ))}
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.3, marginBottom: 14 }}>
          The Future of Vertical Farming in Urban Campuses
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid var(--border)' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>👩</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Dr. Sarah Green</div>
            <div style={{ fontSize: 12, color: 'var(--text-light)' }}>Published Oct 24, 2023 • 8 min read</div>
          </div>
        </div>

        <div style={{ fontSize: 15, color: 'var(--text-mid)', lineHeight: 1.8 }}>
          <span style={{ fontSize: 48, fontWeight: 800, lineHeight: 0.8, float: 'left', marginRight: 8, color: 'var(--green-dark)', fontFamily: 'Georgia, serif' }}>U</span>
          rbanization is accelerating at an unprecedented rate, challenging traditional agricultural methods to keep pace with the growing demand for fresh produce. Vertical farming offers a sustainable solution by growing crops in stacked layers using artificial lighting and controlled environments. This approach reduces water usage by up to 95% compared to traditional farming and eliminates the need for pesticides.
          <br /><br />
          Campus environments present unique opportunities for vertical farming implementation. With dedicated spaces, student research initiatives, and a captive consumer base, universities can become leaders in sustainable food production.
        </div>
      </div>
    </div>
  )
}

// ── GOVERNMENT SCHEMES ────────────────────────────────────────────
export function GovernmentSchemesPage() {
  const navigate = useNavigate()
  const [cat, setCat] = useState('All')
  const cats = ['All', 'Subsidies', 'Irrigation']
  const schemes = [
    { title: 'PM-Kisan Samman Nidhi', eligibility: 'Small & marginal farmers', desc: 'Get financial benefit of ₹6,000 per year directly to your linked bank account in three installments.' },
    { title: 'Soil Health Card Scheme', eligibility: 'All farmers', desc: 'Receive a soil health card every 2 years to enhance soil productivity and make informed fertilizer decisions.' },
    { title: 'Pradhan Mantri Fasal Bima Yojana', eligibility: 'All farmers', desc: 'Get insurance coverage and financial support in case of crop failure due to unforeseen events.' },
  ]
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div className="page-header" style={{ background: 'var(--bg)' }}>
        <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={20} weight="bold" /></button>
        <span style={{ fontSize: 18, fontWeight: 700 }}>Government Schemes</span>
      </div>
      <div style={{ padding: '8px 16px 100px' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {cats.map(c => <button key={c} onClick={() => setCat(c)} className={`chip ${cat === c ? 'chip-active' : 'chip-inactive'}`} style={{ padding: '8px 20px', fontSize: 13 }}>{c}</button>)}
        </div>
        {schemes.map((s, i) => (
          <div key={i} style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: 16, marginBottom: 14, boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
              <div style={{ fontSize: 16, fontWeight: 700, flex: 1, paddingRight: 8 }}>{s.title}</div>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--green-main)', background: 'var(--green-light)', padding: '3px 10px', borderRadius: 10, flexShrink: 0 }}>ACTIVE</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-light)', marginBottom: 8 }}>Eligibility: {s.eligibility}</div>
            <div style={{ fontSize: 13, color: 'var(--text-mid)', lineHeight: 1.6, marginBottom: 14 }}>{s.desc}</div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-primary" style={{ flex: 2, padding: '11px' }}>Apply Now</button>
              <button className="btn btn-outline" style={{ flex: 1, padding: '11px' }}>Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── BOOKMARKS ─────────────────────────────────────────────────────
export function BookmarksPage() {
  const navigate = useNavigate()
  const articles = [
    { title: 'Organic farming', desc: 'Learn the fundamentals of pesticide-free crop cultivation and soil health management for better yields.', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80' },
    { title: 'Dairy hygiene', desc: 'Essential standards for maintaining clean facilities, sanitized equipment, and healthy livestock.', img: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=80' },
  ]
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div className="page-header" style={{ background: 'var(--bg)' }}>
        <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={20} weight="bold" /></button>
        <span style={{ fontSize: 18, fontWeight: 700 }}>Bookmarks</span>
      </div>
      <div style={{ padding: '8px 16px 100px' }}>
        {articles.map((a, i) => (
          <div key={i} style={{ background: 'white', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: 16, boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
              <img src={a.img} alt={a.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <button style={{ position: 'absolute', top: 12, right: 12, width: 36, height: 36, borderRadius: '50%', background: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)' }}>
                <Bookmark size={18} weight="fill" color="var(--green-main)" />
              </button>
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>{a.title}</div>
              <div style={{ fontSize: 13, color: 'var(--text-light)', lineHeight: 1.6, marginBottom: 14 }}>{a.desc}</div>
              <button className="btn btn-outline" onClick={() => navigate('/farmer/article/1')}>Read more</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
