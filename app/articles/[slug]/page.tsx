"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { getArticleBySlug, getRelatedArticles } from "@/lib/articles"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

export default function ArticlePage() {
  const params = useParams()
  const router = useRouter()
  const slug = params?.slug as string

  const article = getArticleBySlug(slug)
  const relatedArticles = getRelatedArticles(slug)

  useEffect(() => {
    if (!article) {
      router.push("/articles")
    }
  }, [article, router])

  if (!article) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link
            href="/articles"
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Articles</span>
          </Link>
        </div>
      </header>

      <main className="container py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
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

            <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>

            <div className="flex items-center text-sm text-muted-foreground mb-6">
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

            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/40"></div>
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${article.coverImage})` }}
              ></div>
            </div>
          </div>

          <article className="prose prose-lg dark:prose-invert max-w-none prose-pre:p-0 prose-pre:m-0 prose-pre:bg-transparent prose-pre:overflow-hidden">
            <Markdown
              remarkPlugins={[remarkGfm]}
              components={{
                code(props) {
                  const { children, className, node, ...rest } = props
                  const match = /language-(\w+)/.exec(className || "")
                  
                  return match ? (
                    <div className="my-6 overflow-hidden rounded-lg border border-border/50">
                      <SyntaxHighlighter 
                        {...rest} 
                        style={vscDarkPlus} 
                        language={match[1]} 
                        PreTag="div"
                        customStyle={{
                          margin: 0,
                          padding: '1.5rem',
                          borderRadius: 0,
                          fontSize: '0.9rem',
                          lineHeight: 1.5
                        }}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    </div>
                  ) : (
                    <code {...rest} className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
                      {children}
                    </code>
                  )
                },
                // Improve other elements as well
                p(props) {
                  return <p className="mb-4 leading-relaxed" {...props} />
                },
                h1(props) {
                  return <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />
                },
                h2(props) {
                  return <h2 className="text-2xl font-bold mt-8 mb-4" {...props} />
                },
                h3(props) {
                  return <h3 className="text-xl font-bold mt-6 mb-3" {...props} />
                },
                ul(props) {
                  return <ul className="list-disc pl-6 mb-4" {...props} />
                },
                ol(props) {
                  return <ol className="list-decimal pl-6 mb-4" {...props} />
                },
                li(props) {
                  return <li className="mb-1" {...props} />
                },
                blockquote(props) {
                  return <blockquote className="border-l-4 border-primary/30 pl-4 italic my-4" {...props} />
                },
              }}
            >
              {article.content}
            </Markdown>
          </article>

          {relatedArticles.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {relatedArticles.map((relatedArticle) => (
                  <Link key={relatedArticle.slug} href={`/articles/${relatedArticle.slug}`}>
                    <div className="bg-card rounded-lg overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 h-full">
                      <div className="p-6">
                        <h3 className="text-lg font-semibold mb-2 line-clamp-2 hover:text-primary transition-colors">
                          {relatedArticle.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{relatedArticle.excerpt}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="mr-1 h-3 w-3" />
                          {new Date(relatedArticle.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 pt-6 border-t">
            <Button asChild variant="outline">
              <Link href="/articles">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to all articles
              </Link>
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
