import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";

import { Metadata } from "next";
import Article from "@components/article";
import { PostStatus } from "@types";

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
  const post = allPosts.find((post) => post.slugAsParams === slug);

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

  return {
    title: post.title,
    description: post.description,
  };
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
}

export default async function PostPage({ params, searchParams: query }: PostProps) {
  const post = await getPostFromParams(params, query);

  if (!post) {
    notFound();
  }

  return (
    <Article post={post} />
  );
}
