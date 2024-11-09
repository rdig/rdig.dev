import fs from 'fs';
import { allArticles } from "contentlayer/generated";
import Link from "next/link";

import { PostStatus } from "@types";

export const getFileBirthdate = (filePath: string) => {
  const { birthtime = 0 } = fs.statSync(`content/${filePath}`);
  return new Date(birthtime);
};

export const formatDate = (date: Date) => {
  const dateParts = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).formatToParts(new Date(date));
  const day = dateParts.find((part) => part.type === 'day')?.value;
  const month = dateParts.find((part) => part.type === 'month')?.value;
  const year = dateParts.find((part) => part.type === 'year')?.value || '0';
  const now = new Date();
  const currentYear = now.getFullYear().toString();
  return `${day} ${month} ${year < currentYear ? year : ''}`;
};

export default function Home() {
  const sortedArticles = [...allArticles]
    // filter by status (don't show drafts)
    .filter(article => article.status !== PostStatus.Draft)
    // combine dates into a single display date value
    .map(article => {
      const articleDate = article.updatedAt || article.createdAt || article.date || getFileBirthdate(article?._raw?.sourceFilePath) || 0;
      const displayDate = new Date(articleDate);
      return {
        ...article,
        displayDate,
      };
    })
    // sort by date
    .sort((articleA, articleB) => {
      const articleADate = new Date(articleA.displayDate);
      const articleBDate = new Date(articleB.displayDate);
      return articleBDate.getTime() - articleADate.getTime();
    });


  return (
    <ul className="mb-20">
      {sortedArticles.map((article) => {
        return (
          <li key={article._id} className="mb-12">
            <article>
              <h2 className="text-xl">
                <Link
                  href={article.slug}
                  className="!font-light !text-zinc-900 dark:!text-[WhiteSmoke] decoration-[DarkGray] dark:decoration-[Gray] active:opacity-80"
                >
                  {article.title}
                </Link>
              </h2>
              <p className="mt-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                {formatDate(article.displayDate)}
                {article?.category && <span className="text-zinc-400 dark:text-zinc-500"> in {article.category}</span>}
              </p>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
