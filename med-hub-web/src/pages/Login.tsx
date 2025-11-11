import React, { useState } from 'react';
import '../style/login.css';
import { Link } from 'react-router-dom';
import MedicalIllustration from '../components/MedicalIllustration';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await api.post('/auth/login', { email, password });
      const { token, user } = res.data;

      // chama login do contexto, salva user e token, redireciona
      login(user, token);
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.error || 'Falha ao entrar. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container" role="main" style={{ position: 'relative' }}>
      <section className="login-image-side" aria-label="logo">
        <MedicalIllustration />
        <div className="bubble bubble--small" aria-hidden="true"></div>
        <div className="bubble bubble--medium" aria-hidden="true"></div>
        <div className="bubble bubble--large" aria-hidden="true"></div>
      </section>
      <section className="login-form-side" aria-label="Formulário de login">
        <h2>Entrar</h2>
        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            placeholder="seu@exemplo.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="email"
            aria-required="true"
          />
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            placeholder="Digite sua Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            aria-required="true"
          />
          {error && <p className="text-red-600 mt-2" role="alert">{error}</p>}
          <Link to="/forgot-password" className="forgot-password-link">
            Esqueceu sua Senha?
          </Link>
          <button type="submit" aria-label="Login" className="login-button" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
          <Link to="/register" tabIndex={0} style={{ marginTop: '1rem', display: 'inline-block' }}>
            Ainda não faz parte? <span style={{ color: '#83b993' }}> Registre-se Já </span>
          </Link>
          <p className="login-small-text">
            Registre-se e aceite nossos Termos e Serviços.
          </p>
          <p className="login-small-text" style={{ marginTop: '0.5rem' }}>
            Enfrentando algum problema?{' '}
            <a href="mailto:medhubservices@capybaraholding.com.br" style={{ color: '#83b993' }}>
              medhubservices@capybaraholding.com.br
            </a>
          </p>
        </form>
      </section>
    </div>
  );
}