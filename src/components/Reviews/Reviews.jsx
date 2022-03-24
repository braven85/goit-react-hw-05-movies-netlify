import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Reviews.module.css";

function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  async function fetchReviews(id) {
    try {
      await fetch(
        `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=ee05cb5c4e7bec8bf2cb81503e07020d`
      )
        .then((resp) => resp.json())
        .then((data) => {
          setReviews(data.results);
        });
    } catch (err) {
      return console.error(err);
    }
  }

  useEffect(() => {
    fetchReviews(movieId);
  }, [movieId, setReviews]);

  return (
    <ul className={styles.ReviewsList}>
      {reviews.length > 0 ? (
        reviews.map(({ id, author, content }) => (
          <li className={styles.ReviewItem} key={id}>
            <p>{content}</p>
            <h3>Author: {author}</h3>
          </li>
        ))
      ) : (
        <p>We don't have any reviews for this movie.</p>
      )}
    </ul>
  );
}

export default Reviews;
