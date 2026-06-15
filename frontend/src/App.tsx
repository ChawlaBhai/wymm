import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import ScrollToTop from '@/components/ScrollToTop'
import { useAuthStore } from '@/store/authStore'

const LandingPage        = lazy(() => import('@/pages/LandingPage'))
const BuilderPage        = lazy(() => import('@/pages/BuilderPage'))
const PreviewPage        = lazy(() => import('@/pages/PreviewPage'))
const SharePage          = lazy(() => import('@/pages/SharePage'))
const AboutPage          = lazy(() => import('@/pages/AboutPage'))
const TemplatesPage      = lazy(() => import('@/pages/TemplatesPage'))
const ManageBiodasPage   = lazy(() => import('@/pages/ManageBiodasPage'))
const LoginPage          = lazy(() => import('@/pages/LoginPage'))
const AdminPage          = lazy(() => import('@/pages/AdminPage'))
const PrivacyPage        = lazy(() => import('@/pages/PrivacyPage'))
const TermsPage          = lazy(() => import('@/pages/TermsPage'))
const RefundPage         = lazy(() => import('@/pages/RefundPage'))
const CheckoutPage       = lazy(() => import('@/pages/CheckoutPage'))
const ContactPage        = lazy(() => import('@/pages/ContactPage'))

function PageLoader() {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh' }}>
      <div style={{ width:32, height:32, borderRadius:'50%', border:'2.5px solid #E5E5E5', borderTopColor:'#7C3AED', animation:'spin 0.7s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}

export default function App() {
  const initialize = useAuthStore((s) => s.initialize)
  useEffect(() => { return initialize() }, [initialize])

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/"          element={<><Navbar /><LandingPage /></>} />
          <Route path="/about"     element={<><Navbar /><AboutPage /></>} />
          <Route path="/templates" element={<><Navbar /><TemplatesPage /></>} />
          <Route path="/manage"    element={<><Navbar /><ManageBiodasPage /></>} />
          <Route path="/login"     element={<LoginPage />} />
          <Route path="/admin"     element={<AdminPage />} />
          <Route path="/create"    element={<BuilderPage />} />
          <Route path="/preview"   element={<PreviewPage />} />
          <Route path="/privacy"   element={<><Navbar /><PrivacyPage /></>} />
          <Route path="/terms"     element={<><Navbar /><TermsPage /></>} />
          <Route path="/refund"    element={<><Navbar /><RefundPage /></>} />
          <Route path="/checkout"  element={<CheckoutPage />} />
          <Route path="/contact"   element={<><Navbar /><ContactPage /></>} />
          <Route path="/pr/:slug"   element={<SharePage />} />
          <Route path="/:slug"     element={<SharePage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
