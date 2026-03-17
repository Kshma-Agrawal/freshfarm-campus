import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FarmerBottomNav } from './FarmerOnboardingPages'
import { TopNav } from '../components/UI'
import logoImg from '../assets/logo.png'
import {
  CaretLeft, CaretRight, Plus, MagnifyingGlass, PencilSimple, Trash, Camera, Package, Check, X, Warning, XCircle, Basket, Headset, Bell
} from '@phosphor-icons/react'

const tomatoImg = 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&q=80'
const carrotImg = 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&q=80'
const spinachImg = 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&q=80'
const kaleImg = 'https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?w=400&q=80'
const milkImg = 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80'


// ── INVENTORY EMPTY STATE ─────────────────────────────────────────
export function InventoryEmptyPage() {
  const navigate = useNavigate()
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Header matching screenshot exactly */}
      <div className="top-nav">
        <div className="logo-area">
          <div className="logo-circle">
            <img src={logoImg} alt="Fresh Farms" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <div className="logo-text">Fresh Farms</div>
            <div className="logo-sub">Campus</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
          <button className="icon-btn" onClick={() => navigate('/farmer/help')}><Headset size={22} /></button>
          <button className="icon-btn" onClick={() => navigate('/farmer/notifications')}><Bell size={22} /></button>
        </div>
      </div>

      {/* Back + title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 20px 0' }}>
        <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={20} weight="bold" /></button>
        <span style={{ fontSize: 18, fontWeight: 700 }}>Inventory</span>
      </div>

      {/* Empty state */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '50px 32px 0', textAlign: 'center' }}>
        {/* Decorative circles + basket icon matching screenshot */}
        <div style={{ position: 'relative', width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
          <div style={{ position: 'absolute', width: 170, height: 170, borderRadius: '50%', background: 'rgba(180,200,220,0.10)' }} />
          <div style={{ position: 'absolute', width: 120, height: 120, borderRadius: '50%', background: 'rgba(180,200,220,0.13)' }} />
          {/* white card */}
          <div style={{ width: 90, height: 90, borderRadius: 22, background: 'white', boxShadow: '0 4px 24px rgba(0,0,0,0.09)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
            <Basket size={44} weight="light" color="#b0bec5" />
          </div>
          {/* small green dot top-right */}
          <div style={{ position: 'absolute', top: 28, right: 26, width: 12, height: 12, borderRadius: '50%', background: '#c8dfc9' }} />
          {/* small green dot bottom-left */}
          <div style={{ position: 'absolute', bottom: 30, left: 22, width: 9, height: 9, borderRadius: '50%', background: '#c8dfc9' }} />
        </div>

        <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>No produce added yet</div>
        <div style={{ fontSize: 14, color: 'var(--text-subtle)', lineHeight: 1.7, marginBottom: 40, maxWidth: 240 }}>
          Start tracking your farm's harvest by adding your first batch of produce today.
        </div>
        <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => navigate('/farmer/add-produce')}>
          Add Produce
        </button>
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
  const allItems = [
    { id: 1, name: 'Organic Carrots', qty: '45 kg', price: '₹40 / kg', status: 'IN STOCK', img: carrotImg },
    { id: 2, name: 'Fresh Kale', qty: '10 kg', price: '₹30 / kg', status: 'LOW STOCK', img: kaleImg },
    { id: 3, name: 'Tomatoes', qty: '20 kg', price: '₹35 / kg', status: 'IN STOCK', img: tomatoImg },
    { id: 4, name: 'Fresh Spinach', qty: '8 kg', price: '₹25 / kg', status: 'LOW STOCK', img: spinachImg },
    { id: 5, name: 'Pure Cow Milk', qty: '30 ltr', price: '₹50 / ltr', status: 'IN STOCK', img: milkImg },
  ]
  const items = filter === 'All' ? allItems
    : filter === 'In Stock' ? allItems.filter(i => i.status === 'IN STOCK')
    : allItems.filter(i => i.status === 'LOW STOCK')

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <TopNav farmerMode={true} />
      <div className="screen">
        <div style={{ background: 'white', padding: '12px 20px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={20} weight="bold" /></button>
            <span style={{ fontSize: 18, fontWeight: 700 }}>Inventory</span>
          </div>

          {/* Low stock warning */}
          <div style={{ background: '#fff8e1', borderRadius: '12px', padding: '12px 16px', marginBottom: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#f57f17' }}>⚠️ Some items are running low</div>
              <div style={{ fontSize: 12, color: 'var(--text-subtle)', marginTop: 2 }}>Ensure your shelves are full for the weekend market.</div>
            </div>
          </div>
          <button style={{ background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px', padding: '8px 18px', fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font)', marginBottom: 16 }}
            onClick={() => navigate('/farmer/restock')}>
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
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-subtle)', marginBottom: 10 }}>Categories</div>
        </div>

        {/* Item list */}
        {items.map(item => (
          <div key={item.id} onClick={() => navigate('/farmer/produce/1')}
            style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', borderBottom: '1px solid var(--border)', background: 'white', cursor: 'pointer' }}>
            <div style={{ width: 60, height: 60, borderRadius: '8px', overflow: 'hidden', flexShrink: 0, background: 'var(--primary-light)' }}><img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{item.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-subtle)', marginTop: 2 }}>Available: {item.qty}</div>
              <div style={{ fontWeight: 700, fontSize: 14, marginTop: 4 }}>{item.price}
                <span style={{ fontSize: 11, fontWeight: 600, marginLeft: 8, padding: '2px 8px', borderRadius: 10, background: item.status === 'IN STOCK' ? 'var(--primary-light)' : '#fff8e1', color: item.status === 'IN STOCK' ? 'var(--primary)' : '#f57f17' }}>{item.status}</span>
              </div>
              <button style={{ marginTop: 6, background: 'none', border: 'none', fontSize: 12, color: 'var(--error)', cursor: 'pointer', fontFamily: 'var(--font)', display: 'flex', alignItems: 'center', gap: 4, padding: 0 }}>
                <XCircle size={13} weight="fill" color="var(--error)" /> Disable
              </button>
            </div>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }} onClick={e => { e.stopPropagation(); navigate('/farmer/edit-produce/1') }}>
              <PencilSimple size={18} color="var(--text-subtle)" />
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
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-subtle)', marginBottom: 8 }}>Produce Image</div>
          <div style={{ border: '2px dashed var(--border)', borderRadius: '12px', padding: '32px 20px', textAlign: 'center', cursor: 'pointer', background: 'var(--bg)' }}>
            <Camera size={32} color="var(--text-subtle)" style={{ marginBottom: 6 }} />
            <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-subtle)' }}>Upload Product Photo</div>
            <div style={{ fontSize: 12, color: 'var(--text-subtle)', marginTop: 3 }}>PNG, JPG or JPEG (Max. 5MB)</div>
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-subtle)', marginBottom: 6, display: 'block' }}>Product Name</label>
          <input className="input-field no-icon" placeholder="e.g. Organic Bell Peppers" />
        </div>

        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-subtle)', marginBottom: 6, display: 'block' }}>Quantity</label>
            <input className="input-field no-icon" placeholder="0.00" type="number" />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-subtle)', marginBottom: 6, display: 'block' }}>Unit</label>
            <select style={{ width: '100%', padding: '14px', border: '1.5px solid var(--border)', borderRadius: '12px', fontFamily: 'var(--font)', fontSize: 14, background: 'white', outline: 'none', color: 'var(--text-dark)' }}>
              {units.map(u => <option key={u}>{u}</option>)}
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-subtle)', marginBottom: 6, display: 'block' }}>Price per unit</label>
            <input className="input-field no-icon" placeholder="₹ 0.00" type="number" />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-subtle)', marginBottom: 6, display: 'block' }}>Harvest date</label>
            <input className="input-field no-icon" placeholder="mm/dd/yyyy" type="date" />
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-subtle)', marginBottom: 6, display: 'block' }}>Category</label>
          <select style={{ width: '100%', padding: '14px', border: '1.5px solid var(--border)', borderRadius: '12px', fontFamily: 'var(--font)', fontSize: 14, background: 'white', outline: 'none', color: 'var(--text-dark)' }}>
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div style={{ marginBottom: 28 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-subtle)', marginBottom: 6, display: 'block' }}>Description</label>
          <textarea style={{ width: '100%', padding: 14, border: '1.5px solid var(--border)', borderRadius: '12px', fontFamily: 'var(--font)', fontSize: 14, background: 'white', outline: 'none', resize: 'none', minHeight: 90, color: 'var(--text-dark)' }}
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

      <div style={{ height: 260, background: 'var(--primary-light)', position: 'relative' }}>
        <img src="https://images.unsplash.com/photo-1445282768818-728615cc910a?w=600&q=80" alt="Carrots" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <span style={{ position: 'absolute', top: 14, right: 14, background: 'var(--primary)', color: 'white', fontSize: 12, fontWeight: 600, padding: '4px 12px', borderRadius: 20 }}>In Stock</span>
      </div>

      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
          <div style={{ fontSize: 22, fontWeight: 800 }}>Organic Carrots</div>
          <span style={{ background: 'var(--primary-light)', color: 'var(--primary)', fontSize: 12, fontWeight: 600, padding: '4px 12px', borderRadius: 20 }}>In Stock</span>
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-subtle)', marginBottom: 16 }}>Root Vegetable • 1 kg unit</div>

        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>DESCRIPTION</div>
        <div style={{ fontSize: 14, color: 'var(--text-subtle)', lineHeight: 1.7, marginBottom: 20 }}>
          Freshly harvested organic carrots from the valley. Rich in Beta-carotene and Vitamin A. No pesticides used during cultivation.
        </div>

        <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>PRICE</div>
            <div style={{ fontWeight: 800, fontSize: 18, marginTop: 4 }}>₹40.00 <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--text-subtle)' }}>/kg</span></div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>TOTAL SALES</div>
            <div style={{ fontWeight: 800, fontSize: 18, marginTop: 4 }}>142 Units</div>
          </div>
        </div>

        <div style={{ background: 'var(--bg)', borderRadius: '12px', padding: '14px 16px', marginBottom: 28 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>INVENTORY TRACKING</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20 }}><Package size={20} /></span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>Current Stock</div>
                <div style={{ fontSize: 12, color: 'var(--text-subtle)' }}>Last updated 2 hours ago</div>
              </div>
            </div>
            <div style={{ fontWeight: 800, fontSize: 18 }}>85 kg</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 20px 40px' }}>
        <button className="btn btn-primary" onClick={() => navigate('/farmer/edit-produce/1')}>Edit Details</button>
        <button className="btn" style={{ marginTop: 12, color: 'var(--error)', border: '1.5px solid var(--error)', background: 'white' }} onClick={() => navigate('/farmer/delete-produce/1')}>Delete Produce</button>
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
        <div style={{ position: 'relative', height: 200, background: 'var(--primary-light)' }}>
          <img src="https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&q=80" alt="Potatoes" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <button style={{ position: 'absolute', bottom: 12, right: 12, width: 36, height: 36, borderRadius: '50%', background: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow)' }}>
            <Camera size={18} color="var(--primary)" />
          </button>
        </div>

        <div style={{ padding: '20px' }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-subtle)', marginBottom: 6, display: 'block' }}>Produce Name</label>
            <input className="input-field no-icon" defaultValue="Potatoes" />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-subtle)', marginBottom: 6, display: 'block' }}>Category</label>
            <select style={{ width: '100%', padding: '14px', border: '1.5px solid var(--border)', borderRadius: '12px', fontFamily: 'var(--font)', fontSize: 14, background: 'white', outline: 'none', color: 'var(--text-dark)' }}>
              <option selected>Vegetables</option>
              <option>Fruits</option>
              <option>Grains</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-subtle)', marginBottom: 6, display: 'block' }}>Price</label>
              <input className="input-field no-icon" defaultValue="250" type="number" />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-subtle)', marginBottom: 6, display: 'block' }}>Unit</label>
              <select style={{ width: '100%', padding: '14px', border: '1.5px solid var(--border)', borderRadius: '12px', fontFamily: 'var(--font)', fontSize: 14, background: 'white', outline: 'none', color: 'var(--text-dark)' }}>
                <option>per kg</option>
                {units.map(u => <option key={u}>{u}</option>)}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-subtle)', marginBottom: 6, display: 'block' }}>Quantity in Stock</label>
            <input className="input-field no-icon" defaultValue="45" type="number" />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-subtle)', marginBottom: 6, display: 'block' }}>Harvest Date</label>
            <input className="input-field no-icon" defaultValue="10/2/2026" type="text" />
          </div>

          {/* Certified organic toggle */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', border: '1.5px solid var(--border)', borderRadius: '12px', marginBottom: 16 }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Certified Organic</div>
              <div style={{ fontSize: 12, color: 'var(--text-subtle)' }}>Produce meets organic standards</div>
            </div>
            <button onClick={() => setOrganic(!organic)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <div style={{ width: 48, height: 26, borderRadius: 13, background: organic ? 'var(--primary)' : 'var(--border)', position: 'relative', transition: 'background 0.2s' }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'white', position: 'absolute', top: 3, left: organic ? 25 : 3, transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
              </div>
            </button>
          </div>

          <div style={{ marginBottom: 28 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-subtle)', marginBottom: 6, display: 'block' }}>Description</label>
            <textarea defaultValue="Freshly harvested Russet potatoes from the North campus field. Perfect for baking, mashing, or frying. Stored in cool, dark conditions to maintain freshness."
              style={{ width: '100%', padding: 14, border: '1.5px solid var(--border)', borderRadius: '12px', fontFamily: 'var(--font)', fontSize: 14, background: 'white', outline: 'none', resize: 'none', minHeight: 100, color: 'var(--text-dark)' }} />
          </div>

          <button className="btn btn-primary" onClick={() => navigate(-1)}>Save Changes</button>
          <button className="btn" style={{ marginTop: 12, color: 'var(--error)', border: '1.5px solid var(--error)', background: 'white' }} onClick={() => navigate('/farmer/delete-produce/1')}>Delete Produce</button>
        </div>
      </div>
    </div>
  )
}

// ── DELETE PRODUCE CONFIRM ────────────────────────────────────────
export function DeleteProduceConfirmPage() {
  const navigate = useNavigate()
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'rgba(0,0,0,0.45)', padding: 24 }}>
      <div style={{ background: 'white', borderRadius: '24px', padding: '36px 24px 28px', textAlign: 'center', width: '100%', maxWidth: 360, boxShadow: '0 4px 24px rgba(0,0,0,0.12)' }}>
        {/* Correct icon: trash/warning, red toned */}
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#ffebee', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <Trash size={34} color="var(--error)" weight="regular" />
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>Delete Produce</div>
        <div style={{ fontSize: 14, color: 'var(--text-subtle)', lineHeight: 1.75, marginBottom: 28 }}>
          Are you sure you want to remove{' '}
          <strong style={{ color: 'var(--text-dark)' }}>Organic Carrots</strong>{' '}
          from your shop? This action can not be undone
        </div>
        <button className="btn btn-primary" onClick={() => navigate(-1)} style={{ marginBottom: 10 }}>Keep it</button>
        {/* Outline border + red text per Figma */}
        <button onClick={() => navigate('/farmer/inventory')}
          style={{ width: '100%', height: 52, borderRadius: '12px', border: '1.5px solid var(--border)', background: 'white', cursor: 'pointer', color: 'var(--error)', fontWeight: 700, fontSize: 15, fontFamily: 'var(--font)' }}>
          Delete Produce
        </button>
      </div>
    </div>
  )
}

// ── RESTOCK PAGE ──────────────────────────────────────────────────
export function RestockPage() {
  const navigate = useNavigate()
  const [quantities, setQuantities] = useState({
    2: '20', 4: '15'
  })
  const lowItems = [
    { id: 2, name: 'Fresh Kale', current: '10 kg', img: kaleImg, unit: 'kg' },
    { id: 4, name: 'Fresh Spinach', current: '8 kg', img: spinachImg, unit: 'kg' },
  ]
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div className="page-header" style={{ background: 'white' }}>
        <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={20} weight="bold" /></button>
        <span style={{ fontSize: 17, fontWeight: 700 }}>Restock Inventory</span>
      </div>
      <div style={{ padding: '16px 16px 100px' }}>
        <div style={{ background: '#fff8e1', borderRadius: 12, padding: '12px 16px', marginBottom: 18, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <Warning size={18} color="#f57f17" weight="fill" style={{ flexShrink: 0, marginTop: 1 }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#f57f17' }}>Low Stock Alert</div>
            <div style={{ fontSize: 12, color: 'var(--text-subtle)', marginTop: 2 }}>{lowItems.length} items need restocking to meet weekend demand.</div>
          </div>
        </div>

        {lowItems.map(item => (
          <div key={item.id} style={{ background: 'white', borderRadius: 14, padding: 16, marginBottom: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 14 }}>
              <div style={{ width: 60, height: 60, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
                <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{item.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-subtle)', marginTop: 3 }}>Current: {item.current}</div>
                <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 10, background: '#fff8e1', color: '#f57f17' }}>LOW STOCK</span>
              </div>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-subtle)', marginBottom: 6, display: 'block' }}>Add Quantity ({item.unit})</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <button style={{ width: 40, height: 40, borderRadius: 10, border: '1.5px solid var(--border)', background: 'white', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  onClick={() => setQuantities(p => ({ ...p, [item.id]: String(Math.max(0, Number(p[item.id] || 0) - 5)) }))}>−</button>
                <input
                  style={{ flex: 1, padding: '10px 14px', border: '1.5px solid var(--border)', borderRadius: 10, fontFamily: 'var(--font)', fontSize: 15, fontWeight: 600, textAlign: 'center', outline: 'none' }}
                  type="number" value={quantities[item.id] || ''}
                  onChange={e => setQuantities(p => ({ ...p, [item.id]: e.target.value }))} />
                <button style={{ width: 40, height: 40, borderRadius: 10, border: '1.5px solid var(--border)', background: 'white', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  onClick={() => setQuantities(p => ({ ...p, [item.id]: String(Number(p[item.id] || 0) + 5) }))}>+</button>
                <span style={{ fontSize: 13, color: 'var(--text-subtle)', fontWeight: 500 }}>{item.unit}</span>
              </div>
            </div>
          </div>
        ))}

        <div style={{ background: 'white', borderRadius: 14, padding: '14px 16px', marginBottom: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-subtle)', marginBottom: 10 }}>Restock Summary</div>
          {lowItems.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: 'var(--text-subtle)' }}>{item.name}</span>
              <span style={{ fontSize: 13, fontWeight: 700 }}>+{quantities[item.id] || 0} {item.unit}</span>
            </div>
          ))}
        </div>

        <button className="btn btn-primary" onClick={() => navigate('/farmer/inventory')}>Confirm Restock</button>
        <button className="btn btn-outline-grey" style={{ marginTop: 10 }} onClick={() => navigate(-1)}>Cancel</button>
      </div>
    </div>
  )
}