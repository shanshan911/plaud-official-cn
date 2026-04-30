import { useEffect, useRef, type ReactNode } from 'react';

type SimpleModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  /** 覆盖标题默认字号/字重（如 Figma 24px Light） */
  titleClassName?: string;
  titleId?: string;
  children: ReactNode;
  /** 内容面板额外 class，如 max-w-[606px] */
  panelClassName?: string;
};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function SimpleModal({
  open,
  onClose,
  title,
  titleClassName,
  titleId = 'simple-modal-title',
  children,
  panelClassName = '',
}: SimpleModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const dialog = dialogRef.current;
    const opener = document.activeElement as HTMLElement | null;

    // 将焦点移入模态，聚焦第一个可聚焦元素
    const getFocusable = () =>
      Array.from(dialog?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) ?? []);
    getFocusable()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const els = getFocusable();
      if (els.length === 0) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      opener?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 p-4"
      role="presentation"
      data-figma-node="208:16666"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`relative max-h-[90vh] w-full overflow-y-auto rounded-[5px] bg-[#f7f7f7] shadow-xl ${panelClassName}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-neutral-300 px-6 py-4 sm:px-8 sm:py-5">
          <h2
            id={titleId}
            className={`pr-8 ${titleClassName ?? 'text-xl font-light text-black sm:text-2xl'}`}
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 flex size-9 shrink-0 items-center justify-center rounded text-neutral-600 transition hover:bg-black/5 hover:text-black"
            aria-label="关闭"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div className="px-6 py-5 sm:px-8 sm:py-6">{children}</div>
      </div>
    </div>
  );
}
