import { CV } from "@/components/Cv";
import { cvData } from "@/data/cvData";

const cv = () => {
  return <CV {...cvData} />;
};

export default cv;
