export const getFavorites = (state) => state.content.favorite;
export const isFavoriteById = (state, id) =>
  state.content.favorite.includes(id);
