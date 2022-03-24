import { useEffect, useState } from "react";
import {
  Link,
  Outlet,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import styles from "./MoviesPage.module.css";

function MoviesPage() {
  let navigate = useNavigate();
  let params = useParams();
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useSearchParams();
  const query = searchQuery.get("query");

  async function fetchSearchedMovies(searchInput) {
    try {
      await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=ee05cb5c4e7bec8bf2cb81503e07020d&query=${searchInput}`
      )
        .then((resp) => resp.json())
        .then((data) => {
          setMovies(data.results);
        });
    } catch (err) {
      return console.error(err);
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formQuery = form.elements.query.value;
    if (formQuery === "") {
      return;
    } else {
      setSearchQuery({ query: formQuery });
      fetchSearchedMovies(query);
    }
    form.reset();
  };

  useEffect(() => {
    if (query === null || query === "" || movies === null) {
      setMovies([]);
      return;
    }
    fetchSearchedMovies(query);
  }, [query, setSearchQuery]);

  return (
    <>
      <button
        className={styles.GoBackButton}
        onClick={() => {
          navigate(-1);
        }}
      >
        Go back
      </button>
      {!params.movieId && (
        <div>
          <form className={styles.SearchForm} onSubmit={onSubmit}>
            <input className={styles.SearchInput} type="text" name="query" />
            <button className={styles.SearchButton} type="submit">
              Search
            </button>
          </form>
          <ul className={styles.FoundMoviesList}>
            {movies.map(({ id, original_title }) => (
              <li key={id}>
                <Link
                  className={styles.FoundMovieItem}
                  to={`/movies/${id}`}
                >
                  {original_title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {params.movieId && <Outlet />}
    </>
  );
}

export default MoviesPage;
