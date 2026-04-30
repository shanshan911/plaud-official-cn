import { forwardRef, useCallback, useRef, useState } from 'react';
import { Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { Swiper } from 'swiper/react';
import { FigmaCarouselPager } from '@/components/FigmaCarouselPager';

const SWIPER_SPEED = 500;
const defaultAutoplay = { delay: 3000, pauseOnMouseEnter: true, disableOnInteraction: false } as const;

type FigmaHomeSwiperProps = {
  isMobile?: boolean;
  className?: string;
  total: number;
  spaceBetween: number;
  /** Swiper loop 时额外克隆数量；slidesPerView:auto 且一屏可见多卡时可加大，避免衔接处右侧露空 */
  loopAdditionalSlides?: number;
  /** 是否居中显示活动卡；默认 true（Professionals 等两侧留半张）。Security 等需从左侧第一张对齐时传 false */
  centeredSlides?: boolean;
  /** 轨道起始偏移（左侧留白），默认 0 */
  slidesOffsetBefore?: number;
  /** slidesPerView=auto 时按当前可见组数翻页，避免左右露半张 */
  slidesPerGroupAuto?: boolean;
  /** 每次切换的分组数量 */
  slidesPerGroup?: number;
  /** 分页器外层容器 class（用于右扩轨道时保持分页器原位） */
  pagerWrapClassName?: string;
  pagerClassName?: string;
  pagerSize?: 'default' | 'mobile-211';
  prevAriaLabel?: string;
  nextAriaLabel?: string;
  children: React.ReactNode;
};

/**
 * 首页多组「Swiper 轨道 + FigmaCarouselPager（箭头 + 绿进度条）」的共用壳；Banner / 背书跑马灯请保持各自实现。
 */
export const FigmaHomeSwiper = forwardRef<HTMLDivElement, FigmaHomeSwiperProps>(function FigmaHomeSwiper(
  {
    isMobile = false,
    className = '',
    total,
    spaceBetween,
    loopAdditionalSlides = 0,
    centeredSlides = true,
    slidesOffsetBefore = 0,
    slidesPerGroupAuto = false,
    slidesPerGroup = 1,
    pagerWrapClassName = '',
    pagerClassName = '',
    pagerSize = 'default',
    prevAriaLabel = '上一组',
    nextAriaLabel = '下一组',
    children,
  },
  ref,
) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [displayIndex, setDisplayIndex] = useState(0);

  const handlePrev = useCallback(() => {
    void swiperRef.current?.slidePrev();
  }, []);
  const handleNext = useCallback(() => {
    void swiperRef.current?.slideNext();
  }, []);
  // 当业务层将数据重复多份以满足 Swiper v12 loop 的 slides ≥ slidesPerView + loopedSlides 要求时，
  // Swiper 的 realIndex 会在 [0, 物理 slide 数) 范围内变化，需要对 total 取模还原为原始 index，保证分页器正确。
  const handleSlideChange = useCallback(
    (s: SwiperType) => {
      setDisplayIndex(total > 0 ? s.realIndex % total : 0);
    },
    [total],
  );

  return (
    <div className={className} style={isMobile ? { touchAction: 'pan-y' } : undefined}>
      <div ref={ref} className="w-full min-w-0 overflow-hidden">
        <Swiper
          modules={[Autoplay]}
          loop
          loopAdditionalSlides={loopAdditionalSlides}
          watchSlidesProgress
          slidesPerView="auto"
          spaceBetween={spaceBetween}
          centeredSlides={centeredSlides}
          slidesOffsetBefore={slidesOffsetBefore}
          slidesPerGroupAuto={slidesPerGroupAuto}
          slidesPerGroup={slidesPerGroup}
          speed={SWIPER_SPEED}
          autoplay={defaultAutoplay}
          onSwiper={(s) => {
            swiperRef.current = s;
            setDisplayIndex(total > 0 ? s.realIndex % total : 0);
          }}
          onSlideChange={handleSlideChange}
          className="w-full"
        >
          {children}
        </Swiper>
      </div>
      <div className={`mt-8 flex justify-end sm:mt-10 ${pagerWrapClassName}`.trim()}>
        <FigmaCarouselPager
          activeIndex={displayIndex}
          total={total}
          onPrev={handlePrev}
          onNext={handleNext}
          prevAriaLabel={prevAriaLabel}
          nextAriaLabel={nextAriaLabel}
          className={pagerClassName}
          size={pagerSize}
        />
      </div>
    </div>
  );
});

FigmaHomeSwiper.displayName = 'FigmaHomeSwiper';
