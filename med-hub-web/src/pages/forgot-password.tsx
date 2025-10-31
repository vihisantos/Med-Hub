import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MedicalIllustration from '../components/MedicalIllustration';
import '../style/forgot-password.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      // Simula chamada API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMessage('Se o email existe, enviamos instruções para redefinir a senha.');
    } catch {
      setError('Erro ao enviar instruções, tente novamente.');
    }
  };

  return (
    <div className="forgot-container" role="main" style={{ position: 'relative' }}>
      <div className="forgot-card">
        <section className="forgot-image-side" aria-label="Logo ou imagem">
          <MedicalIllustration />
          <div className="bubble bubble--small"></div>
          <div className="bubble bubble--medium"></div>
          <div className="bubble bubble--large"></div>
        </section>

        <section className="forgot-form-side" aria-label="Formulário recuperar senha">
          <h2>Recuperar Senha</h2>

          <form onSubmit={handleSubmit} noValidate>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}

            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />

            <div className="actions-wrapper">
              <Link to="/login" tabIndex={0} className="forgot-password-link">
                Voltar ao login
              </Link>

              <button type="submit" className="login-button" aria-label="Enviar instruções">
                Enviar instruções
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}