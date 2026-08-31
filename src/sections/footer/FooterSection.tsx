import { useState } from 'react';
import { SimpleModal } from '@/components/SimpleModal';
import jdLogo from '@/assets/images/home/jd.webp';
import logoPlaud from '@/assets/images/home/logoPlaud.webp';
import tmLogo from '@/assets/images/home/tm.webp';
import snsBilibili from '@/assets/images/home/footer/sns-bilibili.svg';
import snsDouyin from '@/assets/images/home/footer/sns-douyin.svg';
import snsWeibo from '@/assets/images/home/footer/sns-weibo.svg';
import snsXiaohongshu from '@/assets/images/home/footer/sns-xiaohongshu.svg';
import appQrAndroid from '@/assets/images/home/footer/app-qr-android.webp';
import appQrIos from '@/assets/images/home/footer/app-qr-ios.webp';
import supportWechatQr from '@/assets/images/home/footer/support-wechat-qr.webp';
import storeAndroid from '@/assets/images/home/footer/store-android.svg';
import storeApple from '@/assets/images/home/footer/store-apple.svg';
import { OFFICIAL_JD_URL, OFFICIAL_TMALL_URL } from '@/data/official-channels';
import { ANCHORS } from '@/data/home-content';
import { FIGMA_MOBILE_SECTION_NODES, FIGMA_SECTION_NODES } from '@/sections/figma-nodes';

const CM = FIGMA_SECTION_NODES.cooperationModals;
const FM = FIGMA_SECTION_NODES;

/** Figma 弹窗标题：HarmonyOS Sans Light 24px */
const MODAL_TITLE_LIGHT_24 = 'font-[family-name:var(--font-sans)] text-2xl font-light text-black';

/**
 * 合作类弹窗正文 — 271 系：单行「邮件 ：」+ Jokker 下划线邮箱（无长说明段落）
 * @see FIGMA_SECTION_NODES.cooperationModals
 */
function CooperationEmailModalBody({ email, figmaId }: { email: string; figmaId: string }) {
  return (
    <div className="text-left" data-figma-node={figmaId}>
      <p className="font-[family-name:var(--font-jokker)] text-2xl leading-normal not-italic text-black">
        <span className="font-[family-name:var(--font-sans)] font-light">邮件 ：</span>
        <a
          href={`mailto:${email}`}
          className="underline decoration-solid underline-offset-[0.12em] hover:opacity-80"
        >
          {email}
        </a>
      </p>
    </div>
  );
}

/** 每类合作独立弹窗（271:1285 / 271:1432 / 271:1578 / 271:1724；礼品团购与 271:1285 同版式） */
const COOPERATION_ENTRIES = [
  { id: 'coop-distribution' as const, label: '经销合作', email: 'sales@plaud.cn', figmaId: CM.distribution.id },
  { id: 'coop-marketing' as const, label: '市场合作', email: 'marketing@plaud.cn', figmaId: CM.marketing.id },
  { id: 'coop-media' as const, label: '媒体合作', email: 'pr@plaud.cn', figmaId: CM.media.id },
  { id: 'coop-gifts' as const, label: '礼品团购', email: 'sales@plaud.cn', figmaId: CM.gifts.id },
  { id: 'coop-supplier' as const, label: '供应商合作', email: 'supplychain@plaud.cn', figmaId: CM.supplier.id },
] as const;

type CooperationModalId = (typeof COOPERATION_ENTRIES)[number]['id'];

type FooterModal =
  | null
  | CooperationModalId
  | 'buy'
  | 'support'
  | 'legal-business'
  | 'legal-user'
  | 'legal-privacy';

/** Figma 208:15442 — 四枚 SNS，稿内矢量资源 */
const FOOTER_SNS_LINKS = [
  { href: 'https://xhslink.com/m/8yQ7nMHEPGL', label: '小红书', icon: snsXiaohongshu, className: 'h-[12.1px] w-[33px]' },
  { href: 'https://weibo.com/u/8016130451', label: '微博', icon: snsWeibo, className: 'h-5 w-6' },
  { href: 'https://www.douyin.com/user/self?from_tab_name=main&showTab=post', label: '抖音', icon: snsDouyin, className: 'h-[22.89px] w-[21.71px]' },
  {
    href: 'https://space.bilibili.com/3546944867666749?spm_id_from=333.337.0.0',
    label: '哔哩哔哩',
    icon: snsBilibili,
    className: 'h-[21.19px] w-[22.78px]',
  },
] as const;

const LEGAL_PAGES = {
  business: {
    title: '商业准则',
    url: 'https://app.plaud.cn/terms-service/business-principles.html',
  },
  user: {
    title: '用户协议',
    url: 'https://app.plaud.cn/terms-service/user-agreement-cn.html',
  },
  privacy: {
    title: '隐私政策',
    url: '/privacy-policy',
  },
} as const;

/** 移动端与桌面端分开写样式，避免 `lg:` 与视口/嵌套导致「MB 款」外溢到 PC */
function BrandAndSns({ variant }: { variant: 'mobile' | 'desktop' }) {
  if (variant === 'mobile') {
    return (
      <div className="w-full shrink-0" data-node-id="208:15405">
        <img
          src={logoPlaud}
          alt="Plaud"
          className="h-[33px] w-auto max-w-[202px]"
          width={202}
          height={33}
        />
        <p
          className="mt-4 font-[family-name:var(--font-sans)] text-[15px] font-light leading-normal text-black"
          data-node-id="208:15404"
        >
          放大人类智能
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-[7px]" data-node-id="208:15442">
          {FOOTER_SNS_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-[35.172px] items-center justify-center overflow-hidden text-black transition hover:opacity-70"
              aria-label={item.label}
            >
              <img src={item.icon} alt="" className={`max-h-full max-w-full object-contain ${item.className}`} />
            </a>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-[204px] shrink-0" data-node-id="208:15405">
      <img
        src={logoPlaud}
        alt="Plaud"
        className="h-[26px] w-auto max-w-[158px]"
        width={158}
        height={26}
      />
      <p
        className="mt-3.5 font-[family-name:var(--font-sans)] text-xs font-light leading-normal text-black"
        data-node-id="208:15404"
      >
        放大人类智能
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-[7px]" data-node-id="208:15442">
        {FOOTER_SNS_LINKS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-[35.172px] items-center justify-center overflow-hidden text-black transition hover:opacity-70"
            aria-label={item.label}
          >
            <img src={item.icon} alt="" className={`max-h-full max-w-full object-contain ${item.className}`} />
          </a>
        ))}
      </div>
    </div>
  );
}

function ContactLinks({ onSelect }: { onSelect: (id: CooperationModalId) => void }) {
  return (
    <div className="min-w-0 shrink-0" data-node-id="208:15398">
      <h3 className="mb-3 mt-0 font-[family-name:var(--font-sans)] text-sm font-bold leading-none text-black">联系我们</h3>
      <ul className="mt-0 space-y-0 leading-[1.8]">
        {COOPERATION_ENTRIES.map((row) => (
          <li key={row.id}>
            <button
              type="button"
              onClick={() => onSelect(row.id)}
              aria-haspopup="dialog"
              className="block w-full py-0 text-left font-[family-name:var(--font-sans)] text-xs font-light leading-[1.8] text-black transition hover:opacity-70"
            >
              {row.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

type MobileAccordionId = 'contact' | 'support' | 'buy' | 'app';

/** Figma 208:17827 / 208:17832：约 19.3px 触控区，V 形 chevron */
function AccordionChevron({ open }: { open: boolean }) {
  return (
    <span className="flex size-[19.32px] shrink-0 items-center justify-center text-black" aria-hidden>
      <svg
        width="14"
        height="9"
        viewBox="0 0 12 8"
        fill="none"
        className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      >
        <path d="M1 1.5L6 6L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function FooterSection() {
  const [modal, setModal] = useState<FooterModal>(null);
  const [mobileOpen, setMobileOpen] = useState<MobileAccordionId | null>(null);
  const [desktopAppQr, setDesktopAppQr] = useState<'ios' | 'android' | null>(null);
  const [mobileAppQr, setMobileAppQr] = useState<'ios' | 'android' | null>(null);

  const toggleAccordion = (id: MobileAccordionId) => {
    setMobileOpen((prev) => {
      const next = prev === id ? null : id;
      if (next !== 'app') setMobileAppQr(null);
      return next;
    });
  };

  return (
    <footer
      id={ANCHORS.contact}
      className="w-full bg-[#f7f7f7] text-black"
      data-figma-node="208:15387"
      data-figma-mobile-node={FIGMA_MOBILE_SECTION_NODES.footer.id}
    >
      <div className="mx-auto w-full min-w-0 max-w-[1440px] px-4 pb-10 pt-10 sm:px-6 sm:pb-12 sm:pt-12 lg:px-[157px] lg:pb-[52px] lg:pt-[35px]">
        {/**
         * 与 Figma 左右 157 一致：本列 `w-full` 即内容区，不用 `max-w+mx-auto` 导致与下方文案左右不齐。
         * PC 上区：Figma 208:15387 — 列自左 0 / 609 / 781 / 944(线) / 下载区右缘贴齐（定宽 143）。
         */}
        <div className="w-full min-w-0">
        <div className="min-w-0 lg:relative lg:min-h-[261px]">
          {/** Figma 208:17822 MB-with switcher */}
          <div className="flex flex-col gap-8 lg:hidden" data-figma-node="208:17822">
            <BrandAndSns variant="mobile" />
            <div className="flex min-w-0 flex-col" data-figma-node="208:17823">
              <div className="border-b border-[#ebebeb]">
                <button
                  type="button"
                  className="flex min-h-[61px] w-full min-w-0 items-center justify-between gap-4 py-0 text-left"
                  aria-expanded={mobileOpen === 'contact'}
                  onClick={() => toggleAccordion('contact')}
                >
                  <span className="font-[family-name:var(--font-sans)] text-[18px] font-light text-black">联系我们</span>
                  <AccordionChevron open={mobileOpen === 'contact'} />
                </button>
                {mobileOpen === 'contact' ? (
                  <div className="pb-4 pt-0">
                    <ul className="space-y-1">
                      {COOPERATION_ENTRIES.map((row) => (
                        <li key={row.id}>
                          <button
                            type="button"
                            onClick={() => {
                              setModal(row.id);
                              setMobileOpen(null);
                            }}
                            aria-haspopup="dialog"
                            className="block w-full py-2 text-left font-[family-name:var(--font-sans)] text-[15px] font-light leading-[1.2] text-black transition hover:opacity-70"
                          >
                            {row.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
              <div className="border-b border-[#ebebeb]">
                <button
                  type="button"
                  className="flex min-h-[61px] w-full min-w-0 items-center justify-between gap-4 py-0 text-left"
                  aria-expanded={mobileOpen === 'support'}
                  onClick={() => toggleAccordion('support')}
                >
                  <span className="font-[family-name:var(--font-sans)] text-[18px] font-light text-black">技术支持</span>
                  <AccordionChevron open={mobileOpen === 'support'} />
                </button>
                {mobileOpen === 'support' ? (
                  <div className="space-y-4 pb-4" data-figma-node="208:17833">
                    <p className="font-[family-name:var(--font-jokker)] text-[15px] leading-normal text-black">
                      <span className="font-[family-name:var(--font-sans)] font-light">工作日</span>
                      <span> 10:00-20:00</span>
                    </p>
                    <div className="space-y-2 font-[family-name:var(--font-jokker)] text-[15px] leading-[1.2] text-black">
                      <p className="mb-0">
                        <span className="font-[family-name:var(--font-sans)] font-light">邮件 ：</span>
                        <a
                          href="mailto:support@plaud.cn"
                          className="underline decoration-solid underline-offset-2 hover:opacity-80"
                        >
                          support@plaud.cn
                        </a>
                      </p>
                      <p className="mb-0">
                        <span className="font-[family-name:var(--font-sans)] font-light">服务热线 ：</span>
                        <a href="tel:4009038843" className="hover:opacity-80">
                          4009038843
                        </a>
                      </p>
                      <p className="font-[family-name:var(--font-sans)] font-light">企业微信扫描下方二维码：</p>
                    </div>
                    <div className="flex justify-start pt-1" data-figma-node="208:17838">
                      <img
                        src={supportWechatQr}
                        alt="企业微信二维码"
                        className="size-[193px] max-w-full rounded-[2px] object-cover"
                        width={193}
                        height={193}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="border-b border-[#ebebeb]">
                <button
                  type="button"
                  className="flex min-h-[61px] w-full min-w-0 items-center justify-between gap-4 py-0 text-left"
                  aria-expanded={mobileOpen === 'buy'}
                  onClick={() => toggleAccordion('buy')}
                >
                  <span className="font-[family-name:var(--font-sans)] text-[18px] font-light text-black">立即购买</span>
                  <AccordionChevron open={mobileOpen === 'buy'} />
                </button>
                {mobileOpen === 'buy' ? (
                  <div className="pb-4">
                    <p className="mb-3 font-[family-name:var(--font-sans)] text-[15px] font-light leading-[1.2] text-neutral-800">
                      请选择官方渠道完成购买
                    </p>
                    <div className="flex flex-col items-start gap-5 sm:flex-row sm:gap-6">
                      <a
                        href={OFFICIAL_JD_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-start gap-1"
                      >
                        <img src={jdLogo} alt="京东旗舰店" className="h-12 w-12 rounded-[4px] object-cover" />
                        <span className="text-[15px] font-light text-black">京东旗舰店</span>
                      </a>
                      <a
                        href={OFFICIAL_TMALL_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-start gap-1"
                      >
                        <img src={tmLogo} alt="天猫旗舰店" className="h-12 w-16 rounded object-cover" />
                        <span className="text-[15px] font-light text-black">天猫旗舰店</span>
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setModal('buy');
                        setMobileOpen(null);
                      }}
                      aria-haspopup="dialog"
                      className="mt-3 font-[family-name:var(--font-sans)] text-[15px] font-light text-black underline underline-offset-2 hover:opacity-70"
                    >
                      在弹窗中选择渠道
                    </button>
                  </div>
                ) : null}
              </div>
              <div className="border-b border-[#ebebeb]">
                <button
                  type="button"
                  className="flex min-h-[61px] w-full min-w-0 items-center justify-between gap-4 py-0 text-left"
                  aria-expanded={mobileOpen === 'app'}
                  onClick={() => toggleAccordion('app')}
                >
                  <span className="font-[family-name:var(--font-jokker)] text-[18px] font-normal text-black">
                    <span className="font-[family-name:var(--font-sans)] font-light">下载</span>
                    <span> App</span>
                  </span>
                  <AccordionChevron open={mobileOpen === 'app'} />
                </button>
                {mobileOpen === 'app' ? (
                  <div className="mx-auto w-full max-w-[418.56px] pb-4" data-figma-node="208:17914">
                    <div className="flex w-full flex-col gap-[5px]">
                      <div
                        className={`relative overflow-hidden transition-[max-height] duration-300 ease-out ${mobileAppQr === 'ios' ? 'max-h-[232px]' : 'max-h-[54px]'}`}
                      >
                        <button
                          type="button"
                          onClick={() => setMobileAppQr('ios')}
                          className={`flex h-[54px] w-full items-center justify-center gap-[10px] rounded-[6.4px] bg-white px-6 py-4 text-[18px] text-black shadow-[0_1px_2px_rgba(0,0,0,0.04)] ring-1 ring-black/[0.06] transition-all duration-300 ${mobileAppQr === 'ios' ? 'pointer-events-none absolute inset-0 opacity-0 -translate-y-1' : 'relative opacity-100 translate-y-0'}`}
                          data-node-id="208:17915"
                        >
                          <img src={storeApple} alt="" className="size-[26px] shrink-0" width={26} height={26} />
                          <span className="font-[family-name:var(--font-sans)] font-semibold leading-5 tracking-[-0.3px]">
                            iOS 下载
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setMobileAppQr(null)}
                          className={`mx-auto flex w-fit items-center justify-center rounded-[6.4px] bg-white p-[6px] shadow-[0_1px_2px_rgba(0,0,0,0.04)] ring-1 ring-black/[0.06] transition-all duration-300 ${mobileAppQr === 'ios' ? 'relative opacity-100 translate-y-0' : 'pointer-events-none absolute inset-0 opacity-0 translate-y-1'}`}
                          data-node-id="208:17915"
                        >
                          <img src={appQrIos} alt="iOS 下载二维码" className="size-[220px] rounded-[2px] object-cover" width={220} height={220} />
                        </button>
                      </div>
                      <div
                        className={`relative overflow-hidden transition-[max-height] duration-300 ease-out ${mobileAppQr === 'android' ? 'max-h-[232px]' : 'max-h-[54px]'}`}
                      >
                        <button
                          type="button"
                          onClick={() => setMobileAppQr('android')}
                          className={`flex h-[54px] w-full items-center justify-center gap-[10px] rounded-[6.4px] bg-white px-6 py-4 text-[18px] text-black shadow-[0_1px_2px_rgba(0,0,0,0.04)] ring-1 ring-black/[0.06] transition-all duration-300 ${mobileAppQr === 'android' ? 'pointer-events-none absolute inset-0 opacity-0 -translate-y-1' : 'relative opacity-100 translate-y-0'}`}
                          data-node-id="208:17919"
                        >
                          <img src={storeAndroid} alt="" className="size-[26px] shrink-0" width={26} height={26} />
                          <span className="font-[family-name:var(--font-sans)] font-semibold leading-[25.6px] tracking-[-0.38px]">
                            Android 下载
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setMobileAppQr(null)}
                          className={`mx-auto flex w-fit items-center justify-center rounded-[6.4px] bg-white p-[6px] shadow-[0_1px_2px_rgba(0,0,0,0.04)] ring-1 ring-black/[0.06] transition-all duration-300 ${mobileAppQr === 'android' ? 'relative opacity-100 translate-y-0' : 'pointer-events-none absolute inset-0 opacity-0 translate-y-1'}`}
                          data-node-id="208:17919"
                        >
                          <img
                            src={appQrAndroid}
                            alt="Android 下载二维码"
                            className="size-[220px] rounded-[2px] object-cover"
                            width={220}
                            height={220}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            {/** Figma 208:17796：移动端仅保留版权三行，不展示 PC 温馨提示与法务链接 */}
            <div
              className="pt-2 font-[family-name:var(--font-jokker)] text-[14px] leading-[1.5] text-black"
              data-node-id="208:17796"
            >
              <p className="mb-0">Copyright@2021-2026 深圳机智连接科技有限公司</p>
              <p className="mb-0">生成式人工智能服务登记号：Guangdong-Plaud-20251229S0027</p>
              <p className="mb-0">
                ICP备案号：
                <a
                  href="https://beian.miit.gov.cn/#/Integrated/index"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-2 hover:underline"
                >
                  粤ICP备2025405986号
                </a>
              </p>
              <p className="mb-0">
                ICP许可证：
                <a
                  href="https://tsm.miit.gov.cn/dxxzsp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-2 hover:underline"
                >
                  粤B2-20262239
                </a>
              </p>
              <p className="mb-0 flex items-center">
                <img src="https://cdn.shopify.com/s/files/1/0959/9542/9162/files/ico_gongan.png?v=1782467110" alt="" className="inline-block" />
               <span className="ml-[5px]">
                  <a
                    href="https://beian.mps.gov.cn/#/query/webSearch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-2 hover:underline"
                  >
                  粤公网安备44030002011219号
                  </a>
                </span>
              </p>
            </div>
          </div>

          <div className="hidden w-full min-w-0 overflow-x-clip lg:block" data-figma-node="208:15387">
            {/**
             * 桌面端改为网格自适应：中间留白由 1fr 伸缩，右侧分组随视口宽度自适应，
             * 分割线与下载列绑定，不再使用绝对 left 固定坐标。
             */}
            <div className="grid w-full min-w-0 grid-cols-[204px_minmax(24px,1fr)_minmax(132px,176px)_minmax(70px,82px)_1px_143px] items-start gap-x-[18px] pt-[32px]">
              <div className="min-w-0" data-node-id="208:15405">
                <BrandAndSns variant="desktop" />
              </div>

              <div
                className="min-w-0 col-start-3"
                data-node-id="208:15398"
              >
                <ContactLinks onSelect={(id) => setModal(id)} />
              </div>

              <div className="-translate-y-[2px] min-w-0 self-start col-start-4" data-node-id="208:15397">
                <button
                  type="button"
                  onClick={() => setModal('support')}
                  aria-haspopup="dialog"
                  className="m-0 block w-full min-w-0 p-0 text-left font-[family-name:var(--font-sans)] text-sm font-bold leading-none text-black transition hover:opacity-70"
                >
                  技术支持
                </button>
                <p
                  className="mb-0 mt-0 h-[1.125em] font-[family-name:var(--font-jokker)] text-sm leading-[1.8]"
                  aria-hidden
                >
                  {'\u200b'}
                </p>
                <button
                  type="button"
                  onClick={() => setModal('buy')}
                  aria-haspopup="dialog"
                  className="m-0 block w-full min-w-0 p-0 text-left font-[family-name:var(--font-sans)] text-sm font-bold leading-none text-black transition hover:opacity-70"
                >
                  立即购买
                </button>
              </div>

              <div className="col-start-5 h-[261px] w-px bg-neutral-300" data-node-id="208:15400" />

              <div className="-translate-y-[2px] min-w-0 self-start col-start-6 w-[143px] shrink-0" data-node-id="208:15421">
                <p
                  className="m-0 font-[family-name:var(--font-jokker)] text-sm font-semibold leading-none text-black"
                  data-node-id="208:15422"
                >
                  <span className="font-[family-name:var(--font-sans)] font-bold">下载</span>
                  <span>{` App `}</span>
                </p>
                {/** Figma 208:15422 y=70 → 208:15423 y=103，标题与按钮区间距 33px */}
                <div className="mt-[33px] flex w-full flex-col gap-3" data-node-id="208:15423">
                  <div
                    className={`relative overflow-hidden transition-[max-height] duration-300 ease-out ${desktopAppQr === 'ios' ? 'max-h-[143px]' : 'max-h-[42px]'}`}
                  >
                    <button
                      type="button"
                      onClick={() => setDesktopAppQr('ios')}
                      className={`flex h-[42px] w-full items-center justify-center gap-1.5 rounded-[5px] border border-black/[0.06] bg-white px-2 py-3 text-[14px] text-black shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-300 ${desktopAppQr === 'ios' ? 'pointer-events-none absolute inset-0 opacity-0 -translate-y-1' : 'relative opacity-100 translate-y-0'}`}
                      data-node-id="208:15424"
                    >
                      <img src={storeApple} alt="" className="size-5 shrink-0" width={20} height={20} />
                      <span className="shrink-0 whitespace-nowrap font-[family-name:var(--font-sans)] tracking-[-0.3px]">
                        <span className="font-normal leading-5">iOS </span>
                        <span className="font-semibold leading-5">下载</span>
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDesktopAppQr(null)}
                      className={`flex size-[143px] items-center justify-center rounded-[5px] bg-white p-[3.5px] shadow-[0_0_20px_0_rgba(0,0,0,0.15)] transition-all duration-300 ${desktopAppQr === 'ios' ? 'relative opacity-100 translate-y-0' : 'pointer-events-none absolute inset-0 opacity-0 translate-y-1'}`}
                      data-node-id="271:1153"
                    >
                      <img src={appQrIos} alt="iOS 下载二维码" className="size-[136px] rounded-[2px] object-cover" width={136} height={136} />
                    </button>
                  </div>
                  <div
                    className={`relative overflow-hidden transition-[max-height] duration-300 ease-out ${desktopAppQr === 'android' ? 'max-h-[143px]' : 'max-h-[42px]'}`}
                  >
                    <button
                      type="button"
                      onClick={() => setDesktopAppQr('android')}
                      className={`flex h-[42px] w-full min-h-[42px] flex-nowrap items-center justify-center gap-1.5 rounded-[5px] border border-black/[0.06] bg-white py-3 pl-2.5 pr-1.5 text-[12.5px] leading-tight text-black shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-300 sm:pl-3.5 sm:pr-2 sm:text-[14px] sm:leading-5 ${desktopAppQr === 'android' ? 'pointer-events-none absolute inset-0 opacity-0 -translate-y-1' : 'relative opacity-100 translate-y-0'}`}
                      data-node-id="208:15429"
                    >
                      <img src={storeAndroid} alt="" className="size-5 shrink-0" width={20} height={20} />
                      <span className="shrink-0 whitespace-nowrap font-[family-name:var(--font-sans)] tracking-[-0.3px]">
                        <span className="font-normal">Android </span>
                        <span className="font-semibold">下载</span>
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDesktopAppQr(null)}
                      className={`flex size-[143px] items-center justify-center rounded-[5px] bg-white p-[3.5px] shadow-[0_0_20px_0_rgba(0,0,0,0.15)] transition-all duration-300 ${desktopAppQr === 'android' ? 'relative opacity-100 translate-y-0' : 'pointer-events-none absolute inset-0 opacity-0 translate-y-1'}`}
                      data-node-id="271:1153"
                    >
                      <img
                        src={appQrAndroid}
                        alt="Android 下载二维码"
                        className="size-[136px] rounded-[2px] object-cover"
                        width={136}
                        height={136}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/** PC Figma 208:15387：主区底 y=296 → 温馨提示顶 y=372，间距 76px */}
        <p
          className="mt-10 hidden w-full font-[family-name:var(--font-sans)] text-xs font-light leading-[1.5] text-black lg:mt-[76px] lg:block"
          data-node-id="208:15402"
        >
          温馨提示：如法律要求，请您在开始记录前先获得所有被记录者的同意。尊重隐私，遵守法律。
        </p>

        {/** 温馨提示顶 y=372、高 18 → 分割线 y=402，空 12px（非 30px） */}
        <hr
          className="mt-3 hidden w-full border-0 border-t border-[#ebebeb] lg:block lg:border-neutral-300"
          data-node-id="208:15399"
        />

        <div className="mt-3 hidden w-full flex-col gap-6 lg:mt-3 lg:flex lg:flex-row lg:items-end lg:justify-between">
          <div
            className="space-y-0 font-[family-name:var(--font-jokker)] text-sm leading-[1.5] text-black lg:text-xs"
            data-node-id="208:15401"
          >
              <p className="mb-0">Copyright@2021-2026 深圳机智连接科技有限公司</p>
              <p className="mb-0">生成式人工智能服务登记号：Guangdong-Plaud-20251229S0027</p>
              <p className="mb-0">
                ICP备案号：
                <a
                  href="https://beian.miit.gov.cn/#/Integrated/index"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-2 hover:underline"
                >
                  粤ICP备2025405986号
                </a>
              </p>
              <p className="mb-0">
                ICP许可证：
                <a
                  href="https://tsm.miit.gov.cn/dxxzsp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-2 hover:underline"
                >
                  粤B2-20262239
                </a>
              </p>
              <p className="mb-0 flex items-center">
                <img src="https://cdn.shopify.com/s/files/1/0959/9542/9162/files/ico_gongan.png?v=1782467110" alt="" className="inline-block" />
              
                <span className="ml-[5px]">
                  <a
                    href="https://beian.mps.gov.cn/#/query/webSearch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-2 hover:underline"
                  >
                 粤公网安备44030002011219号
                  </a>
                </span>
              </p>

          </div>
          <div
            className="flex flex-wrap items-center gap-0 font-[family-name:var(--font-sans)] text-xs font-light leading-normal text-black lg:justify-end lg:pb-px"
            data-node-id="208:15403"
          >
            <button type="button" onClick={() => setModal('legal-business')} aria-haspopup="dialog" className="hover:opacity-70">
              商业准则
            </button>
            <span aria-hidden>{' | '}</span>
            <button type="button" onClick={() => setModal('legal-user')} aria-haspopup="dialog" className="hover:opacity-70">
              用户协议
            </button>
            <span aria-hidden>{' | '}</span>
            <button type="button" onClick={() => setModal('legal-privacy')} aria-haspopup="dialog" className="hover:opacity-70">
              隐私政策
            </button>
          </div>
        </div>
        </div>
      </div>

      {COOPERATION_ENTRIES.map((entry) => (
        <SimpleModal
          key={entry.id}
          open={modal === entry.id}
          onClose={() => setModal(null)}
          title={entry.label}
          titleClassName={MODAL_TITLE_LIGHT_24}
          panelClassName="max-w-[526px]"
        >
          <CooperationEmailModalBody email={entry.email} figmaId={entry.figmaId} />
        </SimpleModal>
      ))}

      <SimpleModal
        open={modal === 'buy'}
        onClose={() => setModal(null)}
        title="立即购买"
        titleClassName={MODAL_TITLE_LIGHT_24}
        panelClassName="max-w-[606px]"
      >
        {/** Figma 208:16487：标题下京东/天猫标整体居中 */}
        <div className="text-center" data-figma-node={FM.modalBuy.id}>
          <div className="flex flex-wrap items-center justify-center gap-x-[72px] gap-y-6">
            <a
              href={OFFICIAL_JD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 transition hover:opacity-80"
            >
              <img src={jdLogo} alt="京东旗舰店" className="h-[51px] w-[51px] rounded-[6px] object-cover" width={51} height={51} />
            </a>
            <a
              href={OFFICIAL_TMALL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 transition hover:opacity-80"
            >
              <img src={tmLogo} alt="天猫旗舰店" className="size-[51px] rounded object-cover" width={51} height={51} />
            </a>
          </div>
        </div>
      </SimpleModal>

      <SimpleModal
        open={modal === 'support'}
        onClose={() => setModal(null)}
        title="技术支持"
        titleClassName={MODAL_TITLE_LIGHT_24}
        panelClassName="max-w-[606px]"
      >
        {/** Figma 208:16667：左文案 + 右 83×83 企微码；字号与稿 24px 行一致 */}
        <div
          className="flex flex-col items-stretch gap-6 text-left sm:flex-row sm:items-start sm:justify-between sm:gap-4"
          data-figma-node={FM.modalSupport.id}
        >
          <div className="min-w-0 space-y-2 font-[family-name:var(--font-jokker)] text-2xl leading-normal text-black">
            <p className="mb-0">
              <span className="font-[family-name:var(--font-sans)] font-light">邮件 ：</span>
              <a
                href="mailto:support@plaud.cn"
                className="underline decoration-solid underline-offset-[0.12em] hover:opacity-80"
              >
                support@plaud.cn
              </a>
            </p>
            <p className="mb-0">
              <span className="font-[family-name:var(--font-sans)] font-light">服务热线 ：</span>
              <a href="tel:4009038843" className="hover:opacity-80">
                4009038843
              </a>
            </p>
            <p className="mb-0 font-[family-name:var(--font-sans)] font-light">企业微信扫描右侧二维码：</p>
          </div>
          <img
            src={supportWechatQr}
            alt="企业微信二维码"
            className="size-[83px] shrink-0 self-end rounded-[2px] object-cover sm:self-start"
            width={83}
            height={83}
            loading="lazy"
            decoding="async"
          />
        </div>
      </SimpleModal>

      <SimpleModal
        open={modal === 'legal-business'}
        onClose={() => setModal(null)}
        title={LEGAL_PAGES.business.title}
        panelClassName="max-w-[560px]"
      >
        <p className="mb-6 text-sm font-light leading-relaxed text-neutral-700">
          商业准则完整内容托管在 Plaud 官方站点，点击下方按钮在浏览器新标签页中查看。
        </p>
        <a
          href={LEGAL_PAGES.business.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center justify-center rounded-[5px] bg-black px-6 text-sm font-medium text-white transition hover:bg-neutral-800"
        >
          前往查看
        </a>
      </SimpleModal>
      <SimpleModal
        open={modal === 'legal-user'}
        onClose={() => setModal(null)}
        title={LEGAL_PAGES.user.title}
        panelClassName="max-w-[560px]"
      >
        <p className="mb-6 text-sm font-light leading-relaxed text-neutral-700">
          用户协议完整内容托管在 Plaud 官方站点，点击下方按钮在浏览器新标签页中查看。
        </p>
        <a
          href={LEGAL_PAGES.user.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center justify-center rounded-[5px] bg-black px-6 text-sm font-medium text-white transition hover:bg-neutral-800"
        >
          前往查看
        </a>
      </SimpleModal>
      <SimpleModal
        open={modal === 'legal-privacy'}
        onClose={() => setModal(null)}
        title={LEGAL_PAGES.privacy.title}
        panelClassName="max-w-[560px]"
      >
        <p className="mb-6 text-sm font-light leading-relaxed text-neutral-700">
          隐私政策完整内容托管在 Plaud 官方站点，点击下方按钮在浏览器新标签页中查看。
        </p>
        <a
          href={LEGAL_PAGES.privacy.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center justify-center rounded-[5px] bg-black px-6 text-sm font-medium text-white transition hover:bg-neutral-800"
        >
          前往查看
        </a>
      </SimpleModal>
    </footer>
  );
}
