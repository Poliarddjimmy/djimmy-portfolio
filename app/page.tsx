"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
  Calendar,
  Clock,
  ArrowRight,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { getRecentArticles } from "@/lib/articles"

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("about")
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      // Find which section is currently in view
      const sections = ["about", "experience", "skills", "education", "projects", "articles"]
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      })
    }
    closeMobileMenu()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95 overflow-hidden">
      <header
        className={`fixed top-0 z-50 w-full backdrop-blur-md transition-all duration-300 ${scrollY > 50 ? "bg-background/80 shadow-md" : "bg-transparent"}`}
      >
        <div className="container flex h-20 items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 font-bold"
          >
            <span className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Djimmy Poliard
            </span>
          </motion.div>

          <nav className="hidden md:flex items-center gap-8">
            {["about", "experience", "skills", "education", "projects", "articles"].map((section, index) => (
              <motion.div
                key={section}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <button
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium relative px-2 py-1 transition-colors ${activeSection === section ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                  {activeSection === section && (
                    <motion.span
                      layoutId="activeSection"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"
                    />
                  )}
                </button>
              </motion.div>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <Button
                asChild
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300"
              >
                <Link href="/files/djimmy-poliard-resume.pdf" download target="_blank">
                  <Download className="mr-2 h-4 w-4" />
                  Resume
                </Link>
              </Button>
            </motion.div>
            <button className="md:hidden text-foreground" onClick={toggleMobileMenu} aria-label="Toggle menu">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md md:hidden"
          >
            <div className="flex justify-end p-4">
              <button onClick={closeMobileMenu} aria-label="Close menu">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col items-center justify-center h-full gap-8">
              {["about", "experience", "skills", "education", "projects", "articles"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-xl font-medium ${activeSection === section ? "text-primary" : "text-muted-foreground"
                    }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
              <div className="mt-8 flex gap-4">
                <Link href="https://github.com/Poliarddjimmy" target="_blank">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Github className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="https://www.linkedin.com/in/djimmypoliard/" target="_blank">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Linkedin className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-24">
        <HeroSection />
        <ExperienceSection />
        <SkillsSection />
        <EducationSection />
        <ProjectsSection />
        <ArticlesSection />
      </main>

      <footer className="mt-20 border-t border-border/40 bg-muted/20">
        <div className="container py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Djimmy Poliard. All rights reserved.
            </p>
          </div>
          <div className="flex gap-6">
            <Link
              href="https://github.com/Poliarddjimmy"
              target="_blank"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://linkedin.com/in/djimmypoliard"
              target="_blank"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="mailto:djimmypoliard@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function HeroSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="about" ref={ref} className="min-h-[90vh] flex items-center">
      <div className="container py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-2 md:order-1"
          >
            <div className="space-y-6">
              <div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6 }}
                  className="text-primary font-medium mb-2"
                >
                  Hello, I'm
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-5xl md:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80"
                >
                  Djimmy Poliard
                </motion.h1>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-2xl md:text-3xl font-semibold text-primary mb-6"
                >
                  Full-Stack Software Developer
                </motion.h2>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-muted-foreground text-lg mb-8 max-w-xl"
              >
                With {new Date().getFullYear() - 2017}+ years of experience building scalable web applications and internal tools that drastically
                improve efficiency. I've built fintech platforms, communication systems, e-commerce sites, and more
                using modern technologies.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col gap-3 mb-8"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <span>+1 (407) 468-3155</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <span>djimmypoliard@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <span>Orlando FL, USA</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex gap-4"
              >
                <Link href="https://github.com/Poliarddjimmy" target="_blank">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full gap-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    <Github className="h-5 w-5" />
                    GitHub
                  </Button>
                </Link>
                <Link href="https://linkedin.com/in/djimmypoliard" target="_blank">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full gap-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    <Linkedin className="h-5 w-5" />
                    LinkedIn
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="order-1 md:order-2 flex items-center justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary to-primary/40 blur-xl opacity-70 animate-pulse"></div>
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-background">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-6xl font-bold text-white">
                  {/* DP  */}
                  <img src="/images/me.jpg" alt="DP" />
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-primary/10 backdrop-blur-md border border-primary/20 flex items-center justify-center">
                <span className="font-bold text-primary">{new Date().getFullYear() - 2017}+ Years</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ExperienceSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="experience" ref={ref} className="py-16 md:py-24 bg-muted/20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Work Experience
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="space-y-16 max-w-4xl mx-auto">
          <ExperienceCard
            company="Golabs"
            position="Full-stack Software Developer"
            period="August 2022 - January 2024"
            description="A technology company headquartered in Costa Rica, with US headquarters based in Stamford, CT"
            delay={0.1}
            inView={inView}
            projects={[
              {
                name: "Finalsite",
                period: "August 2022 – January 2024",
                description: "Team up with other engineers on an Education CMS platform using several technologies",
                tasks: ["Problem solving", "Code review", "Develop new features"],
                technologies: ["Ruby on Rails", "Backbone JS"],
                link: "https://www.finalsite.com/",
              },
            ]}
          />

          <ExperienceCard
            company="BairesDev"
            position="Full-stack Software Developer"
            period="August 2021 - April 2023"
            description="Nearshore Technology Solutions company. They architect and engineer scalable and high-performing software solutions to meet the business challenges of their clients."
            delay={0.2}
            inView={inView}
            projects={[
              {
                name: "Place Inc",
                period: "August 2022 – April 2023",
                description:
                  "PLACE is the industry's only all-in-one real estate platform providing technology and services to the top 20% of real estate agents focused on delivering unparalleled consumer experiences.",
                tasks: ["Work on the reports module (backend and frontend)"],
                technologies: [
                  "Ruby on Rails",
                  "Sidekiq",
                  "RSpec",
                  "PostgreSQL",
                  "Redis",
                  "Git",
                  "Github",
                  "Docker",
                  "React JS",
                ],
                link: "https://place.com/",
              },
              {
                name: "Amount",
                period: "September 2021 – August 2022",
                description:
                  "Team up with other engineers on banking and point-of-sale solutions using several technologies such as Ruby on Rails, GraphQl, Sidekiq, Python, Go... On this platform, I was responsible to develop the refund process in the second generation and work through the payment processing generally. And also contribute to other modules such as the account opening module.",
                tasks: [
                  "Developed the refund module (ACH, Paper Check, and Debit Card)",
                  "Investigate the payment processing",
                  "Work on the payment gateway",
                ],
                technologies: [
                  "Ruby on Rails",
                  "GraphQL",
                  "Sidekiq",
                  "RSpec",
                  "PostgreSQL",
                  "Redis",
                  "Git",
                  "Github",
                  "Docker",
                ],
                link: "https://www.amount.com/",
              },
            ]}
          />

          <ExperienceCard
            company="Dixivox"
            position="Software Development Consultant"
            period="Contract (2018-2022)"
            description="A company that builds solutions based on communication and education."
            delay={0.3}
            inView={inView}
            projects={[
              {
                name: "Edikatek",
                period: "Dec 2019 – Dec 2020",
                description:
                  "Edikatek is a school management platform where students don't need to be present in a school space to follow courses, do homework, to be evaluated... It's the same thing for the teacher. And the parents have an account on the platform to follow the progress of the children and receive notification from the system or from an administrator or from the professor directly. The main language of the front end is Javascript.",
                tasks: ["Design and develop the backend", "Work on the frontend side with other engineers"],
                technologies: ["Ruby on Rails", "Next.js", "GraphQL", "PostgreSQL", "Sidekiq", "Git", "Github"],
              },
              {
                name: "Konekte'm",
                period: "Dec 2021 – 2022",
                description:
                  "Konekte'm is an Enterprise communication platform for voice, text and social media where customers can find services such as Call Center, CRM, Soft Phone, Voice & SMS Interactive. Each service builds using different technologies.",
                tasks: [
                  "Design and develop the call center and the CRM using Ruby on Rails, Active Record, RabbitMQ(bunny), and PostgreSQL",
                  "Design and develop the frontend side with other engineers",
                ],
                technologies: [
                  "Ruby on Rails",
                  "Next.js",
                  "GraphQL",
                  "PostgreSQL",
                  "Sidekiq",
                  "Git",
                  "Github",
                  "RabbitMQ(bunny)",
                ],
              },
            ]}
          />

          <ExperienceCard
            company="NouKòd"
            position="Full-stack Software Developer"
            period="April 2019 – March 2021"
            description="NouKod is an IT business and revenue-generating entity. The business aspect provides jobs for ALL newly trained IT and programming specialists via local contracts and global outsourcing."
            delay={0.4}
            inView={inView}
            projects={[
              {
                name: "to the point",
                period: "October 2020 – March 2021",
                description:
                  "ToThePoint is a social media app for students that allow them to post pictures, GIF, and Videos categorized by a study by subject. The app also has a chat message system that allows the student to be in constant connection with the admins.",
                tasks: [
                  "Developed several screens for the mobile and web app",
                  "Work on some endpoints in the backend",
                  "Make the web app responsive",
                ],
                technologies: [
                  "React native",
                  "React native web",
                  "MySql",
                  "Node.js Rest API",
                  "Git",
                  "Github",
                  "Styled component",
                ],
              },
              {
                name: "Noukod Training Platform",
                period: "December 2019 – August 2020",
                description: "A training platform used to make boot camps to hire new people.",
                tasks: [
                  "Design, Developed, and maintain the back end",
                  "Work on the frontend side with other engineers",
                ],
                technologies: ["Ruby on Rails", "React.js", "PostgreSQL", "Git", "Github"],
              },
            ]}
          />

          <ExperienceCard
            company="Ztelecom"
            position="Front-End Developer"
            period="August 2018 - August 2019"
            description="A company that builds solutions based on communication and education."
            delay={0.5}
            inView={inView}
            projects={[
              {
                name: "Sinat",
                period: "August 2018 – August 2019",
                description:
                  "Sinat is a communication solution where people can by an international number to make local and international calls.",
                tasks: ["Participate in the front-end development", "Develop a complex form with dynamic input"],
                technologies: ["React.js", "PostgreSQL", "Stripe", "Git", "Github"],
              },
            ]}
          />
        </div>
      </div>
    </section>
  )
}

function ExperienceCard({
  company,
  position,
  period,
  description,
  projects,
  delay,
  inView,
}: {
  company: string
  position: string
  period: string
  description: string
  projects: {
    name: string
    period: string
    description: string
    tasks: string[]
    technologies: string[]
    link?: string
  }[]
  delay: number
  inView: boolean
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="relative"
    >
      <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-primary via-primary/50 to-transparent rounded-full"></div>
      <div className="pl-8 relative">
        <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-primary-foreground"></div>
        </div>

        <div className="bg-card rounded-lg p-6 border border-border/50 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
            <h3 className="text-xl font-semibold">{position}</h3>
            <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">{period}</div>
          </div>

          <div className="mb-4">
            <div className="text-lg font-medium text-primary mb-2">{company}</div>
            <p className="text-muted-foreground">{description}</p>
          </div>

          <div className="space-y-6">
            {projects.slice(0, isExpanded ? projects.length : 1).map((project, index) => (
              <div key={index} className="border-t border-border/50 pt-4 mt-4 first:border-0 first:pt-0 first:mt-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                  <h4 className="font-semibold">Project: {project.name}</h4>
                  <span className="text-sm text-muted-foreground">{project.period}</span>
                </div>

                <p className="mb-3 text-sm text-muted-foreground">{project.description}</p>

                <div className="mb-3">
                  <h5 className="text-sm font-medium mb-1">Main tasks:</h5>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {project.tasks.map((task, taskIndex) => (
                      <li key={taskIndex}>{task}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-3">
                  <h5 className="text-sm font-medium mb-1">Technologies:</h5>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="inline-block px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {project.link && (
                  <div>
                    <Link
                      href={project.link}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                      Visit website <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>

          {projects.length > 1 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-4 text-sm text-primary hover:underline focus:outline-none"
            >
              {isExpanded ? "Show less" : `Show ${projects.length - 1} more project${projects.length > 2 ? "s" : ""}`}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function SkillsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const topSkills = [
    "Ruby on Rails",
    "React.js",
    "TypeScript",
    "Next.js",
    "React Native",
    "Javascript",
    "Redux",
    "HTML",
    "CSS",
    "Bootstrap",
    "Styled-component",
    "Laravel",
    "GraphQL",
    "REST API",
    "PHP",
    "Sinatra",
    "MySQL",
    "PostgreSQL",
    "SQLite",
    "RSpec",
    "Stripe"
  ]

  const familiarSkills = ["Node.js", "Redis", "Websocket", "RabbitMQ", "GCP", "AWS", "Azure DevOps", "Docker", "Sidekiq",]

  const interestedSkills = ["Golang", "Flutter"]

  const softSkills = [
    "Good communication",
    "Time management",
    "Problem-solving",
    "Adaptability and flexibility",
    "Ability to accept feedback",
  ]

  return (
    <section id="skills" ref={ref} className="py-16 md:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Skills & Expertise
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-card rounded-lg p-6 border border-border/50 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Top Skills</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {topSkills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.03 }}
                  className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card rounded-lg p-6 border border-border/50 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Familiar With</h3>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {familiarSkills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.03 }}
                  className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                >
                  {skill}
                </motion.span>
              ))}
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2v8" />
                  <path d="m4.93 10.93 1.41 1.41" />
                  <path d="M2 18h2" />
                  <path d="M20 18h2" />
                  <path d="m19.07 10.93-1.41 1.41" />
                  <path d="M22 22H2" />
                  <path d="m8 22 4-10 4 10" />
                  <path d="M12 22v-3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Interested In</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {interestedSkills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.03 }}
                  className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-card rounded-lg p-6 border border-border/50 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Soft Skills</h3>
            </div>

            <div className="space-y-4">
              {softSkills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          <div className="bg-card rounded-lg p-6 border border-border/50 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="text-4xl font-bold text-primary mb-2">{new Date().getFullYear() - 2017}+</div>
            <div className="text-lg font-medium">Years Experience</div>
            <p className="text-sm text-muted-foreground">Building scalable web applications</p>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border/50 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="text-4xl font-bold text-primary mb-2">12+</div>
            <div className="text-lg font-medium">Projects Completed</div>
            <p className="text-sm text-muted-foreground">Across various industries</p>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border/50 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="text-4xl font-bold text-primary mb-2">3</div>
            <div className="text-lg font-medium">Languages</div>
            <p className="text-sm text-muted-foreground">Haitian Creole, French, English</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function EducationSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="education" ref={ref} className="py-16 md:py-24 bg-muted/20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Education & Training
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-xl font-semibold mb-6">Formal Education</h3>

            <div className="space-y-8">
              <div className="relative pl-8">
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-primary via-primary/50 to-transparent rounded-full"></div>
                <div className="absolute -left-2 top-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary-foreground"></div>
                </div>

                <div className="bg-card rounded-lg p-5 border border-border/50 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                    <h4 className="font-semibold">AS Degree in Computer Programming and Analysis</h4>
                    <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">2024 Present</div>
                  </div>
                  <p className="text-muted-foreground">Valencia College</p>
                </div>
              </div>

              <div className="relative pl-8">
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-primary via-primary/50 to-transparent rounded-full"></div>
                <div className="absolute -left-2 top-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary-foreground"></div>
                </div>

                <div className="bg-card rounded-lg p-5 border border-border/50 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                    <h4 className="font-semibold">Bachelor's Degree in Electronic Engineering</h4>
                    <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">2010 2014</div>
                  </div>
                  <p className="text-muted-foreground">Université Lumière (Ulum)</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-6">Courses & Certifications</h3>

            <div className="space-y-4">
              <div className="bg-card rounded-lg p-5 border border-border/50 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">freeCodeCamp</h4>
                    <p className="text-sm text-muted-foreground">JavaScript Algorithms and Data Structures, 2022</p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg p-5 border border-border/50 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Udemy</h4>
                    <div className="space-y-1 mt-1">
                      <p className="text-sm text-muted-foreground">AWS, 2021</p>
                      <p className="text-sm text-muted-foreground">Azure DevOps, 2021</p>
                      <p className="text-sm text-muted-foreground">Docker, 2021</p>
                      <p className="text-sm text-muted-foreground">GCP Fundamentals, 2021</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg p-5 border border-border/50 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2H2v10h10V2Z" />
                      <path d="M12 12H2v10h10V12Z" />
                      <path d="M22 2h-10v20h10V2Z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Flatiron School</h4>
                    <p className="text-sm text-muted-foreground">Full-Stack Development, 2019</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ProjectsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })


  const projects = [
    {
      name: "LennHT",
      subtitle: "LennHT - Online Training Platform",
      image: "/images/lennht.png",
      website: "https://lennht.com",
      app: "https://lennht.dev",
      description: `The LennHT is a leading online learning platform that helps anyone learn business, software, technology
    and creative skills to achieve personal and professional goals. Through individual, corporate and
    academic subscriptions, members have access to the LennHT video library of engaging, top-quality courses
    taught by recognized industry experts.`,
      technologies: ["Laravel(PHP)", "Next.Js(React)", "Bootstrap", "TypeScript", "PostgreSQL", "Git", "Github", "Stripe"],
    },
    {
      name: "ZakaPay",
      subtitle: "ZakaPay - Digital Wallet & Payment Platform",
      image: "/images/zakapay.png",
      website: "",
      app: "",
      description: `ZakaPay is a modern digital wallet and peer-to-peer payment platform tailored for underbanked communities.
    It enables users to send and receive money, manage savings, pay bills, and access financial services securely from their phone.
    Designed with accessibility and simplicity in mind, ZakaPay bridges the gap between traditional finance and everyday users.`,
      technologies: ["Next.Js(React)", "Tailwind CSS", "PostgreSQL", "Marqeta", "Stripe", "Prisma"],
    },
    {
      name: "Operyo",
      subtitle: "Operyo - Modern ERP for Small Teams",
      image: "/images/operyo.png", // make sure this image exists or use a placeholder
      website: "",
      app: "",
      description: `Operyo is a modular ERP platform designed for small and medium-sized businesses. It integrates core business
    operations like inventory, HR, CRM, finance, and analytics into a single, customizable web-based system.`,
      technologies: ["Next.Js(React)", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma"],
    }
  ];

  return (
    <section id="projects" ref={ref} className="py-16 md:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Personal Projects
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl w-full justify-items-center"
        >
          {projects.map((project, index) => (
            <div
              key={project.name}
              className="w-[90%] md:w-[95%] lg:w-[100%] bg-card rounded-lg overflow-hidden border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-48 bg-gradient-to-r from-primary/20 to-primary/40 flex items-center justify-center">
                <div
                  className="absolute inset-0 bg-grid-pattern opacity-30"
                  style={{ background: `url(${project.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
                ></div>
                <div className="text-2xl font-bold text-white z-10">{project.name}</div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{project.subtitle}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{project.description}</p>
                </div>

                <div className="mt-auto">
                  <h4 className="font-medium mb-2 text-sm">Main Technologies:</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    {!!project.website && <Link href={project.website} target="_blank">
                      <Button variant="outline" size="sm" className="gap-1">
                        <ExternalLink className="h-4 w-4" />
                        Website
                      </Button>
                    </Link>}
                    {!!project.app && <Link href={project.app} target="_blank">
                      <Button variant="outline" size="sm" className="gap-1">
                        <ExternalLink className="h-4 w-4" />
                        App
                      </Button>
                    </Link>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ArticlesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const recentArticles = getRecentArticles(3)

  return (
    <section id="articles" ref={ref} className="py-16 md:py-24 bg-muted/20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Latest Articles
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            I share my thoughts and experiences on software development, technology trends, and best practices.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {recentArticles.map((article, index) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
            >
              <Link href={`/articles/${article.slug}`} className="group block h-full">
                <div className="bg-card rounded-lg overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
                  <div className="relative h-48">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/40 group-hover:opacity-80 transition-opacity duration-300"></div>
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${article.coverImage})` }}
                    ></div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center text-xs text-muted-foreground mb-3">
                      <span className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        {new Date(article.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span className="mx-2">•</span>
                      <span className="flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        {article.readingTime}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-muted-foreground mb-4 line-clamp-3 flex-grow">{article.excerpt}</p>

                    <div className="flex justify-between items-center mt-auto">
                      <div className="flex flex-wrap gap-1">
                        {article.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="inline-block px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary"
                          >
                            {tag}
                          </span>
                        ))}
                        {article.tags.length > 2 && (
                          <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
                            +{article.tags.length - 2}
                          </span>
                        )}
                      </div>

                      <span className="text-primary text-sm font-medium flex items-center group-hover:underline">
                        Read more <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Button
            asChild
            size="lg"
            className="rounded-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300"
          >
            <Link href="/articles">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

