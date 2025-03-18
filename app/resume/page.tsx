"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronDown, ChevronUp, Download } from "lucide-react"
import { useState } from "react"

export default function ResumePage() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    golabs: true,
    bairesdev: false,
    dixivox: false,
    noukod: false,
    ztelecom: false,
    lennht: true,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="min-h-screen bg-[#1e2029] text-white">
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute inset-0 bg-[#1e2029] opacity-90"></div>
        {/* We'll use a background color instead of an image to avoid hydration issues */}
      </div>

      <div className="relative z-10 grid md:grid-cols-[350px_1fr]">
        {/* Left Sidebar */}
        <div className="bg-[#1e2029]/90 min-h-screen p-6 flex flex-col">
          <div className="flex justify-center mb-6">
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-[#2a2c3a]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#2a2c3a] to-[#1e2029] flex items-center justify-center text-5xl font-bold text-white">
                DP
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-white font-bold text-lg border-b border-[#2a2c3a] pb-2 mb-4">CONTACT</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span>+1 (407) 468-3155</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <span>djimmypoliard@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>Orlando FL, USA</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span>Djimmy Poliard</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  <span>Poliarddjimmy</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  <span>poliard88</span>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-white font-bold text-lg border-b border-[#2a2c3a] pb-2 mb-4">LANGUAGES</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                  <span>Haitian C.</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                  <span>French</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                  <span>English</span>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-white font-bold text-lg border-b border-[#2a2c3a] pb-2 mb-4">EDUCATION</h2>
              <div className="space-y-5 text-sm">
                <div>
                  <h3 className="font-medium">AS Degree</h3>
                  <p className="text-gray-300">Computer Programming and Analysis</p>
                  <p className="text-gray-400">Valencia College</p>
                  <p className="text-gray-400">January 2024 - Present</p>
                </div>
                <div>
                  <h3 className="font-medium">Bachelor's Degree</h3>
                  <p className="text-gray-300">Electronic Engineering</p>
                  <p className="text-gray-400">Université Lumière (Ulum)</p>
                  <p className="text-gray-400">2010 - 2014</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-white font-bold text-lg border-b border-[#2a2c3a] pb-2 mb-4">COURSES & TRAINING</h2>
              <div className="space-y-5 text-sm">
                <div>
                  <h3 className="font-medium">freeCodeCamp</h3>
                  <p className="text-gray-300">JavaScript Algorithms and Data Structures, 2022</p>
                </div>
                <div>
                  <h3 className="font-medium">Udemy</h3>
                  <p className="text-gray-300">AWS, 2021</p>
                  <p className="text-gray-300">Azure DevOps, 2021</p>
                  <p className="text-gray-300">Docker, 2021</p>
                  <p className="text-gray-300">GCP Fundamentals, 2021</p>
                </div>
              </div>
            </section>
          </div>

          <div className="mt-auto pt-8">
            <Link href="/">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white text-black min-h-screen p-6 md:p-10">
          <div className="max-w-3xl mx-auto">
            <header className="flex justify-between items-center mb-8">
              <div className="flex gap-6">
                <Link href="/" className="text-gray-600 hover:text-[#1e2029] transition-colors">
                  Profile
                </Link>
                <Link href="/articles" className="text-gray-600 hover:text-[#1e2029] transition-colors">
                  Articles
                </Link>
              </div>
              <Button asChild className="bg-[#1e2029] hover:bg-[#2a2c3a] text-white">
                <a href="/files/djimmy-poliard-resume.pdf" download>
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                </a>
              </Button>
            </header>

            <div className="mb-10">
              <h1 className="text-3xl font-bold mb-1">Djimmy Poliard</h1>
              <p className="text-gray-600 mb-6">Full-Stack Software Developer</p>

              <section className="mb-10">
                <h2 className="text-xl font-bold mb-4 uppercase">Profile</h2>
                <p className="text-gray-600 mb-4">
                  Full-stack Developer with {new Date().getFullYear() - 2017}+ years of experience building scalable web applications and internal tools
                  that drastically improve efficiency.
                </p>
                <p className="text-gray-600">
                  Throughout my career, I've built applications like fintech platform, communication, e-commerce, Point
                  Of Sale(POS), HR management, School management, Social network and so on using PHP, Laravel, Ruby on
                  Rails, Sinatra, Bootstrap, Javascript, React JS, React Native, Next.Js, TypeScript GraphQL and other
                  technologies.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-xl font-bold mb-6 uppercase">Work Experience</h2>

                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-md overflow-hidden">
                    <div
                      className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                      onClick={() => toggleSection("golabs")}
                    >
                      <div>
                        <h3 className="font-semibold">Full-stack Software Developer</h3>
                        <p className="text-gray-500 text-sm">Golabs | August 2022 - January 2024</p>
                      </div>
                      {expandedSections.golabs ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>

                    {expandedSections.golabs && (
                      <div className="p-4 border-t border-gray-200">
                        <p className="text-gray-600 mb-3">
                          A technology company headquartered in Costa Rica, with US headquarters based in Stamford, CT
                        </p>
                        <div className="ml-4">
                          <h4 className="font-medium">Client: Finalsite (August 2022 – January 2024)</h4>
                          <p className="text-sm text-gray-600 mb-2">
                            Team up with other engineers on an Education CMS platform using several technologies
                          </p>
                          <ul className="list-disc list-inside text-sm text-gray-600 ml-2 mb-2">
                            <li>Problem solving</li>
                            <li>Code review</li>
                            <li>Develop new features</li>
                          </ul>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Technologies:</span> Ruby on Rails, Backbone JS
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border border-gray-200 rounded-md overflow-hidden">
                    <div
                      className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                      onClick={() => toggleSection("bairesdev")}
                    >
                      <div>
                        <h3 className="font-semibold">Full-stack Software Developer</h3>
                        <p className="text-gray-500 text-sm">BairesDev | August 2021 - April 2023</p>
                      </div>
                      {expandedSections.bairesdev ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>

                    {expandedSections.bairesdev && (
                      <div className="p-4 border-t border-gray-200">
                        <p className="text-gray-600 mb-3">
                          Nearshore Technology Solutions company architecting scalable software solutions.
                        </p>
                        <div className="ml-4 mb-4">
                          <h4 className="font-medium">Client: Place Inc (August 2022 – April 2023)</h4>
                          <p className="text-sm text-gray-600 mb-2">
                            All-in-one real estate platform providing technology and services to real estate agents.
                          </p>
                          <ul className="list-disc list-inside text-sm text-gray-600 ml-2 mb-2">
                            <li>Work on the reports module (backend and frontend)</li>
                          </ul>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Technologies:</span> Ruby on Rails, Sidekiq, RSpec,
                            PostgreSQL, Redis, Git, Github, Docker, React JS
                          </p>
                        </div>

                        <div className="ml-4">
                          <h4 className="font-medium">Client: Amount (September 2021 – August 2022)</h4>
                          <p className="text-sm text-gray-600 mb-2">Banking and point-of-sale solutions platform.</p>
                          <ul className="list-disc list-inside text-sm text-gray-600 ml-2 mb-2">
                            <li>Developed the refund module (ACH, Paper Check, and Debit Card)</li>
                            <li>Investigate the payment processing</li>
                            <li>Work on the payment gateway</li>
                          </ul>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Technologies:</span> Ruby on Rails, GraphQL, Sidekiq, RSpec,
                            PostgreSQL, Redis, Git, Github, Docker
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border border-gray-200 rounded-md overflow-hidden">
                    <div
                      className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                      onClick={() => toggleSection("dixivox")}
                    >
                      <div>
                        <h3 className="font-semibold">Software Development Consultant</h3>
                        <p className="text-gray-500 text-sm">Dixivox | Contract (Since 2018)</p>
                      </div>
                      {expandedSections.dixivox ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>

                    {expandedSections.dixivox && (
                      <div className="p-4 border-t border-gray-200">
                        <p className="text-gray-600 mb-3">
                          A company that builds solutions based on communication and education.
                        </p>
                        <div className="ml-4 mb-4">
                          <h4 className="font-medium">Project: Edikatek (Dec 2019 – Dec 2020)</h4>
                          <p className="text-sm text-gray-600 mb-2">School management platform for remote learning.</p>
                          <ul className="list-disc list-inside text-sm text-gray-600 ml-2 mb-2">
                            <li>Design and develop the backend</li>
                            <li>Work on the frontend side with other engineers</li>
                          </ul>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Technologies:</span> Ruby on Rails, Next.js, GraphQL,
                            PostgreSQL, Sidekiq, Git, Github
                          </p>
                        </div>

                        <div className="ml-4">
                          <h4 className="font-medium">Project: Konekte'm (Dec 2021 – Current)</h4>
                          <p className="text-sm text-gray-600 mb-2">
                            Enterprise communication platform for voice, text and social media.
                          </p>
                          <ul className="list-disc list-inside text-sm text-gray-600 ml-2 mb-2">
                            <li>Design and develop the call center and the CRM</li>
                            <li>Design and develop the frontend side with other engineers</li>
                          </ul>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Technologies:</span> Ruby on Rails, Next.js, GraphQL,
                            PostgreSQL, Sidekiq, Git, Github, RabbitMQ(bunny)
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border border-gray-200 rounded-md overflow-hidden">
                    <div
                      className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                      onClick={() => toggleSection("noukod")}
                    >
                      <div>
                        <h3 className="font-semibold">Full-stack Software Developer</h3>
                        <p className="text-gray-500 text-sm">NouKòd | April 2019 - March 2021</p>
                      </div>
                      {expandedSections.noukod ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>

                    {expandedSections.noukod && (
                      <div className="p-4 border-t border-gray-200">
                        <p className="text-gray-600 mb-3">
                          IT business providing jobs for newly trained IT specialists via local contracts and global
                          outsourcing.
                        </p>
                        <div className="ml-4 mb-4">
                          <h4 className="font-medium">Project: to the point (October 2020 – March 2021)</h4>
                          <p className="text-sm text-gray-600 mb-2">
                            Social media app for students to share educational content.
                          </p>
                          <ul className="list-disc list-inside text-sm text-gray-600 ml-2 mb-2">
                            <li>Developed several screens for the mobile and web app</li>
                            <li>Work on some endpoints in the backend</li>
                            <li>Make the web app responsive</li>
                          </ul>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Technologies:</span> React native, React native web, MySql,
                            Node.js Rest API, Git, Github, Styled component
                          </p>
                        </div>

                        <div className="ml-4">
                          <h4 className="font-medium">
                            Project: Noukod Training Platform (December 2019 – August 2020)
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">Training platform for bootcamps and hiring.</p>
                          <ul className="list-disc list-inside text-sm text-gray-600 ml-2 mb-2">
                            <li>Design, Developed, and maintain the back end</li>
                            <li>Work on the frontend side with other engineers</li>
                          </ul>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Technologies:</span> Ruby on Rails, React.js, PostgreSQL, Git,
                            Github
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border border-gray-200 rounded-md overflow-hidden">
                    <div
                      className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                      onClick={() => toggleSection("ztelecom")}
                    >
                      <div>
                        <h3 className="font-semibold">Front-End Developer</h3>
                        <p className="text-gray-500 text-sm">Ztelecom | August 2018 - August 2019</p>
                      </div>
                      {expandedSections.ztelecom ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>

                    {expandedSections.ztelecom && (
                      <div className="p-4 border-t border-gray-200">
                        <p className="text-gray-600 mb-3">
                          A company that builds solutions based on communication and education.
                        </p>
                        <div className="ml-4">
                          <h4 className="font-medium">Project: Sinat (August 2018 – August 2019)</h4>
                          <p className="text-sm text-gray-600 mb-2">
                            Communication solution for international calling.
                          </p>
                          <ul className="list-disc list-inside text-sm text-gray-600 ml-2 mb-2">
                            <li>Participate in the front-end development</li>
                            <li>Develop a complex form with dynamic input</li>
                            <li>Integrated Stripe payment processing</li>
                          </ul>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Technologies:</span> React.js, PostgreSQL, Stripe, Git, Github
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-xl font-bold mb-6 uppercase">Personal Project</h2>

                <div className="border border-gray-200 rounded-md overflow-hidden">
                  <div
                    className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                    onClick={() => toggleSection("lennht")}
                  >
                    <div>
                      <h3 className="font-semibold">LennHT</h3>
                      <p className="text-gray-500 text-sm">Online Training Platform</p>
                    </div>
                    {expandedSections.lennht ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>

                  {expandedSections.lennht && (
                    <div className="p-4 border-t border-gray-200">
                      <p className="text-gray-600 mb-4">
                        The LennHt is a leading online learning platform that helps anyone learn business, software,
                        technology and creative skills to achieve personal and professional goals. Through individual,
                        corporate and academic subscriptions, members have access to the LennHt video library of
                        engaging, top-quality courses taught by recognized industry experts.
                      </p>
                      <p className="text-sm text-gray-600 mb-3">
                        <span className="font-medium">Main Technologies:</span> Laravel(PHP), Next.Js(React),
                        TypeScript, PostgreSQL, Git, Github
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Links:</span>{" "}
                        <a
                          href="https://lennht.com"
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#1e2029] hover:underline"
                        >
                          https://lennht.com
                        </a>{" "}
                        -{" "}
                        <a
                          href="https://lennht.dev"
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#1e2029] hover:underline"
                        >
                          https://lennht.dev
                        </a>
                      </p>
                    </div>
                  )}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4 uppercase">Skills</h2>
                <div className="flex flex-wrap gap-2 mb-6">
                  {[
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
                    "Docker",
                    "RSpec",
                    "Sidekiq",
                    "Stripe",
                  ].map((skill, index) => (
                    <span
                      key={index}
                      className="inline-block px-2 py-1 text-xs rounded bg-gray-100 text-gray-800 border border-gray-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-2">Familiar With</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {["Node.js", "Redis", "Websocket", "RabbitMQ", "GCP", "AWS", "Azure DevOps"].map(
                        (skill, index) => (
                          <span
                            key={index}
                            className="inline-block px-2 py-1 text-xs rounded bg-gray-100 text-gray-800 border border-gray-200"
                          >
                            {skill}
                          </span>
                        ),
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Soft Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Good communication",
                        "Time management",
                        "Problem-solving",
                        "Adaptability",
                        "Ability to accept feedback",
                      ].map((skill, index) => (
                        <span
                          key={index}
                          className="inline-block px-2 py-1 text-xs rounded bg-gray-100 text-gray-800 border border-gray-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

