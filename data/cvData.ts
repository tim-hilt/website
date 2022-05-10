import { CvData } from "@/components/Cv";

export const cvData: CvData = {
  workingExperience: [
    {
      corpName: "Inno Tec GmbH",
      titleEntries: [
        {
          from: "2022-04",
          to: "present",
          description: "Embedded Engineer - Automotive Camera Management",
          doings: [
            "Implementing camera-management-components using the Linux kernels V4L2-API",
            "Development-Language: C++ 17",
            "Target-Platform: ARM64",
            "Client is one of the biggest automotive producers in Germany",
          ],
        },
        {
          from: "2022-06",
          to: "present",
          description: "Technical Lead in an Enterprise-Software-Project",
          doings: ["Taking over a portion of the below project"],
        },
        {
          from: "2021-03",
          to: "present",
          description: "Full-Stack- and DevOps-Engineer in an Enterprise-Software-Project",
          doings: [
            "Working on a full-stack, microservices-based webapp",
            "Tech Stack: Spring-Boot, MongoDB, React (TypeScript)",
            "Client is one of the biggest automotive producers in Germany",
            "Development and implementation of infrastructure components (Kubernetes CRDs in Golang)",
          ],
        },
      ],
    },
    {
      corpName: "Hahn-Schickard-Gesellschaft für angewandte Forschung e.V.",
      titleEntries: [
        {
          from: "2020-09",
          to: "2021-02",
          description:
            "Bachelor Thesis - Machine Learning and Computer Vision for Marker-Free Component-Identification",
          doings: [
            "Labeling inherent surface-structures of injection-molded components",
            "Algorithm development",
            "Comparing multiple approaches including Convolutional Neural Networks, Descriptor based (SIFT/ORB), Histogram based",
            "End result was a combination of a local-descriptor based vector search and histogramming/bucketing approach",
            "Libraries used: OpenCV, FAISS, Tensorflow (Python / C++)",
          ],
        },
        {
          from: "2019-09",
          to: "2020-02",
          description: "Internship - Creating educational Courses in Virtual Reality",
          doings: [
            // TODO: Differentiate types in render-function, so that this can be included again
            // {
            //   doing: "Partnering with imsimity GmbH to create several courses:",
            //   subdoings: [
            //     "Production of Individualized Microsystems",
            //     "Injection Molding in an Innovative Production-Line",
            //     "Introduction to Machine Learning",
            //   ],
            // },
          ],
        },
        {
          from: "2019-10",
          to: "2021-02",
          description: 'Working Student: Lighthouse-Project "AI Escape-Room"',
          doings: [
            "Partnering with Deutsche Institute für Textil- und Faserforschung",
            "Creating a Python-based webapp (Flask / Dash) that served as escape-room dashboard",
            "Developing riddles for visitors",
          ],
        },
      ],
    },
    {
      corpName: "Hochschule Esslingen - University of Applied Sciences",
      titleEntries: [
        {
          from: "2019-02",
          to: "2020-02",
          description: "Research Assistant",
          doings: [
            "Creating examination material with LaTeX",
            "Complex math-typesetting",
            "Mathematical figures and graphics via TikZ and PGFPlots",
            "Replicating existing Powerpoint-presentation in LaTeX using the Beamer-package",
          ],
        },
      ],
    },
    {
      corpName: "Dörner Elektrotechnik GmbH",
      titleEntries: [
        {
          from: "2016-08",
          to: "2017-02",
          description: "Project Lead - Electrician",
          doings: [
            "Leading small and medium sized projects",
            "Focus on renovation",
            "Also: Extending existing electrical installations, repairing household appliances",
          ],
        },
      ],
    },
  ],
  education: [
    {
      from: "2017-03",
      to: "2021-03",
      description: "Bachelor of Science",
      doings: [
        "University: Hochschule Esslingen - University of Applied Sciences",
        "Major: Engineering-Education for Informatics and Electrotechnics",
        "Focus on Machine Learning and Embedded Systems Programming",
        "Involved several internships in an industrial (Hahn-Schickard) and educational (Felix-Ebert-Schule Esslingen) environment",
        "Finishing Grade: 1,5",
      ],
    },
    {
      from: "2014-08",
      to: "2016-07",
      description: "Apprenticeship: Electrician",
      doings: [
        "School: Heid-Tech - Technische Schule Heidenheim",
        "Corporate partners: Elektro Konold GmbH; Sontheim a.d. Brenz, Elektro Berroth GmbH; Gerstetten",
        "Finishing grade: 2,4",
      ],
    },
    {
      from: "2007-08",
      to: "2016-07",
      description: "A Level Scholar",
      doings: ["School: Robert Bosch Gymnasium Langenau", "Finishing Grade: 3,2"],
    },
  ],
  volunteeringWork: [
    {
      from: "2019-08",
      to: "2020-08",
      description: "IT Projekthaus - IT Designers Group Esslingen",
      doings: [
        "IT Projekthaus is a project that aims to teach scholars the basics of programming",
        "Educational applications included Processing and the Sphero Bot",
      ],
    },
    {
      from: "2010-08",
      to: "present",
      description: "Engagement in a church environment",
      doings: [
        "Preparing and leading sunday school",
        "Preparing and leading summer camps",
        "Preparing and leading programme for teens and twens",
        "Musical accompaniment (Piano, Guitars, E-Guitars)",
      ],
    },
  ],
};
