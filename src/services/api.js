import axios from "axios";

axios.defaults.baseURL =
  "https://api.themoviedb.org/3/trending/movie/day?language=en-US";

axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZmUzYjQ2ODQ5YmI2NTZlYjFhYWJlYjQ4NTE1MjU4NCIsIm5iZiI6MTcyMzk2OTk4My42MTYyOTgsInN1YiI6IjY2YzFhZjJiYmFlZjcyYTBjNGQyZWUzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LyTDU0yqvOM957y6cIFkG5OzmdskXxSjiHtRgevKwr0";

axios.defaults.headers.post["Content-Type"] = "application/json";

export const getHomeMovies = async () => {
  const { data } = await axios.get();
  return data;
};

export const getDetailsMovie = async (movieId) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}`
  );
  return data;
};

export const getCastMovie = async (movieId) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits`
  );
  return data;
};

export const getReviewsMovie = async (movieId) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews`
  );
  return data;
};

export const getSearchMovie = async (query) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${query}`
  );

  console.log(data);
  return data;
};
