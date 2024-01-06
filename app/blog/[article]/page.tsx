import fs from "fs";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import path from "path";
import rehypePrettyCode from "rehype-pretty-code";

type Frontmatter = {
  title: string;
  date: Date;
  description: string;
};

const Header = ({ title, date, description }: Frontmatter) => (
  <div>
    <div className="mx-auto max-w-2xl items-center">
      <h1 className="mb-8 flex justify-center text-center text-4xl sm:text-6xl">
        {title}
      </h1>
      <div className="text-xs text-gray-600 dark:text-gray-500">
        {date.toLocaleDateString()}
      </div>
      <div className="py-3 text-gray-600 dark:text-gray-500">{description}</div>
    </div>
    <hr className="mb-10 mt-3 text-gray-600 dark:border-gray-500" />
  </div>
);

const codeStyle = {
  theme: {
    dark: "github-dark",
    light: "github-light",
  },
  keepBackground: false,
};

export default function BlogLayout({
  params,
}: {
  params: { article: string };
}) {
  const content = fs.readFileSync(
    path.join("app", "blog", "[article]", "articles", params.article + ".mdx"),
  );
  const { content: markdown, data: frontmatter } = matter(content);
  return (
    <div>
      <Header
        title={frontmatter.title}
        date={frontmatter.date}
        description={frontmatter.description}
      />
      <article className="prose mx-auto text-justify dark:prose-invert prose-pre:bg-transparent">
        <MDXRemote
          source={markdown}
          options={{
            // @ts-ignore
            mdxOptions: { rehypePlugins: [[rehypePrettyCode, codeStyle]] },
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

export function generateMetadata({ params }: { params: { article: string } }) {
  const content = fs.readFileSync(
    path.join("app", "blog", "[article]", "articles", params.article + ".mdx"),
  );
  const { data: frontmatter } = matter(content);
  return {
    title: `${frontmatter.title} | Blog | Tim Hilt`,
    description: frontmatter.description,
    author: "Tim Hilt",
  };
}
