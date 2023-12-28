"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  // HACK: This has to be done in order to satisfy
  //       Next.js' SSR
  const [uuid, setUuid] = useState("");
  useEffect(() => {
    setUuid(window.crypto.randomUUID());
  }, []);
  const router = useRouter();

  return (
    <div className="flex justify-center">
      <button
        onClick={() => router.push(`/tools/collaborative-chart/${uuid}`)}
        className="border rounded-lg p-4 mt-[20vh] text-2xl"
      >
        Create New Chart
      </button>
    </div>
  );
}
