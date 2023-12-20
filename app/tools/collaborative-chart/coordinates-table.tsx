"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Point } from "./scatter-plot";

export default function CoordinatesTable() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const params = new URLSearchParams(searchParams);
  const points: Array<Point> = params.has("points")
    ? JSON.parse(params.get("points") as string)
    : [];

  const deleteElem = (i: number) => {
    const ps = [...points.slice(0, i), ...points.slice(i + 1)];
    if (ps.length > 0) {
      params.set("points", JSON.stringify(ps));
    } else {
      params.delete("points");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <table className="mt-5">
      <tbody>
        {points?.map((p, i) => (
          <tr key={`${i}-${p}`}>
            <td className="p-2">{`(${p.x}, ${p.y})`}</td>
            <td className="p-2">
              <button
                onClick={() => deleteElem(i)}
                className="border-black dark:border-slate-200 dark:text-slate-200 rounded-md border px-2 py-1"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
