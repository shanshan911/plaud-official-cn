import { useCallback, useEffect, useRef, useState } from 'react';
import logoPlaud from '@/assets/images/home/logoPlaud.webp';
import { ANCHORS } from '@/data/home-content';
import { FIGMA_MOBILE_SECTION_NODES, FIGMA_SECTION_NODES } from '@/sections/figma-nodes';

/** Figma 208:16337：链间距约 25px */
const NAV_LINK_GAP = 'gap-x-[25px]';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const links = [
  { hash: ANCHORS.scenarios, kind: 'cn' as const, label: '场景解决', figmaId: '208:16340' },
  { hash: ANCHORS.products, kind: 'plaud-product' as const, figmaId: '208:16338' },
  { hash: ANCHORS.intelligence, kind: 'jokker' as const, label: 'Plaud Intelligence', figmaId: '208:16339' },
  { hash: ANCHORS.contact, kind: 'cn' as const, label: '联系我们', figmaId: '208:16341' },
] as const;

function NavLinkContent({ item }: { item: (typeof links)[number] }) {
  const cn = 'font-[family-name:var(--font-sans)] font-light';
  const jk = 'font-[family-name:var(--font-jokker)] font-normal';

  if (item.kind === 'cn') {
    return <span className={cn}>{item.label}</span>;
  }
  if (item.kind === 'jokker') {
    return <span className={jk}>{item.label}</span>;
  }
  return (
    <span className="whitespace-nowrap">
      <span className={jk}>Plaud </span>
      <span className={cn}>产品</span>
    </span>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="20" height="12" viewBox="0 0 20 12" fill="none" aria-hidden className="shrink-0">
      {open ? (
        <>
          <path d="M1 1L19 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M19 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d="M0 1H20" stroke="currentColor" strokeWidth="1.5" />
          <path d="M0 6H20" stroke="currentColor" strokeWidth="1.5" />
          <path d="M0 11H20" stroke="currentColor" strokeWidth="1.5" />
        </>
      )}
    </svg>
  );
}

export function TopNavSection() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const scrollTo = useCallback((hash: string) => {
    const el = document.getElementById(hash);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const navigate = useCallback(
    (hash: string) => {
      scrollTo(hash);
      closeDrawer();
    },
    [scrollTo, closeDrawer],
  );

  useEffect(() => {
    if (!drawerOpen) return;

    const drawer = drawerRef.current;
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevHtmlOverflowX = html.style.overflowX;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyOverflowX = body.style.overflowX;
    html.style.overflow = 'hidden';
    html.style.overflowX = 'hidden';
    body.style.overflow = 'hidden';
    body.style.overflowX = 'hidden';

    // 将焦点移入抽屉，聚焦第一个可聚焦元素
    const getFocusable = () =>
      Array.from(drawer?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) ?? []);
    getFocusable()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeDrawer();
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

    return () => {
      document.removeEventListener('keydown', onKey);
      html.style.overflow = prevHtmlOverflow;
      html.style.overflowX = prevHtmlOverflowX;
      body.style.overflow = prevBodyOverflow;
      body.style.overflowX = prevBodyOverflowX;
      openerRef.current?.focus();
    };
  }, [drawerOpen, closeDrawer]);

  return (
    <>
      {/**
       * 抽屉/遮罩必须放在 header 外：header 使用 backdrop-blur 会在部分浏览器中为 fixed 子元素建立包含块，
       * 导致抽屉相对顶栏定位而被裁切、看起来内容为空。
       */}
      <header
        className="sticky top-0 z-50 w-full border-b border-black/[0.06] bg-[rgba(242,239,235,0.72)] backdrop-blur-[5.126px] lg:border-b-0 lg:bg-[rgba(255,255,255,0.65)]"
        data-figma-node={FIGMA_SECTION_NODES.topNav.id}
        data-figma-mobile-node={FIGMA_MOBILE_SECTION_NODES.topNav.id}
      >
        <nav
          className="relative mx-auto flex max-w-[1440px] items-center px-4 py-3 sm:px-6 lg:h-[50px] lg:gap-[75.13px] lg:py-0 lg:pl-[94.7px] lg:pr-10"
          aria-label="主导航"
        >
          {/** 移动端 208:17807：左占位 / 中 logo / 右菜单 */}
          <div className="grid w-full min-w-0 grid-cols-3 items-center lg:hidden">
            <span className="w-10 shrink-0" aria-hidden />
            <span className="flex min-w-0 justify-center">
              <img
                src={logoPlaud}
                alt="Plaud"
                className="h-[12px] w-auto"
                width={70}
                height={12}
              />
            </span>
            <div className="flex justify-end">
              <button
                type="button"
                className="flex size-10 items-center justify-center rounded-md text-black transition hover:bg-black/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00d0ff]"
                aria-expanded={drawerOpen}
                aria-controls="mobile-nav-drawer"
                onClick={() => {
                  if (!drawerOpen) {
                    openerRef.current = document.activeElement as HTMLElement | null;
                  }
                  setDrawerOpen((o) => !o);
                }}
              >
                <span className="sr-only">{drawerOpen ? '关闭菜单' : '打开菜单'}</span>
                <MenuIcon open={drawerOpen} />
              </button>
            </div>
          </div>

          {/** PC：logo + 横向链接 */}
          <span className="hidden shrink-0 items-center lg:flex">
            <img
              src={logoPlaud}
              alt="Plaud"
              className="h-[12px] w-auto sm:h-[12px] lg:h-[11.871px] lg:w-[70.434px]"
              width={70}
              height={12}
            />
          </span>
          <ul
            className={`hidden flex-wrap items-center lg:flex ${NAV_LINK_GAP} gap-y-2 whitespace-nowrap text-center text-[12.522px] leading-[1.2] not-italic text-black`}
          >
            {links.map((item) => (
              <li key={item.hash} data-figma-node={item.figmaId}>
                <button
                  type="button"
                  onClick={() => scrollTo(item.hash)}
                  className="cursor-pointer border-0 bg-transparent p-0 text-left transition hover:text-[#00d0ff]"
                >
                  <NavLinkContent item={item} />
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {drawerOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-[100] bg-black/40 lg:hidden"
          aria-label="关闭菜单"
          onClick={closeDrawer}
        />
      ) : null}

      <div
        ref={drawerRef}
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="移动端导航菜单"
        aria-hidden={!drawerOpen}
        className={`fixed inset-y-0 right-0 z-[110] flex w-[min(100vw-2rem,320px)] max-w-full flex-col border-l border-black/[0.08] bg-[#f2efebf2] shadow-lg backdrop-blur-md transition-transform duration-200 ease-out lg:hidden ${
          drawerOpen ? 'translate-x-0' : 'pointer-events-none translate-x-full'
        }`}
      >
        <div className="flex max-h-dvh min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-6 pb-10 pt-4">
          <div className="flex shrink-0 justify-end pb-6">
            <button
              type="button"
              className="flex size-10 items-center justify-center rounded-md text-black hover:bg-black/[0.04]"
              onClick={closeDrawer}
              aria-label="关闭"
            >
              <MenuIcon open />
            </button>
          </div>
          <nav aria-label="移动端导航">
            <ul className="flex flex-col gap-1 text-[15px] leading-[1.4] text-black">
              {links.map((item) => (
                <li key={item.hash}>
                  <button
                    type="button"
                    onClick={() => navigate(item.hash)}
                    className="w-full rounded-md px-3 py-3 text-left transition hover:bg-black/[0.04]"
                  >
                    <NavLinkContent item={item} />
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
