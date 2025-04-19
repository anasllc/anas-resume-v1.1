import he from "he";

interface WordPressPost {
  slug: string;
  title: {
    rendered: string;
  };
  date: string;
}

export interface BlogPost {
  slug: string;
  metadata: {
    title: string;
    publishedAt: string;
  };
}

export async function fetchBlogPosts(page: number = 1): Promise<BlogPost[]> {
  try {
    const res = await fetch(
      `https://cryptonews.com/wp-json/wp/v2/posts?author=316&per_page=100&page=${page}`,
      { cache: "no-store" } // Disable caching for large responses
    );

    if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`);

    const posts: WordPressPost[] = await res.json();

    return posts.map((post) => ({
      slug: post.slug,
      metadata: {
        title: he.decode(post.title.rendered),
        publishedAt: new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      },
    }));
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function fetchBlogPostsAI(page: number = 1): Promise<BlogPost[]> {
  try {
    const res = await fetch(
      `https://felloai.com/wp-json/wp/v2/posts?author=5&per_page=100&page=${page}`,
      { cache: "no-store" } // Disable caching for large responses
    );

    if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`);

    const posts: WordPressPost[] = await res.json();

    return posts.map((post) => ({
      slug: post.slug,
      metadata: {
        title: he.decode(post.title.rendered),
        publishedAt: new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      },
    }));
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}
