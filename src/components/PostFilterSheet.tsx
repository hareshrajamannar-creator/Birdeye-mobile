import { useEffect, useState } from 'react';
import { Colors, FontSize, Radius, Spacing } from '../tokens';

const ASSET_ROOT = `${import.meta.env.BASE_URL}sheet/`;

const SECTIONS = [
  {
    id: 'publish',
    label: 'Publish',
    options: ['All posts', 'Drafts', 'Awaiting approval', 'Rejected posts', 'Failed posts'],
  },
  {
    id: 'engage',
    label: 'Engage',
    options: ['View all engagements', 'Assigned to me', 'Awaiting approval', 'Rejected replies', 'Closed', 'Spam'],
  },
  {
    id: 'library',
    label: 'Library',
    options: ['Post library', 'Media library'],
  },
] as const;

interface PostFilterSheetProps {
  isOpen: boolean;
  selectedKey: string;
  onClose: () => void;
  onSelect: (key: string, label: string) => void;
}

export default function PostFilterSheet({
  isOpen,
  selectedKey,
  onClose,
  onSelect,
}: PostFilterSheetProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    () => new Set(['publish'])
  );

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleSection = (sectionId: string) => {
    setExpandedSections(current => {
      const next = new Set(current);
      if (next.has(sectionId)) next.delete(sectionId);
      else next.add(sectionId);
      return next;
    });
  };

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
        aria-label="Choose posts to display"
        onClick={event => event.stopPropagation()}
        style={{
          width: '100%',
          maxHeight: 'calc(100% - 42px)',
          overflowY: 'auto',
          background: Colors.white,
          borderRadius: `${Radius.xl + Spacing.xs}px ${Radius.xl + Spacing.xs}px 0 0`,
          boxShadow: '0 10px 24px rgba(33, 33, 33, 0.2)',
          padding: `${Spacing.base}px ${Spacing.lg}px`,
          display: 'flex',
          flexDirection: 'column',
          gap: Spacing.xl,
        }}
      >
        <div style={{ height: 5, display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
          <img src={`${ASSET_ROOT}handle.svg`} alt="" width={45} height={5} />
        </div>

        {SECTIONS.map(section => {
          const isExpanded = expandedSections.has(section.id);

          return (
            <section key={section.id} style={{ display: 'flex', flexDirection: 'column', gap: isExpanded ? Spacing.sm : 0 }}>
              <button
                type="button"
                aria-expanded={isExpanded}
                onClick={() => toggleSection(section.id)}
                style={{
                  width: '100%',
                  height: 24,
                  border: 0,
                  padding: 0,
                  background: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  color: Colors.textPrimary,
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontSize: FontSize.md - 1, lineHeight: 1.5, fontWeight: 500 }}>
                  {section.label}
                </span>
                <span style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img
                    src={`${ASSET_ROOT}${isExpanded ? 'chevron-up.svg' : 'chevron-down.svg'}`}
                    alt=""
                    width={11}
                    height={6}
                  />
                </span>
              </button>

              {isExpanded && section.options.map(option => {
                const optionKey = `${section.id}:${option}`;
                const isSelected = optionKey === selectedKey;
                return (
                  <button
                    key={`${section.id}-${option}`}
                    type="button"
                    onClick={() => onSelect(optionKey, option)}
                    style={{
                      width: '100%',
                      minHeight: 40,
                      border: 0,
                      borderRadius: Radius.sm,
                      padding: Spacing.sm,
                      background: isSelected ? '#ECF5FD' : 'transparent',
                      color: isSelected ? Colors.primary : Colors.textPrimary,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      cursor: 'pointer',
                    }}
                  >
                    <span style={{ fontSize: FontSize.md - 1, lineHeight: 1.5, fontWeight: 400 }}>
                      {option}
                    </span>
                    {isSelected && (
                      <span style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={`${ASSET_ROOT}check.svg`} alt="" width={13} height={9} />
                      </span>
                    )}
                  </button>
                );
              })}
            </section>
          );
        })}
      </div>
    </div>
  );
}
