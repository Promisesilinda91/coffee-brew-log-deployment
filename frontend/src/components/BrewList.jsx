import BrewCard from "./BrewCard";

function BrewList({ brews, filter, setFilter, onEdit, onDelete }) {
  const filteredBrews = brews.filter(
    (brew) => filter === "All" || brew.method === filter
  );

  return (
    <>
      <label htmlFor="filter">Filter by method</label>
      <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="All">All</option>
        <option value="Aeropress">Aeropress</option>
        <option value="Drip coffee">Drip coffee</option>
        <option value="V60">V60</option>
        <option value="French press">French press</option>
        <option value="Chemex">Chemex</option>
        <option value="Espresso">Espresso</option>
      </select>

      <h2>Saved Brews</h2>

      {filteredBrews.length === 0 ? (
        <p className="empty">No brews found.</p>
      ) : (
        filteredBrews.map((brew) => (
          <BrewCard
            key={brew.id}
            brew={brew}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </>
  );
}

export default BrewList;
