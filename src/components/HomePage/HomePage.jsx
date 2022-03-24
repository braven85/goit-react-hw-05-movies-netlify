import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  async function fetchApi() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=ee05cb5c4e7bec8bf2cb81503e07020d`
      );
      if (!response.ok) {
        throw new Error(response.status);
      } else {
        return response.json();
      }
    } catch (err) {
      return console.error(err);
    }
  }

  function renderMovies() {
    fetchApi()
      .then((response) => {
        setMovies(response);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (!isLoaded) {
      renderMovies();
    }
  });

  return (
    <>
      <h1>Trending today</h1>
      <ul className={styles.List}>
        {isLoaded === false ? (
          <p>Loading...</p>
        ) : (
          movies.results.map(({ id, original_title }) => (
            <li key={id}>
              <Link
                className={styles.ListItem}
                to={`/movies/${id}`}
              >
                {original_title}
              </Link>
            </li>
          ))
        )}
      </ul>
    </>
  );
}

export default HomePage;
