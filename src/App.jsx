import { useState } from 'react'
import { LanguageProvider } from './i18n'
import { LenisProvider } from './context/lenis'
import CustomCursor from './components/CustomCursor'
import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import ServicesSection from './components/ServicesSection'
import PortfolioSection from './components/PortfolioSection'
import ProcessSection from './components/ProcessSection'
import AboutSection from './components/AboutSection'
import CTASection from './components/CTASection'
import ScrollProgress from './components/ScrollProgress'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import IntroScreen from './components/IntroScreen'
import Footer from './components/Footer'

export default function App() {
  const [introComplete, setIntroComplete] = useState(false)
  return (
    <LanguageProvider>
      <IntroScreen onComplete={() => setIntroComplete(true)} />
      <LenisProvider>
        <div style={{
          background: '#080808',
          opacity: introComplete ? 1 : 0,
          transition: 'opacity 0.8s ease',
          pointerEvents: introComplete ? 'auto' : 'none',
        }}>
          <CustomCursor />
          <ScrollProgress />
          <Navigation />
          <main>
            <HeroSection />
            <ServicesSection />
            <PortfolioSection />
            <ProcessSection />
            <AboutSection />
            <CTASection />
          </main>
          <Footer />
          <FloatingWhatsApp />
        </div>
      </LenisProvider>
    </LanguageProvider>
  )
}
