import { AboutSection } from "@/components/home/AboutSection";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { ContactSection } from "@/components/home/ContactSection";
import { CustomerSegmentsSection } from "@/components/home/CustomerSegmentsSection";
import { HeroSection } from "@/components/home/HeroSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ProductsSection } from "@/components/home/ProductsSection";
import { TrackingSection } from "@/components/home/TrackingSection";

export function LandingPage() {
  return (
    <div className="w-full bg-brand-bg">
      <HeroSection />
      <BenefitsSection />
      <ProductsSection />
      <AboutSection />
      <ProcessSection />
      <CustomerSegmentsSection />
      <TrackingSection />
      <ContactSection />
    </div>
  );
}

export default LandingPage;