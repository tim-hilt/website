export const metadata = {
  title: "Tim Hilt",
  description: "Personal website of Tim Hilt",
  author: "Tim Hilt",
};

export default function Home() {
  return (
    <div className="mt-16 flex flex-col items-center text-center">
      <h1 className="text-6xl font-bold">Hi there!</h1>
      <h2 className="text-4xl font-light">Welcome to my website.</h2>
    </div>
  );
}
