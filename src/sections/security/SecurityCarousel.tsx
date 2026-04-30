import { memo, useEffect, useRef, useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import { FigmaHomeSwiper } from '@/components/FigmaHomeSwiper';
import en18031Icon from '@/assets/images/home/endorsement/en18031-icon.svg';
import gdprIcon from '@/assets/images/home/endorsement/gdpr-icon.svg';
import hipaaIcon from '@/assets/images/home/endorsement/hipaa-icon.svg';
import iso27001 from '@/assets/images/home/endorsement/iso-27001.webp';
import iso27701 from '@/assets/images/home/endorsement/iso-27701.webp';
import soc2Icon from '@/assets/images/home/endorsement/soc2-icon.svg';

/** Figma 208:16107 从左到右顺序 */
const securityCerts = [
  {
    id: 'gdpr',
    title: 'GDPR',
    subtitle: 'Compliant',
    titleClass: 'text-[28px]',
    compliantClass: 'text-[8px] tracking-[0.8px]',
    description: '严格的隐私保护机制，确保您的数据符合欧洲最严格的数据保护法规要求。',
    descriptionMaxClass: 'max-w-[240px]',
    badgeImage: gdprIcon,
    badgeClass: 'left-[37.5px] top-[19.762px] h-[93.927px] w-[93.927px]',
  },
  {
    id: 'soc2',
    title: 'SOC 2',
    subtitle: 'Compliant',
    titleClass: 'text-[28px]',
    compliantClass: 'text-[8px] tracking-[0.8px]',
    description: '通过第三方独立审计验证，系统符合行业在安全性方面的标准。',
    descriptionMaxClass: 'max-w-[236px]',
    badgeImage: soc2Icon,
    badgeClass: 'left-[37.5px] top-[19.762px] h-[93.927px] w-[93.927px]',
  },
  {
    id: 'hipaa',
    title: 'HIPAA',
    subtitle: 'Compliant',
    titleClass: 'text-[27px]',
    compliantClass: 'text-[9px] tracking-[0.9px]',
    description: '达到医疗级安全标准，通过严格的行业合规要求保护医疗和个人信息。',
    descriptionMaxClass: 'max-w-[234px]',
    badgeImage: hipaaIcon,
    badgeClass: 'left-[37.5px] top-[19.762px] h-[93.927px] w-[93.927px]',
  },
  {
    id: 'en18031',
    title: 'EN 18031',
    subtitle: 'Compliant',
    titleClass: 'text-[27px]',
    compliantClass: 'text-[9px] tracking-[0.9px]',
    description: '符合欧洲安全无线通信标准，确保无线通信的安全性。',
    descriptionMaxClass: 'max-w-[211.5px]',
    badgeImage: en18031Icon,
    badgeClass: 'left-[37.5px] top-[19.762px] h-[93.927px] w-[93.927px]',
  },
  {
    id: 'iso27001',
    title: 'ISO 27001',
    subtitle: 'Compliant',
    titleClass: 'text-[28px]',
    compliantClass: 'text-[8px] tracking-[0.8px]',
    description:
      '采用国际认可的信息安全管理体系，通过严格的安全控制措施，保障用户数据的机密性、完整性与可用性',
    descriptionMaxClass: 'max-w-[212px]',
    badgeImage: iso27001,
    badgeClass: 'left-[51px] top-[28.012px] h-[80.25px] w-[66.75px]',
  },
  {
    id: 'iso27701',
    title: 'ISO 27701',
    subtitle: 'Compliant',
    titleClass: 'text-[28px]',
    compliantClass: 'text-[8px] tracking-[0.8px]',
    description:
      '遵循国际隐私信息管理标准，建立个人信息全生命周期管理框架，确保个人数据以透明、合规、负责任的方式进行处理。',
    descriptionMaxClass: 'max-w-[211.5px]',
    badgeImage: iso27701,
    badgeClass: 'left-[51px] top-[28.012px] h-[80.25px] w-[66.896px]',
  },
] as const;

/** PC：按 Figma 左侧留白 + 右侧撑满；目标 5.5 卡可视 */
const PC_CARD_MIN = 220;
const GAP = 15;
const PC_LEFT_OFFSET = GAP;
const PC_VISIBLE = 5.5;
const totalItems = securityCerts.length;
/** Swiper v12 loop 需要 slides ≥ slidesPerView + loopedSlides；把数据复制一轮避免衔接处露空 */
const loopedCerts = [
  ...securityCerts.map((c) => ({ ...c, key: `${c.id}-a` })),
  ...securityCerts.map((c) => ({ ...c, key: `${c.id}-b` })),
];

type SecurityCarouselProps = { isMobile?: boolean; className?: string };

export const SecurityCarousel = memo(({ isMobile = false, className = '' }: SecurityCarouselProps) => {
  const [mobileCardW, setMobileCardW] = useState(220);
  const [pcCardW, setPcCardW] = useState(282.75);
  const measureRef = useRef<HTMLDivElement>(null);

  /** PC 根据轨宽动态算卡宽，显示 5.5 张；移动端保持 208:16791 的 220~282.75 逻辑 */
  useEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      if (isMobile) {
        setMobileCardW(Math.min(282.75, Math.max(220, w - 24)));
        return;
      }
      const raw = (w - PC_LEFT_OFFSET - 5 * GAP) / PC_VISIBLE;
      setPcCardW(Math.max(PC_CARD_MIN, Math.floor(raw)));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [isMobile]);

  const slideW = isMobile ? mobileCardW : pcCardW;
  const safeSlideW = Number.isFinite(slideW) ? slideW : 296;

  return (
    <FigmaHomeSwiper
      ref={measureRef}
      isMobile={isMobile}
      className={className}
      total={totalItems}
      spaceBetween={GAP}
      centeredSlides={false}
      slidesOffsetBefore={isMobile ? 0 : PC_LEFT_OFFSET}
      pagerWrapClassName="lg:pr-[calc(100vw-100%)]"
      pagerClassName={isMobile ? 'scale-[0.92] sm:scale-100' : ''}
    >
      {loopedCerts.map((cert) => (
        <SwiperSlide key={cert.key} className="!h-auto" style={{ width: safeSlideW }}>
          <article className="relative h-[360px] overflow-hidden rounded-[6px] bg-[#f7f7f7]" style={{ width: safeSlideW }}>
            {/** 上部 169x169 认证区：y=24，含图标、标题、Compliant */}
            <div className="absolute left-1/2 top-6 h-[169px] w-[169px] -translate-x-1/2">
              <div className={`absolute ${cert.badgeClass}`}>
                <img
                  src={cert.badgeImage}
                  alt={`${cert.title} 认证标识`}
                  className="size-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h3
                className={`absolute left-1/2 top-[113.575px] -translate-x-1/2 whitespace-nowrap text-center font-[family-name:var(--font-jokker)] font-semibold leading-none text-black ${cert.titleClass}`}
              >
                {cert.title}
              </h3>
              <p
                className={`absolute left-1/2 top-[147.378px] -translate-x-1/2 whitespace-nowrap text-center font-[family-name:var(--font-jokker)] font-normal leading-none text-black ${cert.compliantClass}`}
              >
                {cert.subtitle}
              </p>
            </div>
            <p
              className={`absolute left-1/2 top-[225px] w-full -translate-x-1/2 px-5 text-center font-[family-name:var(--font-sans)] text-[14px] font-light leading-[1.2] text-black ${cert.descriptionMaxClass}`}
            >
              {cert.description}
            </p>
          </article>
        </SwiperSlide>
      ))}
    </FigmaHomeSwiper>
  );
});

SecurityCarousel.displayName = 'SecurityCarousel';
