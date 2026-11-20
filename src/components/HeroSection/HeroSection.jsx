import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import heroWatch2 from '../../assets/Hero_Watch2.jpg';
import './HeroSection.css';

export default function HeroSection() {
  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${heroWatch2})` }}
    >
      {/* Gradient overlay — dark on left, fades to transparent on right */}
      <div className="hero__overlay" />

      <div className="hero__inner container">
        {/* Left: text content */}
        <div className="hero__content">
          <p className="hero__eyebrow">TIME IN STYLE</p>

          <h1 className="hero__headline">
            Timeless<br />
            <span className="hero__headline--gold">Elegance.</span><br />
            Built to Last.
          </h1>

          <p className="hero__desc">
            Discover our premium collection of watches,<br />
            where precision meets sophistication.
          </p>

          <div className="hero__ctas">
            <Link to="/collections" className="btn-primary hero__cta-primary">
              Explore Collection <ArrowRight size={16} />
            </Link>
            <Link to="/about" className="btn-outline hero__cta-outline">
              <Play size={14} fill="currentColor" />
              Discover Our Story
            </Link>
          </div>

          <div className="hero__dots">
            <span className="hero__dot hero__dot--active" />
            <span className="hero__dot" />
            <span className="hero__dot" />
          </div>
        </div>
      </div>
    </section>
  );
}
