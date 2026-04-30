export const ANCHORS = {
  banner: 'banner',
  mission: 'mission',
  endorsement: 'endorsement',
  scenarios: 'scenarios',
  workSmarter: 'work-smarter',
  products: 'products',
  intelligence: 'intelligence',
  security: 'security',
  contact: 'contact',
} as const;

export type WorkSmarterTabId = 'capture' | 'extract' | 'utilize';

export const workSmarterTabs: {
  id: WorkSmarterTabId;
  label: string;
  video: string;
}[] = [
  {
    id: 'capture',
    label: '捕捉',
    /** 运营「3个汉化视频」→ public/videos/work-smarter */
    video: '/videos/work-smarter/CN-Capture-NotePro.mp4',
  },
  {
    id: 'extract',
    label: '提取',
    video: '/videos/work-smarter/CN-Extract.mp4',
  },
  {
    id: 'utilize',
    label: '运用',
    video: '/videos/work-smarter/CN-Utilize.mp4',
  },
];
