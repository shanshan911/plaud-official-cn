import { memo, useEffect, useRef, useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import { FigmaHomeSwiper } from '@/components/FigmaHomeSwiper';
import professionalExecutive from '@/assets/images/home/professional-executive.webp';
import professionalSales from '@/assets/images/home/professional-sales.webp';
import professionalMedical from '@/assets/images/home/professional-medical.webp';
import professionalLawyer from '@/assets/images/home/professional-lawyer.webp';
import professionalEducator from '@/assets/images/home/professional-educator.webp';
import professionalCreator from '@/assets/images/home/professional-creator.webp';
/** PC：按 Figma 左侧留白 + 右侧撑满；卡宽 = (轨宽 - leftOffset - 2*gap) / 3 */
const PC_CARD_MAX = 500;
const PC_GAP = 16;
const PC_LEFT_OFFSET = PC_GAP;
/** 移动 Figma 208:16795 / 208:16796：408×408，间距 24 */
const MB_CARD_TARGET = 408;
const MB_GAP = 24;

const professionalCards = [
  { id: 'executive', src: professionalExecutive, label: '高管' },
  { id: 'sales', src: professionalSales, label: '销售人士' },
  { id: 'medical', src: professionalMedical, label: '医疗专业人士' },
  { id: 'lawyer', src: professionalLawyer, label: '律师' },
  { id: 'educator', src: professionalEducator, label: '教育工作者' },
  { id: 'creator', src: professionalCreator, label: '内容创作者' },
] as const;

const totalItems = professionalCards.length;
/** Swiper v12 loop 需要 slides ≥ slidesPerView + loopedSlides；把数据复制一轮避免衔接处露空 */
const loopedCards = [
  ...professionalCards.map((c) => ({ ...c, key: `${c.id}-a` })),
  ...professionalCards.map((c) => ({ ...c, key: `${c.id}-b` })),
];

type ProfessionalsCarouselProps = { isMobile?: boolean; className?: string };

export const ProfessionalsCarousel = memo(({ isMobile = false, className = '' }: ProfessionalsCarouselProps) => {
  const [mobileCardW, setMobileCardW] = useState(MB_CARD_TARGET);
  const [pcCardW, setPcCardW] = useState(PC_CARD_MAX);
  const measureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      if (isMobile) {
        setMobileCardW(Math.min(MB_CARD_TARGET, Math.max(280, w - 24)));
        return;
      }
      const raw = (w - PC_LEFT_OFFSET - 2 * PC_GAP) / 3;
      setPcCardW(Math.max(280, Math.min(PC_CARD_MAX, Math.floor(raw))));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [isMobile]);

  const cardW = isMobile ? mobileCardW : pcCardW;
  const cardH = isMobile ? mobileCardW : pcCardW;
  const gap = isMobile ? MB_GAP : PC_GAP;
  const mbBadgeScale = isMobile ? cardW / MB_CARD_TARGET : 1;

  return (
    <FigmaHomeSwiper
      ref={measureRef}
      isMobile={isMobile}
      className={className}
      total={totalItems}
      spaceBetween={gap}
      centeredSlides={isMobile}
      slidesOffsetBefore={isMobile ? 0 : PC_LEFT_OFFSET}
      pagerWrapClassName="lg:pr-[calc(100vw-100%)]"
      pagerClassName={isMobile ? 'scale-[0.92] sm:scale-100' : ''}
    >
      {loopedCards.map((c) => (
        <SwiperSlide key={c.key} className="!h-auto" style={{ width: cardW }}>
          <article
            className={`relative overflow-hidden bg-white shadow-sm ${isMobile ? 'rounded-[7.549px]' : 'rounded-[4px]'}`}
            style={{ width: cardW, height: cardH }}
          >
            <img src={c.src} alt={c.label} className="h-full w-full object-cover" loading="lazy" decoding="async" />
            {isMobile ? (
              <div
                className="absolute font-[family-name:var(--font-sans)] font-light text-white"
                style={{
                  left: 22.65 * mbBadgeScale,
                  top: 22.65 * mbBadgeScale,
                  paddingLeft: 22.646 * mbBadgeScale,
                  paddingRight: 22.646 * mbBadgeScale,
                  paddingTop: 9.436 * mbBadgeScale,
                  paddingBottom: 9.436 * mbBadgeScale,
                  borderRadius: 4.718 * mbBadgeScale,
                  backdropFilter: `blur(${17.524 * mbBadgeScale}px)`,
                  WebkitBackdropFilter: `blur(${17.524 * mbBadgeScale}px)`,
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  fontSize: Math.max(15, 20 * mbBadgeScale),
                  lineHeight: 1.2,
                }}
              >
                {c.label}
              </div>
            ) : (
              <div className="absolute left-8 top-8 rounded bg-black/20 px-6 py-2.5 backdrop-blur-md">
                <span className="text-xl font-light text-white lg:text-[29px] lg:leading-tight">{c.label}</span>
              </div>
            )}
          </article>
        </SwiperSlide>
      ))}
    </FigmaHomeSwiper>
  );
});

ProfessionalsCarousel.displayName = 'ProfessionalsCarousel';
