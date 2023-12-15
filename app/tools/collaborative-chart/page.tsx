// TODO: Don't render whole page as client component
"use client";

import * as d3 from "d3";
import { FormEvent, useEffect, useRef, useState } from "react";

type LinePlotProps = {
  data: number[];
  width?: number;
  height?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
};

// TODO: Make sense of the function
function LinePlot({
  data = [],
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 30,
  marginLeft = 40,
}: LinePlotProps) {
  const gx = useRef<SVGSVGElement>(null);
  const gy = useRef<SVGSVGElement>(null);

  const x = d3.scaleLinear(
    [0, data.length - 1],
    [marginLeft, width - marginRight]
  );
  const [minY, maxY] = d3.extent(data) as [number, number];
  const y = d3.scaleLinear([minY, maxY], [height - marginBottom, marginTop]);
  const line = d3.line((_, i) => x(i), y);

  // TODO: Resolve those ts-ignores
  // @ts-ignore
  useEffect(() => void d3.select(gx.current).call(d3.axisBottom(x)), [gx, x]);
  // @ts-ignore
  useEffect(() => void d3.select(gy.current).call(d3.axisLeft(y)), [gy, y]);

  return (
    <svg width={width} height={height}>
      <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
      <g ref={gy} transform={`translate(${marginLeft},0)`} />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        d={line(data) || undefined}
      />
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {data.map((d, i) => (
          <circle key={i} cx={x(i)} cy={y(d)} r="2.5" />
        ))}
      </g>
    </svg>
  );
}

export default function Page() {
  const [data, setData] = useState<Array<number>>([1, 2, 3]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const num = Number(formData.get("number"));
    setData((d) => [...d, num]);
  }

  const deleteElem = (i: number) => {
    setData((d) => [...d.slice(0, i), ...d.slice(i + 1)]);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <form onSubmit={onSubmit} className="flex space-x-5 mb-5">
        <input
          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-black border-black dark:bg-black dark:text-slate-200 dark:border-slate-200 border rounded-md px-2 py-1 outline-none"
          type="number"
          name="number"
          step="any"
          min={0}
          placeholder="Add number"
        />
      </form>
      <LinePlot data={data} />
      <table className="mt-5">
        <tbody>
          {data.map((d, i) => (
            <tr key={`${i}-${d}`}>
              <td className="p-2">{d}</td>
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
    </div>
  );
}
