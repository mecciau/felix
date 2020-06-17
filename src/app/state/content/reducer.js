import * as types from "./types";

const DEFAULT_CONTENT_STATE = {
  favorite: [],
  movies: [],
  error: null,
  loading: null,
  // freeMovies: []
};

const content = (state = DEFAULT_CONTENT_STATE, action) => {
  switch (action.type) {
    case types.TOGGLE_FAVORITE: {
      if (!state.favorite.includes(action.id)) {
        return { ...state, favorite: [...state.favorite, action.id] };
      } else {
        return {
          ...state,
          favorite: state.favorite.filter((id) => id !== action.id),
        };
      }
    }
    case types.SET_ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }
    case types.SET_LOADING: {
      return {
        ...state,
        loading: action.loading,
      };
    }
    case types.SET_MOVIES: {
      return {
        ...state,
        movies: action.movies,
      };
    }
    default:
      return state;
  }
};

export default content;
