import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import ProjectsSection from './components/ProjectsSection'
import ExperienceSection from './components/ExperienceSection'
import SkillsSection from './components/SkillsSection'
//import HomelabSection from './components/HomelabSection'
//import BlogSection from './components/BlogSection'
import ContactSection from './components/ContactSection'

function App() {
  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <Navigation />
      <main>
        <HeroSection />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        {/*<HomelabSection />*/}
        {/*<BlogSection />*/}
        <ContactSection />
      </main>
    </div>
  )
}

export default App
