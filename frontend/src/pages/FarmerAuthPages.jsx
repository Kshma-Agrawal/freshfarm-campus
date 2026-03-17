import { useState, useRef } from 'react'
import logoImg from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import {
  CaretLeft, CaretDown, Phone, Eye, EyeSlash, Lock, EnvelopeSimple, User, Check, MapPin, Buildings, Timer, DeviceMobile, Globe
} from '@phosphor-icons/react'

// ── Shared Logo ───────────────────────────────────────────────────
export function LogoCircle({ size = 88 }) {
  return (
    <img src={logoImg} alt="Fresh Farms Campus"
      style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
  )
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 18 18">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  )
}

function RadioDot({ on }) {
  return (
    <div style={{
      width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
      border: `2px solid ${on ? 'var(--primary)' : '#d0d0d0'}`,
      background: on ? 'var(--primary)' : 'white',
      display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s'
    }}>
      {on && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'white' }} />}
    </div>
  )
}

const field = (icon, ph, type = 'text', extra = {}) => ({ icon, ph, type, ...extra })

// ── SPLASH ────────────────────────────────────────────────────────
export function FarmerSplashPage() {
  const navigate = useNavigate()
  return (
    <div className="splash-screen">
      <div />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
        <LogoCircle size={120} />
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', textAlign: 'center', lineHeight: 1.7, marginTop: 6 }}>
          Fresh produce, direct from<br />local farms to your door
        </p>
      </div>
      <button onClick={() => navigate('/farmer/select-language')}
        style={{ width: '100%', height: 52, borderRadius: '12px', border: 'none', background: 'white', color: 'var(--primary-dark)', fontSize: 16, fontWeight: 700, fontFamily: 'var(--font)', cursor: 'pointer' }}>
        Get Started
      </button>
    </div>
  )
}

// ── SELECT LANGUAGE ───────────────────────────────────────────────
export function FarmerSelectLanguagePage() {
  const navigate = useNavigate()
  const [sel, setSel] = useState('en')
  const langs = [
    { id: 'en', label: 'English',    native: 'English'  },
    { id: 'hi', label: 'हिन्दी',     native: 'Hindi'    },
    { id: 'pa', label: 'ਪੰਜਾਬੀ',    native: 'Punjabi'  },
    { id: 'gu', label: 'ગુજરાતી',   native: 'Gujarati' },
  ]
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: 'white', padding: '48px 16px 20px' }}>
        <button onClick={() => navigate(-1)} style={{ width: 34, height: 34, borderRadius: '50%', border: '1.5px solid var(--border)', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginBottom: 20 }}>
          <CaretLeft size={18} weight="bold" />
        </button>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Select Language</h2>
        <p style={{ fontSize: 14, color: 'var(--text-subtle)' }}>Choose your preferred language</p>
      </div>
      <div style={{ padding: '16px 16px 0', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {langs.map(l => (
          <div key={l.id} onClick={() => setSel(l.id)} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 16px', borderRadius: '12px',
            border: `1.5px solid ${sel === l.id ? 'var(--primary)' : 'var(--border)'}`,
            background: sel === l.id ? 'var(--primary-pale)' : 'white', cursor: 'pointer', transition: 'all 0.15s'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: sel === l.id ? 'var(--primary-light)' : 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}><Globe size={20} /></div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{l.label}</div>
                <div style={{ fontSize: 12, color: 'var(--text-subtle)', marginTop: 1 }}>( {l.native} )</div>
              </div>
            </div>
            <RadioDot on={sel === l.id} />
          </div>
        ))}
      </div>
      <div style={{ padding: '20px 16px 36px' }}>
        <button onClick={() => navigate('/farmer/select-role')} className="btn btn-primary">Continue</button>
      </div>
    </div>
  )
}

// ── SELECT ROLE ───────────────────────────────────────────────────
export function FarmerSelectRolePage() {
  const navigate = useNavigate()
  const [role, setRole] = useState('farmer')
  return (
    <div style={{ minHeight: '100vh', background: 'white', padding: '48px 16px 36px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 28 }}>
        <LogoCircle size={88} />
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Select your role</h2>
      <p style={{ fontSize: 14, color: 'var(--text-subtle)', marginBottom: 20 }}>Choose how you want to use the app.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        {[{ id: 'consumer', title: 'Consumer', desc: 'Browse and order fresh produce.' },
          { id: 'farmer', title: 'Farmer', desc: 'Sell your farm produce.' }].map(r => (
          <div key={r.id} onClick={() => setRole(r.id)} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '18px 16px', borderRadius: '12px',
            border: `1.5px solid ${role === r.id ? 'var(--primary)' : 'var(--border)'}`,
            background: role === r.id ? 'var(--primary-pale)' : 'white', cursor: 'pointer', transition: 'all 0.15s'
          }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{r.title}</div>
              <div style={{ fontSize: 13, color: 'var(--text-subtle)', marginTop: 3 }}>{r.desc}</div>
            </div>
            <RadioDot on={role === r.id} />
          </div>
        ))}
      </div>
      <div style={{ marginTop: 28 }}>
        <button onClick={() => navigate('/farmer/login')} className="btn btn-primary">Continue</button>
      </div>
    </div>
  )
}

// ── LOGIN ─────────────────────────────────────────────────────────
export function FarmerLoginPage() {
  const navigate = useNavigate()
  return (
    <div style={{ minHeight: '100vh', background: 'white', padding: '48px 16px 36px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32, textAlign: 'center' }}>
        <LogoCircle size={84} />
        <div style={{ fontSize: 22, fontWeight: 800, marginTop: 18 }}>Welcome</div>
        <div style={{ fontSize: 14, color: 'var(--text-subtle)', marginTop: 5 }}>Login to continue</div>
      </div>
      <div style={{ position: 'relative', marginBottom: 14 }}>
        <Phone size={17} color="var(--text-subtle)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
        <input className="input-field" placeholder="Phone number" type="tel" />
      </div>
      <button onClick={() => navigate('/farmer/otp')} className="btn btn-primary">Login</button>
      <div className="divider" style={{ margin: '18px 0' }}>
        <div className="divider-line" /><span className="divider-text">Or</span><div className="divider-line" />
      </div>
      <button className="google-btn"><GoogleIcon /> Continue with Google</button>
      <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--text-subtle)', marginTop: 22 }}>
        New here?{' '}
        <span style={{ color: 'var(--primary)', fontWeight: 700, cursor: 'pointer' }} onClick={() => navigate('/farmer/create-account')}>Create a Profile</span>
      </p>
    </div>
  )
}

// ── OTP ───────────────────────────────────────────────────────────
export function FarmerOTPPage() {
  const navigate = useNavigate()
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const refs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()]
  const handleChange = (i, val) => {
    if (!/^\d?$/.test(val)) return
    const next = [...otp]; next[i] = val; setOtp(next)
    if (val && i < 5) refs[i + 1].current?.focus()
  }
  const handleKey = (i, e) => { if (e.key === 'Backspace' && !otp[i] && i > 0) refs[i - 1].current?.focus() }

  return (
    <div style={{ minHeight: '100vh', background: 'white', padding: '48px 16px 36px', display: 'flex', flexDirection: 'column' }}>
      <button onClick={() => navigate(-1)} style={{ width: 34, height: 34, borderRadius: '50%', border: '1.5px solid var(--border)', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginBottom: 24, alignSelf: 'flex-start' }}>
        <CaretLeft size={18} weight="bold" />
      </button>
      <h2 style={{ fontSize: 22, fontWeight: 800 }}>Verify OTP</h2>
      <div style={{ textAlign: 'center', margin: '28px 0 8px' }}>
        <div style={{ fontSize: 42 }}><DeviceMobile size={20} /></div>
        <div style={{ fontWeight: 700, fontSize: 16, marginTop: 14, marginBottom: 6 }}>Check your phone</div>
        <div style={{ fontSize: 14, color: 'var(--text-subtle)' }}>We sent a verification code to</div>
        <div style={{ fontWeight: 700, fontSize: 15, marginTop: 5, color: 'var(--primary)' }}>+91 XXXXXXXX78</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 10, margin: '24px 0' }}>
        {otp.map((v, i) => (
          <input key={i} ref={refs[i]} className="otp-input" maxLength={1} value={v}
            onChange={e => handleChange(i, e.target.value)} onKeyDown={e => handleKey(i, e)} />
        ))}
      </div>
      <button onClick={() => navigate('/farmer/dashboard')} className="btn btn-primary">Verify</button>
      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, fontSize: 13, color: 'var(--text-subtle)', marginBottom: 8 }}>
          <Timer size={14} /> Resend in <strong>30s</strong>
        </div>
        <span style={{ color: 'var(--primary)', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Resend OTP</span>
      </div>
    </div>
  )
}

// ── CREATE ACCOUNT ────────────────────────────────────────────────
export function FarmerCreateAccountPage() {
  const navigate = useNavigate()
  const [showPw, setShowPw] = useState(false)
  const [showCpw, setShowCpw] = useState(false)
  const [agreed, setAgreed] = useState(false)

  return (
    <div style={{ minHeight: '100vh', background: 'white', padding: '48px 16px 36px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24, textAlign: 'center' }}>
        <LogoCircle size={84} />
        <div style={{ fontSize: 22, fontWeight: 800, marginTop: 18 }}>Create Account</div>
        <div style={{ fontSize: 14, color: 'var(--text-subtle)', marginTop: 5 }}>Join Fresh Farm Campus Today</div>
      </div>

      {/* Name */}
      <div style={{ position: 'relative', marginBottom: 14 }}>
        <User size={17} color="var(--text-subtle)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
        <input className="input-field" placeholder="Name" />
      </div>

      {/* Phone */}
      <div style={{ position: 'relative', marginBottom: 14 }}>
        <Phone size={17} color="var(--text-subtle)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
        <input className="input-field" placeholder="Phone number" type="tel" />
      </div>

      {/* Email */}
      <div style={{ position: 'relative', marginBottom: 14 }}>
        <EnvelopeSimple size={17} color="var(--text-subtle)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
        <input className="input-field" placeholder="Email (Optional)" type="email" />
      </div>

      {/* City + State */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <MapPin size={17} color="var(--text-subtle)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 1 }} />
          <CaretDown size={15} color="var(--text-subtle)" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 1 }} />
          <select style={{ width: '100%', height: 52, borderRadius: '12px', border: '1.5px solid var(--border)', background: 'white', fontSize: 14, fontFamily: 'var(--font)', color: 'var(--text-subtle)', paddingLeft: 40, paddingRight: 32, outline: 'none', appearance: 'none', cursor: 'pointer' }}>
            <option value="">city</option>
            {['Gurgaon','Delhi','Noida','Faridabad'].map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div style={{ flex: 1, position: 'relative' }}>
          <Buildings size={17} color="var(--text-subtle)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 1 }} />
          <CaretDown size={15} color="var(--text-subtle)" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 1 }} />
          <select style={{ width: '100%', height: 52, borderRadius: '12px', border: '1.5px solid var(--border)', background: 'white', fontSize: 14, fontFamily: 'var(--font)', color: 'var(--text-subtle)', paddingLeft: 40, paddingRight: 32, outline: 'none', appearance: 'none', cursor: 'pointer' }}>
            <option value="">state</option>
            {['Haryana','Delhi','Punjab','UP'].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Password */}
      {[['Password', showPw, setShowPw], ['Confirm Password', showCpw, setShowCpw]].map(([ph, show, setShow]) => (
        <div key={ph} style={{ position: 'relative', marginBottom: 14 }}>
          <Lock size={17} color="var(--text-subtle)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          <input className="input-field" placeholder={ph} type={show ? 'text' : 'password'} />
          <button onClick={() => setShow(!show)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-subtle)', display: 'flex', alignItems: 'center' }}>
            {show ? <EyeSlash size={17} /> : <Eye size={17} />}
          </button>
        </div>
      ))}

      {/* Terms */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 22 }}>
        <div onClick={() => setAgreed(!agreed)} style={{ width: 20, height: 20, borderRadius: 5, flexShrink: 0, marginTop: 1, border: `2px solid ${agreed ? 'var(--primary)' : 'var(--border)'}`, background: agreed ? 'var(--primary)' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.15s' }}>
          {agreed && <Check size={12} color="white" weight="bold" />}
        </div>
        <span style={{ fontSize: 13, color: 'var(--text-subtle)', lineHeight: 1.5 }}>
          I agree to the <span style={{ color: 'var(--primary)', fontWeight: 700, cursor: 'pointer' }}>Terms &amp; Conditions.</span>
        </span>
      </div>

      <button onClick={() => navigate('/farmer/dashboard')} className="btn btn-primary">Create Account</button>
      <div className="divider" style={{ margin: '16px 0' }}>
        <div className="divider-line" /><span className="divider-text">Or</span><div className="divider-line" />
      </div>
      <button className="google-btn"><GoogleIcon /> Continue with Google</button>
      <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--text-subtle)', marginTop: 18 }}>
        Already have an account?{' '}
        <span style={{ color: 'var(--primary)', fontWeight: 700, cursor: 'pointer' }} onClick={() => navigate('/farmer/login')}>Login</span>
      </p>
    </div>
  )
}
