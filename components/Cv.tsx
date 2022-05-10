interface DoingWithSubdoings {
  doing: string;
  subdoings: string[];
}

interface CvEntry {
  from: string;
  to: string;
  description: string;
  doings: (string | DoingWithSubdoings)[];
}

interface CorpEntry {
  corpName: string;
  titleEntries: CvEntry[];
}

export interface CvData {
  workingExperience: CorpEntry[];
  education: CvEntry[];
  volunteeringWork: CvEntry[];
}

const formatDate = (date: string): string => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const d = new Date(date);
  return monthNames[d.getMonth()] + ". " + d.getFullYear();
};

const RenderCorpEntry = (entry: CorpEntry) => {
  return (
    <>
      <tr>
        <td colSpan={2} className="text-2xl pb-3">
          {entry.corpName}
        </td>
      </tr>
      {entry.titleEntries.map((entry) => (
        <CvEntry key={entry.description} {...entry} />
      ))}
    </>
  );
};

const CvEntry = ({ from, to, description, doings }: CvEntry) => {
  return (
    <tr>
      <td className="align-top w-56">
        {formatDate(from)} &ndash; {to === "present" ? to : formatDate(to)}
      </td>
      <td className="align-top pb-8">
        <h4 className="text-xl font-bold pb-2">{description}</h4>
        <ul className="list-disc text-gray-600 dark:text-gray-300 pl-8">
          {doings.map((doing) => {
            if (typeof doing === "string") {
              return <li key={doing}>{doing}</li>;
            }
            return (
              <>
                <li key={doing.doing}>{doing.doing}</li>;
                <ul>
                  {doing.subdoings.map((doing) => (
                    <li key={doing}>{doing}</li>
                  ))}
                </ul>
              </>
            );
          })}
        </ul>
      </td>
    </tr>
  );
};

// TODO: Find smarter way to pass those props!
interface foo {
  heading: string;
}

const RenderIntermediateHeading = ({ heading }: foo) => {
  return (
    <tr>
      <td colSpan={2} className="text-4xl pb-7">
        {heading}
      </td>
    </tr>
  );
};

export const CV = (data: CvData) => {
  return (
    <table className="table-fixed">
      <RenderIntermediateHeading heading="Professional Experience" />
      {data.workingExperience.map((entry) => (
        <RenderCorpEntry key={entry.corpName} {...entry} />
      ))}
      <RenderIntermediateHeading heading="Education" />
      {data.education.map((entry) => (
        <CvEntry key={entry.description} {...entry} />
      ))}
      <RenderIntermediateHeading heading="Volunteering Work" />
      {data.volunteeringWork.map((entry) => (
        <CvEntry key={entry.description} {...entry} />
      ))}
    </table>
  );
};
