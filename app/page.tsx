import {
  Navbar,
  Hero,
  Problem,
  Solution,
  HowItWorks,
  SocialProof,
  Footer
} from '@/components/landing'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <SocialProof />
      <Footer />
    </div>
  )
}
