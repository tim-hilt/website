import fs from "fs";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import path from "path";
import rehypeHighlight from "rehype-highlight";

type Frontmatter = {
  title: string;
  date: Date;
  description: string;
};

const Header = ({ title, date, description }: Frontmatter) => (
  <div>
    <div className="mx-auto max-w-2xl items-center">
      <h1 className="mb-8 mt-5 flex justify-center text-7xl">{title}</h1>
      <div className="text-xs dark:text-slate-500">
        {date.toLocaleDateString()}
      </div>
      <div className="py-3 text-justify dark:text-slate-500">{description}</div>
    </div>
    <hr className="mb-10 mt-3 dark:border-slate-500" />
  </div>
);

/**
 * TODO: Check key-error in browser console
 * TODO: Add getMetaData
 * TODO: Add TOC in sidebar
 * TODO: Check if everything looks good in light-mode too
 */
export default function BlogLayout({
  params,
}: {
  params: { article: string };
}) {
  const content = fs.readFileSync(
    path.join("app", "blog", "[article]", "articles", params.article + ".mdx")
  );
  const { content: markdown, data: frontmatter } = matter(content);
  return (
    <div>
      <Header
        title={frontmatter.title}
        date={frontmatter.date}
        description={frontmatter.description}
      />
      <article className="prose mx-auto text-justify dark:prose-invert">
        <MDXRemote
          source={markdown}
          options={{
            // @ts-ignore
            mdxOptions: { rehypePlugins: [rehypeHighlight] },
          }}
        />
      </article>
    </div>
  );
}

export function generateStaticParams() {
  return fs
    .readdirSync(path.join("app", "blog", "[article]", "articles"))
    .filter((fn) => fn.endsWith(".mdx"))
    .map((fn) => ({ article: path.parse(fn).name }));
}
