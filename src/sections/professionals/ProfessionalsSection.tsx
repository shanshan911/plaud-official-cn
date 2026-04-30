import { ANCHORS } from '@/data/home-content';
import { FIGMA_MOBILE_SECTION_NODES } from '@/sections/figma-nodes';
import { ProfessionalsCarousel } from './ProfessionalsCarousel';

export function ProfessionalsSection() {
  return (
    <section
      id={ANCHORS.scenarios}
      className="w-full bg-page-canvas py-12 sm:py-16"
      data-figma-node="208:15220"
      data-figma-mobile-node={FIGMA_MOBILE_SECTION_NODES.professionals.id}
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/**
         * PC：208:15221 / 208:15223
         * 移动：208:16792 — 标题块 432×122、主副间距 20；208:16793 两行标题 32px/1.2，「AI」为 Jokker；副标题 20px/1.2
         */}
        <header className="flex w-full max-w-[753px] flex-col gap-5 text-left font-[family-name:var(--font-sans)] font-light leading-[1.2] text-black max-lg:max-w-[432px] lg:mx-auto lg:gap-4 lg:text-center">
          <h2 className="w-full max-lg:text-[32px] max-lg:leading-[1.2] lg:text-[40px]" data-node-id="208:15224">
            {/** 移动、平板：<lg 显示换行版；`block lg:hidden` 避免与 `hidden max-lg:block` 的层叠冲突影响 PC */}
            <span className="block lg:hidden">
              <span className="block">各领域专业人士信赖</span>
              <span className="block font-light">
                的
                <span className="font-[family-name:var(--font-jokker)] font-normal">AI</span>
                工作伙伴
              </span>
            </span>
            <span className="hidden lg:inline">各领域专业人士信赖的AI工作伙伴</span>
          </h2>
          <p className="w-full max-lg:text-[20px] max-lg:leading-[1.2] text-[18px] sm:text-[21px] lg:text-2xl" data-node-id="208:15225">
            提升生产力和价值创造
          </p>
        </header>

        {/** 208:16791：标题底至卡片顶间距 48；PC 左侧对齐版心，右侧拉到视窗边缘 */}
        <div className="mt-12 w-full lg:mt-16 lg:w-[calc(100%+50vw-50%)]">
          <ProfessionalsCarousel isMobile={false} className="hidden lg:block" />
          <ProfessionalsCarousel isMobile className="lg:hidden" />
        </div>
      </div>
    </section>
  );
}
