import { useState } from 'react';
import { VideoPlayer } from '@/components/VideoPlayer';
import { ANCHORS, workSmarterTabs, type WorkSmarterTabId } from '@/data/home-content';
import { FIGMA_MOBILE_SECTION_NODES } from '@/sections/figma-nodes';
import { WorkSmarterMobile } from './WorkSmarterMobile';

export function WorkSmarterSection() {
  const [activeTab, setActiveTab] = useState<WorkSmarterTabId>('capture');

  return (
    <section
      id={ANCHORS.workSmarter}
      className="w-full bg-page-canvas py-10 sm:py-14"
      data-figma-node="208:16295"
      data-figma-mobile-node={FIGMA_MOBILE_SECTION_NODES.workSmarter.id}
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/** Figma 208:16296 — 855 宽，gap 16px；主标题 HarmonyOS Light 40px / 副标题 24px */}
        <header className="mx-auto flex max-w-[855px] flex-col gap-4 text-left lg:text-center">
          <h2 className="w-full font-[family-name:var(--font-sans)] font-light leading-[1.2] text-black text-[32px] lg:text-[40px]">
            智能工作，事半功倍
          </h2>
          <p className="w-full text-[20px] font-light leading-[1.2] text-black lg:text-2xl">
            <span className="font-[family-name:var(--font-jokker)]">AI </span>
            <span className="font-[family-name:var(--font-sans)] font-light">智能参谋，帮助你提升生产力</span>
          </p>
        </header>

        <div className="mt-10 lg:hidden">
          <WorkSmarterMobile />
        </div>

        <div className="mx-auto mt-10 hidden max-w-[1200px] lg:mt-12 lg:block">
          <div className="relative h-[49px] rounded-[13px] bg-[#f2efeb]" data-node-id="208:16302">
            <div className="pointer-events-none absolute inset-0 rounded-[13px] bg-white/50" data-node-id="208:16303" />
            <div className="relative grid h-full grid-cols-3 gap-0 p-[4px]" role="tablist" aria-label="智能工作">
              {workSmarterTabs.map((tab) => {
                const selected = tab.id === activeTab;
                return (
                  <button
                    key={tab.id}
                    id={`ws-tab-${tab.id}`}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={`ws-panel-${tab.id}`}
                    onClick={() => setActiveTab(tab.id)}
                    className={`h-full rounded-[9px] border-0 text-center text-2xl leading-[1.5] transition ${
                      selected
                        ? 'bg-[#f7f5f3] font-medium text-[#00d0ff]'
                        : 'bg-transparent font-light text-[#808080] hover:text-[#00d0ff]'
                    }`}
                    data-node-id={selected ? '208:16301' : undefined}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/** Tab 下方仅保留主内容卡（视频），不再夹一层截屏条，避免与稿不符的多余英文条 */}
        <div className="mx-auto mt-6 hidden max-w-[1200px] lg:mt-8 lg:block">
          <div className="overflow-hidden rounded-[13px] border border-neutral-200/60 bg-white shadow-sm">
            {workSmarterTabs.map((tab) => (
              <div
                key={tab.id}
                id={`ws-panel-${tab.id}`}
                className={tab.id === activeTab ? 'block' : 'hidden'}
                role="tabpanel"
                aria-labelledby={`ws-tab-${tab.id}`}
                aria-hidden={tab.id !== activeTab}
              >
                <VideoPlayer src={tab.video} isActive={tab.id === activeTab} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
