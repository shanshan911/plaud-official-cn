import noteBlack from '@/assets/images/home/product-series/colors/note-black.webp';
import noteGold from '@/assets/images/home/product-series/colors/note-gold.webp';
import noteNavy from '@/assets/images/home/product-series/colors/note-navy.webp';
import noteSilver from '@/assets/images/home/product-series/colors/note-silver.webp';
import notepinsBlack from '@/assets/images/home/product-series/colors/notepins-black.webp';
import notepinsPurple from '@/assets/images/home/product-series/colors/notepins-purple.webp';
import notepinsSilver from '@/assets/images/home/product-series/colors/notepins-silver.webp';
import noteproBlack from '@/assets/images/home/product-series/colors/notepro-black.webp';
import noteproSilver from '@/assets/images/home/product-series/colors/notepro-silver.webp';

/**
 * 产品 id → 与 `ProductSeriesItem.swatches` 等长的图片 URL。
 * 缺独立配色素材时，先全部指向同一张主图，后续只改本 map 即可。
 * （`plaud-note` / `plaud-notepin-s` 与真机造型对应关系在 ProductSeriesSection 的 image 上已对调。）
 */
export const PRODUCT_COLOR_IMAGES: Record<string, readonly string[]> = {
  // swatch 顺序：[银, 炭灰] -> [银, 黑]
  notepro: [noteproSilver, noteproBlack],
  // swatch 顺序：[炭灰, 银, 玫瑰] -> [黑, 银, 紫]
  notepins: [notepinsBlack, notepinsSilver, notepinsPurple],
  // swatch 顺序：[银, 炭灰, 玫瑰, 蓝灰] -> [银, 黑, 金, 海军蓝]
  note: [noteSilver, noteBlack, noteGold, noteNavy],
};
