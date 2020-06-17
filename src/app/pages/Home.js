import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import useFetch from "../hooks/useFetch";

import content from "../state/content";

import Hero from "../components/Hero/Hero";
import Movies from "../components/Movies/Movies";
import Button from "../components/Button/Button";

const Home = ({ setMovies, setError, setLoading, movies, globalLoading }) => {
  const { loading, error, payload } = useFetch({
    endpoint: `content/free-items`,
  });

  useEffect(() => {
    if (payload) setMovies(payload);
    if (error) setError(error);
    if (loading !== globalLoading) setLoading(loading);
  }, [setMovies, setError, setLoading, loading, error, payload, globalLoading]);

  return (
    <Fragment>
      <Hero />
      <Movies movies={movies} loading={loading} error={error}>
        <div className="has-text-centered">
          <Button>Get More Content</Button>
        </div>
      </Movies>
    </Fragment>
  );
};
const mapStateToProps = ({ content }) => {
  return {
    movies: content.movies,
    globalLoading: content.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setMovies: (movies) => dispatch({ type: content.types.SET_MOVIES, movies }),
    setError: (error) => dispatch({ type: content.types.SET_ERROR, error }),
    setLoading: (loading) =>
      dispatch({ type: content.types.SET_LOADING, loading }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
// export default Home;
