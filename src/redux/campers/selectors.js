export const selectIsLoading = (state) => state.campers.isLoading;
export const selectFilter = (state) => state.filters.value;
export const selectAllCampers = (state) => state.campers.items;
export const selectCamper = (state) => state.campers.camper;
export const selectTotal = (state) => state.campers.total;
export const selectPerPage = (state) => state.campers.perPage;
export const selectPage = (state) => state.campers.page;
export const selectFavoriteItems = (state) => state.campers.favoriteItem;
