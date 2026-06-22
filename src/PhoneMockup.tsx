import { useEffect, useState, type ReactNode } from 'react';

const PHONE_W = 393;
const PHONE_H = 852;

function BatteryIcon() {
  return (
    <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
      <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="#212121" strokeOpacity="0.35"/>
      <rect x="2" y="2" width="18" height="8" rx="2" fill="#212121"/>
      <path d="M23 4v4a2 2 0 000-4z" fill="#212121" fillOpacity="0.4"/>
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="#212121">
      <path d="M8 9.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM8 6a5.5 5.5 0 014.243 2.001l-1.415 1.414A3.5 3.5 0 008 8a3.5 3.5 0 00-2.828 1.415L3.757 8.001A5.5 5.5 0 018 6zM8 2a9.5 9.5 0 017.07 3.172L13.657 6.586A7.5 7.5 0 008 4a7.5 7.5 0 00-5.657 2.586L.93 5.172A9.5 9.5 0 018 2z"/>
    </svg>
  );
}

function SignalIcon() {
  return (
    <svg width="17" height="12" viewBox="0 0 17 12" fill="#212121">
      <rect x="0" y="7" width="3" height="5" rx="1"/>
      <rect x="4.5" y="5" width="3" height="7" rx="1"/>
      <rect x="9" y="3" width="3" height="9" rx="1"/>
      <rect x="13.5" y="0" width="3" height="12" rx="1"/>
    </svg>
  );
}

interface PhoneMockupProps { children: ReactNode }

export default function PhoneMockup({ children }: PhoneMockupProps) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const calc = () => {
      const s = Math.min(
        (window.innerWidth - 64) / PHONE_W,
        (window.innerHeight - 96) / PHONE_H,
        1
      );
      setScale(Math.max(s, 0.3));
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  return (
    <div style={{ width: PHONE_W * scale, height: PHONE_H * scale, flexShrink: 0 }}>
    <div style={{
      transform: `scale(${scale})`,
      transformOrigin: 'top left',
      width: PHONE_W,
      height: PHONE_H,
      borderRadius: 55,
      background: 'linear-gradient(160deg, #2c2c2e 0%, #1a1a1c 100%)',
      padding: 10,
      position: 'relative',
      boxShadow: `
        0 28px 64px rgba(18, 28, 45, 0.22),
        0 8px 24px rgba(18, 28, 45, 0.16),
        inset 0 0 0 0.5px rgba(255,255,255,0.12),
        inset 0 1px 0 rgba(255,255,255,0.06)
      `,
      flexShrink: 0,
    }}>
      {/* Volume buttons */}
      <div style={{ position:'absolute', left:-3, top:130, width:3, height:28, background:'#3a3a3c', borderRadius:'2px 0 0 2px' }} />
      <div style={{ position:'absolute', left:-3, top:172, width:3, height:52, background:'#3a3a3c', borderRadius:'2px 0 0 2px' }} />
      <div style={{ position:'absolute', left:-3, top:238, width:3, height:52, background:'#3a3a3c', borderRadius:'2px 0 0 2px' }} />
      {/* Power button */}
      <div style={{ position:'absolute', right:-3, top:160, width:3, height:80, background:'#3a3a3c', borderRadius:'0 2px 2px 0' }} />

      {/* Screen */}
      <div style={{
        width: '100%', height: '100%',
        borderRadius: 46,
        background: '#fff',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}>
        {/* Dynamic Island */}
        <div style={{
          position: 'absolute', top: 12,
          left: '50%', transform: 'translateX(-50%)',
          width: 126, height: 37,
          borderRadius: 20,
          background: '#000',
          zIndex: 100,
        }} />

        {/* Status Bar */}
        <div style={{
          height: 54,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          paddingLeft: 28,
          paddingRight: 22,
          paddingBottom: 10,
          background: '#fff',
          flexShrink: 0,
          position: 'relative',
          zIndex: 10,
        }}>
          <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: -0.3, color: '#000' }}>9:41</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <SignalIcon />
            <WifiIcon />
            <BatteryIcon />
          </div>
        </div>

        {/* App content */}
        <div style={{ flex: 1, overflow: 'visible', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          {children}
        </div>
      </div>
    </div>
    </div>
  );
}
