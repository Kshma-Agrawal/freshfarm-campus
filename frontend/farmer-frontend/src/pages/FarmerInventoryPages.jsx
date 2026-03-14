import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CaretLeft, CaretRight, Bell, Headset, MagnifyingGlass,
  PencilSimple, Plus, Minus, Camera, Check, ToggleLeft, ToggleRight
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

// ── INVENTORY EMPTY STATE ─────────────────────────────────────────
export function InventoryEmptyPage() {
  const navigate = useNavigate()
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <LogoBar />
      <div className="screen">
        <div className="page-header" style={{ background: 'var(--bg)' }}>
          <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={20} weight="bold" /></button>
          <span style={{ fontSize: 18, fontWeight: 700 }}>Inventory</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 32px', textAlign: 'center' }}>
          <div style={{ fontSize: 80, marginBottom: 20, opacity: 0.2 }}>🛒</div>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>No produce added yet</div>
          <div style={{ fontSize: 14, color: 'var(--text-light)', lineHeight: 1.7, marginBottom: 36 }}>
            Start tracking your farm's harvest by adding your first batch of produce today.
          </div>
          <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => navigate('/farmer/add-produce')}>
            Add Produce
          </button>
        </div>
      </div>
      <FarmerBottomNav active="farm" />
    </div>
  )
}

// ── INVENTORY LIST ────────────────────────────────────────────────
export function InventoryListPage() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('All')
  const filters = ['All', 'In Stock', 'Low Stock']
  const items = [
    { id: 1, name: 'Organic Carrots', qty: '45 kg', price: '₹40 / kg', status: 'IN STOCK', img: '🥕' },
    { id: 2, name: 'Fresh Kale', qty: '10 kg', price: '₹30 / kg', status: 'LOW STOCK', img: '🥬' },
    { id: 3, name: 'Tomatoes', qty: '20 kg', price: '₹35 / kg', status: 'IN STOCK', img: '🍅' },
  ]

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <LogoBar />
      <div className="screen">
        <div style={{ background: 'white', padding: '12px 20px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={20} weight="bold" /></button>
            <span style={{ fontSize: 18, fontWeight: 700 }}>Inventory</span>
          </div>

          {/* Low stock warning */}
          <div style={{ background: '#fff8e1', borderRadius: 'var(--radius)', padding: '12px 16px', marginBottom: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#f57f17' }}>⚠️ Some items are running low</div>
              <div style={{ fontSize: 12, color: 'var(--text-light)', marginTop: 2 }}>Ensure your shelves are full for the weekend market.</div>
            </div>
          </div>
          <button style={{ background: 'var(--green-main)', color: 'white', border: 'none', borderRadius: 'var(--radius-sm)', padding: '8px 18px', fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font)', marginBottom: 16 }}>
            Restock Now
          </button>

          {/* Search */}
          <div className="search-inner" style={{ marginBottom: 14 }}>
            <MagnifyingGlass className="search-icon-pos" size={18} />
            <input placeholder="Search Produce" style={{ padding: '12px 12px 12px 42px', width: '100%', background: 'transparent', border: 'none', fontFamily: 'var(--font)', fontSize: 14, outline: 'none' }} />
          </div>

          {/* Filter chips */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {filters.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`chip ${filter === f ? 'chip-active' : 'chip-inactive'}`}
                style={{ padding: '8px 16px', fontSize: 13 }}>{f}</button>
            ))}
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-mid)', marginBottom: 10 }}>Categories</div>
        </div>

        {/* Item list */}
        {items.map(item => (
          <div key={item.id} onClick={() => navigate('/farmer/produce/1')}
            style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', borderBottom: '1px solid var(--border)', background: 'white', cursor: 'pointer' }}>
            <div style={{ width: 60, height: 60, borderRadius: 'var(--radius-sm)', background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, flexShrink: 0 }}>{item.img}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{item.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-light)', marginTop: 2 }}>Available: {item.qty}</div>
              <div style={{ fontWeight: 700, fontSize: 14, marginTop: 4 }}>{item.price}
                <span style={{ fontSize: 11, fontWeight: 600, marginLeft: 8, padding: '2px 8px', borderRadius: 10, background: item.status === 'IN STOCK' ? 'var(--green-light)' : '#fff8e1', color: item.status === 'IN STOCK' ? 'var(--green-main)' : '#f57f17' }}>{item.status}</span>
              </div>
              <button style={{ marginTop: 6, background: 'none', border: 'none', fontSize: 12, color: 'var(--red)', cursor: 'pointer', fontFamily: 'var(--font)', display: 'flex', alignItems: 'center', gap: 4 }}>
                🔴 Disable
              </button>
            </div>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }} onClick={e => { e.stopPropagation(); navigate('/farmer/edit-produce/1') }}>
              <PencilSimple size={18} color="var(--text-light)" />
            </button>
          </div>
        ))}

        <div style={{ padding: 20 }}>
          <button className="btn btn-primary" onClick={() => navigate('/farmer/add-produce')}>
            <Plus size={18} weight="bold" /> Add New Produce
          </button>
        </div>
      </div>
      <FarmerBottomNav active="farm" />
    </div>
  )
}

// ── ADD PRODUCE ───────────────────────────────────────────────────
export function AddProducePage() {
  const navigate = useNavigate()
  const categories = ['Vegetables', 'Fruits', 'Dairy', 'Grains', 'Organic', 'Manure']
  const units = ['kg', 'gm', 'litre', 'piece', 'dozen', 'bundle']

  return (
    <div style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={20} weight="bold" /></button>
        <span style={{ fontSize: 18, fontWeight: 700 }}>Add New Produce</span>
      </div>
      <div style={{ padding: '16px 20px 100px' }}>
        {/* Image upload */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-mid)', marginBottom: 8 }}>Produce Image</div>
          <div style={{ border: '2px dashed var(--border)', borderRadius: 'var(--radius)', padding: '32px 20px', textAlign: 'center', cursor: 'pointer', background: 'var(--bg)' }}>
            <div style={{ fontSize: 32, color: 'var(--text-light)', marginBottom: 6 }}>📷</div>
            <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-mid)' }}>Upload Product Photo</div>
            <div style={{ fontSize: 12, color: 'var(--text-light)', marginTop: 3 }}>PNG, JPG or JPEG (Max. 5MB)</div>
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-mid)', marginBottom: 6, display: 'block' }}>Product Name</label>
          <input className="input-field no-icon" placeholder="e.g. Organic Bell Peppers" />
        </div>

        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-mid)', marginBottom: 6, display: 'block' }}>Quantity</label>
            <input className="input-field no-icon" placeholder="0.00" type="number" />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-mid)', marginBottom: 6, display: 'block' }}>Unit</label>
            <select style={{ width: '100%', padding: '14px', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', fontFamily: 'var(--font)', fontSize: 14, background: 'white', outline: 'none', color: 'var(--text-dark)' }}>
              {units.map(u => <option key={u}>{u}</option>)}
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-mid)', marginBottom: 6, display: 'block' }}>Price per unit</label>
            <input className="input-field no-icon" placeholder="₹ 0.00" type="number" />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-mid)', marginBottom: 6, display: 'block' }}>Harvest date</label>
            <input className="input-field no-icon" placeholder="mm/dd/yyyy" type="date" />
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-mid)', marginBottom: 6, display: 'block' }}>Category</label>
          <select style={{ width: '100%', padding: '14px', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', fontFamily: 'var(--font)', fontSize: 14, background: 'white', outline: 'none', color: 'var(--text-dark)' }}>
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div style={{ marginBottom: 28 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-mid)', marginBottom: 6, display: 'block' }}>Description</label>
          <textarea style={{ width: '100%', padding: 14, border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', fontFamily: 'var(--font)', fontSize: 14, background: 'white', outline: 'none', resize: 'none', minHeight: 90, color: 'var(--text-dark)' }}
            placeholder="Describe the freshness, origin, or special qualities..." />
        </div>

        <button className="btn btn-primary" onClick={() => navigate('/farmer/inventory')}>Save &amp; List Produce</button>
        <button className="btn btn-outline" style={{ marginTop: 12 }} onClick={() => navigate(-1)}>Cancel</button>
      </div>
    </div>
  )
}

// ── PRODUCE DETAILS ───────────────────────────────────────────────
export function ProduceDetailsPage() {
  const navigate = useNavigate()
  return (
    <div style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={20} weight="bold" /></button>
        <span style={{ fontSize: 18, fontWeight: 700 }}>Produce details</span>
      </div>

      <div style={{ height: 260, background: 'var(--green-light)', position: 'relative' }}>
        <img src="https://images.unsplash.com/photo-1445282768818-728615cc910a?w=600&q=80" alt="Carrots" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <span style={{ position: 'absolute', top: 14, right: 14, background: 'var(--green-main)', color: 'white', fontSize: 12, fontWeight: 600, padding: '4px 12px', borderRadius: 20 }}>In Stock</span>
      </div>

      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
          <div style={{ fontSize: 22, fontWeight: 800 }}>Organic Carrots</div>
          <span style={{ background: 'var(--green-light)', color: 'var(--green-main)', fontSize: 12, fontWeight: 600, padding: '4px 12px', borderRadius: 20 }}>In Stock</span>
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-light)', marginBottom: 16 }}>Root Vegetable • 1 kg unit</div>

        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>DESCRIPTION</div>
        <div style={{ fontSize: 14, color: 'var(--text-mid)', lineHeight: 1.7, marginBottom: 20 }}>
          Freshly harvested organic carrots from the valley. Rich in Beta-carotene and Vitamin A. No pesticides used during cultivation.
        </div>

        <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>PRICE</div>
            <div style={{ fontWeight: 800, fontSize: 18, marginTop: 4 }}>₹40.00 <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--text-light)' }}>/kg</span></div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>TOTAL SALES</div>
            <div style={{ fontWeight: 800, fontSize: 18, marginTop: 4 }}>142 Units</div>
          </div>
        </div>

        <div style={{ background: 'var(--bg)', borderRadius: 'var(--radius)', padding: '14px 16px', marginBottom: 28 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>INVENTORY TRACKING</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20 }}>📦</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>Current Stock</div>
                <div style={{ fontSize: 12, color: 'var(--text-light)' }}>Last updated 2 hours ago</div>
              </div>
            </div>
            <div style={{ fontWeight: 800, fontSize: 18 }}>85 kg</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 20px 40px' }}>
        <button className="btn btn-primary" onClick={() => navigate('/farmer/edit-produce/1')}>Edit Details</button>
        <button className="btn" style={{ marginTop: 12, color: 'var(--red)', border: '1.5px solid var(--red)', background: 'white' }} onClick={() => navigate('/farmer/delete-produce/1')}>Delete Produce</button>
      </div>
    </div>
  )
}

// ── EDIT PRODUCE ──────────────────────────────────────────────────
export function EditProducePage() {
  const navigate = useNavigate()
  const [organic, setOrganic] = useState(true)
  const units = ['kg', 'gm', 'litre', 'piece', 'dozen']

  return (
    <div style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={20} weight="bold" /></button>
        <span style={{ fontSize: 18, fontWeight: 700 }}>Edit Produce</span>
      </div>
      <div style={{ padding: '0 0 100px' }}>
        {/* Image with edit */}
        <div style={{ position: 'relative', height: 200, background: 'var(--green-light)' }}>
          <img src="https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&q=80" alt="Potatoes" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <button style={{ position: 'absolute', bottom: 12, right: 12, width: 36, height: 36, borderRadius: '50%', background: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow)' }}>
            <Camera size={18} color="var(--green-main)" />
          </button>
        </div>

        <div style={{ padding: '20px' }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-mid)', marginBottom: 6, display: 'block' }}>Produce Name</label>
            <input className="input-field no-icon" defaultValue="Potatoes" />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-mid)', marginBottom: 6, display: 'block' }}>Category</label>
            <select style={{ width: '100%', padding: '14px', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', fontFamily: 'var(--font)', fontSize: 14, background: 'white', outline: 'none', color: 'var(--text-dark)' }}>
              <option selected>Vegetables</option>
              <option>Fruits</option>
              <option>Grains</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-mid)', marginBottom: 6, display: 'block' }}>Price</label>
              <input className="input-field no-icon" defaultValue="250" type="number" />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-mid)', marginBottom: 6, display: 'block' }}>Unit</label>
              <select style={{ width: '100%', padding: '14px', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', fontFamily: 'var(--font)', fontSize: 14, background: 'white', outline: 'none', color: 'var(--text-dark)' }}>
                <option>per kg</option>
                {units.map(u => <option key={u}>{u}</option>)}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-mid)', marginBottom: 6, display: 'block' }}>Quantity in Stock</label>
            <input className="input-field no-icon" defaultValue="45" type="number" />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-mid)', marginBottom: 6, display: 'block' }}>Harvest Date</label>
            <input className="input-field no-icon" defaultValue="10/2/2026" type="text" />
          </div>

          {/* Certified organic toggle */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', marginBottom: 16 }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Certified Organic</div>
              <div style={{ fontSize: 12, color: 'var(--text-light)' }}>Produce meets organic standards</div>
            </div>
            <button onClick={() => setOrganic(!organic)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <div style={{ width: 48, height: 26, borderRadius: 13, background: organic ? 'var(--green-main)' : 'var(--border)', position: 'relative', transition: 'background 0.2s' }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'white', position: 'absolute', top: 3, left: organic ? 25 : 3, transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
              </div>
            </button>
          </div>

          <div style={{ marginBottom: 28 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-mid)', marginBottom: 6, display: 'block' }}>Description</label>
            <textarea defaultValue="Freshly harvested Russet potatoes from the North campus field. Perfect for baking, mashing, or frying. Stored in cool, dark conditions to maintain freshness."
              style={{ width: '100%', padding: 14, border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', fontFamily: 'var(--font)', fontSize: 14, background: 'white', outline: 'none', resize: 'none', minHeight: 100, color: 'var(--text-dark)' }} />
          </div>

          <button className="btn btn-primary" onClick={() => navigate(-1)}>Save Changes</button>
          <button className="btn" style={{ marginTop: 12, color: 'var(--red)', border: '1.5px solid var(--red)', background: 'white' }} onClick={() => navigate('/farmer/delete-produce/1')}>Delete Produce</button>
        </div>
      </div>
    </div>
  )
}

// ── DELETE PRODUCE CONFIRM ────────────────────────────────────────
export function DeleteProduceConfirmPage() {
  const navigate = useNavigate()
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'rgba(0,0,0,0.5)', padding: 24 }}>
      <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '40px 28px', textAlign: 'center', width: '100%', maxWidth: 360 }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#ffebee', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 28 }}>
          🕐
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 14 }}>Delete Produce</div>
        <div style={{ fontSize: 14, color: 'var(--text-light)', lineHeight: 1.7, marginBottom: 28 }}>
          Are you sure you want to remove <strong style={{ color: 'var(--text-dark)' }}>Organic Carrots</strong> from your shop? This action can not be undone
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/farmer/inventory')} style={{ marginBottom: 12 }}>Keep it</button>
        <button onClick={() => navigate('/farmer/inventory')}
          style={{ width: '100%', padding: 15, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--red)', fontWeight: 700, fontSize: 15, fontFamily: 'var(--font)' }}>
          Delete Produce
        </button>
      </div>
    </div>
  )
}
