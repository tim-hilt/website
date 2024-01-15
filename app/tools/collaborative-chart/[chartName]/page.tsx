"use client";

import * as d3 from "d3";
import { Axis, Orient } from "d3-axis-for-react";
import { FormEvent, ReactNode } from "react";
import useMeasure from "react-use-measure";
import * as Form from "@radix-ui/react-form";
import { RoomProvider, useMutation, useStorage } from "@/liveblocks.config";
import { LiveList, LiveObject } from "@liveblocks/client";
import { ClientSideSuspense } from "@liveblocks/react";
import { Point } from "@/app/types/point";

function ScatterPlot({ points }: { points: Readonly<Array<Point>> }) {
  const [ref, { width, height }] = useMeasure();

  const marginTop = 20;
  const marginRight = 40;
  const marginBottom = 20;
  const marginLeft = 40;

  const [minX, maxX] = d3.extent(points, (p) => p.x) as [number, number];
  const x = d3.scaleLinear([minX, maxX], [marginLeft, width - marginRight]);
  const [minY, maxY] = d3.extent(points, (p) => p.y) as [number, number];
  const y = d3.scaleLinear([minY, maxY], [height - marginBottom, marginTop]);

  return (
    <div ref={ref} className="h-[40dvh] w-full md:h-[50dvh]">
      <svg width={width} height={height}>
        <g transform={`translate(0, ${height - marginBottom})`}>
          <Axis scale={x} orient={Orient.bottom} />
        </g>
        <g transform={`translate(${marginLeft},0)`}>
          <Axis scale={y} orient={Orient.left} />
        </g>
        <g
          fill="white"
          className="fill-white stroke-black stroke-[0.8] dark:fill-black dark:stroke-white"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          {points.map((p, i) => (
            <circle key={i} cx={x(p.x)} cy={y(p.y)} r="2.5" />
          ))}
        </g>
      </svg>
    </div>
  );
}

function CoordinatesForm() {
  const addPoint = useMutation(({ storage }, x, y) => {
    storage.get("points").push(new LiveObject({ x, y }));
  }, []);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const x = Number(formData.get("x"));
    const y = Number(formData.get("y"));

    addPoint(x, y);
  }

  return (
    <Form.Root
      onSubmit={onSubmit}
      className="flex flex-col space-y-3 md:mb-5 md:flex-row md:space-x-5 md:space-y-0"
    >
      <Form.Field name="x">
        <Form.Label>x</Form.Label>
        <Form.Control asChild>
          <input
            className="ml-4 rounded-md border border-black px-2 py-1 [appearance:textfield] dark:border-gray-200 dark:bg-black [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            type="number"
            step="any"
            placeholder="0"
            required
            autoFocus
          />
        </Form.Control>
      </Form.Field>
      <Form.Field name="y">
        <Form.Label>y</Form.Label>
        <Form.Control asChild>
          <input
            className="ml-4 rounded-md border border-black px-2 py-1 [appearance:textfield] dark:border-gray-200 dark:bg-black [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            type="number"
            step="any"
            placeholder="0"
            required
          />
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <button className="rounded-md border border-black px-2 py-1 dark:border-gray-200">
          Add Coordinate
        </button>
      </Form.Submit>
    </Form.Root>
  );
}

function CoordinatesTable() {
  const points = useStorage((root) => root.points);
  const deletePoint = useMutation(({ storage }, i) => {
    storage.get("points").delete(i);
  }, []);

  return (
    <table className="mt-5">
      <tbody>
        {points?.map((p, i) => (
          <tr key={`${i}-${p.x}-${p.y}`}>
            <td className="p-2">{`(${p.x}, ${p.y})`}</td>
            <td className="p-2">
              <button
                onClick={() => deletePoint(i)}
                className="rounded-md border border-black px-2 py-1 dark:border-gray-200 dark:text-gray-200"
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

function Room({
  chartName,
  children,
}: {
  chartName: string;
  children: ReactNode;
}) {
  return (
    <RoomProvider
      id={chartName}
      initialStorage={{ points: new LiveList() }}
      initialPresence={{}}
    >
      <ClientSideSuspense fallback={<p>Loading...</p>}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}

function Proxy({ chartName }: { chartName: string }) {
  const points = useStorage((root) => root.points);
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mb-4 md:text-xl">{decodeURIComponent(chartName)}</h1>
      <CoordinatesForm />
      <ScatterPlot points={points} />
      <CoordinatesTable />
    </div>
  );
}

export default function Page({ params }: { params: { chartName: string } }) {
  return (
    <Room chartName={params.chartName}>
      <Proxy chartName={params.chartName} />
    </Room>
  );
}
