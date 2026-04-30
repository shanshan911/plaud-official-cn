import { memo, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { SwiperSlide } from 'swiper/react';
import { FigmaHomeSwiper } from '@/components/FigmaHomeSwiper';
import productNote from '@/assets/images/home/product-series/plaud-note.webp';
import productNotePro from '@/assets/images/home/product-series/plaud-note-pro.webp';
import productNotepinS from '@/assets/images/home/product-series/plaud-notepin-s.webp';
import { ANCHORS } from '@/data/home-content';
import { PRODUCT_COLOR_IMAGES } from '@/data/product-color-image-map';
import { PRODUCT_PURCHASE_URLS } from '@/data/product-purchase-links';
import { FIGMA_MOBILE_SECTION_NODES } from '@/sections/figma-nodes';

/** 与 Figma 色条 SVG 一致：银渐变、炭灰、玫瑰金/薰衣草渐变、蓝灰渐变 */
const SWATCH_SILVER: CSSProperties = {
  background: 'linear-gradient(142deg, #8C8C8C 0%, #F2F2F2 100%)',
};
const SWATCH_CHARCOAL: CSSProperties = { background: '#5E5E5E' };
const SWATCH_ROSE: CSSProperties = {
  background: 'linear-gradient(142deg, #8E8287 0%, #FBEFF4 100%)',
};
const SWATCH_BLUE_GRAY: CSSProperties = {
  background: 'linear-gradient(142deg, #3A4963 0%, #95A2B9 100%)',
};

type SwatchOption = { style: CSSProperties; colorName: string };

type ProductSeriesItem = {
  id: string;
  figmaNode: string;
  title: string;
  price: string;
  /** 天猫商品详情，用于「立即购买」 */
  purchaseUrl: string;
  image: string;
  alt: string;
  swatches: SwatchOption[];
  defaultSwatchIndex: number;
  /** Figma 208:15290 / 15305 / 15322 各产品主图外框与定位不同 */
  imageFrameClass: string;
  imageClass: string;
};

// 全局颜色图缓存：避免 Swiper loop 克隆/重挂载时重复解码导致偶发白闪。
const loadedColorImageCache = new Set<string>();
const loadingColorImageCache = new Map<string, Promise<void>>();

function preloadColorImage(src: string): Promise<void> {
  if (!src) return Promise.resolve();
  if (loadedColorImageCache.has(src)) return Promise.resolve();
  const inFlight = loadingColorImageCache.get(src);
  if (inFlight) return inFlight;

  const task = new Promise<void>((resolve) => {
    const img = new Image();
    let settled = false;
    const finalize = () => {
      if (settled) return;
      settled = true;
      loadedColorImageCache.add(src);
      loadingColorImageCache.delete(src);
      resolve();
    };
    img.onload = finalize;
    img.onerror = finalize;
    img.src = src;
    if (img.complete) finalize();
  });

  loadingColorImageCache.set(src, task);
  return task;
}

/** 顺序：左 Note Pro → 中 NotePin S → 右 Note；卡 350×452、gap 35 */
const products: ProductSeriesItem[] = [
  {
    id: 'notepro',
    figmaNode: '208:15290',
    title: 'Plaud Note Pro',
    price: '¥ 1299',
    purchaseUrl: PRODUCT_PURCHASE_URLS.notepro,
    image: productNotePro,
    alt: 'Plaud Note Pro 产品图',
    // swatch 顺序与 PRODUCT_COLOR_IMAGES.notepro 对应：[银, 炭灰]
    swatches: [
      { style: SWATCH_SILVER, colorName: '银色' },
      { style: SWATCH_CHARCOAL, colorName: '炭灰' },
    ],
    defaultSwatchIndex: 0,
    imageFrameClass:
      'relative mx-auto mt-px h-[240px] w-full max-w-[274px] overflow-hidden sm:h-[268px]',
    imageClass:
      'absolute left-1/2 top-10 w-[241px] max-w-none -translate-x-1/2 object-cover pointer-events-none',
  },
  {
    id: 'notepins',
    figmaNode: '208:15305',
    title: 'Plaud NotePin S',
    price: '¥ 1299',
    purchaseUrl: PRODUCT_PURCHASE_URLS.notepins,
    /** 资源文件名与内容相反：plaud-note.webp 为胶囊形态，对应真机 NotePin S */
    image: productNote,
    alt: 'Plaud NotePin S 产品图',
    // swatch 顺序与 PRODUCT_COLOR_IMAGES.notepins 对应：[炭灰, 银, 薰衣草紫]
    swatches: [
      { style: SWATCH_CHARCOAL, colorName: '黑色' },
      { style: SWATCH_SILVER, colorName: '银色' },
      { style: SWATCH_ROSE, colorName: '薰衣草紫' },
    ],
    defaultSwatchIndex: 1,
    imageFrameClass: 'relative mx-auto mt-px h-[240px] w-full max-w-[274px] overflow-hidden sm:h-[268px]',
    imageClass:
      'absolute left-1/2 top-1/2 w-[120px] max-w-[90%] -translate-x-1/2 -translate-y-1/2 object-contain pointer-events-none',
  },
  {
    id: 'note',
    figmaNode: '208:15322',
    title: 'Plaud Note',
    price: '¥ 1149',
    purchaseUrl: PRODUCT_PURCHASE_URLS.note,
    /** plaud-notepin-s.webp 实际为平板形态，对应 Note 卡片机 */
    image: productNotepinS,
    alt: 'Plaud Note 产品图',
    // swatch 顺序与 PRODUCT_COLOR_IMAGES.note 对应：[银, 炭灰, 玫瑰金, 深海蓝]
    swatches: [
      { style: SWATCH_SILVER, colorName: '银色' },
      { style: SWATCH_CHARCOAL, colorName: '炭灰' },
      { style: SWATCH_ROSE, colorName: '玫瑰金' },
      { style: SWATCH_BLUE_GRAY, colorName: '深海蓝' },
    ],
    defaultSwatchIndex: 3,
    imageFrameClass: 'relative mx-auto mt-px h-[240px] w-full max-w-[274px] overflow-hidden sm:h-[268px]',
    imageClass: 'absolute left-[55px] top-[79px] h-[165px] w-[165px] object-contain pointer-events-none',
  },
];

function ProductSwatches({
  swatches,
  selectedIndex,
  onSelect,
  productLabel,
}: {
  swatches: SwatchOption[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  productLabel: string;
}) {
  return (
    <div className="mt-[28px] flex h-[17px] shrink-0 items-center justify-center gap-[11px] px-2">
      {swatches.map((swatch, index) => {
        const isSelected = index === selectedIndex;
        return (
          <button
            key={index}
            type="button"
            aria-pressed={isSelected}
            aria-label={`${productLabel} ${swatch.colorName}`}
            onClick={() => onSelect(index)}
            className={`box-border size-[17px] shrink-0 rounded-full border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00d0ff] ${
              isSelected ? 'border-black' : 'border-white'
            }`}
            style={swatch.style}
          />
        );
      })}
    </div>
  );
}

function ProductCard({ p, articleClassName }: { p: ProductSeriesItem; articleClassName: string }) {
  const [colorIndex, setColorIndex] = useState(p.defaultSwatchIndex);

  const colorImages = useMemo(
    () => PRODUCT_COLOR_IMAGES[p.id] ?? p.swatches.map(() => p.image),
    [p.id, p.image, p.swatches],
  );

  const [displayedIndex, setDisplayedIndex] = useState(p.defaultSwatchIndex);
  const [loadedMap, setLoadedMap] = useState<boolean[]>(() =>
    colorImages.map((src, idx) => idx === p.defaultSwatchIndex || loadedColorImageCache.has(src)),
  );

  // 预加载所有颜色图；未加载完成前保持当前图，避免切换时白闪。
  useEffect(() => {
    let cancelled = false;
    colorImages.forEach((src, idx) => {
      if (loadedMap[idx]) return;
      void preloadColorImage(src).then(() => {
        if (cancelled) return;
        setLoadedMap((prev) => {
          if (prev[idx]) return prev;
          const next = [...prev];
          next[idx] = true;
          return next;
        });
      });
    });
    return () => {
      cancelled = true;
    };
  }, [colorImages, loadedMap]);

  useEffect(() => {
    if (loadedMap[colorIndex]) {
      setDisplayedIndex(colorIndex);
    }
  }, [colorIndex, loadedMap]);

  const imgSrc = colorImages[displayedIndex] ?? p.image;
  return (
    <article className={articleClassName} data-figma-node={p.figmaNode}>
      <div className={`${p.imageFrameClass} shrink-0`}>
        <img
          src={imgSrc}
          alt={p.alt}
          className={`${p.imageClass} transition-opacity duration-200`}
          loading="eager"
          decoding="async"
        />
      </div>
      <ProductSwatches
        swatches={p.swatches}
        selectedIndex={colorIndex}
        onSelect={setColorIndex}
        productLabel={p.title}
      />
      <div className="mt-[31px] flex w-full flex-col items-center gap-3 px-5 pb-5 text-center sm:pb-6">
        <h3 className="w-full max-w-[308px] font-[family-name:var(--font-jokker)] text-[20px] font-normal leading-[1.2] text-black">
          {p.title}
        </h3>
        <p className="w-full max-w-[308px] font-[family-name:var(--font-jokker)] text-[16px] font-normal leading-[1.2] text-black">
          {p.price}
        </p>
        <a
          href={p.purchaseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-8 w-[104px] shrink-0 items-center justify-center rounded-[4px] bg-black px-1.5 text-[12px] font-medium leading-none text-white transition hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00d0ff] font-[family-name:var(--font-sans)]"
          aria-label={`${p.title} 立即购买`}
        >
          立即购买
        </a>
      </div>
      <div className="hidden min-h-0 flex-1 lg:block" aria-hidden />
    </article>
  );
}

const PRODUCT_CAROUSEL_GAP = 15;

const ProductSeriesMobileCarousel = memo(function ProductSeriesMobileCarousel({ items }: { items: ProductSeriesItem[] }) {
  const [mobileCardW, setMobileCardW] = useState(280);
  const measureRef = useRef<HTMLDivElement>(null);
  const totalItems = items.length;

  useEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      // Figma 208:16689：移动端单卡宽度与容器同宽（432），不保留左右窥视
      setMobileCardW(Math.max(220, Math.floor(w)));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="w-full" data-figma-node="247:1039-mobile-carousel">
      <FigmaHomeSwiper
        ref={measureRef}
        isMobile
        className="w-full"
        total={totalItems}
        spaceBetween={PRODUCT_CAROUSEL_GAP}
        pagerClassName="scale-[0.92] sm:scale-100"
        prevAriaLabel="上一组"
        nextAriaLabel="下一组"
      >
        {items.map((p) => (
          <SwiperSlide key={p.id} className="!h-auto" style={{ width: mobileCardW }}>
            <ProductCard
              p={p}
              articleClassName="flex min-h-[452px] w-full flex-col overflow-hidden rounded-[5px] bg-[#f7f5f3]"
            />
          </SwiperSlide>
        ))}
      </FigmaHomeSwiper>
    </div>
  );
});

ProductSeriesMobileCarousel.displayName = 'ProductSeriesMobileCarousel';

export function ProductSeriesSection() {
  return (
    <section
      id={ANCHORS.products}
      className="w-full bg-page-canvas py-10 sm:py-14 lg:py-16"
      data-figma-node="208:15283"
      data-figma-mobile-node={FIGMA_MOBILE_SECTION_NODES.productSeries.id}
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-stretch gap-10 px-4 sm:px-6 lg:items-center lg:gap-16 lg:px-10">
        <header
          className="flex w-full max-w-[753px] flex-col gap-4 text-left text-black lg:mx-auto lg:text-center"
          data-figma-node="208:15286"
        >
          <h2 className="w-full text-[28px] leading-[1.2] sm:text-[34px] lg:text-[40px]" data-node-id="208:15287">
            <span className="font-[family-name:var(--font-jokker)] font-normal">Plaud&nbsp;</span>
            <span className="font-[family-name:var(--font-sans)] font-light">硬件产品系列</span>
          </h2>
          <p className="w-full text-[18px] leading-[1.2] sm:text-[21px] lg:text-2xl lg:leading-[1.2]" data-node-id="208:15288">
            <span className="font-[family-name:var(--font-sans)] font-light">由&nbsp;</span>
            <span className="font-[family-name:var(--font-jokker)] font-normal">Plaud Intelligence™&nbsp;</span>
            <span className="font-[family-name:var(--font-sans)] font-light">驱动</span>
          </p>
        </header>

        <div className="w-full max-w-[1120px] lg:mx-auto lg:hidden">
          <ProductSeriesMobileCarousel items={products} />
        </div>

        <div
          className="hidden w-full max-w-[1120px] flex-col gap-8 lg:mx-auto lg:flex lg:min-h-[452px] lg:flex-row lg:items-stretch lg:justify-center lg:gap-[35px]"
          data-node-id="247:1039"
        >
          {products.map((p) => (
            <ProductCard
              key={p.id}
              p={p}
              articleClassName="flex min-h-[452px] w-full max-w-[350px] shrink-0 flex-col rounded-[5px] bg-[#f7f5f3]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
