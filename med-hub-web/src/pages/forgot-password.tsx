import React, { useState } from 'react';
import '../style/login.css';
import MedicalIllustration from '../components/MedicalIllustration';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Login submit: ${username}`);
    // Aqui você chama sua API real
  };

  return (
    <div className="login-container" role="main" style={{ position: 'relative' }}>
      <section className="login-image-side" aria-label="logo">
        <MedicalIllustration />
        <div className="bubble bubble--small"></div>
        <div className="bubble bubble--medium"></div>
        <div className="bubble bubble--large"></div>
      </section>
      <section className="login-form-side" aria-label="Formulário de login">
        <h2>Entrar</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Apelido</label>
          <input
            id="username"
            type="text"
            placeholder="Digite seu apelido"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            autoComplete="username"
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
          />

          {/* Link “Esqueceu sua Senha?” com classe para controle de espaçamento */}
          <a href="/forgot-password.tsx" tabIndex={0} className="forgot-password-link">
            Esqueceu sua Senha?
          </a>

          {/* Botão "Entrar" com margem para ficar abaixo do link */}
          <button type="submit" aria-label="Login" className="login-button">
             .         Entrar            .   
          </button>

          <a href="/register" tabIndex={0} style={{ marginTop: '1rem', display: 'inline-block' }}>
            Ainda não faz parte? <span style={{ color: '#83b993' }}> Registre-se Já </span>
          </a>

          <p className="login-small-text">
            Registre-se e aceite nossos Termos e Serviços.
          </p>
          <p className="login-small-text" style={{ marginTop: '0.5rem' }}>
            Enfrentando algum problema? <a href="mailto:medhubservices@capybaraholding.com.br" style={{ color: '#83b993' }}>medhubservices@capybaraholding.com.br</a>
          </p>
        </form>
      </section>
    </div>
  );
}
