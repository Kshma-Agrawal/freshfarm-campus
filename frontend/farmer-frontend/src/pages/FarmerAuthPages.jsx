import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CaretLeft, Phone, Eye, EyeSlash, Lock,
  EnvelopeSimple, User, Check, Timer
} from '@phosphor-icons/react'

function LogoCircle({ size = 88 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: 'var(--green-main)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', flexShrink: 0
    }}>
      <svg width={size * 0.48} height={size * 0.48} viewBox="0 0 40 40" fill="none">
        <path d="M20 4C20 4 8 10 8 22C8 28.627 13.373 34 20 34C26.627 34 32 28.627 32 22C32 10 20 4 20 4Z" fill="white" fillOpacity="0.9"/>
        <path d="M20 12C20 12 14 16 14 22C14 25.314 16.686 28 20 28C23.314 28 26 25.314 26 22C26 16 20 12 20 12Z" fill="var(--green-main)"/>
        <path d="M20 18V30" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M20 22L24 18" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M20 25L16 21" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  )
}

// Radio dot component
function RadioDot({ selected }) {
  return (
    <div style={{
      width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
      border: `2px solid ${selected ? 'var(--green-main)' : 'var(--border)'}`,
      background: selected ? 'var(--green-main)' : 'white',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      {selected && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'white' }} />}
    </div>
  )
}

// ── SPLASH ────────────────────────────────────────────────────────
export function FarmerSplashPage() {
  const navigate = useNavigate()
  return (
    <div className="splash-screen">
      <div />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        <div style={{
          width: 110, height: 110, borderRadius: '50%',
          background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <svg width="52" height="52" viewBox="0 0 40 40" fill="none">
            <path d="M20 4C20 4 8 10 8 22C8 28.627 13.373 34 20 34C26.627 34 32 28.627 32 22C32 10 20 4 20 4Z" fill="white" fillOpacity="0.9"/>
            <path d="M20 18V30" stroke="var(--green-main)" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 32, fontWeight: 800, color: 'white', letterSpacing: '-0.02em' }}>Fresh Farm</div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 4, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Campus</div>
        </div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', textAlign: 'center', marginTop: 8, lineHeight: 1.6 }}>
          Fresh produce, direct from<br />local farms to your door
        </div>
      </div>
      <button
        className="btn"
        style={{ background: 'white', color: 'var(--green-dark)', fontWeight: 700, fontSize: 16 }}
        onClick={() => navigate('/farmer/select-language')}
      >
        Get Started
      </button>
    </div>
  )
}

// ── SELECT LANGUAGE ───────────────────────────────────────────────
export function FarmerSelectLanguagePage() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState('en')
  const languages = [
    { id: 'en', label: 'English', native: 'English' },
    { id: 'hi', label: 'हिन्दी', native: 'Hindi' },
    { id: 'pa', label: 'ਪੰਜਾਬੀ', native: 'Punjabi' },
    { id: 'gu', label: 'ગુજરાતી', native: 'Gujarati' },
  ]
  return (
    <div style={{ minHeight: '100vh', background: 'var(--white)', padding: '52px 24px 40px', display: 'flex', flexDirection: 'column' }}>
      <button className="back-btn" onClick={() => navigate(-1)} style={{ marginBottom: 28, alignSelf: 'flex-start' }}>
        <CaretLeft size={20} weight="bold" />
      </button>
      <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6, letterSpacing: '-0.01em' }}>Select Language</h2>
      <p style={{ fontSize: 14, color: 'var(--text-light)', marginBottom: 32 }}>Choose your preferred language</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        {languages.map(l => (
          <div key={l.id} onClick={() => setSelected(l.id)} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '16px 18px', borderRadius: 'var(--radius)',
            border: `1.5px solid ${selected === l.id ? 'var(--green-main)' : 'var(--border)'}`,
            background: selected === l.id ? 'var(--green-pale)' : 'white',
            cursor: 'pointer', transition: 'all 0.15s'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 42, height: 42, borderRadius: '50%',
                background: selected === l.id ? 'var(--green-light)' : 'var(--bg)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20
              }}>🌐</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{l.label}</div>
                <div style={{ fontSize: 12, color: 'var(--text-light)', marginTop: 2 }}>( {l.native} )</div>
              </div>
            </div>
            <RadioDot selected={selected === l.id} />
          </div>
        ))}
      </div>

      <div style={{ marginTop: 32 }}>
        <button className="btn btn-primary" onClick={() => navigate('/farmer/select-role')}>Continue</button>
      </div>
    </div>
  )
}

// ── SELECT ROLE ───────────────────────────────────────────────────
export function FarmerSelectRolePage() {
  const navigate = useNavigate()
  const [role, setRole] = useState('farmer')
  return (
    <div style={{ minHeight: '100vh', background: 'var(--white)', padding: '52px 24px 40px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32 }}>
        <LogoCircle size={88} />
        <div style={{ fontSize: 13, fontWeight: 700, color: 'white', marginTop: -14, background: 'var(--green-main)', padding: '2px 12px', borderRadius: 12 }}>Fresh Farm Campus</div>
      </div>

      <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6, letterSpacing: '-0.01em' }}>Select your role</h2>
      <p style={{ fontSize: 14, color: 'var(--text-light)', marginBottom: 24 }}>Choose how you want to use the app.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
        {[
          { id: 'consumer', title: 'Consumer', desc: 'Browse and order fresh produce.' },
          { id: 'farmer', title: 'Farmer', desc: 'Sell your farm produce.' },
        ].map(r => (
          <div key={r.id} onClick={() => setRole(r.id)} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '20px 18px', borderRadius: 'var(--radius)',
            border: `1.5px solid ${role === r.id ? 'var(--green-main)' : 'var(--border)'}`,
            background: role === r.id ? 'var(--green-pale)' : 'white',
            cursor: 'pointer', transition: 'all 0.15s'
          }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>{r.title}</div>
              <div style={{ fontSize: 13, color: 'var(--text-light)', marginTop: 4 }}>{r.desc}</div>
            </div>
            <RadioDot selected={role === r.id} />
          </div>
        ))}
      </div>

      <div style={{ marginTop: 32 }}>
        <button className="btn btn-primary" onClick={() => navigate('/farmer/login')}>Continue</button>
      </div>
    </div>
  )
}

// ── LOGIN ─────────────────────────────────────────────────────────
export function FarmerLoginPage() {
  const navigate = useNavigate()
  return (
    <div style={{ minHeight: '100vh', background: 'var(--white)', padding: '52px 24px 40px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 36, textAlign: 'center' }}>
        <LogoCircle size={80} />
        <div style={{ fontSize: 24, fontWeight: 800, marginTop: 16, letterSpacing: '-0.01em' }}>Welcome Back</div>
        <div style={{ fontSize: 14, color: 'var(--text-light)', marginTop: 6 }}>Login to continue</div>
      </div>

      <div className="input-wrap">
        <Phone className="input-icon" size={18} />
        <input className="input-field" placeholder="Phone number" type="tel" />
      </div>

      <button className="btn btn-primary" onClick={() => navigate('/farmer/otp')}>Login</button>

      <div className="divider" style={{ margin: '20px 0' }}>
        <div className="divider-line" />
        <span className="divider-text">Or</span>
        <div className="divider-line" />
      </div>

      <button className="google-btn"><GoogleIcon /> Continue with Google</button>

      <div style={{ textAlign: 'center', fontSize: 14, color: 'var(--text-light)', marginTop: 24 }}>
        New here?{' '}
        <span style={{ color: 'var(--green-main)', fontWeight: 700, cursor: 'pointer' }}
          onClick={() => navigate('/farmer/create-account')}>Create a Profile</span>
      </div>
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
  const handleKey = (i, e) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) refs[i - 1].current?.focus()
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--white)', padding: '52px 24px 40px', display: 'flex', flexDirection: 'column' }}>
      <button className="back-btn" onClick={() => navigate(-1)} style={{ marginBottom: 28, alignSelf: 'flex-start' }}>
        <CaretLeft size={20} weight="bold" />
      </button>
      <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.01em' }}>Verify OTP</h2>

      <div style={{ textAlign: 'center', margin: '32px 0 8px' }}>
        <div style={{ fontSize: 40 }}>📱</div>
        <div style={{ fontWeight: 700, fontSize: 17, marginTop: 16, marginBottom: 8 }}>Check your phone</div>
        <div style={{ fontSize: 14, color: 'var(--text-light)' }}>We sent a verification code to</div>
        <div style={{ fontWeight: 700, fontSize: 15, marginTop: 6, color: 'var(--green-main)' }}>+91 XXXXXXXX78</div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 10, margin: '28px 0' }}>
        {otp.map((v, i) => (
          <input key={i} ref={refs[i]} className="otp-input" maxLength={1} value={v}
            onChange={e => handleChange(i, e.target.value)}
            onKeyDown={e => handleKey(i, e)} />
        ))}
      </div>

      <button className="btn btn-primary" onClick={() => navigate('/farmer/dashboard')}>Verify</button>

      <div style={{ textAlign: 'center', marginTop: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 13, color: 'var(--text-light)', marginBottom: 10 }}>
          <Timer size={15} /> Resend in <strong>30s</strong>
        </div>
        <span style={{ color: 'var(--green-main)', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Resend OTP</span>
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
    <div style={{ minHeight: '100vh', background: 'var(--white)', padding: '52px 24px 40px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 28, textAlign: 'center' }}>
        <LogoCircle size={80} />
        <div style={{ fontSize: 24, fontWeight: 800, marginTop: 16, letterSpacing: '-0.01em' }}>Create Account</div>
        <div style={{ fontSize: 14, color: 'var(--text-light)', marginTop: 6 }}>Join Fresh Farm Campus Today</div>
      </div>

      <div className="input-wrap">
        <User className="input-icon" size={18} />
        <input className="input-field" placeholder="Name" />
      </div>
      <div className="input-wrap">
        <Phone className="input-icon" size={18} />
        <input className="input-field" placeholder="Phone number" type="tel" />
      </div>
      <div className="input-wrap">
        <EnvelopeSimple className="input-icon" size={18} />
        <input className="input-field" placeholder="Email (Optional)" type="email" />
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        {[['city', ['Gurgaon', 'Delhi', 'Noida']], ['state', ['Haryana', 'Delhi', 'Punjab']]].map(([ph, opts]) => (
          <select key={ph} style={{
            flex: 1, height: 52, padding: '0 14px',
            border: '1.5px solid var(--border)', borderRadius: 'var(--radius)',
            fontFamily: 'var(--font)', fontSize: 14, background: 'white',
            outline: 'none', color: 'var(--text-mid)', cursor: 'pointer'
          }}>
            <option value="">{ph}</option>
            {opts.map(o => <option key={o}>{o}</option>)}
          </select>
        ))}
      </div>

      {[['Password', showPw, setShowPw], ['Confirm Password', showCpw, setShowCpw]].map(([ph, show, setShow]) => (
        <div key={ph} className="input-wrap">
          <Lock className="input-icon" size={18} />
          <input className="input-field" placeholder={ph} type={show ? 'text' : 'password'} />
          <button onClick={() => setShow(!show)} style={{
            position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
            background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)'
          }}>
            {show ? <EyeSlash size={18} /> : <Eye size={18} />}
          </button>
        </div>
      ))}

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 24 }}>
        <div onClick={() => setAgreed(!agreed)} style={{
          width: 22, height: 22, borderRadius: 6, marginTop: 1, flexShrink: 0,
          border: `2px solid ${agreed ? 'var(--green-main)' : 'var(--border)'}`,
          background: agreed ? 'var(--green-main)' : 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
        }}>
          {agreed && <Check size={13} color="white" weight="bold" />}
        </div>
        <span style={{ fontSize: 13, color: 'var(--text-mid)', lineHeight: 1.5 }}>
          I agree to the{' '}
          <span style={{ color: 'var(--green-main)', fontWeight: 700, cursor: 'pointer' }}>Terms & Conditions.</span>
        </span>
      </div>

      <button className="btn btn-primary" onClick={() => navigate('/farmer/dashboard')}>Create Account</button>

      <div className="divider" style={{ margin: '20px 0' }}>
        <div className="divider-line" />
        <span className="divider-text">Or</span>
        <div className="divider-line" />
      </div>

      <button className="google-btn"><GoogleIcon /> Continue with Google</button>

      <div style={{ textAlign: 'center', fontSize: 14, color: 'var(--text-light)', marginTop: 20 }}>
        Already have an account?{' '}
        <span style={{ color: 'var(--green-main)', fontWeight: 700, cursor: 'pointer' }}
          onClick={() => navigate('/farmer/login')}>Login</span>
      </div>
    </div>
  )
}
