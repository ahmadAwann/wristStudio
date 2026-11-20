import { Link } from 'react-router-dom';
import { Award, Clock, Gem, Users } from 'lucide-react';
import heroWatch from '../../assets/Hero_Watch.jpg';
import watch3 from '../../assets/watches/watch3.jpeg';
import watch7 from '../../assets/watches/watch7.jpeg';
import watch9 from '../../assets/watches/watch9.jpeg';
import './AboutPage.css';

const values = [
  {
    icon: <Clock size={28} strokeWidth={1.5} />,
    title: 'Precision',
    desc: 'Every mechanism is engineered to maintain accuracy within fractions of a second, meeting the most exacting Swiss standards.',
  },
  {
    icon: <Gem size={28} strokeWidth={1.5} />,
    title: 'Craftsmanship',
    desc: 'Each watch is hand-finished by master artisans with decades of experience, ensuring every detail is flawless.',
  },
  {
    icon: <Award size={28} strokeWidth={1.5} />,
    title: 'Excellence',
    desc: 'We hold ourselves to the highest standards, using only premium materials that stand the test of time.',
  },
  {
    icon: <Users size={28} strokeWidth={1.5} />,
    title: 'Heritage',
    desc: 'Founded on a legacy of horological tradition, WristStudio carries forward a passion for timeless design.',
  },
];

const milestones = [
  { year: '2010', event: 'WristStudio founded with a vision to bring luxury watchmaking to a wider audience.' },
  { year: '2013', event: 'Launched our debut Classic Collection, earning recognition at the Geneva Watch Salon.' },
  { year: '2016', event: 'Expanded into Sport and Women\'s collections, reaching customers in 40 countries.' },
  { year: '2019', event: 'Introduced in-house Swiss automatic movements across our premium lineup.' },
  { year: '2022', event: 'Celebrated over 100,000 timepieces sold worldwide and opened our flagship boutique.' },
  { year: '2024', event: 'Launched the Limited Heritage series, a tribute to a century of watchmaking artistry.' },
];

export default function AboutPage() {
  return (
    <div className="about-page">

      {/* Hero */}
      <div className="about-hero">
        <div className="about-hero__bg" style={{ backgroundImage: `url(${heroWatch})` }} />
        <div className="about-hero__overlay" />
        <div className="container about-hero__content">
          <p className="about-hero__eyebrow">Our Story</p>
          <h1 className="about-hero__title">Crafting Time,<br /><em>Defining Style.</em></h1>
          <p className="about-hero__sub">
            Born from a passion for horology, WristStudio creates timepieces that transcend trends.
          </p>
        </div>
      </div>

      {/* Brand intro */}
      <section className="about-intro">
        <div className="container about-intro__inner">
          <div className="about-intro__text">
            <p className="about-intro__label">Who We Are</p>
            <h2 className="about-intro__title">More Than a Watch Brand</h2>
            <p className="about-intro__desc">
              WristStudio was founded on a singular belief: that a watch should be more than a device that tells time. It should be a companion, a statement, and a legacy passed from one generation to the next.
            </p>
            <p className="about-intro__desc">
              We collaborate with master watchmakers and designers to create pieces that marry classical elegance with contemporary precision. Every dial, every strap, every crown is chosen with intent — because at WristStudio, the details are everything.
            </p>
            <Link to="/collections" className="btn-primary" style={{ marginTop: 8, alignSelf: 'flex-start' }}>
              Explore Our Collections
            </Link>
          </div>
          <div className="about-intro__images">
            <img src={watch7} alt="Luxury watch craftsmanship" className="about-intro__img about-intro__img--main" />
            <img src={watch3} alt="Classic collection piece" className="about-intro__img about-intro__img--accent" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="about-stats">
        <div className="container about-stats__grid">
          {[
            { num: '100K+', label: 'Watches Sold' },
            { num: '40+',   label: 'Countries Reached' },
            { num: '14',    label: 'Years of Excellence' },
            { num: '50+',   label: 'Unique Designs' },
          ].map((s) => (
            <div key={s.label} className="about-stat">
              <span className="about-stat__num">{s.num}</span>
              <span className="about-stat__label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="about-values">
        <div className="container">
          <h2 className="section-heading">Our Values</h2>
          <div className="about-values__grid">
            {values.map((v) => (
              <div key={v.title} className="about-value-card">
                <div className="about-value-card__icon">{v.icon}</div>
                <h3 className="about-value-card__title">{v.title}</h3>
                <p className="about-value-card__desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="about-timeline">
        <div className="container">
          <h2 className="section-heading">Our Journey</h2>
          <div className="timeline">
            {milestones.map((m, i) => (
              <div key={m.year} className={`timeline__item${i % 2 === 0 ? ' timeline__item--left' : ' timeline__item--right'}`}>
                <div className="timeline__content">
                  <span className="timeline__year">{m.year}</span>
                  <p className="timeline__event">{m.event}</p>
                </div>
                <div className="timeline__dot" />
              </div>
            ))}
            <div className="timeline__line" />
          </div>
        </div>
      </section>

      {/* Craftsmanship feature */}
      <section className="about-craft">
        <div className="container about-craft__inner">
          <img src={watch9} alt="Heritage piece" className="about-craft__img" />
          <div className="about-craft__text">
            <p className="about-craft__label">Craftsmanship</p>
            <h2 className="about-craft__title">The Art of Fine Watchmaking</h2>
            <p className="about-craft__desc">
              Our watches are assembled in small batches, allowing artisans to devote individual attention to each piece. From the routing of the movement to the finishing of the case, every step reflects our uncompromising standards.
            </p>
            <p className="about-craft__desc">
              We source sapphire crystals, Swiss-made movements, and premium leather straps from the world's most respected suppliers — because the components we choose today determine the heirloom you'll treasure tomorrow.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="container about-cta__inner">
          <h2 className="about-cta__title">Ready to Find Your Timepiece?</h2>
          <p className="about-cta__sub">Browse our complete collection of premium watches.</p>
          <div className="about-cta__btns">
            <Link to="/collections" className="btn-primary">Shop Now</Link>
            <Link to="/contact" className="btn-outline">Get in Touch</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
