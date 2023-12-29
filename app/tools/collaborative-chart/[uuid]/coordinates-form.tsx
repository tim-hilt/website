"use client";

import { addPoint } from "./actions";

export default function CoordinatesForm({ uuid }: { uuid: string }) {
  return (
    <form
      action={addPoint.bind(null, uuid)}
      className="flex flex-col md:flex-row md:space-x-5 mb-5"
    >
      <div className="space-x-5 mb-3 md:mb-0">
        <label htmlFor="x">x</label>
        <input
          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-black dark:bg-black dark:border-slate-200 border rounded-md px-2 py-1"
          type="number"
          name="x"
          id="x"
          step="any"
          placeholder="0"
          required
          autoFocus
        />
      </div>
      <div className="space-x-5 mb-3 md:mb-0">
        <label htmlFor="y">y</label>
        <input
          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-black dark:bg-black dark:border-slate-200 border rounded-md px-2 py-1"
          type="number"
          name="y"
          id="y"
          step="any"
          placeholder="0"
          required
        />
      </div>
      <button
        type="submit"
        className="border-black dark:border-slate-200 border rounded-md px-2 py-1"
      >
        Add Coordinate
      </button>
    </form>
  );
}
