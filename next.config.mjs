import nextMDX from "@next/mdx";
import rehypeHighlight from "rehype-highlight";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "mdx"],
};

const withMDX = nextMDX({
  options: {
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    rehypePlugins: [rehypeHighlight],
  },
});

export default withMDX(nextConfig);
