"use client";

import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { deleteElem } from "./actions";
import { Point } from "./data";

export default function CoordinatesTable({
  uuid,
  points,
}: {
  uuid: string;
  points: Array<Point>;
}) {
  return (
    <table className="mt-5">
      <tbody>
        {points.map((p, i) => (
          <tr key={`${i}-${p.x}-${p.y}`}>
            <td className="p-2">{`x = ${p.x}, y = ${p.y}`}</td>
            <td className="p-2">
              <button
                onClick={() => deleteElem(uuid, i)}
                className="border-black dark:border-slate-200 dark:text-slate-200 rounded-md border py-2 px-3"
              >
                <FontAwesomeIcon size="lg" icon={faTrashCan} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
