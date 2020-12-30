export const IOaproveReport = (report) => ({
  type: "io/aproveReport",
  data: report,
});

export const IOdeleteReport = (report) => ({
  type: "io/deleteReport",
  data: report,
});
