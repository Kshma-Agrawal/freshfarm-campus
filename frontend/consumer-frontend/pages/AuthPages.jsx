import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { GoogleIcon, CaretLeft, Lock, Phone, EnvelopeSimple, Check } from '../components/UI'
import logoImg from '../assets/logo.png'

export function SplashPage() {
  const navigate = useNavigate()
  return (
    <div className="splash-screen screen no-nav">
      <div />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
        <img src={logoImg} alt="Fresh Farm Campus" style={{ width: 160, height: 160, borderRadius: '50%' }} />
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font)', fontSize: 32, color: 'white', fontWeight: 800, letterSpacing: '-0.5px' }}>Fresh Farm</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.15em', marginTop: 4, fontWeight: 600 }}>CAMPUS</div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, width: '100%' }}>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, textAlign: 'center', maxWidth: 260, fontWeight: 500 }}>
          Fresh produce delivered straight from local farms to your door
        </p>
        <button className="btn" style={{ background: 'white', color: 'var(--primary)', fontWeight: 700, maxWidth: 320 }}
          onClick={() => navigate('/select-role')}>Get Started</button>
      </div>
    </div>
  )
}

export function SelectRolePage() {
  const navigate = useNavigate()
  const [role, setRole] = useState('consumer')
  return (
    <div className="screen no-nav" style={{ padding: '48px 24px 32px', background: 'var(--white)' }}>
      <div className="auth-logo">
        <img src={logoImg} alt="Fresh Farm Campus" style={{ width: 88, height: 88, borderRadius: '50%', marginBottom: 10 }} />
        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--primary-dark)' }}>Fresh Farm Campus</div>
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6, letterSpacing: '-0.011em' }}>Select your role</h2>
      <p style={{ fontSize: 14, color: 'var(--text-subtle)', marginBottom: 28, fontWeight: 500 }}>Choose how you want to use the app.</p>
      {[
        { id: 'consumer', title: 'Consumer', desc: 'Browse and order fresh produce.' },
        { id: 'farmer', title: 'Farmer', desc: 'Sell your farm produce.' },
      ].map(r => (
        <div key={r.id} className={`role-card ${role === r.id ? 'selected' : ''}`} onClick={() => setRole(r.id)}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600 }}>{r.title}</div>
            <div style={{ fontSize: 13, color: 'var(--text-subtle)', marginTop: 2, fontWeight: 500 }}>{r.desc}</div>
          </div>
          <div className={`radio ${role === r.id ? 'checked' : ''}`} />
        </div>
      ))}
      <button className="btn btn-primary mt-24" onClick={() => navigate('/login')}>Continue</button>
    </div>
  )
}

export function LoginPage() {
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false)
  return (
    <div className="auth-page screen no-nav">
      <div className="auth-logo">
        <img src={logoImg} alt="Fresh Farm Campus" style={{ width: 88, height: 88, borderRadius: '50%', marginBottom: 10 }} />
        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--primary-dark)' }}>Fresh Farm Campus</div>
        <div style={{ fontSize: 12, color: 'var(--text-subtle)', fontWeight: 500 }}>Campus</div>
      </div>
      <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4, letterSpacing: '-0.011em' }}>Welcome</h2>
      <p style={{ fontSize: 14, color: 'var(--text-subtle)', marginBottom: 24, fontWeight: 500 }}>Login to continue</p>
      <div className="input-wrap">
        <span className="input-icon"><Phone size={16} /></span>
        <input className="input-field" placeholder="Phone number" type="tel" />
      </div>
      <div className="input-wrap">
        <span className="input-icon"><Lock size={16} /></span>
        <input className="input-field" placeholder="Password" type={showPass ? 'text' : 'password'} style={{ paddingRight: 46 }} />
        <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: 'var(--text-subtle)' }}
          onClick={() => setShowPass(!showPass)}>
          {showPass ? <Lock size={16} /> : <Lock size={16} />}
        </span>
      </div>
      <div style={{ textAlign: 'right', marginBottom: 22 }}>
        <span style={{ fontSize: 13, color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}
          onClick={() => navigate('/forgot-password')}>Forgot Password?</span>
      </div>
      <button className="btn btn-primary" onClick={() => navigate('/enable-location')}>Login</button>
      <div className="divider">
        <div className="divider-line" /><span className="divider-text">Or</span><div className="divider-line" />
      </div>
      <button className="google-btn"><GoogleIcon /> Continue with Google</button>
      <div className="auth-footer">
        New here? <a onClick={() => navigate('/create-account')}>Create a Profile</a>
      </div>
    </div>
  )
}

export function ForgotPasswordPage() {
  const navigate = useNavigate()
  return (
    <div className="auth-page screen no-nav">
      <button style={{ background: 'none', border: 'none', cursor: 'pointer', marginBottom: 20, color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font)', fontSize: 14 }}
        onClick={() => navigate(-1)}>
        <CaretLeft size={20} weight="bold" /> Back
      </button>
      <div className="auth-logo">
        <img src={logoImg} alt="Fresh Farm Campus" style={{ width: 88, height: 88, borderRadius: '50%', marginBottom: 10 }} />
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4, letterSpacing: '-0.011em' }}>Forgot Password</h2>
      <p style={{ fontSize: 14, color: 'var(--text-subtle)', marginBottom: 24, fontWeight: 500 }}>Enter your registered phone number</p>
      <div className="input-wrap">
        <span className="input-icon"><Phone size={16} /></span>
        <input className="input-field" placeholder="Enter your phone number" type="tel" />
      </div>
      <button className="btn btn-primary mt-16" onClick={() => navigate('/otp')}>Send OTP</button>
      <div className="auth-footer">
        New here? <a onClick={() => navigate('/create-account')}>Create a Profile</a>
      </div>
    </div>
  )
}

export function OTPPage() {
  const navigate = useNavigate()
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const refs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()]
  const handleChange = (i, v) => {
    if (!/^\d?$/.test(v)) return
    const next = [...otp]; next[i] = v; setOtp(next)
    if (v && i < 5) refs[i + 1].current.focus()
  }
  return (
    <div className="auth-page screen no-nav">
      <button style={{ background: 'none', border: 'none', cursor: 'pointer', marginBottom: 20, color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font)', fontSize: 14 }}
        onClick={() => navigate(-1)}>
        <CaretLeft size={20} weight="bold" /> Back
      </button>
      <div className="auth-logo">
        <img src={logoImg} alt="Fresh Farm Campus" style={{ width: 88, height: 88, borderRadius: '50%', marginBottom: 10 }} />
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4, letterSpacing: '-0.011em' }}>Verify OTP</h2>
      <p style={{ fontSize: 14, color: 'var(--text-subtle)', fontWeight: 500 }}>Check your phone</p>
      <p style={{ fontSize: 13, color: 'var(--text-subtle)', marginTop: 8, lineHeight: 1.6, fontWeight: 500 }}>
        We sent a verification code to<br />
        <strong style={{ color: 'var(--text-dark)' }}>+91 XXXXXXXX78</strong>
      </p>
      <div className="otp-inputs">
        {otp.map((v, i) => (
          <input key={i} ref={refs[i]} className="otp-input" maxLength={1} value={v}
            onChange={e => handleChange(i, e.target.value)}
            onKeyDown={e => e.key === 'Backspace' && !v && i > 0 && refs[i-1].current.focus()} />
        ))}
      </div>
      <button className="btn btn-primary" onClick={() => navigate('/login')}>Verify</button>
      <div style={{ textAlign: 'center', marginTop: 22 }}>
        <p style={{ fontSize: 13, color: 'var(--text-subtle)', fontWeight: 500 }}>⏱ Resend in 30s</p>
        <p style={{ fontSize: 13, color: 'var(--primary)', fontWeight: 600, marginTop: 10, cursor: 'pointer' }}>Resend OTP</p>
      </div>
    </div>
  )
}

export function CreateAccountPage() {
  const navigate = useNavigate()
  const [agreed, setAgreed] = useState(false)
  return (
    <div className="auth-page screen no-nav" style={{ paddingTop: 24 }}>
      <div className="auth-logo">
        <img src={logoImg} alt="Fresh Farm Campus" style={{ width: 88, height: 88, borderRadius: '50%', marginBottom: 10 }} />
        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--primary-dark)' }}>Create Account</div>
        <div style={{ fontSize: 12, color: 'var(--text-subtle)', fontWeight: 500 }}>Join Fresh Farm Campus Today</div>
      </div>
      {[
        { icon: <User size={16} />, ph: 'Full Name' },
        { icon: <Phone size={16} />, ph: 'Phone number' },
        { icon: <EnvelopeSimple size={16} />, ph: 'Email (Optional)' },
        { icon: <Lock size={16} />, ph: 'Password', type: 'password' },
        { icon: <Lock size={16} />, ph: 'Confirm Password', type: 'password' },
      ].map((f, i) => (
        <div className="input-wrap" key={i}>
          <span className="input-icon">{f.icon}</span>
          <input className="input-field" placeholder={f.ph} type={f.type || 'text'} />
        </div>
      ))}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', margin: '12px 0' }}
        onClick={() => setAgreed(!agreed)}>
        <div className={`checkbox ${agreed ? 'checked' : ''}`}>
          {agreed && <Check size={12} weight="bold" color="white" />}
        </div>
        <span style={{ fontSize: 13, color: 'var(--text-subtle)', fontWeight: 500 }}>
          I agree to the <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Terms & Conditions.</span>
        </span>
      </div>
      <button className="btn btn-primary mt-8" onClick={() => navigate('/login')}>Create Account</button>
      <div className="divider">
        <div className="divider-line" /><span className="divider-text">Or</span><div className="divider-line" />
      </div>
      <button className="google-btn"><GoogleIcon /> Continue with Google</button>
      <div className="auth-footer">
        Already have an account? <a onClick={() => navigate('/login')}>Login</a>
      </div>
    </div>
  )
}
