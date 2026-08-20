import { CategoryProgress } from "./components/categoryProgress";

const CATEGORIAS = [
  { id: 1, title: "Mejor Película", description: "Vota por la película del año" },
  { id: 2, title: "Mejor Actor", description: "Vota por la mejor actuación masculina" },
  { id: 3, title: "Mejor Director", description: "Vota por la mejor dirección" },
];

export default function App() {
  return <CategoryProgress categories={CATEGORIAS} />;
}