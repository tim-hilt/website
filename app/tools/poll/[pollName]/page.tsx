import dynamic from "next/dynamic";
import { Poll } from "./poll";

const DynamicRoom = dynamic(() => import("./poll"), { ssr: false });

export default function Page({ params }: { params: { pollName: string } }) {
  return (
    <DynamicRoom roomName={params.pollName}>
      <Poll pollName={params.pollName} />
    </DynamicRoom>
  );
}
