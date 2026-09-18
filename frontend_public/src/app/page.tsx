import { AboutSection } from "@/components/home/AboutSection";
import { CTASection } from "@/components/home/CTASection";
import { ContactSection } from "@/components/home/ContactSection";
import { HeroSection } from "@/components/home/HeroSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ProductsSection } from "@/components/home/ProductsSection";
import VisitSection from "@/components/home/VisitSection";

export function LandingPage() {
  return (
    <div className="w-full bg-brand-bg">
      <HeroSection />
      <ProductsSection />
      <AboutSection />
      <ProcessSection />
      <VisitSection />
      <CTASection />
      <ContactSection />
    </div>
  );
}

export default LandingPage;
