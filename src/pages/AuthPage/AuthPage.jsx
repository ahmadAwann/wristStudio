import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import logo from '../../assets/WristStudio transparent.png';
import './AuthPage.css';

function LoginForm({ onSwitch }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.email.trim() || !form.email.includes('@')) e.email = 'Valid email required.';
    if (!form.password || form.password.length < 6) e.password = 'Password must be at least 6 characters.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    // Frontend demo — navigate home
    navigate('/');
  };

  const handleChange = (field, val) => {
    setForm((p) => ({ ...p, [field]: val }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: '' }));
  };

  return (
    <div className="auth-form">
      <h2 className="auth-form__title">Welcome Back</h2>
      <p className="auth-form__sub">Sign in to your WristStudio account</p>

      <form onSubmit={handleSubmit} noValidate className="auth-form__fields">
        <div className="auth-field">
          <label className="auth-field__label">Email Address</label>
          <input
            type="email"
            className={`auth-field__input${errors.email ? ' auth-field__input--error' : ''}`}
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
          {errors.email && <span className="auth-field__error">{errors.email}</span>}
        </div>

        <div className="auth-field">
          <div className="auth-field__label-row">
            <label className="auth-field__label">Password</label>
            <button type="button" className="auth-field__forgot">Forgot password?</button>
          </div>
          <div className="auth-field__input-wrap">
            <input
              type={showPass ? 'text' : 'password'}
              className={`auth-field__input${errors.password ? ' auth-field__input--error' : ''}`}
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => handleChange('password', e.target.value)}
            />
            <button
              type="button"
              className="auth-field__eye"
              onClick={() => setShowPass((v) => !v)}
              aria-label="Toggle password"
            >
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && <span className="auth-field__error">{errors.password}</span>}
        </div>

        <button type="submit" className="btn-primary auth-submit">
          Sign In <ArrowRight size={15} />
        </button>
      </form>

      <div className="auth-divider"><span>or continue with</span></div>

      <div className="auth-social-btns">
        <button className="auth-social-btn">
          <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Google
        </button>
        <button className="auth-social-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
          GitHub
        </button>
      </div>

      <p className="auth-switch">
        Don't have an account?{' '}
        <button onClick={onSwitch} className="auth-switch__btn">Create one</button>
      </p>
    </div>
  );
}

function SignupForm({ onSwitch }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required.';
    if (!form.email.trim() || !form.email.includes('@')) e.email = 'Valid email required.';
    if (!form.password || form.password.length < 6) e.password = 'Minimum 6 characters.';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    navigate('/');
  };

  const handleChange = (field, val) => {
    setForm((p) => ({ ...p, [field]: val }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: '' }));
  };

  return (
    <div className="auth-form">
      <h2 className="auth-form__title">Create Account</h2>
      <p className="auth-form__sub">Join WristStudio for exclusive access and offers</p>

      <form onSubmit={handleSubmit} noValidate className="auth-form__fields">
        <div className="auth-field">
          <label className="auth-field__label">Full Name</label>
          <input
            type="text"
            className={`auth-field__input${errors.name ? ' auth-field__input--error' : ''}`}
            placeholder="John Smith"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
          {errors.name && <span className="auth-field__error">{errors.name}</span>}
        </div>

        <div className="auth-field">
          <label className="auth-field__label">Email Address</label>
          <input
            type="email"
            className={`auth-field__input${errors.email ? ' auth-field__input--error' : ''}`}
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
          {errors.email && <span className="auth-field__error">{errors.email}</span>}
        </div>

        <div className="auth-field">
          <label className="auth-field__label">Password</label>
          <div className="auth-field__input-wrap">
            <input
              type={showPass ? 'text' : 'password'}
              className={`auth-field__input${errors.password ? ' auth-field__input--error' : ''}`}
              placeholder="Min. 6 characters"
              value={form.password}
              onChange={(e) => handleChange('password', e.target.value)}
            />
            <button type="button" className="auth-field__eye" onClick={() => setShowPass((v) => !v)}>
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && <span className="auth-field__error">{errors.password}</span>}
        </div>

        <div className="auth-field">
          <label className="auth-field__label">Confirm Password</label>
          <input
            type="password"
            className={`auth-field__input${errors.confirm ? ' auth-field__input--error' : ''}`}
            placeholder="Repeat your password"
            value={form.confirm}
            onChange={(e) => handleChange('confirm', e.target.value)}
          />
          {errors.confirm && <span className="auth-field__error">{errors.confirm}</span>}
        </div>

        <p className="auth-terms">
          By creating an account you agree to our{' '}
          <Link to="/contact" className="auth-terms__link">Terms of Service</Link> and{' '}
          <Link to="/contact" className="auth-terms__link">Privacy Policy</Link>.
        </p>

        <button type="submit" className="btn-primary auth-submit">
          Create Account <ArrowRight size={15} />
        </button>
      </form>

      <p className="auth-switch">
        Already have an account?{' '}
        <button onClick={onSwitch} className="auth-switch__btn">Sign in</button>
      </p>
    </div>
  );
}

export default function AuthPage() {
  const [mode, setMode] = useState('login');

  return (
    <div className="auth-page">
      <div className="auth-page__left">
        <div className="auth-page__left-content">
          <Link to="/">
            <img src={logo} alt="WristStudio" className="auth-page__logo" />
          </Link>
          <h1 className="auth-page__tagline">
            Time is the most<br />
            <em>precious luxury.</em>
          </h1>
          <p className="auth-page__quote">
            "Wear your time with pride. Every tick of a WristStudio watch is a reminder that quality, precision, and elegance are never compromised."
          </p>
          <div className="auth-page__dots">
            <span className="auth-page__dot auth-page__dot--active" />
            <span className="auth-page__dot" />
            <span className="auth-page__dot" />
          </div>
        </div>
      </div>

      <div className="auth-page__right">
        <div className="auth-page__form-wrap">
          <div className="auth-page__tabs">
            <button
              className={`auth-page__tab${mode === 'login' ? ' auth-page__tab--active' : ''}`}
              onClick={() => setMode('login')}
            >
              Sign In
            </button>
            <button
              className={`auth-page__tab${mode === 'signup' ? ' auth-page__tab--active' : ''}`}
              onClick={() => setMode('signup')}
            >
              Register
            </button>
          </div>

          {mode === 'login'
            ? <LoginForm onSwitch={() => setMode('signup')} />
            : <SignupForm onSwitch={() => setMode('login')} />
          }
        </div>
      </div>
    </div>
  );
}
