// TODO: Don't render whole page as client component
// -> Maybe with Server-Actions?
"use client";

import * as d3 from "d3";
import { FormEvent, useEffect, useLayoutEffect, useRef, useState } from "react";

type Point = {
  x: number;
  y: number;
};

const useDimensions = (targetRef: React.RefObject<HTMLDivElement>) => {
  const getDimensions = () => {
    return {
      width: targetRef.current ? targetRef.current.offsetWidth : 0,
      height: targetRef.current ? targetRef.current.offsetHeight : 0,
    };
  };

  const [dimensions, setDimensions] = useState(getDimensions);

  const handleResize = () => {
    setDimensions(getDimensions());
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useLayoutEffect(() => {
    handleResize();
  }, []);

  return dimensions;
};

type ScatterPlotProps = {
  points: Array<Point>;
  width: number;
  height: number;
};

function ScatterPlot({ points, width, height }: ScatterPlotProps) {
  const marginTop = 20;
  const marginRight = 40;
  const marginBottom = 20;
  const marginLeft = 40;

  const [minX, maxX] = d3.extent(points, (p) => p.x) as [number, number];
  const x = d3.scaleLinear([minX, maxX], [marginLeft, width - marginRight]);
  const [minY, maxY] = d3.extent(points, (p) => p.y) as [number, number];
  const y = d3.scaleLinear([minY, maxY], [height - marginBottom, marginTop]);

  const gx = useRef(null);
  const gy = useRef(null);
  // @ts-ignore
  useEffect(() => void d3.select(gx.current).call(d3.axisBottom(x)), [gx, x]);
  // @ts-ignore
  useEffect(() => void d3.select(gy.current).call(d3.axisLeft(y)), [gy, y]);

  return (
    <svg width={width} height={height}>
      <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
      <g ref={gy} transform={`translate(${marginLeft},0)`} />
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {points.map((p, i) => (
          <circle key={i} cx={x(p.x)} cy={y(p.y)} r="2.5" />
        ))}
      </g>
    </svg>
  );
}

export default function Page() {
  const [points, setData] = useState<Array<Point>>([]);
  const scatterPlotContainer = useRef(null);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const x = Number(formData.get("x"));
    const y = Number(formData.get("y"));
    const p: Point = { x, y };
    setData((ps) => [...ps, p]);
  }

  const deleteElem = (i: number) => {
    setData((d) => [...d.slice(0, i), ...d.slice(i + 1)]);
  };

  const { width, height } = useDimensions(scatterPlotContainer);

  return (
    <div className="flex flex-col justify-center items-center">
      <form onSubmit={onSubmit} className="flex space-x-5 mb-5">
        <input
          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-black border-black dark:bg-black dark:text-slate-200 dark:border-slate-200 border rounded-md px-2 py-1 outline-none"
          type="number"
          name="x"
          step="any"
          placeholder="x"
          required
        />
        <input
          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-black border-black dark:bg-black dark:text-slate-200 dark:border-slate-200 border rounded-md px-2 py-1 outline-none"
          type="number"
          name="y"
          step="any"
          placeholder="y"
          required
        />
        <input type="submit" className="hidden" />
      </form>

      <div ref={scatterPlotContainer} className="w-full h-[50dvh]">
        <ScatterPlot points={points} width={width} height={height} />
      </div>

      <table className="mt-5">
        <tbody>
          {points.map((p, i) => (
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
    </div>
  );
}
