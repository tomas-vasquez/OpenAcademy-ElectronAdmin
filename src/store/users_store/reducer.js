export default (state = null, action) => {
  if (action.type === "ADD_USER") {
    let aux = state || [];
    aux.push(action.data);
    return [...aux];
  }
  if (action.type === "REPLACE_USERS") {
    return action.data;
  } else if (action.type === "DELETE_USER") {
    let aux = [...state];
    aux = aux.filter((user) => {
      return `${user._id}` !== `${action.data._id}`;
    });
    return [...aux];
  }
  return state;
};
