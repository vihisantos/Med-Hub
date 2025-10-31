import React, { JSX, useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/Register.css';

// Componente funcional de registro de usuário com opção de role (Médico ou Hospital)
export default function Register(): JSX.Element {
  // Campos comuns
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  // Role: 'doctor' ou 'hospital'
  const [role, setRole] = useState<'doctor' | 'hospital'>('doctor');

  // Campos específicos para médico
  const [crm, setCrm] = useState('');
  const [specialties, setSpecialties] = useState('');

  // Campos específicos para hospital
  const [hospitalName, setHospitalName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [address, setAddress] = useState('');

  // Estados de erro para exibir mensagens simples abaixo dos inputs
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validação básica no submit, agora dependente do role
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Campos comuns
    if (!fullName.trim()) newErrors.fullName = 'Nome completo é obrigatório.';
    if (!email.trim()) newErrors.email = 'E-mail é obrigatório.';
    if (!phone.trim()) newErrors.phone = 'Telefone é obrigatório.';
    if (!password.trim()) newErrors.password = 'Senha é obrigatória.';

    // Validação condicional
    if (role === 'doctor') {
      if (!crm.trim()) newErrors.crm = 'CRM é obrigatório para médicos.';
      if (!specialties.trim()) newErrors.specialties = 'Especialidades são obrigatórias.';
    } else {
      // hospital
      if (!hospitalName.trim()) newErrors.hospitalName = 'Nome do hospital é obrigatório.';
      if (!cnpj.trim()) newErrors.cnpj = 'CNPJ é obrigatório.';
      if (!address.trim()) newErrors.address = 'Endereço é obrigatório.';
    }

    setErrors(newErrors);

    // Se sem erros, aqui você chamaria a API para criar o usuário
    if (Object.keys(newErrors).length === 0) {
      // Exemplo: chamada à API — adaptar conforme backend
      const payload = {
        role,
        fullName,
        email,
        phone,
        // campos dependentes
        ...(role === 'doctor' ? { crm, specialties } : { hospitalName, cnpj, address }),
      };
      // demo
      alert(`Registrando ${role === 'doctor' ? 'médico' : 'hospital'}: ${JSON.stringify(payload)}`);

      // Reset opcional
      setFullName('');
      setEmail('');
      setPhone('');
      setPassword('');
      setCrm('');
      setSpecialties('');
      setHospitalName('');
      setCnpj('');
      setAddress('');
      setErrors({});
    }
  };

  return (
    <div className="register-page" role="main">
      {/* Painel esquerdo: logotipo e ilustrações */}
      <aside className="register-left" aria-label="Apresentação Med Hub">
        <div className="register-left__content">
          <h1 className="logo">Med Hub</h1>
          <p className="tagline">Conectando profissionais e atendimentos com segurança.</p>

          {/* Bolhas SVG animadas - decoração */}
          <svg className="bubbles" viewBox="0 0 200 200" aria-hidden>
            <circle className="bubble bubble--1" cx="40" cy="40" r="30" fill="#e6f7ee" />
            <circle className="bubble bubble--2" cx="160" cy="30" r="18" fill="#dff3e6" />
            <circle className="bubble bubble--3" cx="120" cy="140" r="24" fill="#cfead8" />
          </svg>
        </div>
      </aside>

      {/* Painel direito: formulário */}
      <section className="register-right" aria-label="Formulário de registro">
        <form className="register-form" onSubmit={handleSubmit} noValidate>
          <h2>Crie sua conta</h2>

          {/* Role toggle: escolher entre Médico e Hospital */}
          <fieldset className="role-fieldset" aria-label="Tipo de conta">
            <legend className="visually-hidden">Tipo de conta</legend>
            <div className="role-toggle" role="radiogroup" aria-label="Escolha entre médico ou hospital">
              <label
                className={`role-option ${role === 'doctor' ? 'active' : ''}`}
                aria-pressed={role === 'doctor'}
              >
                <input
                  type="radio"
                  name="role"
                  value="doctor"
                  checked={role === 'doctor'}
                  onChange={() => setRole('doctor')}
                  aria-label="Sou médico"
                />
                Médico
              </label>

              <label
                className={`role-option ${role === 'hospital' ? 'active' : ''}`}
                aria-pressed={role === 'hospital'}
              >
                <input
                  type="radio"
                  name="role"
                  value="hospital"
                  checked={role === 'hospital'}
                  onChange={() => setRole('hospital')}
                  aria-label="Sou hospital"
                />
                Hospital
              </label>
            </div>
          </fieldset>

          {/* Nome completo */}
          <label htmlFor="fullName">Nome completo</label>
          <input
            id="fullName"
            aria-label="Nome completo"
            type="text"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            className={errors.fullName ? 'input input--error' : 'input'}
            placeholder="Seu nome completo"
          />
          {errors.fullName && <div className="input-error" role="alert">{errors.fullName}</div>}

          {/* E-mail */}
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            aria-label="E-mail"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={errors.email ? 'input input--error' : 'input'}
            placeholder="seu@exemplo.com"
          />
          {errors.email && <div className="input-error" role="alert">{errors.email}</div>}

          {/* Campos condicionais para Médico */}
          {role === 'doctor' && (
            <>
              <label htmlFor="crm">CRM (registro médico)</label>
              <input
                id="crm"
                aria-label="CRM"
                type="text"
                value={crm}
                onChange={e => setCrm(e.target.value)}
                className={errors.crm ? 'input input--error' : 'input'}
                placeholder="Digite seu CRM"
              />
              {errors.crm && <div className="input-error" role="alert">{errors.crm}</div>}

              <label htmlFor="specialties">Especialidades</label>
              <input
                id="specialties"
                aria-label="Especialidades"
                type="text"
                value={specialties}
                onChange={e => setSpecialties(e.target.value)}
                className={errors.specialties ? 'input input--error' : 'input'}
                placeholder="Ex: Cardiologia, Pediatria"
              />
              {errors.specialties && <div className="input-error" role="alert">{errors.specialties}</div>}
            </>
          )}

          {/* Campos condicionais para Hospital */}
          {role === 'hospital' && (
            <>
              <label htmlFor="hospitalName">Nome do Hospital</label>
              <input
                id="hospitalName"
                aria-label="Nome do hospital"
                type="text"
                value={hospitalName}
                onChange={e => setHospitalName(e.target.value)}
                className={errors.hospitalName ? 'input input--error' : 'input'}
                placeholder="Nome do hospital"
              />
              {errors.hospitalName && <div className="input-error" role="alert">{errors.hospitalName}</div>}

              <label htmlFor="cnpj">CNPJ</label>
              <input
                id="cnpj"
                aria-label="CNPJ"
                type="text"
                value={cnpj}
                onChange={e => setCnpj(e.target.value)}
                className={errors.cnpj ? 'input input--error' : 'input'}
                placeholder="00.000.000/0000-00"
              />
              {errors.cnpj && <div className="input-error" role="alert">{errors.cnpj}</div>}

              <label htmlFor="address">Endereço</label>
              <input
                id="address"
                aria-label="Endereço"
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                className={errors.address ? 'input input--error' : 'input'}
                placeholder="Rua, número, bairro, cidade"
              />
              {errors.address && <div className="input-error" role="alert">{errors.address}</div>}
            </>
          )}

          {/* Telefone */}
          <label htmlFor="phone">Telefone</label>
          <input
            id="phone"
            aria-label="Telefone"
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className={errors.phone ? 'input input--error' : 'input'}
            placeholder="(XX) XXXXX-XXXX"
          />
          {errors.phone && <div className="input-error" role="alert">{errors.phone}</div>}

          {/* Senha */}
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            aria-label="Senha"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={errors.password ? 'input input--error' : 'input'}
            placeholder="Crie uma senha segura"
          />
          {errors.password && <div className="input-error" role="alert">{errors.password}</div>}

          {/* Botão registrar */}
          <div className="actions">
            <button type="submit" className="btn-register" aria-label="Registrar">
              Registrar
            </button>
          </div>

          {/* Link para Login desalinhado (abaixo do botão) */}
          <div className="already">
            Já tem conta? <Link to="/login" className="link-login">Entre aqui</Link>
          </div>
        </form>
      </section>
    </div>
  );
}
