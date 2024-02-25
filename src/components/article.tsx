import { Post } from "contentlayer/generated";

import { Mdx } from "@components/mdx-components";

type ExtendedPost = Post & {
  displayDate?: Date;
};

const Article = ({ post }: { post: ExtendedPost }) => (
  <article className="text-base prose dark:prose-invert prose-a:text-sky-600 dark:prose-a:text-sky-500 prose-a:font-bold prose-code:text-[0.84rem]">
    <section className="mb-20">
      <h1 className="mb-2">{post.title}</h1>
      {post.description && (
        <p className="text-xl mt-0 text-e-700 dark:text-slate-200">
          {post.description}
        </p>
      )}
    </section>
    <Mdx code={post.body.code} />
  </article>
);

export default Article;
