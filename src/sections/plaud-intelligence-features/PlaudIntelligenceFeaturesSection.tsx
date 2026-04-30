import plaudIntelligence1 from '@/assets/images/home/plaud-intelligence-1.webp';
import plaudIntelligence2 from '@/assets/images/home/plaud-intelligence-2.webp';
import plaudIntelligence3 from '@/assets/images/home/plaud-intelligence-3.webp';
import plaudIntelligence4 from '@/assets/images/home/plaud-intelligence-4.webp';
import plaudIntelligence5 from '@/assets/images/home/plaud-intelligence-5.webp';
import { ANCHORS } from '@/data/home-content';
import { FIGMA_MOBILE_SECTION_NODES } from '@/sections/figma-nodes';

/** Figma 208:15689 — 1292 画幅；标题与栅格 gap 48px；栅格与免责声明 gap 16px */
const tallCards = [
  {
    id: 'multimodal',
    title: '多模态输入',
    titleFont: 'sans' as const,
    image: plaudIntelligence1,
    alt: '多模态输入：手机界面与信息标记能力示意',
    gridClass: 'lg:col-start-1 lg:row-span-2 lg:row-start-1',
  },
  {
    id: 'transcribe',
    title: '精准转写',
    titleFont: 'sans' as const,
    image: plaudIntelligence2,
    alt: '精准转写：多语言转写示意',
    gridClass: 'lg:col-start-2 lg:row-span-2 lg:row-start-1',
  },
  {
    id: 'summary',
    title: '多维总结',
    titleFont: 'sans' as const,
    image: plaudIntelligence3,
    alt: '多维总结：结构化笔记与总结示意',
    gridClass: 'lg:col-start-3 lg:row-span-2 lg:row-start-1',
  },
] as const;

const shortCards = [
  {
    id: 'ask',
    title: 'Ask Plaud',
    titleFont: 'jokker' as const,
    subtitle: '在时刻准备着',
    image: plaudIntelligence4,
    alt: 'Ask Plaud：对话式提问界面示意',
    gridClass: 'lg:col-start-4 lg:row-start-1',
  },
  {
    id: 'export',
    title: '导出、分享、整合',
    titleFont: 'sans' as const,
    image: plaudIntelligence5,
    alt: '导出、分享、整合：工作流与协作示意',
    gridClass: 'lg:col-start-4 lg:row-start-2',
  },
] as const;

function FeatureCard({
  title,
  titleFont,
  subtitle,
  image,
  alt,
  heightClass,
  gridClass,
}: {
  title: string;
  titleFont: 'sans' | 'jokker';
  subtitle?: string;
  image: string;
  alt: string;
  heightClass: string;
  gridClass: string;
}) {
  return (
    <article className={`flex min-h-0 w-full min-w-0 flex-col overflow-hidden bg-[#f8f8f8] ${heightClass} ${gridClass}`}>
      <header className="shrink-0 px-4 pb-1 pt-[34px] text-left lg:px-[17px] lg:text-center">
        <h3
          className={`text-[20px] leading-[1.2] text-black ${
            titleFont === 'jokker'
              ? 'font-[family-name:var(--font-jokker)] font-normal'
              : 'font-[family-name:var(--font-sans)] font-light'
          }`}
        >
          {title}
        </h3>
        {subtitle ? (
          <p
            className="mt-2 w-full text-center font-[family-name:var(--font-sans)] text-sm font-normal leading-normal text-[rgba(122,122,122,0.7)] sm:text-[15px]"
            data-node-id="208:15978"
          >
            {subtitle}
          </p>
        ) : null}
      </header>
      <div className="flex min-h-0 flex-1 items-center justify-center px-3 pb-5 pt-1 sm:px-4 sm:pb-6">
        <img
          src={image}
          alt={alt}
          className="h-auto w-full max-h-[min(42vh,320px)] object-contain lg:max-h-[min(100%,260px)]"
          loading="lazy"
        />
      </div>
    </article>
  );
}

export function PlaudIntelligenceFeaturesSection() {
  return (
    <section
      id={ANCHORS.intelligence}
      className="w-full bg-page-canvas py-10 sm:py-14 lg:py-16"
      data-figma-node="208:15689"
      data-figma-mobile-node={FIGMA_MOBILE_SECTION_NODES.plaudIntelligenceFeatures.id}
    >
      <div className="mx-auto flex w-full max-w-[1292px] flex-col items-stretch gap-10 px-4 sm:px-6 lg:items-center lg:gap-12 lg:px-8">
        <h2
          className="w-full text-left font-[family-name:var(--font-jokker)] text-[28px] font-normal leading-[1.45] text-black sm:text-[34px] lg:text-center lg:text-[40px] lg:leading-[58px]"
          data-node-id="208:15690"
        >
          Plaud Intelligence ™
        </h2>

        <div
          className="flex w-full flex-col items-stretch gap-4 lg:items-center"
          data-node-id="208:15691"
        >
          {/** Figma 208:15692 — 4×269.586 列、行高 186.26×2、列间距 14、行间距 ≈13.3 */}
          <div
            className="grid w-full max-w-[1120.34px] grid-cols-1 gap-4 lg:mx-auto lg:grid lg:justify-center lg:gap-x-[14px] lg:gap-y-[13.3px] lg:[grid-template-columns:repeat(4,269.586px)] lg:[grid-template-rows:186.26px_186.26px]"
          >
            {tallCards.map((c) => (
              <FeatureCard
                key={c.id}
                title={c.title}
                titleFont={c.titleFont}
                image={c.image}
                alt={c.alt}
                gridClass={c.gridClass}
                heightClass="min-h-[280px] lg:row-span-2 lg:min-h-0 lg:h-[385.823px]"
              />
            ))}
            {shortCards.map((c) => (
              <FeatureCard
                key={c.id}
                title={c.title}
                titleFont={c.titleFont}
                subtitle={'subtitle' in c ? c.subtitle : undefined}
                image={c.image}
                alt={c.alt}
                gridClass={c.gridClass}
                heightClass="min-h-[240px] lg:min-h-0 lg:h-[186.26px]"
              />
            ))}
          </div>

          <p
            className="w-full max-w-[892px] text-left font-[family-name:var(--font-sans)] text-[13px] font-light leading-[1.35] text-[#a3a3a3] sm:text-sm lg:mx-auto lg:text-center lg:text-[14px] lg:leading-[1.2]"
            data-node-id="208:16093"
          >
            免责声明：部分功能可能并非在所有地区同时发布与使用，功能将在未来的更新中逐步推出。
          </p>
        </div>
      </div>
    </section>
  );
}
