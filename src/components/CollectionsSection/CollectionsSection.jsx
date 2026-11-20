import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { collections } from '../../data/collections';
import './CollectionsSection.css';

export default function CollectionsSection() {
  return (
    <section className="collections-section">
      <div className="container">
        <h2 className="section-heading">Our Collections</h2>

        <div className="collections-grid">
          {collections.map((col) => (
            <Link
              key={col.id}
              to={`/collections?category=${col.id}`}
              className="collection-card"
            >
              <div className="collection-card__img-wrap">
                <img src={col.image} alt={col.name} className="collection-card__img" />
                <div className="collection-card__overlay" />
              </div>
              <div className="collection-card__body">
                <h3 className="collection-card__name">{col.name}</h3>
                <span className="collection-card__arrow">
                  <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
