import { notFound } from "next/navigation";
import { Metadata } from "next";

import { allPages } from "contentlayer/generated";
import { Mdx } from "@components/mdx-components";
import { generatePageMetadata } from "@/layout";
import PageLayout from "@components/page-layout";

interface PageProps {
  params: {
    slug: string[]
  }
}

async function getPageFromParams(params: PageProps["params"]) {
  const slug = params?.slug?.join("/");
  const page = allPages.find((page) => page.slugAsParams === slug);

  if (!page) {
    null;
  }

  return page;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const page = await getPageFromParams(params);

  if (!page) {
    return {};
  }

  return generatePageMetadata(page.title, page.description);
}

export async function generateStaticParams(): Promise<PageProps["params"][]> {
  return allPages.map((page) => ({
    slug: page.slugAsParams.split("/"),
  }));
}

export default async function PagePage({ params }: PageProps) {
  const page = await getPageFromParams(params);

  if (!page) {
    notFound();
  }

  return (
    <PageLayout>
      <article>
        <section className={`mb-20`}>
          <h1 className={`text-3xl font-medium`}>
            {page.title}
            {/* // Draft Status Label, only if in draft */}
            {/* {post.status === PostStatus.Draft && (
                <span className={`align-middle ml-4 p-1 px-3 rounded-full text-sm text-zinc-200 dark:text-zinc-950 bg-gray-400 dark:bg-gray-600 ${notoSans.className}`}>
                  DRAFT
                </span>
              )} */}
          </h1>
        </section>
        <Mdx code={page.body.code} />
      </article>
    </PageLayout>
  );
}
