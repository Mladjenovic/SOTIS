const host = "https://localhost:5001";

export const registerRoute = `${host}/api/Users/register`;
export const loginRoute = `${host}/api/Users/login`;
export const getAllProfesorsRoute = `${host}/api/Professors`;
export const createSubjectRoute = `${host}/api/Subjects`;
export const getAllSubjectsRoute = `${host}/api/Subjects`;

export const getAllStudentsForSubjectRoute = `${host}/api/Subjects`;
export const availableStudentsRoute = `${host}/api/Subjects`;
export const addNewStudentRoute = `${host}/api/Subjects/student`;

export const getAllTestForSubjectRoute = `${host}/api/Tests/professor`;

export const getAllProblemsRoute = `${host}/api/Problems`;
export const createNewProblemRoute = `${host}/api/Problems`;
