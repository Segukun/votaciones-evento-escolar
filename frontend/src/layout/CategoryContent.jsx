export function CategoryContent({ category }) {
  return (
    <div style={{ margin: "24px 0", textAlign: "center" }}>
      <h2>{category.nombre}</h2>
      <p>{category.descripcion}</p>
    </div>
  );
}
