"use client";

import * as d3 from "d3";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export type Point = {
  x: number;
  y: number;
};

// TODO: Don't use this hook, determine size on server
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

export default function ScatterPlot({ points }: { points: Array<Point> }) {
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
    <div ref={scatterPlotContainer} className="w-full h-[50dvh]">
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
