import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Cast.module.css";

function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  async function fetchCast(id) {
    try {
      await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=ee05cb5c4e7bec8bf2cb81503e07020d`
      )
        .then((resp) => resp.json())
        .then((data) => {
          setCast(data.cast);
        });
    } catch (err) {
      return console.error(err);
    }
  }

  useEffect(() => {
    fetchCast(movieId);
  }, [movieId, setCast]);

  return (
    <ul className={styles.CastList}>
      {cast.length > 0 ? (
        cast.map(({ id, name, profile_path, character }) => (
          <li className={styles.CastItem} key={id}>
            {profile_path !== null ? (
              <img
                className={styles.CastImage}
                src={`http://image.tmdb.org/t/p/w200${profile_path}`}
                alt={name}
              />
            ) : (
              <img
                className={styles.CastImage}
                src={`https://creol.ucf.edu/wp-content/uploads/sites/2/2018/11/No-Image-Available-200x300.jpg`}
                alt={name}
              />
            )}
            <p className={styles.ActorName}>{name}</p>
            <p className={styles.CharacterName}>{character}</p>
          </li>
        ))
      ) : (
        <p>We don't have any information about this movie's cast.</p>
      )}
    </ul>
  );
}

export default Cast;
