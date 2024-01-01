"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function Page() {
  // HACK: This has to be done in order to satisfy
  //       Next.js' SSR
  const [uuid, setUuid] = useState("");
  useEffect(() => {
    setUuid(window.crypto.randomUUID());
  }, []);
  const router = useRouter();

  const createChart = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const chartName = encodeURIComponent(String(formData.get("chart-name")));
    if (!chartName) {
      router.push(`/tools/collaborative-chart/${uuid}`);
      return;
    }

    router.push(`/tools/collaborative-chart/${chartName}`);
  };

  return (
    <div className="flex flex-col md:w-[60vw] mx-auto">
      <p className="text-justify">
        Enter a chart name or just click on &quot;Create New Chart&quot; without
        inputting something. If no input is given, the presented default value,
        which is a randomly generated UUID will be used to create the chart. You
        can also use this option if you want to add a level of security
      </p>
      <form onSubmit={createChart} className="md:mt-[15dvh] mt-[5dvh]">
        <div className="mb-[5dvh] flex items-center">
          <label className="md:text-xl" htmlFor="chart-name">
            Chart Name
          </label>
          <input
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-black dark:bg-black dark:border-slate-200 border rounded-md px-2 py-1 ml-4 grow md:text-xl"
            name="chart-name"
            id="chart-name"
            placeholder={uuid}
          />
        </div>
        <div className="flex">
          <button
            className="mx-auto border dark:border-slate-200 border-black rounded-md md:p-4 p-2 md:text-2xl text-xl"
            type="submit"
          >
            Create New Chart
          </button>
        </div>
      </form>
    </div>
  );
}
