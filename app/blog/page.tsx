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
  filename: string;
  title: string;
  date: Date;
  description: string;
};

const PostCard = ({ filename, title, date, description }: PostMeta) => {
  return (
    <li key={filename}>
      <Link href={`/blog/${filename}`}>
        <div className="rounded-md border dark:border-slate-500 hover:border-slate-400 transition duration-100 p-4 leading-none">
          <div className="mb-2 flex">
            <div className="mr-3 grow">{title}</div>
            <div className="text-xs dark:text-slate-500 text-slate-700">
              {date.toLocaleDateString()}
            </div>
          </div>
          <div className="truncate text-sm dark:text-slate-500 text-slate-700">
            {description}
          </div>
        </div>
      </Link>
    </li>
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
    <ul className="flex flex-col space-y-3 md:space-y-8">
      {blogposts.map(({ filename, title, date, description }) => {
        return (
          <PostCard
            filename={filename}
            title={title}
            date={date}
            description={description}
          />
        );
      })}
    </ul>
  );
}
