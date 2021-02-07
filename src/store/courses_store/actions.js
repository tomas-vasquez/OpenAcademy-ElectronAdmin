export const add_course = (data) => ({
  type: "ADD_COURSE",
  data,
});

export const replace_courses = (data) => ({
  type: "REPLACE_COURSE",
  data,
});

export const deleteCourse = (data) => ({
  type: "DELETE_COURSE",
  data,
});
