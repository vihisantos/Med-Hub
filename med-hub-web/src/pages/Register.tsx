import React, { useState, JSX } from 'react';
import { Link } from 'react-router-dom';
import '../style/Register.css';

export default function Register(): JSX.Element {
  const [role, setRole] = useState<'doctor' | 'hospital'>('doctor');

  // Médico
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [crm, setCrm] = useState('');
  const [specialties, setSpecialties] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  // Hospital
  const [fantasyName, setFantasyName] = useState('');
  const [institutionalEmail, setInstitutionalEmail] = useState('');
  const [corporateName, setCorporateName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [cnes, setCnes] = useState('');
  const [address, setAddress] = useState('');
  const [institutionType, setInstitutionType] = useState<'public' | 'private'>('public');

  // Checkbox termos (médico e hospital)
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Erros
  const [errors, setErrors] = useState<Record<string, string>>({});

  const resetForm = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setCrm('');
    setSpecialties('');
    setPassword('');
    setPasswordConfirm('');
    setFantasyName('');
    setInstitutionalEmail('');
    setCorporateName('');
    setCnpj('');
    setCnes('');
    setAddress('');
    setInstitutionType('public');
    setTermsAccepted(false);
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (role === 'doctor') {
      if (!fullName.trim()) newErrors.fullName = 'Nome completo é obrigatório.';
      if (!email.trim()) newErrors.email = 'E-mail é obrigatório.';
      else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Digite um e-mail válido.';
      if (!crm.trim()) newErrors.crm = 'CRM é obrigatório para médicos.';
      if (!specialties.trim()) newErrors.specialties = 'Especialidades são obrigatórias.';
      if (!phone.trim()) newErrors.phone = 'Telefone é obrigatório.';
      if (!password) newErrors.password = 'Senha é obrigatória.';
      else if (password.length < 6) newErrors.password = 'Senha precisa ter no mínimo 6 caracteres.';
      if (!passwordConfirm) newErrors.passwordConfirm = 'Confirme sua senha.';
      else if (password !== passwordConfirm) newErrors.passwordConfirm = 'As senhas não coincidem.';
      if (!termsAccepted) newErrors.termsAccepted = 'Você precisa aceitar os Termos e Serviços.';
    } else {
      if (!fantasyName.trim()) newErrors.fantasyName = 'Nome fantasia é obrigatório.';
      if (!institutionalEmail.trim()) newErrors.institutionalEmail = 'E-mail institucional é obrigatório.';
      else if (!/\S+@\S+\.\S+/.test(institutionalEmail)) newErrors.institutionalEmail = 'Digite um e-mail válido.';
      if (!corporateName.trim()) newErrors.corporateName = 'Razão social é obrigatória.';
      if (!cnpj.trim()) newErrors.cnpj = 'CNPJ é obrigatório.';
      if (!address.trim()) newErrors.address = 'Endereço é obrigatório.';
      if (!phone.trim()) newErrors.phone = 'Telefone é obrigatório.';
      if (!password) newErrors.password = 'Senha é obrigatória.';
      else if (password.length < 6) newErrors.password = 'Senha precisa ter no mínimo 6 caracteres.';
      if (!passwordConfirm) newErrors.passwordConfirm = 'Confirme sua senha.';
      else if (password !== passwordConfirm) newErrors.passwordConfirm = 'As senhas não coincidem.';
      if (!termsAccepted) newErrors.termsAccepted = 'Você precisa aceitar os Termos e Serviços.';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const payload = role === 'doctor' ? {
      role,
      fullName,
      email,
      crm,
      specialties: specialties.split(',').map(s => s.trim()),
      phone,
      password,
    } : {
      role,
      fantasyName,
      institutionalEmail,
      corporateName,
      cnpj,
      cnes,
      address,
      institutionType,
      phone,
      password,
      termsAccepted,
    };

    alert(`Registrando ${role === 'doctor' ? 'médico' : 'hospital'}:\n${JSON.stringify(payload, null, 2)}`);

    resetForm();
  };

  return (
    <main className="register-container" role="main">
      <aside className="register-image-side" aria-label="Apresentação Med Hub">
        <h1 className="register-logo">Med Hub</h1>
        <p className="register-tagline">
          Conectando profissionais e atendimentos com segurança.
        </p>
        <div className="bubble bubble--small" aria-hidden="true"></div>
        <div className="bubble bubble--medium" aria-hidden="true"></div>
        <div className="bubble bubble--large" aria-hidden="true"></div>
      </aside>

      <section className="register-form-side" aria-label="Formulário de registro">
        <h2>Crie sua conta</h2>

        <fieldset className="role-fieldset" aria-label="Tipo de conta">
          <legend className="visually-hidden">Tipo de conta</legend>
          <div role="radiogroup" aria-label="Escolha entre médico ou hospital" className="role-toggle no-border">
            <label className={`role-option ${role === 'doctor' ? 'active' : ''}`} aria-pressed={role === 'doctor'}>
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
            <label className={`role-option ${role === 'hospital' ? 'active' : ''}`} aria-pressed={role === 'hospital'}>
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

        <form onSubmit={handleSubmit} noValidate className={role === 'doctor' ? 'form-grid-two-cols' : ''}>

          {/* Médico */}
          {role === 'doctor' && (
            <>
              <label htmlFor="fullName">Nome completo</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={fullName}
                placeholder="Seu nome completo"
                onChange={e => setFullName(e.target.value)}
                className={`input ${errors.fullName ? 'input--error' : ''}`}
                aria-invalid={!!errors.fullName}
                aria-describedby={errors.fullName ? 'fullName-error' : undefined}
              />
              {errors.fullName && <div className="input-error" id="fullName-error" role="alert">{errors.fullName}</div>}

              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                name="email"
                value={email}
                placeholder="seu@exemplo.com"
                onChange={e => setEmail(e.target.value)}
                className={`input ${errors.email ? 'input--error' : ''}`}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && <div className="input-error" id="email-error" role="alert">{errors.email}</div>}

              <label htmlFor="crm">CRM (registro médico)</label>
              <input
                id="crm"
                type="text"
                name="crm"
                value={crm}
                placeholder="Digite seu CRM"
                onChange={e => setCrm(e.target.value)}
                className={`input ${errors.crm ? 'input--error' : ''}`}
                aria-invalid={!!errors.crm}
                aria-describedby={errors.crm ? 'crm-error' : undefined}
              />
              {errors.crm && <div className="input-error" id="crm-error" role="alert">{errors.crm}</div>}

              <label htmlFor="specialties">Especialidades</label>
              <input
                id="specialties"
                type="text"
                name="specialties"
                value={specialties}
                placeholder="Ex: Cardiologia, Pediatria"
                onChange={e => setSpecialties(e.target.value)}
                className={`input ${errors.specialties ? 'input--error' : ''}`}
                aria-invalid={!!errors.specialties}
                aria-describedby={errors.specialties ? 'specialties-error' : undefined}
              />
              {errors.specialties && (
                <div className="input-error" id="specialties-error" role="alert">
                  {errors.specialties}
                </div>
              )}

              <label htmlFor="phone">Telefone</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={phone}
                placeholder="(XX) XXXXX-XXXX"
                onChange={e => setPhone(e.target.value)}
                className={`input ${errors.phone ? 'input--error' : ''}`}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
              />
              {errors.phone && <div className="input-error" id="phone-error" role="alert">{errors.phone}</div>}

              <label htmlFor="password">Senha</label>
              <input
                id="password"
                type="password"
                name="password"
                value={password}
                placeholder="Crie uma senha segura"
                onChange={e => setPassword(e.target.value)}
                className={`input ${errors.password ? 'input--error' : ''}`}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'password-error' : undefined}
              />
              {errors.password && <div className="input-error" id="password-error" role="alert">{errors.password}</div>}

              <label htmlFor="passwordConfirm">Confirmação de senha</label>
              <input
                id="passwordConfirm"
                type="password"
                name="passwordConfirm"
                value={passwordConfirm}
                placeholder="Digite sua senha novamente"
                onChange={e => setPasswordConfirm(e.target.value)}
                className={`input ${errors.passwordConfirm ? 'input--error' : ''}`}
                aria-invalid={!!errors.passwordConfirm}
                aria-describedby={errors.passwordConfirm ? 'passwordConfirm-error' : undefined}
              />
              {errors.passwordConfirm && (
                <div className="input-error" id="passwordConfirm-error" role="alert">
                  {errors.passwordConfirm}
                </div>
              )}

              <div className="terms-container">
                <input
                  type="checkbox"
                  id="termsAccepted"
                  name="termsAccepted"
                  checked={termsAccepted}
                  onChange={e => setTermsAccepted(e.target.checked)}
                  aria-invalid={!!errors.termsAccepted}
                />
                <label htmlFor="termsAccepted" className="terms-label">
                  Aceito os{' '}
                  <a href="/termos-de-servico" target="_blank" rel="noopener noreferrer" className="terms-link">
                    Termos e Serviços
                  </a>{' '}
                  e concordo com a{' '}
                  <a href="/politica-de-privacidade" target="_blank" rel="noopener noreferrer" className="terms-link">
                    Política de Privacidade
                  </a>.
                </label>
              </div>
              {errors.termsAccepted && (
                <div className="input-error" role="alert">
                  {errors.termsAccepted}
                </div>
              )}

              <p className="lgpd-notice" role="note">
                Respeitamos e protegemos todos os seus dados pessoais conforme a LGPD.
              </p>
            </>
          )}

          {/* Hospital */}
          {role === 'hospital' && (
            <>
              <label htmlFor="fantasyName">Nome fantasia</label>
              <input
                id="fantasyName"
                name="fantasyName"
                type="text"
                value={fantasyName}
                placeholder="Nome fantasia do hospital"
                onChange={e => setFantasyName(e.target.value)}
                className={`input ${errors.fantasyName ? 'input--error' : ''}`}
                aria-invalid={!!errors.fantasyName}
                aria-describedby={errors.fantasyName ? 'fantasyName-error' : undefined}
              />
              {errors.fantasyName && <div className="input-error" id="fantasyName-error" role="alert">{errors.fantasyName}</div>}

              <label htmlFor="institutionalEmail">E-mail institucional</label>
              <input
                id="institutionalEmail"
                type="email"
                name="institutionalEmail"
                value={institutionalEmail}
                placeholder="email@hospital.com"
                onChange={e => setInstitutionalEmail(e.target.value)}
                className={`input ${errors.institutionalEmail ? 'input--error' : ''}`}
                aria-invalid={!!errors.institutionalEmail}
                aria-describedby={errors.institutionalEmail ? 'institutionalEmail-error' : undefined}
              />
              {errors.institutionalEmail && <div className="input-error" id="institutionalEmail-error" role="alert">{errors.institutionalEmail}</div>}

              <label htmlFor="corporateName">Razão social</label>
              <input
                id="corporateName"
                name="corporateName"
                type="text"
                value={corporateName}
                placeholder="Razão social"
                onChange={e => setCorporateName(e.target.value)}
                className={`input ${errors.corporateName ? 'input--error' : ''}`}
                aria-invalid={!!errors.corporateName}
                aria-describedby={errors.corporateName ? 'corporateName-error' : undefined}
              />
              {errors.corporateName && <div className="input-error" id="corporateName-error" role="alert">{errors.corporateName}</div>}

              <label htmlFor="cnpj">CNPJ</label>
              <input
                id="cnpj"
                type="text"
                name="cnpj"
                value={cnpj}
                placeholder="00.000.000/0000-00"
                onChange={e => setCnpj(e.target.value)}
                className={`input ${errors.cnpj ? 'input--error' : ''}`}
                aria-invalid={!!errors.cnpj}
                aria-describedby={errors.cnpj ? 'cnpj-error' : undefined}
              />
              {errors.cnpj && <div className="input-error" id="cnpj-error" role="alert">{errors.cnpj}</div>}

              <label htmlFor="cnes">CNES (opcional)</label>
              <input
                id="cnes"
                name="cnes"
                type="text"
                value={cnes}
                placeholder="Cadastro Nacional de Estabelecimentos de Saúde"
                onChange={e => setCnes(e.target.value)}
                className="input"
                aria-invalid={false}
              />

              <label htmlFor="address">Endereço</label>
              <input
                id="address"
                name="address"
                type="text"
                value={address}
                placeholder="Rua, número, bairro, cidade"
                onChange={e => setAddress(e.target.value)}
                className={`input ${errors.address ? 'input--error' : ''}`}
                aria-invalid={!!errors.address}
                aria-describedby={errors.address ? 'address-error' : undefined}
              />
              {errors.address && <div className="input-error" id="address-error" role="alert">{errors.address}</div>}

              <label htmlFor="phone">Telefone</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={phone}
                placeholder="(XX) XXXXX-XXXX"
                onChange={e => setPhone(e.target.value)}
                className={`input ${errors.phone ? 'input--error' : ''}`}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
              />
              {errors.phone && <div className="input-error" id="phone-error" role="alert">{errors.phone}</div>}

              <label htmlFor="institutionType">Tipo de instituição</label>
              <select
                id="institutionType"
                name="institutionType"
                value={institutionType}
                onChange={e => setInstitutionType(e.target.value as 'public' | 'private')}
                className="input"
                aria-invalid={false}
              >
                <option value="public">Pública</option>
                <option value="private">Privada</option>
              </select>

              <label htmlFor="password">Senha</label>
              <input
                id="password"
                type="password"
                name="password"
                value={password}
                placeholder="Crie uma senha segura"
                onChange={e => setPassword(e.target.value)}
                className={`input ${errors.password ? 'input--error' : ''}`}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'password-error' : undefined}
              />
              {errors.password && <div className="input-error" id="password-error" role="alert">{errors.password}</div>}

              <label htmlFor="passwordConfirm">Confirmação de senha</label>
              <input
                id="passwordConfirm"
                type="password"
                name="passwordConfirm"
                value={passwordConfirm}
                placeholder="Digite sua senha novamente"
                onChange={e => setPasswordConfirm(e.target.value)}
                className={`input ${errors.passwordConfirm ? 'input--error' : ''}`}
                aria-invalid={!!errors.passwordConfirm}
                aria-describedby={errors.passwordConfirm ? 'passwordConfirm-error' : undefined}
              />
              {errors.passwordConfirm && (
                <div className="input-error" id="passwordConfirm-error" role="alert">
                  {errors.passwordConfirm}
                </div>
              )}

              <div className="terms-container">
                <input
                  type="checkbox"
                  id="termsAccepted"
                  name="termsAccepted"
                  checked={termsAccepted}
                  onChange={e => setTermsAccepted(e.target.checked)}
                  aria-invalid={!!errors.termsAccepted}
                />
                <label htmlFor="termsAccepted" className="terms-label">
                  Aceito os{' '}
                  <a href="/termos-de-servico" target="_blank" rel="noopener noreferrer" className="terms-link">
                    Termos e Serviços
                  </a>{' '}
                  e concordo com a{' '}
                  <a href="/politica-de-privacidade" target="_blank" rel="noopener noreferrer" className="terms-link">
                    Política de Privacidade
                  </a>.
                </label>
              </div>
              {errors.termsAccepted && (
                <div className="input-error" role="alert">
                  {errors.termsAccepted}
                </div>
              )}

              <p className="lgpd-notice" role="note">
                Respeitamos e protegemos todos os seus dados pessoais conforme a LGPD.
              </p>
            </>
          )}

          <div className="actions">
            <button type="submit" className="btn-register" aria-label="Registrar">
              Registrar
            </button>
          </div>
        </form>

        <div className="already">
          Já tem conta?{' '}
          <Link to="/login" className="link-login">
            Entre aqui
          </Link>
        </div>

        <p className="support-text">
          Enfrentando algum problema?{' '}
          <a href="mailto:medhubservices@capybaraholding.com.br" className="support-link">
            medhubservices@capybaraholding.com.br
          </a>
        </p>

        {/* Importante:
          Nota para futuro: A conta do hospital só deve ser ativada após verificação de veracidade dos dados.
          No perfil, após ativação, será necessário cadastrar representante legal / responsável técnico com validação.
        */}
      </section>
    </main>
  );
}