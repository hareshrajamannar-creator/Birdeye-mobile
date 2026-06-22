import { useEffect } from 'react';
import {
  MdOutlineCalendarMonth,
  MdOutlineFormatListBulleted,
  MdOutlineViewWeek,
} from 'react-icons/md';
import { Colors, FontSize, Radius, Spacing } from '../tokens';
import type { ViewMode } from '../types';

const ASSET_ROOT = `${import.meta.env.BASE_URL}sheet/`;

const VIEW_OPTIONS = [
  { mode: 'list' as ViewMode, label: 'List', Icon: MdOutlineFormatListBulleted },
  { mode: 'week' as ViewMode, label: 'Week', Icon: MdOutlineViewWeek },
  { mode: 'month' as ViewMode, label: 'Month', Icon: MdOutlineCalendarMonth },
];

interface ViewModeSheetProps {
  isOpen: boolean;
  selectedMode: ViewMode;
  onClose: () => void;
  onSelect: (mode: ViewMode) => void;
}

export default function ViewModeSheet({
  isOpen,
  selectedMode,
  onClose,
  onSelect,
}: ViewModeSheetProps) {
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="presentation"
      onClick={onClose}
      style={{
        position: 'absolute',
        top: -54,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 100,
        background: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Choose calendar view"
        onClick={event => event.stopPropagation()}
        style={{
          width: '100%',
          background: Colors.white,
          borderRadius: `${Radius.xl + Spacing.xs}px ${Radius.xl + Spacing.xs}px 0 0`,
          boxShadow: '0 10px 24px rgba(33, 33, 33, 0.2)',
          padding: `${Spacing.base}px ${Spacing.lg}px ${Spacing.xl}px`,
          display: 'flex',
          flexDirection: 'column',
          gap: Spacing.base,
        }}
      >
        <div style={{ height: 5, display: 'flex', justifyContent: 'center' }}>
          <img src={`${ASSET_ROOT}handle.svg`} alt="" width={45} height={5} />
        </div>
        <p style={{ margin: 0, fontSize: FontSize.md - 1, lineHeight: 1.5, fontWeight: 500, color: Colors.textPrimary }}>
          View posts by
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: Spacing.sm }}>
          {VIEW_OPTIONS.map(({ mode, label, Icon }) => {
            const isSelected = mode === selectedMode;
            return (
              <button
                key={mode}
                type="button"
                onClick={() => onSelect(mode)}
                style={{
                  width: '100%',
                  minHeight: 48,
                  border: 0,
                  borderRadius: Radius.md,
                  padding: `0 ${Spacing.md}px`,
                  background: isSelected ? '#ECF5FD' : 'transparent',
                  color: isSelected ? Colors.primary : Colors.textPrimary,
                  display: 'flex',
                  alignItems: 'center',
                  gap: Spacing.md,
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <Icon size={24} />
                <span style={{ flex: 1, fontSize: FontSize.md - 1, lineHeight: 1.5, fontWeight: isSelected ? 500 : 400 }}>
                  {label}
                </span>
                {isSelected && (
                  <span style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={`${ASSET_ROOT}check.svg`} alt="" width={13} height={9} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
