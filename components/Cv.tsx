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

const RenderCorpEntry = (corpEntry: CorpEntry) => {
  return (
    <>
      <tr>
        <td colSpan={2} className="pt-2 pb-3 text-2xl">
          {corpEntry.corpName}
        </td>
      </tr>
      {corpEntry.titleEntries.map((entry) => (
        <CvEntry key={entry.description} {...entry} />
      ))}
    </>
  );
};

const CvEntry = ({ from, to, description, doings }: CvEntry) => {
  return (
    <tr>
      <td className="w-56 align-top">
        {formatDate(from)} &ndash; {to === "present" ? to : formatDate(to)}
      </td>
      <td className="pb-8 align-top">
        <h4 className="pb-2 text-xl font-bold">{description}</h4>
        <ul className="list-inside list-disc text-gray-600 dark:text-gray-300">
          {doings.map((doing) => {
            if (typeof doing === "string") {
              return <li key={doing}>{doing}</li>;
            }
            return (
              <>
                <li key={doing.doing}>{doing.doing}</li>
                <ul className="list-circle pl-8 text-gray-600 dark:text-gray-300">
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

const RenderIntermediateHeading = ({ heading }: { heading: string }) => {
  return (
    <tr>
      <td colSpan={2} className="pb-7 text-4xl">
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
