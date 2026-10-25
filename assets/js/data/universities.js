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
          "Department of Accounting",
          "Department of Management",
          "Department of Marketing",
          "Department of Finance",
          "Department of Banking and Insurance",
          "Department of Management Information Systems (MIS)",
          "Department of Tourism and Hospitality Management",
          "Department of International Business",
          "Department of Organization Strategy and Leadership",
        ],
      },
      {
        group: "Faculty of Science",
        items: [
          "Department of Physics",
          "Department of Mathematics",
          "Department of Chemistry",
          "Department of Applied Mathematics",
          "Department of Statistics",
        ],
      },
      {
        group: "Faculty of Social Sciences",
        items: [
          "Department of Economics",
          "Department of Political Science",
          "Department of International Relations",
          "Department of Sociology",
          "Department of Mass Communication & Journalism",
          "Department of Public Administration",
          "Department of Anthropology",
          "Department of Population Sciences",
          "Department of Peace and Conflict Studies",
          "Department of Women and Gender Studies",
          "Department of Development Studies",
          "Department of Criminology",
        ],
      },
      {
        group: "Faculty of Arts",
        items: [
          "Department of Bangla",
          "Department of English",
          "Department of History",
          "Department of Philosophy",
          "Department of Arabic",
          "Department of Islamic History & Culture",
          "Department of Islamic Studies",
          "Department of Linguistics",
          "Department of Persian Language and Literature",
          "Department of Urdu",
          "Department of Sanskrit",
          "Department of Pali and Buddhist Studies",
          "Department of Theatre and Performance Studies",
          "Department of Music",
          "Department of World Religions and Culture",
          "Department of Information Science and Library Management",
          "Department of Dance",
          "Department of Printing and Publication Studies",
          "Department of Television, Film and Photography",
          "Department of Japanese Studies",
        ],
      },
      {
        group: "Faculty of Engineering and Technology",
        items: [
          "Department of Computer Science and Engineering",
          "Department of Electrical and Electronic Engineering",
          "Department of Applied Chemistry & Chemical Engineering",
          "Department of Nuclear Engineering",
          "Department of Robotics and Mechatronics Engineering",
        ],
      },
      {
        group: "Faculty of Biological Sciences",
        items: [
          "Department of Botany",
          "Department of Zoology",
          "Department of Biochemistry and Molecular Biology",
          "Department of Microbiology",
          "Department of Fisheries",
          "Department of Psychology",
          "Department of Genetic Engineering and Biotechnology",
        ],
      },
      {
        group: "Faculty of Pharmacy",
        items: [
          "Department of Pharmacy",
          "Department of Pharmaceutical Chemistry",
          "Department of Clinical Pharmacy and Pharmacology",
          "Department of Pharmaceutical Technology",
        ],
      },
      {
        group: "Faculty of Earth and Environmental Sciences",
        items: [
          "Department of Geography & Environment",
          "Department of Geology",
          "Department of Soil, Water & Environment",
          "Department of Oceanography",
          "Department of Disaster Science and Climate Resilience",
          "Department of Meteorology",
        ],
      },
      {
        group: "Faculty of Law",
        items: ["Department of Law"],
      },
      {
        group: "Faculty of Fine Art",
        items: [
          "Department of Drawing and Painting",
          "Department of Graphic Design",
          "Department of Printmaking",
          "Department of Oriental Art",
          "Department of Sculpture",
          "Department of Craft",
          "Department of Art History",
        ],
      },
    ],
  },
  {
    id: "bau",
    name: "Bangladesh Agricultural University",
    short: "BAU",
    logo: "assets/img/bau.svg",
    departments: [
      {
        group: "Faculty of Veterinary Science",
        items: [
          "Department of Anatomy and Histology",
          "Department of Microbiology and Hygiene",
          "Department of Physiology",
          "Department of Pharmacology",
          "Department of Parasitology",
          "Department of Pathology",
          "Department of Medicine",
          "Department of Surgery and Obstetrics",
        ],
      },
      {
        group: "Faculty of Agriculture",
        items: [
          "Department of Agronomy",
          "Department of Soil Science",
          "Department of Entomology",
          "Department of Horticulture",
          "Department of Plant Pathology",
          "Department of Crop Botany",
          "Department of Genetics and Plant Breeding",
          "Department of Agricultural Extension Education",
          "Department of Agricultural Chemistry",
          "Department of Biochemistry and Molecular Biology",
          "Department of Languages",
          "Department of Agroforestry",
          "Department of Seed Science and Technology",
          "Department of Biotechnology",
          "Department of Environmental Science",
          "Department of Food Safety Management",
        ],
      },
      {
        group: "Faculty of Animal Husbandry",
        items: [
          "Department of Animal Breeding and Genetics",
          "Department of Animal Science",
          "Department of Animal Nutrition",
          "Department of Dairy Science",
          "Department of Poultry Science",
        ],
      },
      {
        group: "Faculty of Agricultural Economics & Rural Sociology",
        items: [
          "Department of Agricultural Economics",
          "Department of Agricultural Finance and Banking",
          "Department of Agricultural and Applied Statistics",
          "Department of Agribusiness and Marketing",
          "Department of Rural Sociology",
        ],
      },
      {
        group: "Faculty of Agricultural Engineering & Technology",
        items: [
          "Department of Farm Structure and Environmental Engineering",
          "Department of Farm Power and Machinery",
          "Department of Irrigation and Water Management",
          "Department of Food Engineering and Technology",
          "Department of Computer Science and Mathematics",
          "Department of Physics",
        ],
      },
      {
        group: "Faculty of Fisheries",
        items: [
          "Department of Fisheries Biology and Genetics",
          "Department of Aquaculture",
          "Department of Fisheries Management",
          "Department of Fisheries Technology",
          "Department of Marine Fisheries Science",
        ],
      },
    ],
  },
];

export const getUniversity = (id) =>
  UNIVERSITIES.find((u) => u.id === id) ?? null;

export const flatDepartments = (university) =>
  (university?.departments ?? []).flatMap((g) => g.items);
