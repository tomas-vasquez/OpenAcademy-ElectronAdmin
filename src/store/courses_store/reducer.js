export default (state = null, action) => {
  if (action.type === "ADD_COURSE") {
    let aux = state || [];
    aux.push(action.data);
    return [...aux];
  }
  if (action.type === "REPLACE_COURSE") {
    return action.data;
  } else if (action.type === "DELETE_COURSE") {
    let aux = [...state];
    aux = aux.filter((course) => {
      return `${course._id}` !== `${action.data._id}`;
    });
    return [...aux];
  }
  return state;
};
