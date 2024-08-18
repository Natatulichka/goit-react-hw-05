import { useEffect, useState } from "react";
import { getHomeMovies } from "../../services/api";
import Loader from "../../components/Loader/Loader";
import Section from "../../components/Section/Section";
import MovieList from "../../components/MovieList/MovieList/";

function HomePage() {
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchHomeMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { results } = await getHomeMovies();
        setMovies(results);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomeMovies();
  }, []);
  return (
    <>
      <Section>
        <h1>Trending today</h1>
        <ul>{Array.isArray(movies) && <MovieList movies={movies} />}</ul>
        {isLoading && <Loader />}
        {error && <span>error</span>}
      </Section>
    </>
  );
}

export default HomePage;
