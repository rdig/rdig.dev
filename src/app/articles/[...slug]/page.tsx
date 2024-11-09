import { notFound } from "next/navigation";
import { allArticles } from "contentlayer/generated";

import { Metadata } from "next";
import Article from "@components/article";
import PageLayout from "@components/page-layout";
import { PostStatus } from "@types";
import { generatePageMetadata } from "@/layout";

interface PostProps {
  params: {
    slug: string[],
  },
  searchParams: {
    viewkey?: string,
  }
}

async function getPostFromParams(
  params: PostProps["params"],
  query?: PostProps["searchParams"],
) {
  const slug = params?.slug?.join("/");
  const post = allArticles.find((article) => article.slugAsParams === slug);

  if (!post) {
    null;
  }

  if (post?.status === PostStatus.Draft && query?.viewkey !== process.env.VIEWKEY) {
    return null;
  }

  return post;
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  return generatePageMetadata(post.title, post.description);
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
  return allArticles.map((article) => ({
    slug: article.slugAsParams.split("/"),
  }));
}

export default async function PostPage({ params, searchParams: query }: PostProps) {
  const article = await getPostFromParams(params, query);

  if (!article) {
    notFound();
  }

  return (
    <PageLayout>
      <Article article={article} />
    </PageLayout>
  );
}
