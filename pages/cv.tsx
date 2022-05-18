import { CV } from "@/components/Cv";
import { PageSEO } from "@/components/SEO";
import { cvData } from "@/data/cvData";
import siteMetadata from "@/data/siteMetadata";

const cv = () => {
  return (
    <>
      <PageSEO title={`CV - ${siteMetadata.author}`} description="My Curriculum Vitae" />
      <CV {...cvData} />
    </>
  );
};

export default cv;
