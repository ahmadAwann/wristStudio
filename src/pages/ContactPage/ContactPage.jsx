import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import './ContactPage.css';

const contactInfo = [
  {
    icon: <MapPin size={20} strokeWidth={1.5} />,
    title: 'Visit Us',
    lines: ['WristStudio Flagship Boutique', '14 Prestige Avenue, Geneva', 'Switzerland CH-1200'],
  },
  {
    icon: <Phone size={20} strokeWidth={1.5} />,
    title: 'Call Us',
    lines: ['+41 22 000 0000', '+41 22 000 0001', 'Toll-free: 1-800-WRIST-01'],
  },
  {
    icon: <Mail size={20} strokeWidth={1.5} />,
    title: 'Email Us',
    lines: ['support@wriststudio.com', 'orders@wriststudio.com', 'press@wriststudio.com'],
  },
  {
    icon: <Clock size={20} strokeWidth={1.5} />,
    title: 'Business Hours',
    lines: ['Mon – Fri: 9:00 AM – 6:00 PM', 'Saturday: 10:00 AM – 4:00 PM', 'Sunday: Closed'],
  },
];

const faqs = [
  { q: 'How long does shipping take?', a: 'Standard shipping takes 5–7 business days. Express delivery is available within 2 business days for most destinations.' },
  { q: 'What is your return policy?', a: 'We offer a 30-day hassle-free return policy. Items must be unworn and in original packaging with all accessories included.' },
  { q: 'Do your watches come with a warranty?', a: 'All WristStudio timepieces come with a 2-year international manufacturer warranty covering mechanical defects.' },
  { q: 'Can I customise a watch?', a: 'Yes — we offer personalised engraving and custom strap options on select models. Contact us for details.' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'Name is required.';
    if (!form.email.trim() || !form.email.includes('@')) e.email = 'Valid email required.';
    if (!form.subject.trim()) e.subject = 'Subject is required.';
    if (!form.message.trim()) e.message = 'Message is required.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitted(true);
    setErrors({});
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <div className="contact-page">

      {/* Hero */}
      <div className="contact-hero">
        <div className="container">
          <p className="contact-hero__eyebrow">Get In Touch</p>
          <h1 className="contact-hero__title">We'd Love to Hear<br /><em>From You</em></h1>
          <p className="contact-hero__sub">Our team is ready to assist with any enquiries.</p>
        </div>
      </div>

      <div className="container">

        {/* Info + Form */}
        <div className="contact-main">

          {/* Info cards */}
          <div className="contact-info">
            {contactInfo.map((c) => (
              <div key={c.title} className="contact-info-card">
                <div className="contact-info-card__icon">{c.icon}</div>
                <div>
                  <h4 className="contact-info-card__title">{c.title}</h4>
                  {c.lines.map((l) => (
                    <p key={l} className="contact-info-card__line">{l}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="contact-form-wrap">
            <h2 className="contact-form-wrap__title">Send Us a Message</h2>
            <p className="contact-form-wrap__sub">We'll respond within 24 business hours.</p>

            {submitted ? (
              <div className="contact-success">
                <CheckCircle size={48} className="contact-success__icon" />
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. We'll be in touch shortly.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="contact-form__row">
                  <div className="contact-form__field">
                    <label className="contact-form__label">Full Name</label>
                    <input
                      type="text"
                      className={`contact-form__input${errors.name ? ' contact-form__input--error' : ''}`}
                      placeholder="John Smith"
                      value={form.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                    />
                    {errors.name && <span className="contact-form__error">{errors.name}</span>}
                  </div>
                  <div className="contact-form__field">
                    <label className="contact-form__label">Email Address</label>
                    <input
                      type="email"
                      className={`contact-form__input${errors.email ? ' contact-form__input--error' : ''}`}
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                    />
                    {errors.email && <span className="contact-form__error">{errors.email}</span>}
                  </div>
                </div>

                <div className="contact-form__field">
                  <label className="contact-form__label">Subject</label>
                  <input
                    type="text"
                    className={`contact-form__input${errors.subject ? ' contact-form__input--error' : ''}`}
                    placeholder="Order enquiry, product question…"
                    value={form.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                  />
                  {errors.subject && <span className="contact-form__error">{errors.subject}</span>}
                </div>

                <div className="contact-form__field">
                  <label className="contact-form__label">Message</label>
                  <textarea
                    className={`contact-form__textarea${errors.message ? ' contact-form__input--error' : ''}`}
                    placeholder="Tell us how we can help…"
                    rows={6}
                    value={form.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                  />
                  {errors.message && <span className="contact-form__error">{errors.message}</span>}
                </div>

                <button type="submit" className="btn-primary contact-form__submit">
                  Send Message <Send size={15} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQ */}
        <div className="contact-faq">
          <h2 className="section-heading">Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className={`faq-item${openFaq === i ? ' faq-item--open' : ''}`}>
                <button
                  className="faq-item__question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {faq.q}
                  <span className="faq-item__icon">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <p className="faq-item__answer">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
