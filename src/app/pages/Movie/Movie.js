import React, { useState, Fragment, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import Button from "../../components/Button/Button";
import FavoriteButton from "../../components/FavoriteButton/FavoriteButton";

import useFetch from "../../hooks/useFetch";

import content from "../../state/content";

import "./Movie.scss";

const Movie = ({ token, getMovie, setError, globalLoading, setLoading }) => {
  const headersRef = useRef({
    authorization: token,
  });
  const { movieId } = useParams();

  const [watch, setWatch] = useState(false);
  const [movie, setMovie] = useState(getMovie(movieId));
  const { payload, error, loading } = useFetch({
    endpoint: `content/items/${movieId}`,
    headers: headersRef.current,
    shouldFetch: !movie,
  });

  useEffect(() => {
    if (payload) {
      setMovie(payload);
      setError(error);
      setLoading(loading);
    }
  }, [setMovie, payload, setError, error, setLoading, loading]);

  const toggleModal = () => setWatch((prevState) => !prevState);
  return (
    <div className="section movie-section">
      <div className="container">
        {!!movie && !error && !loading && (
          <Fragment>
            <article className="media">
              <figure className="media-left">
                <img
                  src={movie.image}
                  className="image"
                  width="300"
                  alt={`${movie.title} poster`}
                />
              </figure>
              <div className="media-content">
                <div className="content">
                  <h2 className="title has-text-white">{movie.title}</h2>
                  <p className="subtitle has-text-white">{movie.description}</p>
                  <Button onClick={toggleModal}>Watch</Button>
                  <FavoriteButton movieId={movie.id} />
                </div>
              </div>
            </article>
            <div className={`modal ${watch ? "is-active" : ""}`}>
              <div className="modal-background" onClick={toggleModal}></div>
              <div className="modal-content">
                <div className="videoWrapper">
                  <iframe title="video" src={movie.video}></iframe>
                </div>
              </div>
              <button
                className="modal-close is-large"
                aria-label="close"
                onClick={toggleModal}
              ></button>
            </div>
          </Fragment>
        )}

        {loading && !error && (
          <div>
            <h3 className="has-text-white has-text-centered">
              Loading movie...
            </h3>
          </div>
        )}
        {error && (
          <div>
            <h3 className="has-text-white has-text-centered">{error}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setError: (error) => dispatch({ type: content.types.SET_ERROR, error }),
    setLoading: (loading) =>
      dispatch({ type: content.types.SET_LOADING, loading }),
  };
};

const mapStateToProps = ({ authentication, content }) => {
  return {
    token: authentication.token,
    getMovie: (movieId) => content.movies.find((movie) => movie.id === movieId),
    globalLoading: content.loading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
