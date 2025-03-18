"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { getAllArticles } from "@/lib/articles"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, Search, Tag } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function ArticlesPage() {
  const allArticles = getAllArticles()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Extract all unique tags
  const allTags = Array.from(new Set(allArticles.flatMap((article) => article.tags))).sort()

  // Filter articles based on search query and selected tag
  const filteredArticles = allArticles.filter((article) => {
    const matchesSearch =
      searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesTag = selectedTag === null || article.tags.includes(selectedTag)

    return matchesSearch && matchesTag
  })

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      <main className="container py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Articles & Insights
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Sharing my thoughts, experiences, and knowledge about software development, technology trends, and best
              practices.
            </p>
          </div>

          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search articles by title, content, or tag..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedTag === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(null)}
                className="rounded-full"
              >
                All Topics
              </Button>
              {allTags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(tag)}
                  className="rounded-full"
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>

          <div ref={ref} className="space-y-8">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article, index) => (
                <motion.div
                  key={article.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={`/articles/${article.slug}`}>
                    <div className="bg-card rounded-lg overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="md:flex">
                        <div className="md:w-1/3 h-48 md:h-auto relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/40 group-hover:opacity-80 transition-opacity duration-300"></div>
                          <div
                            className="w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${article.coverImage})` }}
                          ></div>
                        </div>
                        <div className="p-6 md:w-2/3">
                          <div className="flex flex-wrap gap-2 mb-3">
                            {article.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                              >
                                <Tag className="mr-1 h-3 w-3" />
                                {tag}
                              </span>
                            ))}
                          </div>
                          <h2 className="text-xl md:text-2xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                            {article.title}
                          </h2>
                          <p className="text-muted-foreground mb-4 line-clamp-2">{article.excerpt}</p>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <Calendar className="mr-1 h-4 w-4" />
                              {new Date(article.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                            <span className="mx-2">•</span>
                            <span className="flex items-center">
                              <Clock className="mr-1 h-4 w-4" />
                              {article.readingTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No articles found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  )
}

