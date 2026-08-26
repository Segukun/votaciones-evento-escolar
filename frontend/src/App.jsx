import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import CategoryProgress from "./layout/categoryProgress";
import Footer from "./layout/footer";
import Header from "./layout/Header";
import "./App.css";

const API_URL = "http://localhost:3000";

export default function App() {
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/categorias`)
      .then((res) => res.json())
      .then((data) => {
        setCategorias(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error al obtener categorias:", err);
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        Cargando datos...
      </div>
    );
  }

  return (
    <div className="app-container">
      <Header />

      <main className="main-content">
        <Routes>
          {/* Redirige a la primera categoría disponible en la BD */}
          <Route
            path="/"
            element={
              categorias.length > 0 ? (
                <Navigate to={`/categoria/${categorias[0]._id}`} replace />
              ) : (
                <p style={{ textAlign: "center" }}>
                  No hay categorías registradas.
                </p>
              )
            }
          />

          <Route
            path="/categoria/:categoryId"
            element={<CategoryProgress categories={categorias} />}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
