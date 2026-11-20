import { Truck, ShieldCheck, HeadphonesIcon } from 'lucide-react';
import './BenefitsSection.css';

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon fill="#101820" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function BenefitsSection() {
  return (
    <section className="benefits">
      <div className="container">
        <div className="benefits__grid">

          <div className="benefit">
            <div className="benefit__icon"><Truck size={28} strokeWidth={1.5} /></div>
            <div className="benefit__text">
              <h4 className="benefit__title">Free Shipping</h4>
              <p className="benefit__desc">On orders over $100</p>
            </div>
          </div>

          <div className="benefits__sep" />

          <div className="benefit">
            <div className="benefit__icon"><ShieldCheck size={28} strokeWidth={1.5} /></div>
            <div className="benefit__text">
              <h4 className="benefit__title">Secure Payments</h4>
              <p className="benefit__desc">Powered by Firebase</p>
            </div>
          </div>

          <div className="benefits__sep" />

          <div className="benefit">
            <div className="benefit__icon"><HeadphonesIcon size={28} strokeWidth={1.5} /></div>
            <div className="benefit__text">
              <h4 className="benefit__title">24/7 Customer Support</h4>
              <p className="benefit__desc">We're here to help</p>
            </div>
          </div>

          <div className="benefits__sep" />

          <div className="benefit benefit--social">
            <div className="benefit__text">
              <h4 className="benefit__title">Follow Us</h4>
            </div>
            <div className="benefit__socials">
              <a href="#" className="benefit__social-link" aria-label="Facebook"><FacebookIcon /></a>
              <a href="#" className="benefit__social-link" aria-label="Instagram"><InstagramIcon /></a>
              <a href="#" className="benefit__social-link" aria-label="YouTube"><YoutubeIcon /></a>
              <a href="#" className="benefit__social-link" aria-label="X"><XIcon /></a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
