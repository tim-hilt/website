"use server";

import { Point, getPoints } from "./data";

export async function deleteElem(uuid: string, i: number) {
  const points = getPoints(uuid);
  points.delete(i, 1);
}

export async function addPoint(uuid: string, formData: FormData) {
  const points = getPoints(uuid);
  const x = Number(formData.get("x"));
  const y = Number(formData.get("y"));
  const p: Point = { x, y };

  points.insert(0, [p]);
}
