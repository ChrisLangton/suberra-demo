import { useSession } from "next-auth/react"
import Head from "next/head"
import { useEffect, useState } from "react"
import CoverImage from "../components/CoverImage"
import Layout from "../components/layout"
import PayWall from "../components/paywall"
import PostBody from "../components/PostBody"
import PostTitle from "../components/PostTitle"

interface Post {
  title: string
  content: {
    sidebarParagraph: string
    firstTitle: string
    firstParagraph: string
    secondTitle: string
    secondParagraph: string
  }
}

export default function ProtectedPage() {
  const { data: session, status } = useSession()
  const loading = status === "loading"
  const [post, setPost] = useState({} as Post)
  const [isLoading, setIsLoading] = useState(true)
  const [invalidSubscription, setInvalidSubscription] = useState(false)

  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/examples/protected")
      const json = await res.json()
      if (json.post) {
        setInvalidSubscription(false)
        setPost(json.post)
      }
      if (json.error) {
        setInvalidSubscription(true)
      }

      setIsLoading(false)
    }
    fetchData()
  }, [session])

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null

  // If session exists, display content
  return (
    <Layout>
      {isLoading ? (
        <PostTitle>Loading…</PostTitle>
      ) : (
        <>
          <article className="flex flex-col items-center">
            <Head>
              <title>{post?.title}</title>
            </Head>
            <PostTitle>{post?.title}</PostTitle>
            <CoverImage src="/suberra_coverimage.jpeg" />
            <div className="md:max-w-screen-md mx-auto">
              <div
                className={`${invalidSubscription ? "gradient-mask-b-0" : ""}`}
              >
                <div className="text-3xl font-semibold">
                  {post?.content?.firstTitle}
                </div>
                <PostBody content={post?.content?.firstParagraph} />
                <img src="/bitcoinmarket.jpg" alt="null" width={700} />
              </div>
              <PayWall invalidSubscription={invalidSubscription} />
              {post?.content?.secondTitle && (
                <h1 className="text-3xl font-semibold overline decoration-slate-200">
                  {post?.content?.secondTitle}
                </h1>
              )}
              {post?.content?.secondParagraph && (
                <PostBody content={post?.content?.secondParagraph} />
              )}
            </div>
          </article>
        </>
      )}
    </Layout>
  )
}
