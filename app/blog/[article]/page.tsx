import fs from "fs";
import { MDXRemote } from "next-mdx-remote/rsc";
import path from "path";

/**
 * TODO: Check if next-mdx-rendering can be removed (in favor of next-mdx-remote)
 * TODO: Check key-error in browser console
 * TODO: Correct rendering of text-sizes and padding
 * TODO: Render header component from frontmatter
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
  return <MDXRemote source={markdown} />;
}
