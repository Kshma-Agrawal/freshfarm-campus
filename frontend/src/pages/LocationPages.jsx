import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, MapTrifold, Check } from '../components/UI'

export function EnableLocationPage() {
  const navigate = useNavigate()
  return (
    <div className="screen no-nav">
      <div className="location-screen">
        <div className="location-icon-wrap">
          <MapTrifold size={52} weight="duotone" color="var(--primary)" />
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10, letterSpacing: '-0.011em' }}>Enable Location</h2>
        <p style={{ fontSize: 14, color: 'var(--text-subtle)', lineHeight: 1.6, maxWidth: 280, fontWeight: 500 }}>
          Allow Fresh Farm Campus to access your location to find nearby farmers and get accurate delivery times.
        </p>
        <button className="btn btn-primary mt-24" style={{ maxWidth: 280 }} onClick={() => navigate('/detecting-location')}>
          Enable Location
        </button>
        <button className="btn btn-outline mt-8" style={{ maxWidth: 280 }} onClick={() => navigate('/manual-location')}>
          Enter Manually
        </button>
      </div>
    </div>
  )
}

function DetectingLocationScreen({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2000)
    return () => clearTimeout(t)
  }, [onDone])
  return (
    <div className="location-screen">
      <div className="detecting-ring">
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <MapPin size={36} weight="duotone" color="var(--primary)" />
        </div>
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10, letterSpacing: '-0.011em' }}>Detecting Location…</h2>
      <p style={{ fontSize: 14, color: 'var(--text-subtle)', fontWeight: 500 }}>Please wait while we find your location</p>
    </div>
  )
}

export function DetectingLocationPage() {
  const navigate = useNavigate()
  return (
    <div className="screen no-nav">
      <DetectingLocationScreen onDone={() => navigate('/location-confirm')} />
    </div>
  )
}

export function LocationConfirmPage() {
  const navigate = useNavigate()
  return (
    <div className="screen no-nav">
      <div className="location-screen">
        <div className="location-icon-wrap" style={{ background: '#e8f5e9' }}>
          <Check size={52} weight="bold" color="var(--primary)" />
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10, letterSpacing: '-0.011em' }}>Location Found!</h2>
        <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Gurgaon, Haryana</p>
        <p style={{ fontSize: 13, color: 'var(--text-subtle)', fontWeight: 500 }}>Sector 14, 122001</p>
        <button className="btn btn-primary mt-24" style={{ maxWidth: 280 }} onClick={() => navigate('/home')}>
          Confirm Location
        </button>
        <button className="btn btn-outline mt-8" style={{ maxWidth: 280 }} onClick={() => navigate('/manual-location')}>
          Change Location
        </button>
      </div>
    </div>
  )
}

export function ManualLocationPage() {
  const navigate = useNavigate()
  return (
    <div className="screen no-nav" style={{ background: 'var(--white)', padding: 24 }}>
      <button style={{ background: 'none', border: 'none', cursor: 'pointer', marginBottom: 20, color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font)', fontSize: 14 }}
        onClick={() => navigate(-1)}>
        Back
      </button>
      <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6, letterSpacing: '-0.011em' }}>Enter Location</h2>
      <p style={{ fontSize: 14, color: 'var(--text-subtle)', marginBottom: 24, fontWeight: 500 }}>Enter your delivery location manually</p>
      {['City / Town', 'State', 'Pincode'].map((ph, i) => (
        <div className="input-wrap" key={i}>
          <span className="input-icon"><MapPin size={16} /></span>
          <input className="input-field" placeholder={ph} />
        </div>
      ))}
      <button className="btn btn-primary mt-16" onClick={() => navigate('/home')}>Confirm Location</button>
    </div>
  )
}
