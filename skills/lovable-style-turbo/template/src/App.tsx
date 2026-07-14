import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { FeatureGrid } from './components/FeatureGrid'
import { CTA } from './components/CTA'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <Nav />
      <main>
        <Hero />
        <FeatureGrid />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
