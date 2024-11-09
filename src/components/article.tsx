import Link from "next/link";

import type { Article } from "contentlayer/generated";
import { Mdx } from "@components/mdx-components";
import { getFileBirthdate } from "@/page";
// import { PostStatus } from "@types";

import { formatDate } from "@/page";

type ExtendedArticle = Article & {
  displayDate?: Date;
};

type ArticleProps = {
  article: ExtendedArticle;
  showMetadata?: boolean;
};

const Article = ({ article, showMetadata = true }: ArticleProps) => {
  const postDate = article.displayDate || article.updatedAt || article.createdAt || article.date || 0;
  const displayDate = postDate ? new Date(postDate) : getFileBirthdate(article._raw.sourceFilePath);

  return (
    <article>
      <section className={`mb-20`}>
        <h1 className={`text-3xl font-medium`}>
          {article.title}
          {/* // Draft Status Label, only if in draft */}
          {/* {post.status === PostStatus.Draft && (
              <span className={`align-middle ml-4 p-1 px-3 rounded-full text-sm text-zinc-200 dark:text-zinc-950 bg-gray-400 dark:bg-gray-600 ${notoSans.className}`}>
                DRAFT
              </span>
            )} */}
        </h1>
        {/* // Metadata, if available */}
        {showMetadata && (
          <div className="mt-3 text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Published &nbsp;
            <time dateTime={formatDate(displayDate)}>{formatDate(displayDate)}</time>
            <address className="hidden"><Link rel="author" href="/about-raul-glogovetan">Raul Glogovetan</Link></address>
            {article.category && <span className="text-zinc-400 dark:text-zinc-500"> in {article.category.charAt(0).toUpperCase() + article.category.slice(1)}</span>}
          </div>
        )}
      </section>
      {/* // Article content */}
      <Mdx code={article.body.code} />
    </article>
  );
};

export default Article;
