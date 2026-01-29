import { BlogDetailClient } from "./blog-detail-client"

interface BlogDetailParams {
  params: Promise<{
    slug: string
  }>
}

export default async function BlogDetail({ params }: BlogDetailParams) {
  const { slug } = await params
  
  return <BlogDetailClient slug={slug} />
}
