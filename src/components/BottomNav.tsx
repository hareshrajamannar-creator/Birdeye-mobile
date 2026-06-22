import { Colors, FontSize } from '../tokens';

const ICON_ROOT = `${import.meta.env.BASE_URL}icons/`;

const ITEMS = [
  { label: 'Inbox', icon: 'inbox.svg', iconWidth: 24.928, iconHeight: 24 },
  { label: 'Reviews', icon: 'reviews.svg', iconWidth: 20, iconHeight: 20 },
  { label: 'Quick send', icon: 'quick-send.svg', iconWidth: 19, iconHeight: 19 },
  { label: 'Social', icon: 'social-active.svg', iconWidth: 19, iconHeight: 19 },
  { label: 'More', icon: 'more.svg', iconWidth: 17, iconHeight: 17 },
];

export default function BottomNav() {
  return (
    <nav
      aria-label="Main navigation"
      style={{
        height: 84,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        background: Colors.white,
        borderTop: `1px solid ${Colors.divider}`,
        boxShadow: '0 4px 8px rgba(33, 33, 33, 0.18)',
        position: 'relative',
        zIndex: 30,
      }}
    >
      <div style={{ height: 60, display: 'flex', flexShrink: 0 }}>
        {ITEMS.map(({ label, icon, iconWidth, iconHeight }) => {
          const isActive = label === 'Social';

          return (
            <button
              key={label}
              type="button"
              aria-current={isActive ? 'page' : undefined}
              style={{
                flex: 1,
                height: 60,
                border: 0,
                background: Colors.white,
                color: isActive ? Colors.primary : Colors.textPrimary,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '8px 0 0',
                cursor: 'pointer',
              }}
            >
              <span style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src={`${ICON_ROOT}${icon}`}
                  alt=""
                  width={iconWidth}
                  height={iconHeight}
                  style={{ display: 'block', objectFit: 'contain' }}
                />
              </span>
              <span style={{ width: '100%', marginTop: 2, fontSize: FontSize.xs, lineHeight: 1.5, fontWeight: isActive ? 500 : 400, textAlign: 'center' }}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
      <div style={{ height: 24, flexShrink: 0, position: 'relative', background: Colors.white }}>
        <div style={{ position: 'absolute', width: 134, height: 5, borderRadius: 100, background: Colors.textPrimary, left: '50%', bottom: 8, transform: 'translateX(-50%)' }} />
      </div>
    </nav>
  );
}
