import { PropsWithChildren } from "react";

type Frontmatter = {
  title: string;
  date: Date;
  description: string;
};

// TODO: 2. Use this to render frontmatter
const Header = ({ title, date, description }: Frontmatter) => (
  <div>
    <title className="flex justify-center text-5xl">{title}</title>
    <div className="text-xs dark:text-slate-500">
      {date.toLocaleDateString()}
    </div>
    <div className="my-3 dark:text-slate-500">{description}</div>
  </div>
);

/**
 * TODO: Check key-error in browser console
 * TODO: WHY THE SERVERSIDE-ERROR??? -> Mit prod-deployment (pnpm build && pnpm start) nachstellen
 * TODO: Add getStaticProps
 * TODO: Add getMetaData
 * TODO: Add TOC in sidebar
 * TODO: Check if everything looks good on mobile too
 * TODO: Check if everything looks good in light-mode too
 * TODO: What should be a dep? What should be a devDep?
 */
export default function BlogLayout({ children }: PropsWithChildren) {
  return (
    <article className="prose mx-auto dark:prose-invert">{children}</article>
  );
}
