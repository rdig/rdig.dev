import fs from 'fs';
import { allPosts } from "contentlayer/generated";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";

import Article from "@components/article";
import { PostStatus } from "@types";

const playfair = Playfair_Display({ subsets: ["latin"] });

const generateExcerpt = (text: string) => {
  if (!text) {
    return "";
  }
  const textLength = text.length;
  const excerpt = `${text.slice(0, 100)}${textLength > 100 ? " ..." : ""}`;
  return excerpt;
};

const getFileBirthdate = (filePath: string) => {
  const { birthtime = 0 } = fs.statSync(`content/${filePath}`);
  return new Date(birthtime);
};

export default function Home() {
  const sortedPosts = [...allPosts]
    // filter by status (don't show drafts)
    .filter(post => post.status !== PostStatus.Draft)
    // sort by createdAt, updatedAt, or date
    .sort((postA, postB) => {
      const postADate = new Date(postA.updatedAt || postA.createdAt || postA.date || 0);
      const postBDate = new Date(postB.updatedAt || postB.createdAt || postB.date || 0);
      return postBDate.getTime() - postADate.getTime();
    })
    // combine dates into a single display date value
    .map(post => {
      const postDate = post.updatedAt || post.createdAt || post.date || 0;
      const displayDate = new Date(postDate);
      return {
        ...post,
        displayDate: postDate ? displayDate : undefined,
      };
    });

  const latestPost = sortedPosts.shift();

  return (
    <div>
      {latestPost  && <Article post={latestPost} />}

      {(sortedPosts.length > 0) && (
        <h2 className={`text-yellow-600 dark:text-yellow-700 ${playfair.className}`}>
          Read More
        </h2>
      )}

      {sortedPosts.map(post => (
        <article key={post._id}>
          <Link href={post.slug} className="no-underline hover:underline">
            <h3 className="inline">{post.title}</h3>
          </Link>
          <p>{post.description || generateExcerpt(post.body.raw)}</p>
          <p>{post.displayDate?.toDateString() || getFileBirthdate(post._raw.sourceFilePath).toDateString()}</p>
        </article>
      ))}
    </div>
  );
}
