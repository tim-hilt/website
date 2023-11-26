import fs from "fs";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import path from "path";

type Frontmatter = {
  title: string;
  date: Date;
  description: string;
};

const Header = ({ title, date, description }: Frontmatter) => (
  <div className="">
    <h1 className="flex justify-center">{title}</h1>
    <div className="text-xs dark:text-slate-500">
      {date.toLocaleDateString()}
    </div>
    <div className="my-3 dark:text-slate-500">{description}</div>
  </div>
);

/**
 * TODO: Check if next-mdx-rendering can be removed (in favor of next-mdx-remote)
 * TODO: Check key-error in browser console
 * TODO: WHY THE SERVERSIDE-ERROR??? -> Mit prod-deployment (pnpm build && pnpm start) nachstellen
 * TODO: Refactor to page.mdx
 * TODO: Add syntax-highlighting to code-blocks
 * TODO: Add getStaticProps
 * TODO: Add getMetaData
 * TODO: Add TOC in sidebar
 * TODO: Check if everything looks good on mobile too
 * TODO: Check if everything looks good in light-mode too
 */
export default function Article({ params }: { params: { article: string } }) {
  const filename = path.join(
    "app",
    "blog",
    "articles",
    params.article + ".mdx"
  );
  const markdown = fs.readFileSync(filename);
  const { content, data } = matter(markdown);
  return (
    <article className="prose mx-auto dark:prose-invert">
      <Header
        title={data.title}
        date={data.date}
        description={data.description}
      />
      <hr />
      <MDXRemote source={content} />
    </article>
  );
}
