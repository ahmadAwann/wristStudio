import HeroSection from '../../components/HeroSection/HeroSection';
import CollectionsSection from '../../components/CollectionsSection/CollectionsSection';
import BestSellers from '../../components/BestSellers/BestSellers';
import BenefitsSection from '../../components/BenefitsSection/BenefitsSection';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <CollectionsSection />
      <BestSellers />
      <BenefitsSection />
    </main>
  );
}
