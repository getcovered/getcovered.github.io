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
    id: 'nsu',
    name: 'North South University',
    short: 'NSU',
    logo: 'assets/img/nsu.png',
    departments: [
      {
        group: 'School of Business and Economics',
        items: [
          'Department of Accounting & Finance',
          'Department of Economics',
          'Department of Management',
          'Department of Marketing & International Business',
        ],
      },
      {
        group: 'School of Engineering and Physical Sciences',
        items: [
          'Department of Architecture',
          'Department of Civil and Environmental Engineering',
          'Department of Electrical and Computer Engineering',
          'Department of Mathematics and Physics',
        ],
      },
      {
        group: 'School of Humanities and Social Sciences',
        items: [
          'Department of English & Modern Languages',
          'Department of Law',
          'Department of History & Philosophy',
          'Department of Political Science & Sociology',
        ],
      },
      {
        group: 'School of Health and Life Sciences',
        items: [
          'Department of Biochemistry & Microbiology',
          'Department of Environmental Science and Management',
          'Department of Pharmaceutical Sciences',
          'Department of Public Health',
        ],
      },
    ],
  },
];

export const getUniversity = (id) => UNIVERSITIES.find((u) => u.id === id) ?? null;

export const flatDepartments = (university) =>
  (university?.departments ?? []).flatMap((g) => g.items);
