import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 style={{ fontSize: "4em" }}>{children}</h1>,
    h2: ({ children }) => <h2 style={{ fontSize: "3em" }}>{children}</h2>,
    h3: ({ children }) => <h3 style={{ fontSize: "2em" }}>{children}</h3>,
    ...components,
  };
}
