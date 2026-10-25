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
            group: "Department of Accounting",
            items: [
              "Bachelor of Business Administration in Accounting",
              "Master of Business Administration in Accounting",
            ],
          },
          {
            group: "Department of Management",
            items: [
              "Bachelor of Business Administration in Management",
              "Master of Business Administration in Management",
            ],
          },
          {
            group: "Department of Marketing",
            items: [
              "Bachelor of Business Administration in Marketing",
              "Master of Business Administration in Marketing",
            ],
          },
          {
            group: "Department of Finance",
            items: [
              "Bachelor of Business Administration in Finance",
              "Master of Business Administration in Finance",
            ],
          },
          {
            group: "Department of Banking and Insurance",
            items: [
              "Bachelor of Business Administration in Banking and Insurance",
              "Master of Business Administration in Banking and Insurance",
            ],
          },
          {
            group: "Department of Management Information Systems (MIS)",
            items: [
              "Bachelor of Business Administration in Management Information Systems (MIS)",
              "Master of Business Administration in Management Information Systems (MIS)",
            ],
          },
          {
            group: "Department of Tourism and Hospitality Management",
            items: [
              "Bachelor of Business Administration in Tourism and Hospitality Management",
              "Master of Business Administration in Tourism and Hospitality Management",
            ],
          },
          {
            group: "Department of International Business",
            items: [
              "Bachelor of Business Administration in International Business",
              "Master of Business Administration in International Business",
            ],
          },
          {
            group: "Department of Organization Strategy and Leadership",
            items: [
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
            group: "Department of Physics",
            items: [
              "Bachelor of Science in Physics",
              "Master of Science in Physics",
            ],
          },
          {
            group: "Department of Mathematics",
            items: [
              "Bachelor of Science in Mathematics",
              "Master of Science in Mathematics",
            ],
          },
          {
            group: "Department of Chemistry",
            items: [
              "Bachelor of Science in Chemistry",
              "Master of Science in Chemistry",
            ],
          },
          {
            group: "Department of Applied Mathematics",
            items: [
              "Bachelor of Science in Applied Mathematics",
              "Master of Science in Applied Mathematics",
            ],
          },
          {
            group: "Department of Statistics",
            items: [
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
            group: "Department of Economics",
            items: [
              "Bachelor of Social Science in Economics",
              "Master of Social Science in Economics",
            ],
          },
          {
            group: "Department of Political Science",
            items: [
              "Bachelor of Social Science in Political Science",
              "Master of Social Science in Political Science",
            ],
          },
          {
            group: "Department of International Relations",
            items: [
              "Bachelor of Social Science in International Relations",
              "Master of Social Science in International Relations",
            ],
          },
          {
            group: "Department of Sociology",
            items: [
              "Bachelor of Social Science in Sociology",
              "Master of Social Science in Sociology",
            ],
          },
          {
            group: "Department of Mass Communication & Journalism",
            items: [
              "Bachelor of Social Science in Mass Communication & Journalism",
              "Master of Social Science in Mass Communication & Journalism",
            ],
          },
          {
            group: "Department of Public Administration",
            items: [
              "Bachelor of Social Science in Public Administration",
              "Master of Social Science in Public Administration",
            ],
          },
          {
            group: "Department of Anthropology",
            items: [
              "Bachelor of Social Science in Anthropology",
              "Master of Social Science in Anthropology",
            ],
          },
          {
            group: "Department of Population Sciences",
            items: [
              "Bachelor of Social Science in Population Sciences",
              "Master of Social Science in Population Sciences",
            ],
          },
          {
            group: "Department of Peace and Conflict Studies",
            items: [
              "Bachelor of Social Science in Peace and Conflict Studies",
              "Master of Social Science in Peace and Conflict Studies",
            ],
          },
          {
            group: "Department of Women and Gender Studies",
            items: [
              "Bachelor of Social Science in Women and Gender Studies",
              "Master of Social Science in Women and Gender Studies",
            ],
          },
          {
            group: "Department of Development Studies",
            items: [
              "Bachelor of Social Science in Development Studies",
              "Master of Social Science in Development Studies",
            ],
          },
          {
            group: "Department of Criminology",
            items: [
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
            group: "Department of Bangla",
            items: ["Bachelor of Arts in Bangla", "Master of Arts in Bangla"],
          },
          {
            group: "Department of English",
            items: ["Bachelor of Arts in English", "Master of Arts in English"],
          },
          {
            group: "Department of History",
            items: ["Bachelor of Arts in History", "Master of Arts in History"],
          },
          {
            group: "Department of Philosophy",
            items: [
              "Bachelor of Arts in Philosophy",
              "Master of Arts in Philosophy",
            ],
          },
          {
            group: "Department of Arabic",
            items: ["Bachelor of Arts in Arabic", "Master of Arts in Arabic"],
          },
          {
            group: "Department of Islamic History & Culture",
            items: [
              "Bachelor of Arts in Islamic History & Culture",
              "Master of Arts in Islamic History & Culture",
            ],
          },
          {
            group: "Department of Islamic Studies",
            items: [
              "Bachelor of Arts in Islamic Studies",
              "Master of Arts in Islamic Studies",
            ],
          },
          {
            group: "Department of Linguistics",
            items: [
              "Bachelor of Arts in Linguistics",
              "Master of Arts in Linguistics",
            ],
          },
          {
            group: "Department of Persian Language and Literature",
            items: [
              "Bachelor of Arts in Persian Language and Literature",
              "Master of Arts in Persian Language and Literature",
            ],
          },
          {
            group: "Department of Urdu",
            items: ["Bachelor of Arts in Urdu", "Master of Arts in Urdu"],
          },
          {
            group: "Department of Sanskrit",
            items: [
              "Bachelor of Arts in Sanskrit",
              "Master of Arts in Sanskrit",
            ],
          },
          {
            group: "Department of Pali and Buddhist Studies",
            items: [
              "Bachelor of Arts in Pali and Buddhist Studies",
              "Master of Arts in Pali and Buddhist Studies",
            ],
          },
          {
            group: "Department of Theatre and Performance Studies",
            items: [
              "Bachelor of Arts in Theatre and Performance Studies",
              "Master of Arts in Theatre and Performance Studies",
            ],
          },
          {
            group: "Department of Music",
            items: ["Bachelor of Arts in Music", "Master of Arts in Music"],
          },
          {
            group: "Department of World Religions and Culture",
            items: [
              "Bachelor of Arts in World Religions and Culture",
              "Master of Arts in World Religions and Culture",
            ],
          },
          {
            group: "Department of Information Science and Library Management",
            items: [
              "Bachelor of Arts in Information Science and Library Management",
              "Master of Arts in Information Science and Library Management",
            ],
          },
          {
            group: "Department of Dance",
            items: ["Bachelor of Arts in Dance", "Master of Arts in Dance"],
          },
          {
            group: "Department of Printing and Publication Studies",
            items: [
              "Bachelor of Arts in Printing and Publication Studies",
              "Master of Arts in Printing and Publication Studies",
            ],
          },
          {
            group: "Department of Television, Film and Photography",
            items: [
              "Bachelor of Arts in Television, Film and Photography",
              "Master of Arts in Television, Film and Photography",
            ],
          },
          {
            group: "Department of Japanese Studies",
            items: [
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
            group: "Department of Computer Science and Engineering",
            items: [
              "Bachelor of Science in Computer Science and Engineering",
              "Master of Science in Computer Science and Engineering",
            ],
          },
          {
            group: "Department of Electrical and Electronic Engineering",
            items: [
              "Bachelor of Science in Electrical and Electronic Engineering",
              "Master of Science in Electrical and Electronic Engineering",
            ],
          },
          {
            group: "Department of Applied Chemistry & Chemical Engineering",
            items: [
              "Bachelor of Science in Applied Chemistry & Chemical Engineering",
              "Master of Science in Applied Chemistry & Chemical Engineering",
            ],
          },
          {
            group: "Department of Nuclear Engineering",
            items: [
              "Bachelor of Science in Nuclear Engineering",
              "Master of Science in Nuclear Engineering",
            ],
          },
          {
            group: "Department of Robotics and Mechatronics Engineering",
            items: [
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
            group: "Department of Botany",
            items: [
              "Bachelor of Science in Botany",
              "Master of Science in Botany",
            ],
          },
          {
            group: "Department of Zoology",
            items: [
              "Bachelor of Science in Zoology",
              "Master of Science in Zoology",
            ],
          },
          {
            group: "Department of Biochemistry and Molecular Biology",
            items: [
              "Bachelor of Science in Biochemistry and Molecular Biology",
              "Master of Science in Biochemistry and Molecular Biology",
            ],
          },
          {
            group: "Department of Microbiology",
            items: [
              "Bachelor of Science in Microbiology",
              "Master of Science in Microbiology",
            ],
          },
          {
            group: "Department of Fisheries",
            items: [
              "Bachelor of Science in Fisheries",
              "Master of Science in Fisheries",
            ],
          },
          {
            group: "Department of Psychology",
            items: [
              "Bachelor of Science in Psychology",
              "Master of Science in Psychology",
            ],
          },
          {
            group: "Department of Genetic Engineering and Biotechnology",
            items: [
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
            group: "Department of Pharmacy",
            items: [
              "Bachelor of Pharmacy in Pharmacy",
              "Master of Pharmacy in Pharmacy",
            ],
          },
          {
            group: "Department of Pharmaceutical Chemistry",
            items: [
              "Bachelor of Pharmacy in Pharmaceutical Chemistry",
              "Master of Pharmacy in Pharmaceutical Chemistry",
            ],
          },
          {
            group: "Department of Clinical Pharmacy and Pharmacology",
            items: [
              "Bachelor of Pharmacy in Clinical Pharmacy and Pharmacology",
              "Master of Pharmacy in Clinical Pharmacy and Pharmacology",
            ],
          },
          {
            group: "Department of Pharmaceutical Technology",
            items: [
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
            group: "Department of Geography & Environment",
            items: [
              "Bachelor of Science in Geography & Environment",
              "Master of Science in Geography & Environment",
            ],
          },
          {
            group: "Department of Geology",
            items: [
              "Bachelor of Science in Geology",
              "Master of Science in Geology",
            ],
          },
          {
            group: "Department of Soil, Water & Environment",
            items: [
              "Bachelor of Science in Soil, Water & Environment",
              "Master of Science in Soil, Water & Environment",
            ],
          },
          {
            group: "Department of Oceanography",
            items: [
              "Bachelor of Science in Oceanography",
              "Master of Science in Oceanography",
            ],
          },
          {
            group: "Department of Disaster Science and Climate Resilience",
            items: [
              "Bachelor of Science in Disaster Science and Climate Resilience",
              "Master of Science in Disaster Science and Climate Resilience",
            ],
          },
          {
            group: "Department of Meteorology",
            items: [
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
            group: "Department of Law",
            items: ["Bachelor of Laws in Law", "Master of Laws in Law"],
          },
        ],
      },
      {
        group: "Faculty of Fine Art",
        items: [
          {
            group: "Department of Drawing and Painting",
            items: [
              "Bachelor of Fine Art in Drawing and Painting",
              "Master of Fine Art in Drawing and Painting",
            ],
          },
          {
            group: "Department of Graphic Design",
            items: [
              "Bachelor of Fine Art in Graphic Design",
              "Master of Fine Art in Graphic Design",
            ],
          },
          {
            group: "Department of Printmaking",
            items: [
              "Bachelor of Fine Art in Printmaking",
              "Master of Fine Art in Printmaking",
            ],
          },
          {
            group: "Department of Oriental Art",
            items: [
              "Bachelor of Fine Art in Oriental Art",
              "Master of Fine Art in Oriental Art",
            ],
          },
          {
            group: "Department of Sculpture",
            items: [
              "Bachelor of Fine Art in Sculpture",
              "Master of Fine Art in Sculpture",
            ],
          },
          {
            group: "Department of Craft",
            items: [
              "Bachelor of Fine Art in Craft",
              "Master of Fine Art in Craft",
            ],
          },
          {
            group: "Department of Art History",
            items: [
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
