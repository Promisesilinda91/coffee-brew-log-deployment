function BrewCard({ brew, onEdit, onDelete }) {
  return (
    <div className="brew">
      <h3>{brew.beans}</h3>
      <p><strong>Method:</strong> {brew.method}</p>
      <p><strong>Coffee:</strong> {brew.coffeeGrams} g</p>
      <p><strong>Water:</strong> {brew.waterGrams} g</p>
      <p><strong>Rating:</strong> {brew.rating}/5</p>
      <p><strong>Notes:</strong> {brew.notes}</p>

      <div className="button-row">
        <button type="button" className="btn btn-dark" onClick={() => onEdit(brew)}>
          Edit
        </button>
        <button type="button" className="btn btn-danger" onClick={() => onDelete(brew.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default BrewCard;
