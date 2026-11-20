import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { products } from '../../data/products';
import ProductCard from '../../components/ProductCard/ProductCard';
import './CollectionsPage.css';

const CATEGORIES = [
  { id: 'all', label: 'All Watches' },
  { id: 'mens', label: "Men's" },
  { id: 'womens', label: "Women's" },
  { id: 'classic', label: 'Classic' },
  { id: 'sport', label: 'Sport' },
];

const SORT_OPTIONS = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Top Rated' },
  { id: 'newest', label: 'Newest' },
];

export default function CollectionsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('featured');
  const [sortOpen, setSortOpen] = useState(false);

  const handleCategory = (id) => {
    setActiveCategory(id);
    setSearchParams(id !== 'all' ? { category: id } : {});
  };

  const filtered = useMemo(() => {
    let list = activeCategory === 'all'
      ? [...products]
      : products.filter((p) => p.category === activeCategory);

    if (initialSearch) {
      const q = initialSearch.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.collection.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case 'price-asc':  return list.sort((a, b) => a.price - b.price);
      case 'price-desc': return list.sort((a, b) => b.price - a.price);
      case 'rating':     return list.sort((a, b) => b.rating - a.rating);
      case 'newest':     return list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      default:           return list;
    }
  }, [activeCategory, sortBy, initialSearch]);

  const currentSort = SORT_OPTIONS.find((o) => o.id === sortBy);

  return (
    <div className="collections-page">
      {/* Page hero */}
      <div className="collections-page__hero">
        <div className="container">
          <p className="collections-page__eyebrow">WristStudio</p>
          <h1 className="collections-page__title">Our Collections</h1>
          <p className="collections-page__subtitle">
            Explore our curated range of premium timepieces
          </p>
        </div>
      </div>

      <div className="container">
        {/* Toolbar */}
        <div className="collections-page__toolbar">
          {/* Category filters */}
          <div className="collections-page__filters">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`filter-btn${activeCategory === cat.id ? ' filter-btn--active' : ''}`}
                onClick={() => handleCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="collections-page__sort">
            <SlidersHorizontal size={15} />
            <div className="sort-dropdown">
              <button
                className="sort-dropdown__trigger"
                onClick={() => setSortOpen((v) => !v)}
              >
                {currentSort.label} <ChevronDown size={13} />
              </button>
              {sortOpen && (
                <div className="sort-dropdown__menu">
                  {SORT_OPTIONS.map((o) => (
                    <button
                      key={o.id}
                      className={`sort-dropdown__item${sortBy === o.id ? ' sort-dropdown__item--active' : ''}`}
                      onClick={() => { setSortBy(o.id); setSortOpen(false); }}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="collections-page__count">
          {filtered.length} {filtered.length === 1 ? 'watch' : 'watches'} found
          {initialSearch && <span> for "<em>{initialSearch}</em>"</span>}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="collections-page__grid">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="collections-page__empty">
            <p>No watches found. Try a different filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
