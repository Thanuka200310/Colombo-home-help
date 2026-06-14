import HeroSection from "../components/home/HeroSection";
import ServicesPreview from "../components/home/ServicesPreview";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Testimonials from "../components/home/Testimonials";
import CTASection from "../components/home/CTASection";
import ReviewsPreview from "../components/shared/ReviewsPreview";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesPreview />
      <WhyChooseUs />
      <ReviewsPreview />
      <CTASection />
    </>
  );
}