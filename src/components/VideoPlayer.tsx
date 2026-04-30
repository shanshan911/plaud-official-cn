import { memo, useCallback, useEffect, useRef, useState } from 'react';

type VideoPlayerProps = {
  src: string;
  isActive?: boolean;
  /** 'desktop' 大尺寸按钮 44px / 'mobile' 小尺寸按钮 32px */
  size?: 'desktop' | 'mobile';
};

/** 首页 Tab 内嵌视频：静音循环，支持显式播放按钮 */
export const VideoPlayer = memo(({ src, isActive = true, size = 'desktop' }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (isActive && !userPaused) {
      void el.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      el.pause();
      setIsPlaying(false);
    }
  }, [isActive, userPaused]);

  const togglePlay = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    if (isPlaying) {
      el.pause();
      setUserPaused(true);
      setIsPlaying(false);
    } else {
      void el.play().catch(() => {});
      setUserPaused(false);
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const isMobile = size === 'mobile';
  const iconSize = isMobile ? 22 : 26;
  const iconR = isMobile ? 8.5 : 10.5;

  return (
    <div className={`relative w-full overflow-hidden bg-black/5 ${isMobile ? 'rounded-[4px]' : 'rounded-[13px]'}`}>
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="auto"
        className={`block w-full object-cover ${isMobile ? 'h-[180px]' : 'h-full min-h-[280px] lg:min-h-[420px]'}`}
      />
      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? '暂停' : '播放'}
        className={`absolute flex items-center justify-center rounded-full text-neutral-900/90 transition hover:bg-white/40 ${
          isMobile
            ? 'bottom-[12px] right-[12px] h-[32px] w-[32px]'
            : 'bottom-[28px] right-[28px] h-[40px] w-[40px]'
        }`}
      >
        {isPlaying ? (
          <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="12" cy="12" r={iconR} stroke="currentColor" strokeWidth="1.15" />
            <rect x="9" y="8" width="1.8" height="8" rx="0.9" fill="currentColor" />
            <rect x="13.2" y="8" width="1.8" height="8" rx="0.9" fill="currentColor" />
          </svg>
        ) : (
          <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="12" cy="12" r={iconR} stroke="currentColor" strokeWidth="1.15" />
            <path d="M10.2 8V16L16 12L10.2 8Z" fill="currentColor" />
          </svg>
        )}
      </button>
    </div>
  );
});

VideoPlayer.displayName = 'VideoPlayer';
