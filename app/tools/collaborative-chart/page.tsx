"use client";

import { useRouter } from "next/navigation";
import { FormEvent, Suspense, useEffect, useState } from "react";
import * as Form from "@radix-ui/react-form";

// TODO: Add Metdata

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
    <div className="mx-auto flex flex-col md:w-[60vw]">
      <p className="text-justify">
        Enter a chart name or just click on &quot;Create New Chart&quot; without
        inputting something. If no input is given, the presented default value,
        which is a randomly generated UUID will be used to create the chart. You
        can also use this option if you want to add a level of security
      </p>
      <Suspense fallback={<p>Loading UUID...</p>}>
        <Form.Root onSubmit={createChart} className="mt-[5dvh] md:mt-[15dvh]">
          <Form.Field name="chart-name" className="mb-[5dvh] flex items-center">
            <Form.Label className="md:text-xl">Chart Name</Form.Label>
            <Form.Control asChild>
              <input
                className="ml-4 grow rounded-md border border-black px-2 py-1 [appearance:textfield] md:text-xl dark:border-gray-200 dark:bg-black [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                placeholder={uuid}
                autoFocus
              />
            </Form.Control>
          </Form.Field>
          <Form.Submit asChild className="flex">
            <button className="mx-auto rounded-md border border-black p-2 text-xl md:p-4 md:text-2xl dark:border-gray-200">
              Create New Chart
            </button>
          </Form.Submit>
        </Form.Root>
      </Suspense>
    </div>
  );
}
