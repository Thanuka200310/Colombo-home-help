import HeroSection from "../components/home/HeroSection";
import ServicesPreview from "../components/home/ServicesPreview";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Testimonials from "../components/home/Testimonials";
import CTASection from "../components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesPreview />
      <WhyChooseUs />
      <Testimonials />
      <CTASection />
    </>
  );
}