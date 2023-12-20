"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent } from "react";

import { Point } from "./scatter-plot";

export default function CoordinatesForm() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const x = Number(formData.get("x"));
    const y = Number(formData.get("y"));
    const p: Point = { x, y };

    if (params.has("points")) {
      const ps: Array<Point> = JSON.parse(params.get("points") as string);
      params.set("points", JSON.stringify([...ps, p]));
    } else {
      params.set("points", JSON.stringify([p]));
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <form onSubmit={onSubmit} className="flex space-x-5 mb-5">
      <label htmlFor="x">x</label>
      <input
        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-black dark:bg-black dark:border-slate-200 border rounded-md px-2 py-1"
        type="number"
        name="x"
        step="any"
        placeholder="0"
        required
        autoFocus
      />
      <label htmlFor="y">y</label>
      <input
        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-black dark:bg-black dark:border-slate-200 border rounded-md px-2 py-1"
        type="number"
        name="y"
        step="any"
        placeholder="0"
        required
      />
      <button
        type="submit"
        className="border-black dark:border-slate-200 border rounded-md px-2 py-1"
      >
        Add Coordinate
      </button>
    </form>
  );
}
