import { workSmarterTabs } from '@/data/home-content';
import { VideoPlayer } from '@/components/VideoPlayer';

/**
 * Figma 208:17194：三块竖排「捕捉 / 提取 / 运用」，各标题 + 约 180px 高媒体（视频静帧）。
 */
export function WorkSmarterMobile() {
  const titleColorById: Record<string, string> = {
    capture: 'text-[#39f672]',
    extract: 'text-[#00d0ff]',
    utilize: 'text-[#8f53ed]',
  };

  return (
    <div className="flex w-full flex-col gap-6" data-figma-node="208:17194">
      {workSmarterTabs.map((tab) => (
        <article key={tab.id} className="flex w-full flex-col gap-4" data-node-id={tab.id === 'capture' ? '208:17199' : tab.id === 'extract' ? '208:17202' : '208:17205'}>
          <h3
            className={`text-left font-[family-name:var(--font-sans)] text-[20px] font-bold leading-[1.2] ${
              titleColorById[tab.id] ?? 'text-black'
            }`}
            data-node-id={tab.id === 'capture' ? '208:17200' : tab.id === 'extract' ? '208:17203' : '208:17206'}
          >
            {tab.label}
          </h3>
          <div data-node-id={tab.id === 'capture' ? '208:17201' : tab.id === 'extract' ? '208:17204' : '208:17207'}>
            <VideoPlayer src={tab.video} isActive size="mobile" />
          </div>
        </article>
      ))}
    </div>
  );
}
