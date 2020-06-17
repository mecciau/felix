import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import content from "../../state/content";

import "./FavoriteButton.scss";

const FavoriteButton = ({ movieId, isFavorite, toggleFavorite }) => {
  const onClick = () => toggleFavorite(movieId);
  return (
    <button
      className="button is-primary has-text-weight-bold favorite-button"
      onClick={onClick}
    >
      {isFavorite ? "Remove 💔" : "Favorite"}
    </button>
  );
};

const mapStateToProps = (state, { movieId }) => {
  return {
    isFavorite: content.selectors.isFavoriteById(state, movieId),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // toggleFavorite: (id) => dispatch({ type: types.TOGGLE_FAVORITE, id }),
    toggleFavorite: bindActionCreators(
      content.actions.toggleFavorite,
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteButton);
