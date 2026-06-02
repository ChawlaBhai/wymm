import { Helmet } from 'react-helmet-async'
import HeroSection from '@/components/landing/HeroSection'
import HowItWorksSection from '@/components/landing/HowItWorksSection'
import WhyMattersSection from '@/components/landing/WhyMattersSection'
import TemplatesSection from '@/components/landing/TemplatesSection'
import TestimonialsSection from '@/components/landing/TestimonialsSection'
import CTABannerSection from '@/components/landing/CTABannerSection'
import Footer from '@/components/landing/Footer'

export default function LandingPage() {
  return (
    <>
      <Helmet>
        <title>wymm — Create Your Marriage Biodata Online | Free &amp; Beautiful</title>
        <meta
          name="description"
          content="Create a stunning marriage biodata that speaks for you. Elegant templates, shareable in seconds, free forever. Trusted by families across India."
        />
        <meta
          name="keywords"
          content="marriage biodata, biodata for marriage, shaadi biodata, vivah biodata, marriage biodata online, biodata format for marriage, biodata maker, free biodata"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="wymm — Create Your Marriage Biodata Online | Free & Beautiful" />
        <meta
          property="og:description"
          content="Create a stunning marriage biodata that speaks for you. Elegant templates, shareable in seconds, free forever. Trusted by families across India."
        />
        <meta property="og:site_name" content="wymm" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="wymm — Create Your Marriage Biodata Online | Free & Beautiful" />
        <meta
          name="twitter:description"
          content="Create a stunning marriage biodata that speaks for you. Elegant templates, shareable in seconds, free forever."
        />
        <link rel="canonical" href="https://wymm.in/" />
      </Helmet>

      <div style={{ paddingTop: 64 }}>
        <main>
          <HeroSection />
          <HowItWorksSection />
          <WhyMattersSection />
          <TemplatesSection />
          <TestimonialsSection />
          <CTABannerSection />
        </main>
        <Footer />
      </div>
    </>
  )
}
