import { fetchBlogPosts } from "@/lib/wp-client";
import { InfiniteScrollPosts } from "@/components/infinite-scroll-posts";

export const metadata = {
  title: "Blog",
  description: "Description",
};

export default async function BlogPage() {
  // Fetch first page with no caching
  const initialPosts = await fetchBlogPosts(1);
  return <InfiniteScrollPosts initialPosts={initialPosts} />;
}
