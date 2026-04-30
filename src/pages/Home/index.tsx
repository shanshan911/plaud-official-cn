import {
  BannerSection,
  EndorsementMarqueeSection,
  FooterSection,
  IntelligenceMissionSection,
  PlaudIntelligenceFeaturesSection,
  ProductSeriesSection,
  ProfessionalsSection,
  SecuritySection,
  TopNavSection,
  WorkSmarterSection,
} from '@/sections';

const Home = () => {
  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden bg-page-canvas text-neutral-900 antialiased">
      <TopNavSection />
      <main>
        <BannerSection />
        <IntelligenceMissionSection />
        <EndorsementMarqueeSection />
        <ProfessionalsSection />
        <WorkSmarterSection />
        <ProductSeriesSection />
        <PlaudIntelligenceFeaturesSection />
        <SecuritySection />
      </main>
      <FooterSection />
    </div>
  );
};

export default Home;
