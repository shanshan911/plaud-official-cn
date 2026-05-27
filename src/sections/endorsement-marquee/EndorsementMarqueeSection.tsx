import en18031Icon from '@/assets/images/home/endorsement/en18031-icon.svg';
import gdprIcon from '@/assets/images/home/endorsement/gdpr-icon.svg';
import goodDesignMark from '@/assets/images/home/endorsement/good-design-mark.svg';
import hipaaIcon from '@/assets/images/home/endorsement/hipaa-icon.svg';
import ideaClip0 from '@/assets/images/home/endorsement/idea-clip-0.svg';
import ideaClip1 from '@/assets/images/home/endorsement/idea-clip-1.svg';
import ideaClip10 from '@/assets/images/home/endorsement/idea-clip-10.svg';
import ideaClip11 from '@/assets/images/home/endorsement/idea-clip-11.svg';
import ideaClip12 from '@/assets/images/home/endorsement/idea-clip-12.svg';
import ideaClip13 from '@/assets/images/home/endorsement/idea-clip-13.svg';
import ideaClip2 from '@/assets/images/home/endorsement/idea-clip-2.svg';
import ideaClip3 from '@/assets/images/home/endorsement/idea-clip-3.svg';
import ideaClip4 from '@/assets/images/home/endorsement/idea-clip-4.svg';
import ideaClip5 from '@/assets/images/home/endorsement/idea-clip-5.svg';
import ideaClip6 from '@/assets/images/home/endorsement/idea-clip-6.svg';
import ideaClip7 from '@/assets/images/home/endorsement/idea-clip-7.svg';
import ideaClip8 from '@/assets/images/home/endorsement/idea-clip-8.svg';
import ideaClip9 from '@/assets/images/home/endorsement/idea-clip-9.svg';
import ifAward from '@/assets/images/home/endorsement/if-award.webp';
import iso27001 from '@/assets/images/home/endorsement/iso-27001.webp';
import iso27701 from '@/assets/images/home/endorsement/iso-27701.webp';
import reddot from '@/assets/images/home/endorsement/reddot.webp';
import soc2Icon from '@/assets/images/home/endorsement/soc2-icon.svg';
import { ANCHORS } from '@/data/home-content';
import { FIGMA_MOBILE_SECTION_NODES } from '@/sections/figma-nodes';

const IDEA_CLIPS = [
  ideaClip0,
  ideaClip1,
  ideaClip2,
  ideaClip3,
  ideaClip4,
  ideaClip5,
  ideaClip6,
  ideaClip7,
  ideaClip8,
  ideaClip9,
  ideaClip10,
  ideaClip11,
  ideaClip12,
  ideaClip13,
] as const;

/** PC Figma 208:15508；移动端 208:17031 单格 57.139（= 88.461×0.646036…） */
const TRACK_GAP = 'gap-[18.821px]' as const;

/** Figma 208:15528 — 88.461 单元内 IDEA 标 */
function EndorsementIdeaCell() {
  return (
    <div className="relative h-[88.461px] w-[88.461px] shrink-0 overflow-hidden" data-figma-node="208:15528">
      <div className="absolute left-[16.629px] top-[23px] h-[42.461px] w-[55.288px] overflow-hidden">
        {IDEA_CLIPS.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="pointer-events-none absolute left-0 top-0 size-full max-w-none object-cover select-none"
            decoding="async"
          />
        ))}
      </div>
    </div>
  );
}

/** 单条 logo 走廊（两条轨道并排、无轨间 gap，保证动画 translate -50% 对齐周期） */
function EndorsementMarqueeTrack() {
  return (
    <>
      <EndorsementIdeaCell />

      <div className="relative h-[88.461px] w-[88.461px] shrink-0 overflow-hidden" data-figma-node="208:15608">
        <div className="absolute left-[10.084px] top-[7.608px] h-[58.584px] w-[89.134px]">
          <img src={reddot} alt="Red Dot Winner 2025" className="size-full object-cover" decoding="async" />
        </div>
      </div>

      <div className="relative h-[88.461px] w-[88.461px] shrink-0 overflow-hidden" data-figma-node="208:15611">
        <div className="absolute left-[6.723px] top-[24.946px] h-[38.408px] w-[74.984px]">
          <img src={ifAward} alt="iF DESIGN AWARD" className="size-full object-cover" decoding="async" />
        </div>
      </div>

      <div className="relative h-[88.461px] w-[88.461px] shrink-0 overflow-hidden" data-figma-node="208:15615">
        <div className="absolute left-[10.794px] top-[26.538px] h-[35.207px] w-[68.292px]">
          <img src={goodDesignMark} alt="Good Design Award" className="size-full object-cover" decoding="async" />
        </div>
      </div>

      <div className="relative h-[88.461px] w-[88.461px] shrink-0 overflow-hidden" data-figma-node="208:15626">
        <img
          src={gdprIcon}
          alt=""
          className="absolute left-[23.175px] top-[13.445px] h-[41.931px] w-[41.93px] max-w-none object-contain"
          decoding="async"
        />
        <p className="absolute left-[44.24px] top-[59.446px] -translate-x-1/2 whitespace-nowrap font-[family-name:var(--font-jokker)] text-[14.705px] font-semibold leading-normal text-black">
          GDPR
        </p>
        <p className="absolute left-[44.43px] top-[77.138px] -translate-x-1/2 whitespace-nowrap font-[family-name:var(--font-jokker)] text-[4.64px] leading-normal tracking-[0.464px] text-black">
          Compliant
        </p>
      </div>

      <div className="relative h-[88.461px] w-[88.461px] shrink-0 overflow-hidden" data-figma-node="208:15643">
        <img
          src={hipaaIcon}
          alt=""
          className="absolute left-[23.001px] top-[18.046px] h-[37.401px] w-[40.059px] max-w-none object-contain"
          decoding="async"
        />
        <p className="absolute left-[44.5px] top-[59.446px] -translate-x-1/2 whitespace-nowrap font-[family-name:var(--font-jokker)] text-[14.705px] font-semibold leading-normal text-black">
          HIPAA
        </p>
        <p className="absolute left-[44.43px] top-[77.138px] -translate-x-1/2 whitespace-nowrap font-[family-name:var(--font-jokker)] text-[4.64px] leading-normal tracking-[0.464px] text-black">
          Compliant
        </p>
      </div>

      <div className="relative h-[88.461px] w-[88.461px] shrink-0 overflow-hidden" data-figma-node="208:15661">
        <img
          src={soc2Icon}
          alt=""
          className="absolute left-[29.014px] top-[15.923px] h-[37.33px] w-[30.784px] max-w-none object-contain"
          decoding="async"
        />
        <p className="absolute left-[44.11px] top-[59.446px] -translate-x-1/2 whitespace-nowrap font-[family-name:var(--font-jokker)] text-[14.705px] font-semibold leading-normal text-black">
          SOC 2
        </p>
        <p className="absolute left-[44.43px] top-[77.138px] -translate-x-1/2 whitespace-nowrap font-[family-name:var(--font-jokker)] text-[4.64px] leading-normal tracking-[0.464px] text-black">
          Compliant
        </p>
      </div>

      <div className="relative h-[88.461px] w-[88.461px] shrink-0 overflow-hidden" data-figma-node="208:15666">
        <img
          src={en18031Icon}
          alt=""
          className="absolute left-[29.544px] top-[16.1px] h-[36.27px] w-[29.167px] max-w-none object-contain"
          decoding="async"
        />
        <p className="absolute left-[44.31px] top-[59.446px] -translate-x-1/2 whitespace-nowrap font-[family-name:var(--font-jokker)] text-[14.705px] font-semibold leading-normal text-black">
          EN18031
        </p>
        <p className="absolute left-[44.43px] top-[77.138px] -translate-x-1/2 whitespace-nowrap font-[family-name:var(--font-jokker)] text-[4.64px] leading-normal tracking-[0.464px] text-black">
          Compliant
        </p>
      </div>

      <div className="relative h-[88.461px] w-[88.461px] shrink-0 overflow-hidden" data-figma-node="208:15675">
        <div className="absolute left-[16.458px] top-[13.445px] h-[66.49px] w-[55.453px]">
          <img src={iso27701} alt="ISO/IEC 27701" className="size-full object-contain" decoding="async" />
        </div>
      </div>

      <div className="relative h-[88.461px] w-[88.461px] shrink-0 overflow-hidden" data-figma-node="208:15679">
        <div className="absolute left-[18.577px] top-[13.445px] h-[66.523px] w-[55.453px]">
          <img src={iso27001} alt="ISO/IEC 27001" className="size-full object-contain" decoding="async" />
        </div>
      </div>
    </>
  );
}

/**
 * Figma PC 208:15506 / 208:15507；移动端 208:17026：32px / 1.2、顶 64，与跑马车间距 10；横向与全站 px-4 sm:px-6 lg:px-10
 */
function EndorsementHeading() {
  return (
    <div
      className="flex w-full shrink-0 flex-col items-start justify-start max-lg:mb-[10px] max-lg:min-h-0 max-lg:pt-16 max-lg:pb-0 lg:min-h-[76px] lg:items-center lg:py-0"
      data-figma-node="208:15506"
    >
      <h2
        className="w-full max-w-[1120px] px-0 text-left text-black max-lg:max-w-[432px] max-lg:text-[32px] max-lg:leading-[1.2] max-lg:font-light lg:text-center lg:text-[length:clamp(22px,5.5vw,40px)] lg:leading-[1.25] lg:font-normal"
        data-figma-node="208:15507"
      >
        <span className="font-light lg:font-[family-name:var(--font-sans)] lg:font-light">全球超</span>
        <span className="font-light lg:font-[family-name:var(--font-jokker)] lg:font-normal">{` 200`}</span>
        <span className="font-light lg:font-[family-name:var(--font-sans)] lg:font-light">{` 万专业用户的信赖`}</span>
      </h2>
    </div>
  );
}

export function EndorsementMarqueeSection() {
  return (
    <section
      id={ANCHORS.endorsement}
      className="w-full bg-page-canvas"
      data-figma-node="208:15505"
      data-figma-mobile-node={FIGMA_MOBILE_SECTION_NODES.endorsementMarquee.id}
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-stretch px-4 sm:px-6 lg:min-h-[200px] lg:px-10">
        <EndorsementHeading />

        {/**
         * 无缝 Marquee：双份轨道 + translate3d(-50%)。
         * 移动端 Figma 208:17029 reviews 高 110；徽标行相对 PC 88.461 格按 57.139 等比（scale ≈ 0.646）
         */}
        <div
          className="relative h-[110px] w-full shrink-0 overflow-hidden lg:h-[124px]"
          data-figma-node="208:15508"
        >
          <div
            className="flex h-full w-max items-center motion-safe:animate-endorsement-marquee motion-reduce:animate-none hover:motion-safe:[animation-play-state:paused] will-change-transform"
            aria-label="奖项与合规标识"
          >
            <div className="flex max-lg:scale-[0.646036] shrink-0 origin-left items-center lg:scale-100">
              <div className={`flex shrink-0 items-center ${TRACK_GAP}`}>
                <EndorsementMarqueeTrack />
              </div>
              <div className={`flex shrink-0 items-center ${TRACK_GAP}`} aria-hidden>
                <EndorsementMarqueeTrack />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
