export function CategoryContent({ category }) {
  return (
    <div style={{ margin: "24px 0", textAlign: "center" }}>
      <h2>{category.title}</h2>
      <p>{category.description}</p>
    </div>
  );
}