/**
 * Figma file: for--Copy- (7AITzjjNKxmHMd0FJOYerM)
 * Root PC artboard: 2026/02/09-PC (208:15171)
 * Use with user-Figma MCP: get_metadata / get_design_context
 */
export const FIGMA_FILE_KEY = '7AITzjjNKxmHMd0FJOYerM';

export const FIGMA_ROOT_FRAME = {
  id: '208:15171',
  name: '2026/02/09-PC',
} as const;

/** 移动端长页 480×8026（按画板 Y 自上而下） */
export const FIGMA_MOBILE_ROOT_FRAME = {
  id: '208:16682',
  name: 'Frame 1739333379',
} as const;

/** 208:16682 下与各 Section 对应的主帧（dev 对稿用） */
export const FIGMA_MOBILE_SECTION_NODES = {
  /** 公告条 hidden，仅记录 */
  announcementBar: { id: '208:16683', name: 'Announcement Bar-MB' },
  topNav: { id: '208:17807', name: 'nav' },
  banner: { id: '208:16769', name: 'm' },
  intelligenceMission: { id: '208:16824', name: 'Frame 1739333396' },
  endorsementMarquee: { id: '208:17025', name: 'Advocacy' },
  professionals: { id: '208:16791', name: 'Frame 1739333368' },
  workSmarter: { id: '208:17194', name: 'Frame 1739333346' },
  productSeries: { id: '208:16689', name: 'Group 1739333397' },
  plaudIntelligenceFeatures: { id: '208:17208', name: 'Group 1739333380' },
  security: { id: '208:16827', name: 'Group 1739333382' },
  footer: { id: '208:17822', name: 'MB-with switcher' },
} as const;

/** Section top-level frames under 2026/02/09-PC (top → bottom by layout Y) */
export const FIGMA_SECTION_NODES = {
  topNav: { id: '208:16307', name: 'nav' },
  banner: { id: '208:15355', name: 'Laptop' },
  intelligenceMission: { id: '208:16353', name: 'Frame 1739333623' },
  endorsementMarquee: { id: '208:15505', name: 'Frame 1739333227' },
  professionals: { id: '208:15220', name: 'Group 1739333391' },
  workSmarter: { id: '208:16295', name: 'Frame 1739333056' },
  productSeries: { id: '208:15283', name: 'Frame 1739333369' },
  plaudIntelligenceFeatures: { id: '208:15689', name: 'Frame 1739333348' },
  security: { id: '208:16096', name: 'Group 1739333425' },
  /** PC footer；含合作/购买弹窗态见 208:16356；下载区含 App 二维码见 271:1033 */
  footer: { id: '208:15387', name: 'footer-V2' },
  footerWithAppQr: { id: '271:1033', name: 'footer-V2 (App QR)' },
  footerWithModals: { id: '208:16356', name: 'footer-V2 + modals' },
  modalOverlay: { id: '208:16666', name: 'Modal scrim' },
  /** PC 弹窗：立即购买（京东/天猫）— 非合作类 */
  modalBuy: { id: '208:16487', name: '立即购买 modal' },
  /** PC 弹窗：技术支持（邮件/热线/企微码） */
  modalSupport: { id: '208:16667', name: '技术支持 modal' },
  /**
   * 联系我们：合作类弹窗 — 271 系列为「标题 + 邮件：xxx@…（下划线）」
   * 礼品团购稿面与 271:1285 同版式，node 与经销共用布局参考
   */
  cooperationModals: {
    distribution: { id: '271:1285', name: '经销合作' },
    marketing: { id: '271:1432', name: '市场合作' },
    media: { id: '271:1578', name: '媒体合作' },
    gifts: { id: '271:1285', name: '礼品团购' },
    supplier: { id: '271:1724', name: '供应商合作' },
  },
} as const;
