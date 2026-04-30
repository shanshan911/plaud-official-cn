/** Figma 208:16097 / 208:16098 — Group 427320075，155×25 */
const TRACK_X0 = 29.9512;
const TRACK_X1 = 125.048;
const MID_Y = 12.5;

type FigmaCarouselPagerProps = {
  /** 当前页，0-based */
  activeIndex: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  className?: string;
  prevAriaLabel?: string;
  nextAriaLabel?: string;
  /**
   * default：155×25（PC Security / Professionals）
   * mobile-211：208:16815 Advocacy 分页，211×19，viewBox 等比拉满
   */
  size?: 'default' | 'mobile-211';
};

export function FigmaCarouselPager({
  activeIndex,
  total,
  onPrev,
  onNext,
  className = '',
  prevAriaLabel = '上一张',
  nextAriaLabel = '下一张',
  size = 'default',
}: FigmaCarouselPagerProps) {
  const progress = total > 0 ? (activeIndex + 1) / total : 0;
  const greenEnd = TRACK_X0 + progress * (TRACK_X1 - TRACK_X0);
  const isMb211 = size === 'mobile-211';
  const frameH = isMb211 ? 19 : 25;
  const frameW = isMb211 ? 211 : 155;

  return (
    <div
      className={`relative inline-flex shrink-0 ${isMb211 ? 'h-[19px] w-[211px]' : 'h-[25px] w-[155px]'} ${className}`}
      data-figma-node={isMb211 ? '208:16815' : '208:16097'}
    >
      <svg
        className={`pointer-events-none absolute inset-0 size-full ${isMb211 ? '' : 'max-h-[25px] max-w-[155px]'}`}
        viewBox="0 0 155 25"
        width={frameW}
        height={frameH}
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <g>
          <g>
            <rect y={0} width={25.4589} height={25} fill="transparent" />
            <path
              d="M14.9766 19.1172L10.1252 13.7579C9.47868 13.0436 9.47868 11.9555 10.1252 11.2412L14.9766 5.8819"
              stroke="black"
              strokeWidth={2.25}
            />
          </g>
          <g>
            <rect x={129.5411} y={0} width={25.4589} height={25} fill="transparent" />
            <path
              d="M140.023 5.88281L144.875 11.2422C145.521 11.9564 145.521 13.0445 144.875 13.7588L140.023 19.1181"
              stroke="black"
              strokeWidth={2.25}
            />
          </g>
          <path
            d={`M${TRACK_X0} ${MID_Y}L${TRACK_X1} ${MID_Y}`}
            stroke="black"
            strokeWidth={0.75}
            strokeOpacity={0.8}
          />
          <path
            d={`M${TRACK_X0} ${MID_Y}L${greenEnd} ${MID_Y}`}
            stroke="#39F672"
            strokeWidth={2.25}
          />
        </g>
      </svg>
      <button
        type="button"
        onClick={onPrev}
        className={`absolute left-0 top-0 z-10 w-[26px] rounded-sm bg-transparent transition hover:bg-[rgba(255,255,255,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00d0ff] ${isMb211 ? 'h-[19px]' : 'h-[25px]'}`}
        aria-label={prevAriaLabel}
      />
      <button
        type="button"
        onClick={onNext}
        className={`absolute right-0 top-0 z-10 w-[26px] rounded-sm bg-transparent transition hover:bg-[rgba(255,255,255,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00d0ff] ${isMb211 ? 'h-[19px]' : 'h-[25px]'}`}
        aria-label={nextAriaLabel}
      />
    </div>
  );
}
