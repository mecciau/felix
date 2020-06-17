import * as types from "./types";

export const toggleFavorite = (id) => {
  console.log(id);
  return { type: types.TOGGLE_FAVORITE, id };
};
