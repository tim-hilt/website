import * as d3 from "d3";
import { Axis, Orient } from "d3-axis-for-react";

import { Point } from "./data";

export default function ScatterPlot({ points }: { points: Array<Point> }) {
  // TODO: Make responsive
  const width = 720;
  const height = 480;

  const marginTop = 20;
  const marginRight = 40;
  const marginBottom = 20;
  const marginLeft = 40;

  const [minX, maxX] = d3.extent(points, (p) => p.x) as [number, number];
  const x = d3.scaleLinear([minX, maxX], [marginLeft, width - marginRight]);
  const [minY, maxY] = d3.extent(points, (p) => p.y) as [number, number];
  const y = d3.scaleLinear([minY, maxY], [height - marginBottom, marginTop]);

  return (
    <div className="w-full h-[50dvh]">
      <svg width={width} height={height}>
        <g transform={`translate(0, ${height - marginBottom})`}>
          <Axis scale={x} />
        </g>
        <g transform={`translate(${marginLeft}, 0)`}>
          <Axis scale={y} orient={Orient.left} />
        </g>
        <g fill="white" stroke="currentColor" strokeWidth="1.5">
          {points.map((p, i) => (
            <circle key={i} cx={x(p.x)} cy={y(p.y)} r="2.5" />
          ))}
        </g>
      </svg>
    </div>
  );
}
