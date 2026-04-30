import { useCallback, useEffect, useRef, useState, type TouchEvent } from 'react';
import slideDesktop from '@/assets/images/home/banner-carousel/slide-desktop.webp';
import slideDesktopMobile from '@/assets/images/home/banner-carousel/slide-desktop-mobile.webp';
import slideNote from '@/assets/images/home/banner-carousel/slide-note.webp';
import slideNoteMobile from '@/assets/images/home/banner-carousel/slide-note-mobile.webp';
import slideNotePro from '@/assets/images/home/banner-carousel/slide-note-pro.webp';
import slideNoteProMobile from '@/assets/images/home/banner-carousel/slide-note-pro-mobile.webp';
import slideNotepinS from '@/assets/images/home/banner-carousel/slide-notepin-s.webp';
import slideNotepinSMobile from '@/assets/images/home/banner-carousel/slide-notepin-s-mobile.webp';
import {
  OFFICIAL_DOUYIN_URL,
  OFFICIAL_JD_URL,
  OFFICIAL_PLAUD_DESKTOP_URL,
  OFFICIAL_TMALL_URL,
} from '@/data/official-channels';
import { ANCHORS } from '@/data/home-content';
import { FIGMA_MOBILE_SECTION_NODES, FIGMA_SECTION_NODES } from '@/sections/figma-nodes';

const channelButtons = [
  { label: '天猫', href: OFFICIAL_TMALL_URL },
  { label: '京东', href: OFFICIAL_JD_URL },
  { label: '抖音', href: OFFICIAL_DOUYIN_URL },
] as const;

/** Figma 画板 1440×600 — 水平用宽度比、垂直用高度比，全宽缩放时与稿对齐 */
const FIG_W = 1440;
const FIG_H = 600;
const pctX = (px: number) => `${(px / FIG_W) * 100}%`;
const pctY = (px: number) => `${(px / FIG_H) * 100}%`;

/** Figma 208:16769「m」480×640 移动端 Banner */
const FIG_MB_H = 640;
const pctMbY = (px: number) => `${(px / FIG_MB_H) * 100}%`;

/**
 * 运营整幅 1440×600 导出 + 稿内文案（208:15363/65 等）。
 * 标题/副标题用 HTML 渲染；天猫/京东/抖音为稿面同款白底按钮（可见可点），与 Figma btn-PC 一致。
 */
type PrimaryCta = { label: string; href: string };

const slides: {
  id: string;
  figmaFrame: string;
  /** 文案区 Figma node，便于对稿 */
  figmaCopy?: string;
  navTheme: 'dark' | 'light';
  imageSrc: string;
  /** 480×640 移动端整幅，仅 lg 以下轮播使用；桌面仍用 imageSrc */
  imageSrcMobile: string;
  imageAlt: string;
  title: string;
  subtitle: string;
  /** 若有则只显示该按钮（如 Desktop 208:15091「前往桌面端」），否则显示天猫/京东/抖音 */
  primaryCta?: PrimaryCta;
}[] = [
  {
    id: 'note-pro',
    figmaFrame: '208:15355',
    navTheme: 'dark',
    imageSrc: slideNotePro,
    imageSrcMobile: slideNoteProMobile,
    imageAlt: 'Plaud Note Pro 首屏：让对话即为生产力',
    title: 'Plaud Note Pro',
    subtitle: '让对话 即为生产力',
  },
  {
    id: 'desktop',
    figmaFrame: '208:14944',
    figmaCopy: '208:15091',
    navTheme: 'light',
    imageSrc: slideDesktop,
    imageSrcMobile: slideDesktopMobile,
    imageAlt: 'Plaud Desktop：线上会议 智能捕捉',
    title: 'Plaud Desktop',
    subtitle: '线上会议 智能捕捉',
    primaryCta: { label: '前往桌面端', href: OFFICIAL_PLAUD_DESKTOP_URL },
  },
  {
    id: 'notepin-s',
    figmaFrame: '208:15112',
    figmaCopy: '208:15131',
    /** 208:15132–15134 稿面为黑字 + 白底渠道按钮，与浅色 Banner 区一致 */
    navTheme: 'light',
    imageSrc: slideNotepinS,
    imageSrcMobile: slideNotepinSMobile,
    imageAlt: 'Plaud NotePin S：解放双手 随时随地随心记',
    title: 'Plaud NotePin S',
    subtitle: '解放双手 随时随地随心记',
  },
  {
    id: 'note',
    figmaFrame: '208:15149',
    navTheme: 'dark',
    imageSrc: slideNote,
    imageSrcMobile: slideNoteMobile,
    imageAlt: 'Plaud Note：全球畅销 AI 纪要工具',
    title: 'Plaud Note',
    subtitle: '全球畅销 AI 纪要工具',
  },
];

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M14 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M10 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Figma 文案区（如 208:15132、208:15363）：主标题 Jokker Regular 48px；副标题 HarmonyOS Sans SC Light 20px；
 * 主副间距 gap-[6px]；与按钮区 gap-[56px] 由外层 gap-14 控制。
 */
function BannerCopy({ title, subtitle, theme }: { title: string; subtitle: string; theme: 'dark' | 'light' }) {
  const isLight = theme === 'light';
  return (
    <div className={`flex max-w-[393px] flex-col gap-1.5 ${isLight ? 'text-black' : 'text-white'}`}>
      <h2 className="font-[family-name:var(--font-jokker)] text-[length:clamp(28px,3.33vw,48px)] font-normal leading-normal not-italic">
        {title}
      </h2>
      <p className="font-[family-name:var(--font-sans)] text-[length:clamp(15px,1.39vw,20px)] font-light leading-normal not-italic">
        {subtitle}
      </p>
    </div>
  );
}

/**
 * Figma 208:16771 Frame 2：宽 444.16、标题块高约 61、副标题 25，主副间距约 7.68（68.68−61）
 */
function BannerCopyMobile({ title, subtitle, theme }: { title: string; subtitle: string; theme: 'dark' | 'light' }) {
  const isLight = theme === 'light';
  return (
    <div
      className={`mx-auto flex w-full max-w-[min(444px,92.5vw)] flex-col items-center gap-[7.68px] text-center ${
        isLight ? 'text-black' : 'text-white'
      }`}
    >
      <h2 className="font-[family-name:var(--font-jokker)] text-[length:clamp(40px,10.667vw,51.2px)] font-normal leading-[1]">
        {title}
      </h2>
      <p className="font-[family-name:var(--font-sans)] text-[length:clamp(16px,4.375vw,21px)] font-light leading-[1.2]">
        {subtitle}
      </p>
    </div>
  );
}

/** Figma btn-PC：18px Light、行高 1.2；固定 120px 宽仅用于三渠道 */
const channelBtnBaseClassName =
  'inline-flex h-10 shrink-0 items-center justify-center rounded-[5px] bg-white text-center text-[18px] font-light leading-[1.2] text-black shadow-sm transition hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00d0ff] font-[family-name:var(--font-sans)]';
const channelBtnClassName = `${channelBtnBaseClassName} w-[120px]`;

/** Figma 208:16776–16780 btn-PC：80×26、文案 14px；组内间距约 20 */
const channelBtnMbClassName =
  'inline-flex h-[26px] w-[80px] shrink-0 items-center justify-center rounded-[5px] text-center text-[12px] font-light leading-[1.2] text-black shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00d0ff] font-[family-name:var(--font-sans)]';

export function BannerSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const touchStartXRef = useRef<number | null>(null);
  const touchDeltaXRef = useRef(0);
  const slideCount = slides.length;
  const canPrev = slideCount > 1 && activeSlide > 0;
  const canNext = slideCount > 1 && activeSlide < slideCount - 1;

  const goPrev = useCallback(() => {
    setActiveSlide((i) => (i > 0 ? i - 1 : i));
  }, []);

  const goNext = useCallback(() => {
    setActiveSlide((i) => (i < slideCount - 1 ? i + 1 : i));
  }, [slideCount]);
  const handleTouchStart = useCallback((e: TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = e.touches[0]?.clientX ?? null;
    touchDeltaXRef.current = 0;
  }, []);
  const handleTouchMove = useCallback((e: TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current == null) return;
    touchDeltaXRef.current = (e.touches[0]?.clientX ?? touchStartXRef.current) - touchStartXRef.current;
  }, []);
  const handleTouchEnd = useCallback(() => {
    const deltaX = touchDeltaXRef.current;
    touchStartXRef.current = null;
    touchDeltaXRef.current = 0;
    if (Math.abs(deltaX) < 40) return;
    if (deltaX < 0) goNext();
    else goPrev();
  }, [goNext, goPrev]);

  const slide = slides[activeSlide];
  const isNavLight = slide.navTheme === 'light';
  const navBtnClass = isNavLight
    ? 'bg-white/95 text-black/80 shadow-sm ring-1 ring-black/[0.08] hover:bg-white disabled:opacity-35'
    : 'bg-white/12 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)] backdrop-blur-md hover:bg-white/20 disabled:opacity-35';

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target;
      if (t instanceof HTMLElement) {
        const tag = t.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || t.isContentEditable) return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goPrev, goNext]);

  return (
    <section
      id={ANCHORS.banner}
      className="relative w-full overflow-hidden bg-[#030507]"
      data-figma-node={FIGMA_SECTION_NODES.banner.id}
      data-figma-mobile-node={FIGMA_MOBILE_SECTION_NODES.banner.id}
      data-figma-banner-frame={slide.figmaFrame}
      data-figma-banner-copy={slide.figmaCopy}
      aria-roledescription="carousel"
      aria-label="首页轮播"
    >
      {/** 移动端 Figma 208:16769「m」480×640：KV 208:16770、文案 208:16771、渠道 208:16775、分页 208:16782 */}
      <div
        className="relative w-full lg:hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: 'pan-y' }}
      >
        <div className="relative aspect-[480/640] w-full overflow-hidden">
          <div
            className="absolute inset-0 flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {slides.map((s, i) => (
              <div key={`m-${s.id}`} className="relative h-full w-full shrink-0">
                <img
                  src={s.imageSrcMobile}
                  alt={s.imageAlt}
                  className="absolute inset-0 size-full object-cover object-center"
                  width={480}
                  height={640}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  fetchPriority={i === 0 ? 'high' : undefined}
                  decoding="async"
                />

                {/** 208:16771：x≈17.92 y≈61.44，宽约 444/480 */}
                <div
                  className="pointer-events-none absolute inset-x-0 z-10 flex justify-center"
                  style={{ top: pctMbY(61.439998626708984) }}
                >
                  <div className="pointer-events-auto w-full px-4">
                    <BannerCopyMobile title={s.title} subtitle={s.subtitle} theme={s.navTheme} />
                  </div>
                </div>

                {/** 208:16775 Group 3：y≈211，三枚 80×26，组宽 280 水平居中 */}
                <div
                  className="pointer-events-none absolute left-1/2 z-10 flex -translate-x-1/2 justify-center"
                  style={{ top: pctMbY(211.000244140625) }}
                >
                  <div className="pointer-events-auto flex w-[280px] max-w-[calc(100vw-2rem)] justify-center gap-5">
                    {s.primaryCta ? (
                      <a
                        href={s.primaryCta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${channelBtnMbClassName} !w-auto min-h-[26px] bg-white px-3 hover:bg-neutral-100`}
                      >
                        {s.primaryCta.label}
                      </a>
                    ) : (
                      channelButtons.map((btn, idx) => (
                        <a
                          key={btn.label}
                          href={btn.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${channelBtnMbClassName} ${idx === 0 ? 'bg-[#00d0ff] hover:bg-[#00bee8]' : 'bg-white hover:bg-neutral-100'}`}
                        >
                          {btn.label}
                        </a>
                      ))
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/** 208:16782：条高 2.56；4 张时 64 + 32×3 + 5×3 = 175，在 212 画幅内水平居中 */}
          <div
            className="pointer-events-none absolute left-1/2 z-20 flex -translate-x-1/2 justify-center"
            style={{ bottom: `${((FIG_MB_H - 606.720458984375 - 2.559999942779541) / FIG_MB_H) * 100}%` }}
            role="tablist"
            aria-label="Banner 轮播图"
          >
            <div className="pointer-events-auto flex h-[2.56px] w-[175px] max-w-[calc(100%-2rem)] gap-[5px]">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={i === activeSlide}
                  onClick={() => setActiveSlide(i)}
                  className={`h-full shrink-0 rounded-none transition-[width,background-color] ${
                    i === activeSlide ? 'w-16 bg-[#00d0ff]' : 'w-8 bg-[#d9d9d9] hover:bg-[#c4c4c4]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/** 桌面端 1440×600 */}
      <div className="relative hidden w-full lg:block">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
        >
          {slides.map((s, i) => (
            <div key={s.id} className="relative w-full shrink-0">
              <img
                src={s.imageSrc}
                alt={s.imageAlt}
                className="block h-auto w-full"
                width={1440}
                height={600}
                loading={i === 0 ? 'eager' : 'lazy'}
                fetchPriority={i === 0 ? 'high' : undefined}
                decoding="async"
              />

              {/** 208:15362：文案 + gap 56 + 渠道热区；文案可见（与 Figma 字号层级一致） */}
              <div className="pointer-events-none absolute inset-0 z-10">
                <div
                  className="pointer-events-auto absolute top-1/2 flex -translate-y-1/2 flex-col items-start gap-14"
                  style={{ left: pctX(160), width: pctX(393) }}
                >
                  <BannerCopy title={s.title} subtitle={s.subtitle} theme={s.navTheme} />
                  {s.primaryCta ? (
                    <a
                      href={s.primaryCta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${channelBtnBaseClassName} min-w-[120px] px-4`}
                    >
                      {s.primaryCta.label}
                    </a>
                  ) : (
                    <div className="flex w-full flex-wrap gap-[15px]">
                      {channelButtons.map((btn) => (
                        <a key={btn.label} href={btn.href} target="_blank" rel="noopener noreferrer" className={channelBtnClassName}>
                          {btn.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-0 z-20">
          <button
            type="button"
            onClick={goPrev}
            disabled={!canPrev}
            className={`pointer-events-auto absolute left-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full transition disabled:pointer-events-none sm:left-[2.7777777778%] sm:size-[41px] ${navBtnClass}`}
            aria-label="上一张"
          >
            <ChevronLeft className="size-[18px] sm:size-5" />
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={!canNext}
            className={`pointer-events-auto absolute right-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full transition disabled:pointer-events-none sm:right-[2.7777777778%] sm:size-[41px] ${navBtnClass}`}
            aria-label="下一张"
          >
            <ChevronRight className="size-[18px] sm:size-5" />
          </button>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 z-20 flex justify-center gap-2"
          style={{ bottom: pctY(30) }}
          role="tablist"
          aria-label="Banner 轮播图"
        >
          <div className="pointer-events-auto flex gap-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={i === activeSlide}
                onClick={() => setActiveSlide(i)}
                className={`h-0.5 shrink-0 rounded-none transition-[width,background-color] ${
                  i === activeSlide ? 'w-[84px] bg-[#00d0ff]' : 'w-[50px] bg-[#d9d9d9] hover:bg-[#c4c4c4]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
