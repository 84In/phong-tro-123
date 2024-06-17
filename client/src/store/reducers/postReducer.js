import actionTypes from "../actions/actionType";

const initState = {
  posts: [],
  newPosts: [],
  msg: "",
  count: 0,
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
    default:
      return state;
  }
};

export default postReducer;
