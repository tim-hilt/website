"use client";

import { getYjsValue, syncedStore } from "@syncedstore/core";
import { useSyncedStore } from "@syncedstore/react";
import * as d3 from "d3";
import {
  FormEvent,
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { WebsocketProvider } from "y-websocket";

export type Point = {
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

function ScatterPlot({ points }: { points: Array<Point> }) {
  const scatterPlotContainer = useRef(null);
  const { width, height } = useDimensions(scatterPlotContainer);

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

  // TODO: Render axis without useEffect
  // @ts-ignore
  useEffect(() => void d3.select(gx.current).call(d3.axisBottom(x)), [gx, x]);
  // @ts-ignore
  useEffect(() => void d3.select(gy.current).call(d3.axisLeft(y)), [gy, y]);

  return (
    <div ref={scatterPlotContainer} className="w-full md:h-[50dvh] h-[40dvh]">
      <svg width={width} height={height}>
        <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
        <g ref={gy} transform={`translate(${marginLeft},0)`} />
        <g fill="white" stroke="currentColor" strokeWidth="1.5">
          {points.map((p, i) => (
            <circle key={i} cx={x(p.x)} cy={y(p.y)} r="2.5" />
          ))}
        </g>
      </svg>
    </div>
  );
}

function CoordinatesForm() {
  const store = useSyncedStore(globalStore);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const x = Number(formData.get("x"));
    const y = Number(formData.get("y"));
    const p: Point = { x, y };

    store.points.push(p);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 md:mb-5"
    >
      <div>
        <label htmlFor="x">x</label>
        <input
          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ml-4 border-black dark:bg-black dark:border-slate-200 border rounded-md px-2 py-1"
          type="number"
          name="x"
          id="x"
          step="any"
          placeholder="0"
          required
          autoFocus
        />
      </div>
      <div>
        <label htmlFor="y">y</label>
        <input
          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ml-4 border-black dark:bg-black dark:border-slate-200 border rounded-md px-2 py-1"
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

function CoordinatesTable() {
  const store = useSyncedStore(globalStore);

  const deleteElem = (i: number) => {
    store.points.splice(i, 1);
  };

  return (
    <table className="mt-5">
      <tbody>
        {store.points?.map((p, i) => (
          <tr key={`${i}-${p.x}-${p.y}`}>
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

const globalStore = syncedStore({ points: [] as Array<Point> });

export default function Page({ params }: { params: { chartName: string } }) {
  new WebsocketProvider(
    process.env.NEXT_PUBLIC_WEBSOCKET_SERVER as string,
    params.chartName,
    getYjsValue(globalStore) as any
  );

  const store = useSyncedStore(globalStore);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="mb-4 md:text-xl">
        {decodeURIComponent(params.chartName)}
      </h1>
      <CoordinatesForm />
      <Suspense fallback={<p>Rendering Chart...</p>}>
        <ScatterPlot points={store.points} />
      </Suspense>
      <CoordinatesTable />
    </div>
  );
}
