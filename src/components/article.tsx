import { Noto_Sans, Playfair_Display } from "next/font/google";
import Link from "next/link";

import { Post } from "contentlayer/generated";
import { Mdx } from "@components/mdx-components";
import { PostStatus } from "@types";
import { getFileBirthdate } from "@/page";

const playfair = Playfair_Display({ subsets: ["latin"] });
const notoSans = Noto_Sans({ subsets: ["latin"] });

type ExtendedPost = Post & {
  displayDate?: Date;
};

type ArticleProps = {
  post: ExtendedPost;
  showMetadata?: boolean;
};

const Article = ({ post, showMetadata = true }: ArticleProps) => {
  const postDate = post.displayDate || post.updatedAt || post.createdAt || post.date || 0;
  const displayDate = postDate ? new Date(postDate) : getFileBirthdate(post._raw.sourceFilePath);

  return (
    <article className="text-base prose-a:text-sky-600 dark:prose-a:text-sky-500 prose-a:font-semibold prose-a:tracking-tight prose-code:text-[0.83rem]">

      <section className="py-20 mb-10 bg-zinc-200 dark:bg-zinc-950">
        <h1
          className={`max-w-3xl mx-auto mb-0 text-yellow-600 dark:text-yellow-700 font-semibold ${playfair.className}`}
        >
          {post.title}
          {post.status === PostStatus.Draft && (
            <span className={`align-middle ml-4 p-1 px-3 rounded-full text-sm text-zinc-200 dark:text-zinc-950 bg-gray-400 dark:bg-gray-600 ${notoSans.className}`}>
              DRAFT
            </span>
          )}
        </h1>
        {post.description && (
          <p className="max-w-3xl mx-auto mb-0 mt-10 text-lg tracking-tight text-e-700 dark:text-slate-200">
            {post.description}
          </p>
        )}
        {showMetadata && (
          <p className="max-w-3xl mx-auto my-0 py-0 mt-8 text-sm text-zinc-600 dark:text-zinc-500">
            Published &nbsp;
            <time dateTime={displayDate.toString()}>{displayDate.toDateString()}</time>
            <address className="hidden"><Link rel="author" href="/about-raul-glogovetan">Raul Glogovețan</Link></address>
          </p>
        )}
      </section>
      <Mdx code={post.body.code} />
    </article>
  );
};

export default Article;
