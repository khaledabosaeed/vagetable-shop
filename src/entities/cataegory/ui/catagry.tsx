import { useCategories } from "../api/categoty";
import {  CategoryCard } from "./catagory-card";

const Category = () => {
  const { data: categories = [] } = useCategories();

  return (
    <section className="w-[92%] mx-auto mt-10">
      <h2
        className="text-3xl font-bold mb-6"
        style={{ color: "hsl(var(--text-primary))" }}
      >
        Fresh Categories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, idx) => (
          <CategoryCard key={category.id} category={category} idx={idx} />
        ))}
      </div>
    </section>
  );
};
export { Category };
