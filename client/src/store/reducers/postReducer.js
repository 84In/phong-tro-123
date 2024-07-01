import actionTypes from "../actions/actionType";

const initState = {
  posts: [],
  newPosts: [],
  postOfUserCurrent: [],
  msg: "",
  count: 0,
  dataEdit: [],
};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_POSTS:
    case actionTypes.GET_POSTS_LIMIT:
      return {
        ...state,
        posts: action.posts || [],
        msg: action.msg || "",
        count: action.count || 0,
      };
    case actionTypes.GET_NEW_POSTS:
      return {
        ...state,
        newPosts: action.newPosts || [],
        msg: action.msg || "",
      };
    case actionTypes.GET_POSTS_ADMIN:
      return {
        ...state,
        postOfUserCurrent: action.posts || [],
        msg: action.msg || "",
      };
    case actionTypes.EDIT_DATA:
      return {
        ...state,
        dataEdit: action.dataEdit || [],
      };
    default:
      return state;
  }
};

export default postReducer;
