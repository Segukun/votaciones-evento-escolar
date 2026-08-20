import Header from "./layout/Header";
import Footer from "./layout/footer";
import CategoryProgress from "./layout/categoryProgress";
import "./App.css";

const CATEGORIAS = [
  { id: 1, title: "Autos Electrónicos", description: "Vota por el mejor diseño ecológico" },
  { id: 2, title: "Autos Clásicos", description: "Vota por la mejor restauración" },
  { id: 3, title: "Autos de Competición", description: "Vota por el modelo más aerodinámico" },
];

export default function App() {
  return (
    <div className="app-container">
      <Header />
      
      <main className="main-content">
        <CategoryProgress categories={CATEGORIAS} />
      </main>

      <Footer />
    </div>
  );
}