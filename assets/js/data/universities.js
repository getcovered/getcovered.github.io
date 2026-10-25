/**
 * University registry.
 *
 * To add a university: copy an entry, drop its logo into assets/img/, and list
 * its departments. Nothing else needs to change. Departments are grouped
 * (usually by school) and shown as a dropdown in the editor.
 *
 * NSU's departments follow the university's published school structure.
 * Students in a department that isn't listed can pick "Other" and type it.
 */
export const UNIVERSITIES = [
  {
    id: "nsu",
    name: "North South University",
    short: "NSU",
    logo: "assets/img/nsu.png",
    departments: [
      {
        group: "School of Business and Economics",
        items: [
          "Department of Accounting & Finance",
          "Department of Economics",
          "Department of Management",
          "Department of Marketing & International Business",
        ],
      },
      {
        group: "School of Engineering and Physical Sciences",
        items: [
          "Department of Architecture",
          "Department of Civil and Environmental Engineering",
          "Department of Electrical and Computer Engineering",
          "Department of Mathematics and Physics",
        ],
      },
      {
        group: "School of Humanities and Social Sciences",
        items: [
          "Department of English & Modern Languages",
          "Department of Law",
          "Department of History & Philosophy",
          "Department of Political Science & Sociology",
        ],
      },
      {
        group: "School of Health and Life Sciences",
        items: [
          "Department of Biochemistry & Microbiology",
          "Department of Environmental Science and Management",
          "Department of Pharmaceutical Sciences",
          "Department of Public Health",
        ],
      },
    ],
  },
  {
    id: "bracu",
    name: "BRAC University",
    short: "BRACU",
    logo: "assets/img/bracu.png",
    departments: [
      {
        group: "BRAC Business School",
        items: [
          "Bachelor of Business Administration",
          "Master of Business Administration",
        ],
      },
      {
        group: "BRAC James P Grant School of Public Health",
        items: ["Master of Public Health"],
      },
      {
        group: "BSRM School of Engineering",
        items: [
          "Bachelor of Science in Electrical and Electronic Engineering",
          "Bachelor of Science in Electrical and Communication Engineering",
          "Master of Science in Electrical and Electronic Engineering",
          "Master of Science in Electrical and Communication Engineering",
          "Department of Civil and Environmental Engineering",
          "Department of Electrical and Computer Engineering",
          "Department of Mathematics and Physics",
        ],
      },
      {
        group: "Department of Mathematics & Physical Sciences",
        items: [
          "Bachelor of Science in Applied Physics & Electronics",
          "Bachelor of Science in Mathematics",
          "Bachelor of Science in Physics",
          "Master of Science in Medical Physics",
        ],
      },
      {
        group: "School of Architecture & Design",
        items: [
          "Bachelor of Architecture",
          "Bachelor of Disaster Management",
          "Master of Disaster Management",
        ],
      },
      {
        group: "School of Data & Computational Sciences",
        items: [
          "Bachelor of Science in Computer Science",
          "Bachelor of Science in Computer Science & Engineering",
          "Master of Science in Computer Science & Engineering",
          "Master of Engineering in Computer Science & Engineering",
        ],
      },
      {
        group: "School of Humanities & Social Sciences",
        items: [
          "Bachelor of Social Science in Economics",
          "Bachelor of Social Science in Anthropology",
          "Master of Science in Applied Economics",
          "Bachelor of Arts in English",
          "Master of Arts in English",
        ],
      },
      {
        group: "School of Law",
        items: ["Bachelor of Laws (LL.B.)", "Master of Laws (LL.M.)"],
      },
      {
        group: "School of Life Sciences",
        items: [
          "Bachelor of Science in Biotechnology",
          "Master of Science in Biotechnology",
        ],
      },
      {
        group: "School of Pharmacy",
        items: ["Bachelor of Pharmacy (BPharm)"],
      },
    ],
  },
  {
    id: "du",
    name: "University of Dhaka",
    short: "DU",
    logo: "assets/img/du.png",
    departments: [
      {
        group: "Faculty of Business Studies",
        items: [
          {
            department: "Department of Accounting",
            degrees: [
              "Bachelor of Business Administration (BBA)",
              "Master of Business Administration (MBA)",
            ],
          },
          {
            department: "Department of Management",
            degrees: [
              "Bachelor of Business Administration (BBA)",
              "Master of Business Administration (MBA)",
            ],
          },
          {
            department: "Department of Marketing",
            degrees: [
              "Bachelor of Business Administration (BBA)",
              "Master of Business Administration (MBA)",
            ],
          },
          {
            department: "Department of Finance",
            degrees: [
              "Bachelor of Business Administration (BBA)",
              "Master of Business Administration (MBA)",
            ],
          },
          {
            department: "Department of Banking and Insurance",
            degrees: [
              "Bachelor of Business Administration (BBA)",
              "Master of Business Administration (MBA)",
            ],
          },
          {
            department: "Department of Management Information Systems (MIS)",
            degrees: [
              "Bachelor of Business Administration (BBA)",
              "Master of Business Administration (MBA)",
            ],
          },
          {
            department: "Department of Tourism and Hospitality Management",
            degrees: [
              "Bachelor of Business Administration (BBA)",
              "Master of Business Administration (MBA)",
            ],
          },
          {
            department: "Department of International Business",
            degrees: [
              "Bachelor of Business Administration (BBA)",
              "Master of Business Administration (MBA)",
            ],
          },
          {
            department: "Department of Organization Strategy and Leadership",
            degrees: [
              "Bachelor of Business Administration (BBA)",
              "Master of Business Administration (MBA)",
            ],
          },
        ],
      },
      {
        group: "Faculty of Science",
        items: [
          {
            department: "Department of Physics",
            degrees: [
              "Bachelor of Science (B.Sc. Hons.)",
              "Master of Science (M.Sc.)",
            ],
          },
          {
            department: "Department of Mathematics",
            degrees: [
              "Bachelor of Science (B.Sc. Hons.)",
              "Master of Science (M.Sc.)",
            ],
          },
          {
            department: "Department of Chemistry",
            degrees: [
              "Bachelor of Science (B.Sc. Hons.)",
              "Master of Science (M.Sc.)",
            ],
          },
          {
            department: "Department of Applied Mathematics",
            degrees: [
              "Bachelor of Science (B.Sc. Hons.)",
              "Master of Science (M.Sc.)",
            ],
          },
          {
            department: "Department of Statistics",
            degrees: [
              "Bachelor of Science (B.Sc. Hons.)",
              "Master of Science (M.Sc.)",
            ],
          },
        ],
      },
      {
        group: "Faculty of Social Sciences",
        items: [
          {
            department: "Department of Economics",
            degrees: [
              "Bachelor of Social Science (B.S.S. Hons.)",
              "Master of Social Science (M.S.S.)",
            ],
          },
          {
            department: "Department of Political Science",
            degrees: [
              "Bachelor of Social Science (B.S.S. Hons.)",
              "Master of Social Science (M.S.S.)",
            ],
          },
          {
            department: "Department of International Relations",
            degrees: [
              "Bachelor of Social Science (B.S.S. Hons.)",
              "Master of Social Science (M.S.S.)",
            ],
          },
          {
            department: "Department of Sociology",
            degrees: [
              "Bachelor of Social Science (B.S.S. Hons.)",
              "Master of Social Science (M.S.S.)",
            ],
          },
          {
            department: "Department of Mass Communication & Journalism",
            degrees: [
              "Bachelor of Social Science (B.S.S. Hons.)",
              "Master of Social Science (M.S.S.)",
            ],
          },
          {
            department: "Department of Public Administration",
            degrees: [
              "Bachelor of Social Science (B.S.S. Hons.)",
              "Master of Social Science (M.S.S.)",
            ],
          },
          {
            department: "Department of Anthropology",
            degrees: [
              "Bachelor of Social Science (B.S.S. Hons.)",
              "Master of Social Science (M.S.S.)",
            ],
          },
          {
            department: "Department of Population Sciences",
            degrees: [
              "Bachelor of Social Science (B.S.S. Hons.)",
              "Master of Social Science (M.S.S.)",
            ],
          },
          {
            department: "Department of Peace and Conflict Studies",
            degrees: [
              "Bachelor of Social Science (B.S.S. Hons.)",
              "Master of Social Science (M.S.S.)",
            ],
          },
          {
            department: "Department of Women and Gender Studies",
            degrees: [
              "Bachelor of Social Science (B.S.S. Hons.)",
              "Master of Social Science (M.S.S.)",
            ],
          },
          {
            department: "Department of Development Studies",
            degrees: [
              "Bachelor of Social Science (B.S.S. Hons.)",
              "Master of Social Science (M.S.S.)",
            ],
          },
          {
            department: "Department of Criminology",
            degrees: [
              "Bachelor of Social Science (B.S.S. Hons.)",
              "Master of Social Science (M.S.S.)",
            ],
          },
        ],
      },
      {
        group: "Faculty of Arts",
        items: [
          {
            department: "Department of Bangla",
            degrees: ["Bachelor of Arts (B.A. Hons.)", "Master of Arts (M.A.)"],
          },
          {
            department: "Department of English",
            degrees: ["Bachelor of Arts (B.A. Hons.)", "Master of Arts (M.A.)"],
          },
          {
            department: "Department of History",
            degrees: ["Bachelor of Arts (B.A. Hons.)", "Master of Arts (M.A.)"],
          },
          {
            department: "Department of Philosophy",
            degrees: ["Bachelor of Arts (B.A. Hons.)", "Master of Arts (M.A.)"],
          },
          {
            department: "Department of Arabic",
            degrees: ["Bachelor of Arts (B.A. Hons.)", "Master of Arts (M.A.)"],
          },
          {
            department: "Department of Islamic History & Culture",
            degrees: ["Bachelor of Arts (B.A. Hons.)", "Master of Arts (M.A.)"],
          },
          {
            department: "Department of Islamic Studies",
            degrees: ["Bachelor of Arts (B.A. Hons.)", "Master of Arts (M.A.)"],
          },
          {
            department: "Department of Linguistics",
            degrees: ["Bachelor of Arts (B.A. Hons.)", "Master of Arts (M.A.)"],
          },
          {
            department: "Department of Persian Language and Literature",
            degrees: ["Bachelor of Arts (B.A. Hons.)", "Master of Arts (M.A.)"],
          },
          {
            department: "Department of Urdu",
            degrees: ["Bachelor of Arts (B.A. Hons.)", "Master of Arts (M.A.)"],
          },
          {
            department: "Department of Sanskrit",
            degrees: ["Bachelor of Arts (B.A. Hons.)", "Master of Arts (M.A.)"],
          },
          {
            department: "Department of Pali and Buddhist Studies",
            degrees: ["Bachelor of Arts (B.A. Hons.)", "Master of Arts (M.A.)"],
          },
          {
            department: "Department of Theatre and Performance Studies",
            degrees: ["Bachelor of Arts (B.A. Hons.)", "Master of Arts (M.A.)"],
          },
          {
            department: "Department of Music",
            degrees: ["Bachelor of Arts (B.A. Hons.)", "Master of Arts (M.A.)"],
          },
          {
            department: "Department of World Religions and Culture",
            degrees: ["Bachelor of Arts (B.A. Hons.)", "Master of Arts (M.A.)"],
          },
          {
            department:
              "Department of Information Science and Library Management",
            degrees: ["Bachelor of Arts (B.A. Hons.)", "Master of Arts (M.A.)"],
          },
          {
            department: "Department of Dance",
            degrees: ["Bachelor of Arts (B.A. Hons.)", "Master of Arts (M.A.)"],
          },
          {
            department: "Department of Printing and Publication Studies",
            degrees: ["Bachelor of Arts (B.A. Hons.)", "Master of Arts (M.A.)"],
          },
          {
            department: "Department of Television, Film and Photography",
            degrees: ["Bachelor of Arts (B.A. Hons.)", "Master of Arts (M.A.)"],
          },
          {
            department: "Department of Japanese Studies",
            degrees: ["Bachelor of Arts (B.A. Hons.)", "Master of Arts (M.A.)"],
          },
        ],
      },
      {
        group: "Faculty of Engineering and Technology",
        items: [
          {
            department: "Department of Computer Science and Engineering",
            degrees: [
              "Bachelor of Science (B.Sc. in CSE)",
              "Master of Science (M.Sc. in CSE)",
            ],
          },
          {
            department: "Department of Electrical and Electronic Engineering",
            degrees: [
              "Bachelor of Science (B.Sc. in EEE)",
              "Master of Science (M.Sc. in EEE)",
            ],
          },
          {
            department:
              "Department of Applied Chemistry & Chemical Engineering",
            degrees: [
              "Bachelor of Science (B.Sc. Hons.)",
              "Master of Science (M.Sc.)",
            ],
          },
          {
            department: "Department of Nuclear Engineering",
            degrees: [
              "Bachelor of Science (B.Sc. Hons.)",
              "Master of Science (M.Sc.)",
            ],
          },
          {
            department: "Department of Robotics and Mechatronics Engineering",
            degrees: [
              "Bachelor of Science (B.Sc. Hons.)",
              "Master of Science (M.Sc.)",
            ],
          },
        ],
      },
      {
        group: "Faculty of Biological Sciences",
        items: [
          {
            department: "Department of Botany",
            degrees: [
              "Bachelor of Science (B.Sc. Hons.)",
              "Master of Science (M.Sc.)",
            ],
          },
          {
            department: "Department of Zoology",
            degrees: [
              "Bachelor of Science (B.Sc. Hons.)",
              "Master of Science (M.Sc.)",
            ],
          },
          {
            department: "Department of Biochemistry and Molecular Biology",
            degrees: [
              "Bachelor of Science (B.Sc. Hons.)",
              "Master of Science (M.Sc.)",
            ],
          },
          {
            department: "Department of Microbiology",
            degrees: [
              "Bachelor of Science (B.Sc. Hons.)",
              "Master of Science (M.Sc.)",
            ],
          },
          {
            department: "Department of Fisheries",
            degrees: [
              "Bachelor of Science (B.Sc. Hons.)",
              "Master of Science (M.Sc.)",
            ],
          },
          {
            department: "Department of Psychology",
            degrees: [
              "Bachelor of Science (B.Sc. Hons.) / B.S.S.",
              "Master of Science (M.Sc.) / M.S.S.",
            ],
          },
          {
            department: "Department of Genetic Engineering and Biotechnology",
            degrees: [
              "Bachelor of Science (B.Sc. Hons.)",
              "Master of Science (M.Sc.)",
            ],
          },
        ],
      },
      {
        group: "Faculty of Pharmacy",
        items: [
          {
            department: "Department of Pharmacy",
            degrees: [
              "Bachelor of Pharmacy (B.Pharm. Hons.)",
              "Master of Pharmacy (M.Pharm.)",
            ],
          },
          {
            department: "Department of Pharmaceutical Chemistry",
            degrees: [
              "Bachelor of Pharmacy (B.Pharm. Hons.)",
              "Master of Pharmacy (M.Pharm.)",
            ],
          },
          {
            department: "Department of Clinical Pharmacy and Pharmacology",
            degrees: [
              "Bachelor of Pharmacy (B.Pharm. Hons.)",
              "Master of Pharmacy (M.Pharm.)",
            ],
          },
          {
            department: "Department of Pharmaceutical Technology",
            degrees: [
              "Bachelor of Pharmacy (B.Pharm. Hons.)",
              "Master of Pharmacy (M.Pharm.)",
            ],
          },
        ],
      },
      {
        group: "Faculty of Earth and Environmental Sciences",
        items: [
          {
            department: "Department of Geography & Environment",
            degrees: [
              "Bachelor of Science (B.Sc. Hons.) / B.S.S.",
              "Master of Science (M.Sc.) / M.S.S.",
            ],
          },
          {
            department: "Department of Geology",
            degrees: [
              "Bachelor of Science (B.Sc. Hons.)",
              "Master of Science (M.Sc.)",
            ],
          },
          {
            department: "Department of Soil, Water & Environment",
            degrees: [
              "Bachelor of Science (B.Sc. Hons.)",
              "Master of Science (M.Sc.)",
            ],
          },
          {
            department: "Department of Oceanography",
            degrees: [
              "Bachelor of Science (B.Sc. Hons.)",
              "Master of Science (M.Sc.)",
            ],
          },
          {
            department: "Department of Disaster Science and Climate Resilience",
            degrees: [
              "Bachelor of Science (B.Sc. Hons.)",
              "Master of Science (M.Sc.)",
            ],
          },
          {
            department: "Department of Meteorology",
            degrees: [
              "Bachelor of Science (B.Sc. Hons.)",
              "Master of Science (M.Sc.)",
            ],
          },
        ],
      },
      {
        group: "Faculty of Law",
        items: [
          {
            department: "Department of Law",
            degrees: [
              "Bachelor of Laws (LL.B. Hons.)",
              "Master of Laws (LL.M.)",
            ],
          },
        ],
      },
      {
        group: "Faculty of Fine Art",
        items: [
          {
            department: "Department of Drawing and Painting",
            degrees: [
              "Bachelor of Fine Art (B.F.A. Hons.)",
              "Master of Fine Art (M.F.A.)",
            ],
          },
          {
            department: "Department of Graphic Design",
            degrees: [
              "Bachelor of Fine Art (B.F.A. Hons.)",
              "Master of Fine Art (M.F.A.)",
            ],
          },
          {
            department: "Department of Printmaking",
            degrees: [
              "Bachelor of Fine Art (B.F.A. Hons.)",
              "Master of Fine Art (M.F.A.)",
            ],
          },
          {
            department: "Department_of Oriental Art",
            degrees: [
              "Bachelor of Fine Art (B.F.A. Hons.)",
              "Master of Fine Art (M.F.A.)",
            ],
          },
          {
            department: "Department of Sculpture",
            degrees: [
              "Bachelor of Fine Art (B.F.A. Hons.)",
              "Master of Fine Art (M.F.A.)",
            ],
          },
          {
            department: "Department of Craft",
            degrees: [
              "Bachelor of Fine Art (B.F.A. Hons.)",
              "Master of Fine Art (M.F.A.)",
            ],
          },
          {
            department: "Department of Art History",
            degrees: [
              "Bachelor of Fine Art (B.F.A. Hons.)",
              "Master of Fine Art (M.F.A.)",
            ],
          },
        ],
      },
    ],
  },
];

export const getUniversity = (id) =>
  UNIVERSITIES.find((u) => u.id === id) ?? null;

export const flatDepartments = (university) =>
  (university?.departments ?? []).flatMap((g) => g.items);
