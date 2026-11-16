export default function MovieItem({ movie, onDelete }) {
  function getStars(count) {
    let stars = "";
    for (let i = 0; i < count; i++) {
      stars += "⭐";
    }
    return stars;
  }

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "12px",
        marginBottom: "10px",
        borderRadius: "6px"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0 }}>{movie.title}</h3>
        <button
          onClick={() => onDelete(movie.id)}
          style={{
            backgroundColor: "#e53e3e",
            color: "white",
            border: "none",
            padding: "5px 10px",
            cursor: "pointer",
            borderRadius: "4px"
          }}
        >
          Remove
        </button>
      </div>

      <p style={{ margin: "8px 0" }}>
        Rating: {getStars(movie.rating)} ({movie.rating}/5)
      </p>

      {movie.review && (
        <p style={{ margin: 0, color: "#555" }}>
          Review: {movie.review}
        </p>
      )}
    </div>
  );
}
