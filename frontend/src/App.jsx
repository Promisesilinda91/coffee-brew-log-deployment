import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import BrewForm from "./components/BrewForm";
import BrewList from "./components/BrewList";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function App() {
  const [brews, setBrews] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [beans, setBeans] = useState("");
  const [method, setMethod] = useState("");
  const [coffeeGrams, setCoffeeGrams] = useState("");
  const [waterGrams, setWaterGrams] = useState("");
  const [rating, setRating] = useState("");
  const [notes, setNotes] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = `Brews: ${brews.length}`;
  }, [brews]);

  useEffect(() => {
    const loadBrews = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/brews`);
        setBrews(response.data);
      } catch (error) {
        console.error(error);
        alert("Unable to load brews.");
      } finally {
        setLoading(false);
      }
    };

    loadBrews();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setBeans("");
    setMethod("");
    setCoffeeGrams("");
    setWaterGrams("");
    setRating("");
    setNotes("");
  };

  const saveBrew = async (event) => {
    event.preventDefault();

    const brew = {
      beans: beans.trim(),
      method,
      coffeeGrams,
      waterGrams,
      rating,
      notes: notes.trim(),
    };

    if (
      !brew.beans ||
      !brew.method ||
      !brew.coffeeGrams ||
      !brew.waterGrams ||
      !brew.rating ||
      !brew.notes
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      if (editingId !== null) {
        const response = await axios.put(
          `${API_URL}/api/brews/${editingId}`,
          brew
        );

        setBrews((currentBrews) =>
          currentBrews.map((b) =>
            b.id === editingId ? response.data : b
          )
        );

        alert("Coffee updated!");
      } else {
        const response = await axios.post(`${API_URL}/api/brews`, brew);
        setBrews((currentBrews) => [response.data, ...currentBrews]);
        alert("Coffee Saved!");
      }

      resetForm();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "Something went wrong.");
    }
  };

  const deleteBrew = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/brews/${id}`);
      setBrews((currentBrews) => currentBrews.filter((brew) => brew.id !== id));

      if (editingId === id) {
        resetForm();
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "Delete failed.");
    }
  };

  const editBrew = (brew) => {
    setEditingId(brew.id);
    setBeans(brew.beans || "");
    setMethod(brew.method || "");
    setCoffeeGrams(brew.coffeeGrams ?? "");
    setWaterGrams(brew.waterGrams ?? "");
    setRating(brew.rating ?? "");
    setNotes(brew.notes || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Brews: {brews.length}</h1>
        <p className="subtitle">Coffee Brew Log</p>

        <BrewForm
          editingId={editingId}
          beans={beans}
          setBeans={setBeans}
          method={method}
          setMethod={setMethod}
          coffeeGrams={coffeeGrams}
          setCoffeeGrams={setCoffeeGrams}
          waterGrams={waterGrams}
          setWaterGrams={setWaterGrams}
          rating={rating}
          setRating={setRating}
          notes={notes}
          setNotes={setNotes}
          onSubmit={saveBrew}
          onCancel={resetForm}
        />

        <hr />

        {loading ? (
          <p className="empty">Loading brews...</p>
        ) : (
          <BrewList
            brews={brews}
            filter={filter}
            setFilter={setFilter}
            onEdit={editBrew}
            onDelete={deleteBrew}
          />
        )}
      </div>
    </div>
  );
}

export default App;
