import CoordinatesForm from "./coordinates-form";
import CoordinatesTable from "./coordinates-table";
import ScatterPlot, { Point } from "./scatter-plot";

export default function Page({
  searchParams,
}: {
  searchParams?: {
    points?: string;
  };
}) {
  const points: Array<Point> = searchParams?.points
    ? JSON.parse(searchParams.points)
    : [];

  return (
    <div className="flex flex-col justify-center items-center">
      <CoordinatesForm />
      <ScatterPlot points={points} />
      <CoordinatesTable />
    </div>
  );
}
