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
      <h2 className="pt-2 pb-3 text-2xl">{corpEntry.corpName}</h2>
      {corpEntry.titleEntries.map((entry) => (
        <CvEntry key={entry.description} {...entry} />
      ))}
    </>
  );
};

const CvEntry = ({ from, to, description, doings }: CvEntry) => {
  return (
    <div className="pb-10 md:flex">
      <div className="shrink-0 grow-0 basis-56">
        {formatDate(from)} &ndash; {to === "present" ? to : formatDate(to)}
      </div>
      <div>
        <h4 className="pb-2 text-xl font-bold">{description}</h4>
        <ul className="list-disc pl-8 text-gray-600 dark:text-gray-300">
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
      </div>
    </div>
  );
};

const RenderIntermediateHeading = ({ heading }: { heading: string }) => {
  return <h2 className="pb-7 text-3xl md:text-4xl">{heading}</h2>;
};

export const CV = (data: CvData) => {
  return (
    <>
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
    </>
  );
};
