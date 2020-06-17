import React from "react";
import Card from "../Card/Card";
import "./Movies.scss";

const Movies = ({ movies, error, loading, children }) => {
  return (
    <div className="section">
      <div className="container movies-container">
        {loading && !error && (
          <h3 className="has-text-white has-text-centered">
            {movies.length > 0 ? (
              <div>Loading more movies...</div>
            ) : (
              <div>Loading movies...</div>
            )}
          </h3>
        )}
        {error && (
          <h3 className="has-text-danger has-text-centered">{error}</h3>
        )}
        <div className="columns is-multiline">
          {movies.map((movie) => {
            return (
              <Card
                key={movie.id}
                title={movie.title}
                description={movie.description.substring(0, 55)}
                image={movie.image}
                movieId={movie.id}
              />
            );
          })}
        </div>
        {children}
      </div>
    </div>
  );
};

export default Movies;
