import CoordinatesForm from "./coordinates-form";
import CoordinatesTable from "./coordinates-table";
import { getPoints } from "./data";
import ScatterPlot from "./scatter-plot";

export default function Page({ params }: { params: { uuid: string } }) {
  const points = getPoints(params.uuid).toArray();

  // TODO: Can we prevent the prop-drilling somehow?
  return (
    <div className="flex flex-col justify-center items-center">
      <CoordinatesForm uuid={params.uuid} />
      <ScatterPlot points={points} />
      <CoordinatesTable uuid={params.uuid} points={points} />
    </div>
  );
}
