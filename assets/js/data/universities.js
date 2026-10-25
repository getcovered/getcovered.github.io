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
              "Bachelor of Business Administration in Accounting",
              "Master of Business Administration in Accounting",
            ],
          },
          {
            department: "Department of Management",
            degrees: [
              "Bachelor of Business Administration in Management",
              "Master of Business Administration in Management",
            ],
          },
          {
            department: "Department of Marketing",
            degrees: [
              "Bachelor of Business Administration in Marketing",
              "Master of Business Administration in Marketing",
            ],
          },
          {
            department: "Department of Finance",
            degrees: [
              "Bachelor of Business Administration in Finance",
              "Master of Business Administration in Finance",
            ],
          },
          {
            department: "Department of Banking and Insurance",
            degrees: [
              "Bachelor of Business Administration in Banking and Insurance",
              "Master of Business Administration in Banking and Insurance",
            ],
          },
          {
            department: "Department of Management Information Systems (MIS)",
            degrees: [
              "Bachelor of Business Administration in Management Information Systems (MIS)",
              "Master of Business Administration in Management Information Systems (MIS)",
            ],
          },
          {
            department: "Department of Tourism and Hospitality Management",
            degrees: [
              "Bachelor of Business Administration in Tourism and Hospitality Management",
              "Master of Business Administration in Tourism and Hospitality Management",
            ],
          },
          {
            department: "Department of International Business",
            degrees: [
              "Bachelor of Business Administration in International Business",
              "Master of Business Administration in International Business",
            ],
          },
          {
            department: "Department of Organization Strategy and Leadership",
            degrees: [
              "Bachelor of Business Administration in Organization Strategy and Leadership",
              "Master of Business Administration in Organization Strategy and Leadership",
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
              "Bachelor of Science in Physics",
              "Master of Science in Physics",
            ],
          },
          {
            department: "Department of Mathematics",
            degrees: [
              "Bachelor of Science in Mathematics",
              "Master of Science in Mathematics",
            ],
          },
          {
            department: "Department of Chemistry",
            degrees: [
              "Bachelor of Science in Chemistry",
              "Master of Science in Chemistry",
            ],
          },
          {
            department: "Department of Applied Mathematics",
            degrees: [
              "Bachelor of Science in Applied Mathematics",
              "Master of Science in Applied Mathematics",
            ],
          },
          {
            department: "Department of Statistics",
            degrees: [
              "Bachelor of Science in Statistics",
              "Master of Science in Statistics",
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
              "Bachelor of Social Science in Economics",
              "Master of Social Science in Economics",
            ],
          },
          {
            department: "Department of Political Science",
            degrees: [
              "Bachelor of Social Science in Political Science",
              "Master of Social Science in Political Science",
            ],
          },
          {
            department: "Department of International Relations",
            degrees: [
              "Bachelor of Social Science in International Relations",
              "Master of Social Science in International Relations",
            ],
          },
          {
            department: "Department of Sociology",
            degrees: [
              "Bachelor of Social Science in Sociology",
              "Master of Social Science in Sociology",
            ],
          },
          {
            department: "Department of Mass Communication & Journalism",
            degrees: [
              "Bachelor of Social Science in Mass Communication & Journalism",
              "Master of Social Science in Mass Communication & Journalism",
            ],
          },
          {
            department: "Department of Public Administration",
            degrees: [
              "Bachelor of Social Science in Public Administration",
              "Master of Social Science in Public Administration",
            ],
          },
          {
            department: "Department of Anthropology",
            degrees: [
              "Bachelor of Social Science in Anthropology",
              "Master of Social Science in Anthropology",
            ],
          },
          {
            department: "Department of Population Sciences",
            degrees: [
              "Bachelor of Social Science in Population Sciences",
              "Master of Social Science in Population Sciences",
            ],
          },
          {
            department: "Department of Peace and Conflict Studies",
            degrees: [
              "Bachelor of Social Science in Peace and Conflict Studies",
              "Master of Social Science in Peace and Conflict Studies",
            ],
          },
          {
            department: "Department of Women and Gender Studies",
            degrees: [
              "Bachelor of Social Science in Women and Gender Studies",
              "Master of Social Science in Women and Gender Studies",
            ],
          },
          {
            department: "Department of Development Studies",
            degrees: [
              "Bachelor of Social Science in Development Studies",
              "Master of Social Science in Development Studies",
            ],
          },
          {
            department: "Department of Criminology",
            degrees: [
              "Bachelor of Social Science in Criminology",
              "Master of Social Science in Criminology",
            ],
          },
        ],
      },
      {
        group: "Faculty of Arts",
        items: [
          {
            department: "Department of Bangla",
            degrees: ["Bachelor of Arts in Bangla", "Master of Arts in Bangla"],
          },
          {
            department: "Department of English",
            degrees: [
              "Bachelor of Arts in English",
              "Master of Arts in English",
            ],
          },
          {
            department: "Department of History",
            degrees: [
              "Bachelor of Arts in History",
              "Master of Arts in History",
            ],
          },
          {
            department: "Department of Philosophy",
            degrees: [
              "Bachelor of Arts in Philosophy",
              "Master of Arts in Philosophy",
            ],
          },
          {
            department: "Department of Arabic",
            degrees: ["Bachelor of Arts in Arabic", "Master of Arts in Arabic"],
          },
          {
            department: "Department of Islamic History & Culture",
            degrees: [
              "Bachelor of Arts in Islamic History & Culture",
              "Master of Arts in Islamic History & Culture",
            ],
          },
          {
            department: "Department of Islamic Studies",
            degrees: [
              "Bachelor of Arts in Islamic Studies",
              "Master of Arts in Islamic Studies",
            ],
          },
          {
            department: "Department of Linguistics",
            degrees: [
              "Bachelor of Arts in Linguistics",
              "Master of Arts in Linguistics",
            ],
          },
          {
            department: "Department of Persian Language and Literature",
            degrees: [
              "Bachelor of Arts in Persian Language and Literature",
              "Master of Arts in Persian Language and Literature",
            ],
          },
          {
            department: "Department of Urdu",
            degrees: ["Bachelor of Arts in Urdu", "Master of Arts in Urdu"],
          },
          {
            department: "Department of Sanskrit",
            degrees: [
              "Bachelor of Arts in Sanskrit",
              "Master of Arts in Sanskrit",
            ],
          },
          {
            department: "Department of Pali and Buddhist Studies",
            degrees: [
              "Bachelor of Arts in Pali and Buddhist Studies",
              "Master of Arts in Pali and Buddhist Studies",
            ],
          },
          {
            department: "Department of Theatre and Performance Studies",
            degrees: [
              "Bachelor of Arts in Theatre and Performance Studies",
              "Master of Arts in Theatre and Performance Studies",
            ],
          },
          {
            department: "Department of Music",
            degrees: ["Bachelor of Arts in Music", "Master of Arts in Music"],
          },
          {
            department: "Department of World Religions and Culture",
            degrees: [
              "Bachelor of Arts in World Religions and Culture",
              "Master of Arts in World Religions and Culture",
            ],
          },
          {
            department:
              "Department of Information Science and Library Management",
            degrees: [
              "Bachelor of Arts in Information Science and Library Management",
              "Master of Arts in Information Science and Library Management",
            ],
          },
          {
            department: "Department of Dance",
            degrees: ["Bachelor of Arts in Dance", "Master of Arts in Dance"],
          },
          {
            department: "Department of Printing and Publication Studies",
            degrees: [
              "Bachelor of Arts in Printing and Publication Studies",
              "Master of Arts in Printing and Publication Studies",
            ],
          },
          {
            department: "Department of Television, Film and Photography",
            degrees: [
              "Bachelor of Arts in Television, Film and Photography",
              "Master of Arts in Television, Film and Photography",
            ],
          },
          {
            department: "Department of Japanese Studies",
            degrees: [
              "Bachelor of Arts in Japanese Studies",
              "Master of Arts in Japanese Studies",
            ],
          },
        ],
      },
      {
        group: "Faculty of Engineering and Technology",
        items: [
          {
            department: "Department of Computer Science and Engineering",
            degrees: [
              "Bachelor of Science in Computer Science and Engineering",
              "Master of Science in Computer Science and Engineering",
            ],
          },
          {
            department: "Department of Electrical and Electronic Engineering",
            degrees: [
              "Bachelor of Science in Electrical and Electronic Engineering",
              "Master of Science in Electrical and Electronic Engineering",
            ],
          },
          {
            department:
              "Department of Applied Chemistry & Chemical Engineering",
            degrees: [
              "Bachelor of Science in Applied Chemistry & Chemical Engineering",
              "Master of Science in Applied Chemistry & Chemical Engineering",
            ],
          },
          {
            department: "Department of Nuclear Engineering",
            degrees: [
              "Bachelor of Science in Nuclear Engineering",
              "Master of Science in Nuclear Engineering",
            ],
          },
          {
            department: "Department of Robotics and Mechatronics Engineering",
            degrees: [
              "Bachelor of Science in Robotics and Mechatronics Engineering",
              "Master of Science in Robotics and Mechatronics Engineering",
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
              "Bachelor of Science in Botany",
              "Master of Science in Botany",
            ],
          },
          {
            department: "Department of Zoology",
            degrees: [
              "Bachelor of Science in Zoology",
              "Master of Science in Zoology",
            ],
          },
          {
            department: "Department of Biochemistry and Molecular Biology",
            degrees: [
              "Bachelor of Science in Biochemistry and Molecular Biology",
              "Master of Science in Biochemistry and Molecular Biology",
            ],
          },
          {
            department: "Department of Microbiology",
            degrees: [
              "Bachelor of Science in Microbiology",
              "Master of Science in Microbiology",
            ],
          },
          {
            department: "Department of Fisheries",
            degrees: [
              "Bachelor of Science in Fisheries",
              "Master of Science in Fisheries",
            ],
          },
          {
            department: "Department of Psychology",
            degrees: [
              "Bachelor of Science in Psychology",
              "Master of Science in Psychology",
            ],
          },
          {
            department: "Department of Genetic Engineering and Biotechnology",
            degrees: [
              "Bachelor of Science in Genetic Engineering and Biotechnology",
              "Master of Science in Genetic Engineering and Biotechnology",
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
              "Bachelor of Pharmacy in Pharmacy",
              "Master of Pharmacy in Pharmacy",
            ],
          },
          {
            department: "Department of Pharmaceutical Chemistry",
            degrees: [
              "Bachelor of Pharmacy in Pharmaceutical Chemistry",
              "Master of Pharmacy in Pharmaceutical Chemistry",
            ],
          },
          {
            department: "Department of Clinical Pharmacy and Pharmacology",
            degrees: [
              "Bachelor of Pharmacy in Clinical Pharmacy and Pharmacology",
              "Master of Pharmacy in Clinical Pharmacy and Pharmacology",
            ],
          },
          {
            department: "Department of Pharmaceutical Technology",
            degrees: [
              "Bachelor of Pharmacy in Pharmaceutical Technology",
              "Master of Pharmacy in Pharmaceutical Technology",
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
              "Bachelor of Science in Geography & Environment",
              "Master of Science in Geography & Environment",
            ],
          },
          {
            department: "Department of Geology",
            degrees: [
              "Bachelor of Science in Geology",
              "Master of Science in Geology",
            ],
          },
          {
            department: "Department of Soil, Water & Environment",
            degrees: [
              "Bachelor of Science in Soil, Water & Environment",
              "Master of Science in Soil, Water & Environment",
            ],
          },
          {
            department: "Department of Oceanography",
            degrees: [
              "Bachelor of Science in Oceanography",
              "Master of Science in Oceanography",
            ],
          },
          {
            department: "Department of Disaster Science and Climate Resilience",
            degrees: [
              "Bachelor of Science in Disaster Science and Climate Resilience",
              "Master of Science in Disaster Science and Climate Resilience",
            ],
          },
          {
            department: "Department of Meteorology",
            degrees: [
              "Bachelor of Science in Meteorology",
              "Master of Science in Meteorology",
            ],
          },
        ],
      },
      {
        group: "Faculty of Law",
        items: [
          {
            department: "Department of Law",
            degrees: ["Bachelor of Laws in Law", "Master of Laws in Law"],
          },
        ],
      },
      {
        group: "Faculty of Fine Art",
        items: [
          {
            department: "Department of Drawing and Painting",
            degrees: [
              "Bachelor of Fine Art in Drawing and Painting",
              "Master of Fine Art in Drawing and Painting",
            ],
          },
          {
            department: "Department of Graphic Design",
            degrees: [
              "Bachelor of Fine Art in Graphic Design",
              "Master of Fine Art in Graphic Design",
            ],
          },
          {
            department: "Department of Printmaking",
            degrees: [
              "Bachelor of Fine Art in Printmaking",
              "Master of Fine Art in Printmaking",
            ],
          },
          {
            department: "Department of Oriental Art",
            degrees: [
              "Bachelor of Fine Art in Oriental Art",
              "Master of Fine Art in Oriental Art",
            ],
          },
          {
            department: "Department of Sculpture",
            degrees: [
              "Bachelor of Fine Art in Sculpture",
              "Master of Fine Art in Sculpture",
            ],
          },
          {
            department: "Department of Craft",
            degrees: [
              "Bachelor of Fine Art in Craft",
              "Master of Fine Art in Craft",
            ],
          },
          {
            department: "Department of Art History",
            degrees: [
              "Bachelor of Fine Art in Art History",
              "Master of Fine Art in Art History",
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
