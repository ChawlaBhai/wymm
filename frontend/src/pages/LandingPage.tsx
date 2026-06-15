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
        <title>wymm — Create Beautiful Marriage Biodata Online | ₹20 per profile</title>
        <meta
          name="description"
          content="Create stunning animated marriage biodata with shareable links, QR codes, and PDF downloads. 16 professional templates. Free preview, ₹20 to publish. Perfect for Indian arranged marriages."
        />
        <meta
          name="keywords"
          content="marriage biodata, biodata for marriage, shaadi biodata, vivah biodata, marriage biodata online, biodata banane ki website, biodata format for marriage, biodata maker, ₹20 biodata"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="wymm — Create Beautiful Marriage Biodata Online | ₹20 per profile" />
        <meta
          property="og:description"
          content="Create stunning animated marriage biodata with shareable links, QR codes, and PDF downloads. 16 professional templates. Free preview, ₹20 to publish. Perfect for Indian arranged marriages."
        />
        <meta property="og:site_name" content="wymm" />
        <meta property="og:url" content="https://wymm.store" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="wymm — Create Beautiful Marriage Biodata Online | ₹20 per profile" />
        <meta
          name="twitter:description"
          content="Create stunning animated marriage biodata with shareable links, QR codes, and PDF downloads. 16 professional templates. Free preview, ₹20 to publish."
        />
        <link rel="canonical" href="https://wymm.store" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "wymm",
          "applicationCategory": "LifestyleApplication",
          "operatingSystem": "Web",
          "description": "Create beautiful marriage biodata with shareable links",
          "offers": { "@type": "Offer", "price": "20", "priceCurrency": "INR" },
          "author": { "@type": "Person", "name": "Sahaj Chawla" }
        })}</script>
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
