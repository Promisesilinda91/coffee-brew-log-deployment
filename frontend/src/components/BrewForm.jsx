function BrewForm({
  editingId,
  beans,
  setBeans,
  method,
  setMethod,
  coffeeGrams,
  setCoffeeGrams,
  waterGrams,
  setWaterGrams,
  rating,
  setRating,
  notes,
  setNotes,
  onSubmit,
  onCancel,
}) {
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="beans">Beans</label>
      <input
        id="beans"
        type="text"
        value={beans}
        onChange={(e) => setBeans(e.target.value)}
        placeholder="e.g. Zimbabwean highlands"
        required
      />

      <label htmlFor="method">Method</label>
      <select
        id="method"
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        required
      >
        <option value="">Select a method</option>
        <option value="Aeropress">Aeropress</option>
        <option value="Drip coffee">Drip coffee</option>
        <option value="V60">V60</option>
        <option value="French press">French press</option>
        <option value="Chemex">Chemex</option>
        <option value="Espresso">Espresso</option>
      </select>

      <div className="form-row">
        <div>
          <label htmlFor="coffeeGrams">Coffee grams</label>
          <input
            id="coffeeGrams"
            type="number"
            min="1"
            step="1"
            value={coffeeGrams}
            onChange={(e) => setCoffeeGrams(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="waterGrams">Water grams</label>
          <input
            id="waterGrams"
            type="number"
            min="1"
            step="1"
            value={waterGrams}
            onChange={(e) => setWaterGrams(e.target.value)}
            required
          />
        </div>
      </div>

      <label htmlFor="rating">Rating (out of 5)</label>
      <input
        id="rating"
        type="number"
        min="1"
        max="5"
        step="1"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        required
      />

      <label htmlFor="notes">Tasting notes</label>
      <textarea
        id="notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="e.g. Heavy body, soft finish, nutty"
        required
      />

      <div className="button-row">
        <button type="submit" className="btn btn-dark">
          {editingId ? "Update Brew" : "Save Brew"}
        </button>

        {editingId && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default BrewForm;
