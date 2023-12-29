import { revalidatePath } from "next/cache";
import ws from "ws";
import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";

export type Point = {
  x: number;
  y: number;
};

const points = new Map<string, Y.Array<Point>>();

// TODO: Destroy provider if no client connected anymore
export const getPoints = (uuid: string): Y.Array<Point> => {
  if (points.has(uuid)) {
    return points.get(uuid) as Y.Array<Point>;
  }

  const doc = new Y.Doc();
  const ps: Y.Array<Point> = doc.getArray("points");
  ps.observe(() => {
    // TODO: This only works for the current client. How can this be shared to all clients?
    // TODO: Could be made more reusable by not depending on that url-route
    revalidatePath(`/tools/collaborative-chart/${uuid}`);
  });

  new WebsocketProvider(process.env.WEBSOCKET_SERVER as string, uuid, doc, {
    // TODO: Resolve type-error properly
    // @ts-ignore
    WebSocketPolyfill: ws,
  });

  points.set(uuid, ps);
  return ps;
};
