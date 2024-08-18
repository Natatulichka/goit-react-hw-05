import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";

import Loader from "../../components/Loader/Loader";
import Section from "../../components/Section/Section";
import { getDetailsMovie } from "../../services/api";
import css from "./MovieDetailsPage.module.css";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [detailsMovie, setDetailsMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? "/");

  useEffect(() => {
    const fetchDetailsMovie = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getDetailsMovie(movieId);
        setDetailsMovie(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetailsMovie();
  }, [movieId]);

  return (
    <>
      {detailsMovie !== null && (
        <>
          <Section>
            <Link className={css.btn} to={backLinkRef.current}>
              {" "}
              <GoArrowLeft className={css.goArrowLeft} />
              Go back
            </Link>
            <div className={css.boxMain}>
              <div className={css.boxImg}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${detailsMovie.backdrop_path}`}
                  alt={detailsMovie.title}
                />
              </div>
              <div className={css.details}>
                <h2 className={css.title}>
                  {detailsMovie.title} ({detailsMovie.release_date.slice(0, 4)})
                </h2>
                <p className={css.text}>
                  User score: {Math.round(detailsMovie.vote_average * 10)}%
                </p>
                <h3 className={css.subtitle}>Overview</h3>
                <p className={css.text}>{detailsMovie.overview}</p>
                <h3 className={css.subtitle}>Genres</h3>
                <p>
                  {detailsMovie.genres.map((genre) => genre.name).join(", ")}
                </p>
              </div>
            </div>
          </Section>
          <Section>
            <div className={css.information}>
              <h3 className={css.informationTitle}>Additional information</h3>
              <ul className={css.list}>
                <li className={css.item}>
                  <Link className={css.btn} to="cast">
                    Cast
                  </Link>
                </li>
                <li className={css.item}>
                  <Link className={css.btn} to="reviews">
                    Reviews
                  </Link>
                </li>
              </ul>
            </div>
          </Section>

          <div>
            <Outlet />
          </div>
        </>
      )}
      {isLoading && <Loader />}
      {error !== null && (
        <p style={{ color: "red" }}>{error}. Please, try again later.</p>
      )}
    </>
  );
}

export default MovieDetailsPage;
