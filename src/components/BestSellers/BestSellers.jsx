import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { bestSellers } from '../../data/products';
import ProductCard from '../ProductCard/ProductCard';
import './BestSellers.css';

export default function BestSellers() {
  return (
    <section className="best-sellers">
      <div className="container">
        <div className="best-sellers__header">
          <h2 className="section-heading">Best Sellers</h2>
        </div>

        <div className="best-sellers__grid">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="best-sellers__footer">
          <Link to="/collections" className="btn-outline">
            View All Watches <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
