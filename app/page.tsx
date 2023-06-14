const Home = () => {
  return (
    <div className="mt-16 flex flex-col items-center">
      <h1 className="text-6xl font-bold">Hi there!</h1>
      <h3 className="text-4xl font-light">Welcome to my website.</h3>
      <p className="mt-16 max-w-2xl">
        This is my personal website. It&apos;s written in Next.js 13 and
        TailwindCSS. I hope to serve my CV, as well as some interesting projects
        and the occasional blogpost (WIP) here. Writing and maintaining this
        website keeps me up to date with web-programming and provides some kind
        of permanent history / bucket for stuff that I&apos;d like to try out
        and learn.
      </p>
    </div>
  );
};

export default Home;
