import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import Movies from "../../components/Movies/Movies";
import useFetch from "../../hooks/useFetch";

import content from "../../state/content";

const Content = ({ token, movies, setMovies }) => {
  const headersRef = useRef({
    authorization: token,
  });

  const { loading, error, payload } = useFetch({
    endpoint: `content/items`,
    headers: headersRef.current,
  });

  useEffect(() => {
    if (payload) setMovies(payload);
  }, [setMovies, payload]);
  return <Movies movies={movies} loading={loading} error={error} />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    setMovies: (movies) => dispatch({ type: content.types.SET_MOVIES, movies }),
  };
};

const mapStateToProps = ({ authentication, content }) => {
  return {
    token: authentication.token,
    movies: content.movies,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
