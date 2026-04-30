import { ANCHORS } from '@/data/home-content';
import { FIGMA_MOBILE_SECTION_NODES } from '@/sections/figma-nodes';
import { SecurityCarousel } from './SecurityCarousel';

export function SecuritySection() {
  return (
    <section
      id={ANCHORS.security}
      className="w-full bg-page-canvas py-10 sm:py-14 lg:py-16"
      data-figma-node="208:16096"
      data-figma-mobile-node={FIGMA_MOBILE_SECTION_NODES.security.id}
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/** Figma 208:16292 — gap 16px；主标题 40px Light、副标题 24px Light；移动左对齐、PC 标题区居中 */}
        <header
          className="mx-auto flex max-w-[798px] flex-col gap-4 text-left font-[family-name:var(--font-sans)] font-light leading-[1.2] text-black lg:text-center"
          data-node-id="208:16292"
        >
          <h2
            className="w-full max-w-[792.75px] text-[28px] sm:text-[34px] lg:mx-auto lg:text-[40px]"
            data-node-id="208:16293"
          >
            企业级安全防护
          </h2>
          <p className="w-full text-[18px] sm:text-[21px] lg:text-[24px]" data-node-id="208:16294">
            你的隐私，是我们的首要任务
          </p>
        </header>
        {/** 轮播左侧对齐版心，右侧拉到视窗边缘（Figma 右侧撑满） */}
        <div className="mt-12 w-full lg:mt-16 lg:w-[calc(100%+50vw-50%)]">
          <SecurityCarousel isMobile={false} className="hidden lg:block" />
          <SecurityCarousel isMobile className="lg:hidden" />
        </div>
      </div>
    </section>
  );
}
