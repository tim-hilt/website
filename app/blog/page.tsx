import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
import path from "path";

export const metadata = {
  title: "Blog | Tim Hilt",
  description: "Blog of Tim Hilt",
  author: "Tim Hilt",
};

type PostMeta = {
  title: string;
  date: Date;
  description: string;
};

const PostCard = ({ title, date, description }: PostMeta) => {
  return (
    <div className="group relative">
      <div className="group-hover: absolute -inset-0.5 rounded-lg bg-amber-400 opacity-50 blur-md transition duration-200 group-hover:opacity-75"></div>
      <div className="relative rounded-lg p-4 leading-none dark:bg-black">
        <div className="mb-2 flex items-center">
          <div className="mr-3 grow">{title}</div>
          <div className="text-xs dark:text-slate-500">
            {date.toLocaleDateString()}
          </div>
        </div>
        <div className="truncate text-sm dark:text-slate-500">
          {description}
        </div>
      </div>
    </div>
  );
};

export default async function Blog() {
  const blogposts = fs
    .readdirSync(path.join("app", "blog", "[article]", "articles"))
    .filter((fn) => fn.endsWith(".mdx"))
    .map((fn) => {
      const file = fs.readFileSync(
        path.join("app", "blog", "[article]", "articles", fn)
      );
      const {
        data: { title, date, description },
      } = matter(file);
      return {
        filename: path.parse(fn).name,
        title,
        date: new Date(date),
        description,
      };
    });
  blogposts.sort((a, b) => +b.date - +a.date);

  return (
    <ul className="flex flex-col space-y-8">
      {blogposts.map(({ filename, title, date, description }) => {
        return (
          <li key={filename}>
            <Link href={`/blog/${filename}`}>
              <PostCard title={title} date={date} description={description} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
