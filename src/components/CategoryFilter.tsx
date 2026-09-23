interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeCategory === category
              ? 'bg-amber-800 text-white shadow-md shadow-amber-800/20'
              : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-50 hover:border-amber-300'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
