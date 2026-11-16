import { useState } from "react";
import MovieItem from "./MovieItem";

export default function App() {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Inception",
      rating: 5,
      review: "Great story and visuals"
    },
    {
      id: 2,
      title: "Interstellar",
      rating: 4,
      review: "Amazing soundtrack"
    }
  ]);

  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  function handleAddMovie(e) {
    e.preventDefault();
    if (title.trim() === "") return;

    const newMovie = {
      id: Date.now(),
      title: title,
      rating: Number(rating),
      review: review
    };

    setMovies([...movies, newMovie]);
    setTitle("");
    setRating(5);
    setReview("");
  }

  function handleDeleteMovie(id) {
    const updatedMovies = movies.filter((movie) => movie.id !== id);
    setMovies(updatedMovies);
  }

  return (
    <div style={{ maxWidth: "500px", margin: "30px auto", fontFamily: "Arial" }}>
      <h2>Movies Watch List</h2>

      <form onSubmit={handleAddMovie} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Movie name..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Rating: </label>
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            style={{ padding: "6px" }}
          >
            <option value={1}>1 Star</option>
            <option value={2}>2 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={5}>5 Stars</option>
          </select>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Write a review comment..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "8px 16px",
            backgroundColor: "#2b6cb0",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          Add Movie
        </button>
      </form>

      <div>
        {movies.length === 0 ? (
          <p>No movies added yet.</p>
        ) : (
          movies.map((movie) => (
            <MovieItem
              key={movie.id}
              movie={movie}
              onDelete={handleDeleteMovie}
            />
          ))
        )}
      </div>
    </div>
  );
}
