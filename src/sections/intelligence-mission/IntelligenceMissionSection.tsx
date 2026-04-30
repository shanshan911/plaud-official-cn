import { ANCHORS } from '@/data/home-content';
import { FIGMA_MOBILE_SECTION_NODES } from '@/sections/figma-nodes';

/**
 * Figma 208:16353 — 列 gap-[16px]；标题/正文见子节点。
 * 画板 208:15171：Banner(15355) 底 y≈650 → 本模块顶 y≈810；本模块底 y≈1004 → 背书 15505 顶 y≈1164，上下各 160px。
 * 移动端：标题与正文左对齐；PC：标题区居中，正文限宽列内左对齐（易读）
 */
export function IntelligenceMissionSection() {
  return (
    <section
      id={ANCHORS.mission}
      className="w-full bg-page-canvas pt-12 pb-12 sm:pt-16 sm:pb-16 lg:pt-[160px] lg:pb-[160px]"
      data-figma-node="208:16353"
      data-figma-mobile-node={FIGMA_MOBILE_SECTION_NODES.intelligenceMission.id}
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-5 px-6 sm:px-6 lg:gap-4 lg:px-10 lg:items-center">
        <h2
          className="w-full max-w-[432px] text-left font-[family-name:var(--font-sans)] text-[32px] font-light leading-[1.2] text-black lg:mx-auto lg:max-w-[793px] lg:text-center lg:text-[length:clamp(28px,5.5vw,40px)]"
          data-figma-node="208:16354"
        >
          放大人类智能
        </h2>

        <div
          className="w-full max-w-[432px] text-left font-[family-name:var(--font-sans)] text-[16px] font-light leading-[1.5] text-black lg:mx-auto lg:max-w-[844px] lg:text-[length:clamp(15px,1.11vw,16px)]"
          data-figma-node="208:16355"
        >
          <p className="mb-0">
            我们相信对话即智能。对话是智能的一种载体，它是思想的开端、决策制定和意义的分享之地，是对世界认知的投射。但过去这些智能从未被捕捉、被理解、更未能转化为正确的决策和实际行动。
          </p>
          <p className="mb-0 leading-[1.5]" aria-hidden="true">
            {'\u200b'}
          </p>
          <p className="mb-0">
            <span className="font-[family-name:var(--font-jokker)] font-normal">Plaud</span>
            <span>
              以&ldquo;放大人类智能&rdquo;为使命，致力于构建下一代智能基础设施与交互界面，旨在帮助用户从所听、所说、所见、{' '}
            </span>
          </p>
          <p className="mb-0">
            所想中捕捉、提取和运用智能，成为全球专业人士最值得信赖的AI工作伙伴，全面提升生产力并创造更多价值。
          </p>
        </div>
      </div>
    </section>
  );
}
