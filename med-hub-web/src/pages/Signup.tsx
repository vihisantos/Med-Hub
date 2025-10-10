// src/pages/Signup.tsx
import React, { useState } from 'react';
import { User, Hospital, Mail, Lock, CheckCircle } from 'lucide-react';

export default function Signup() {
  const [userType, setUserType] = useState<'medico' | 'hospital'>('medico');
  const [form, setForm] = useState<any>({});
  const [consents, setConsents] = useState({
    marketing: false,
    healthData: false,
    essential: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInput = (field: string, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const toggleConsent = (key: keyof typeof consents) => {
    setConsents((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isFormValid = () =>
    consents.essential &&
    (userType === 'medico'
      ? form.name && form.email && form.crm && form.specialty && form.password
      : form.hospitalName && form.cnpj && form.address && form.email && form.password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!isFormValid()) return;
    // TODO: chamar API cadastro
    alert('Cadastro realizado! (Mock)');
  };

  return (
    <main className="min-h-screen bg-neutral-50 flex flex-col items-center p-6 font-body">
      <h1 className="text-3xl font-heading font-semibold text-primary mb-6">
        Cadastro - Med Hub
      </h1>

      <nav aria-label="Selecionar tipo de cadastro" className="mb-8 flex gap-6">
        <button
          onClick={() => setUserType('medico')}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-lg transition ${
            userType === 'medico'
              ? 'bg-primary text-white shadow-md'
              : 'bg-white border border-gray-300 hover:bg-gray-100'
          }`}
          aria-pressed={userType === 'medico'}
          aria-label="Cadastrar como Médico"
          type="button"
        >
          <User size={20} />
          Sou Médico
        </button>
        <button
          onClick={() => setUserType('hospital')}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-lg transition ${
            userType === 'hospital'
              ? 'bg-primary text-white shadow-md'
              : 'bg-white border border-gray-300 hover:bg-gray-100'
          }`}
          aria-pressed={userType === 'hospital'}
          aria-label="Cadastrar como Hospital"
          type="button"
        >
          <Hospital size={20} />
          Sou Hospital
        </button>
      </nav>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-md p-8 max-w-xl w-full"
        noValidate
        aria-describedby="form-errors"
      >
        {userType === 'medico' ? (
          <div className="space-y-6">
            {/* Nome */}
            <label htmlFor="name" className="block font-medium text-neutral-900">
              Nome completo<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" />
              <input
                id="name"
                type="text"
                value={form.name || ''}
                onChange={(e) => handleInput('name', e.target.value)}
                className={`pl-10 pr-4 py-3 w-full rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary ${
                  submitted && !form.name ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-required="true"
                aria-invalid={submitted && !form.name}
                aria-describedby={submitted && !form.name ? 'name-error' : undefined}
              />
              {submitted && !form.name && (
                <p role="alert" id="name-error" className="mt-1 text-red-600 text-sm">
                  Nome é obrigatório
                </p>
              )}
            </div>

            {/* E-mail */}
            <label htmlFor="email" className="block font-medium text-neutral-900">
              E-mail<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" />
              <input
                id="email"
                type="email"
                value={form.email || ''}
                onChange={(e) => handleInput('email', e.target.value)}
                className={`pl-10 pr-4 py-3 w-full rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary ${
                  submitted && !form.email ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-required="true"
                aria-invalid={submitted && !form.email}
                aria-describedby={submitted && !form.email ? 'email-error' : undefined}
              />
              {submitted && !form.email && (
                <p role="alert" id="email-error" className="mt-1 text-red-600 text-sm">
                  E-mail é obrigatório
                </p>
              )}
            </div>

            {/* CRM */}
            <label htmlFor="crm" className="block font-medium text-neutral-900">
              CRM e Estado<span className="text-red-500">*</span>
            </label>
            <input
              id="crm"
              type="text"
              value={form.crm || ''}
              onChange={(e) => handleInput('crm', e.target.value)}
              placeholder="Ex: 123456-SP"
              className={`pr-4 py-3 w-full rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary ${
                submitted && !form.crm ? 'border-red-500' : 'border-gray-300'
              }`}
              aria-required="true"
              aria-invalid={submitted && !form.crm}
              aria-describedby={submitted && !form.crm ? 'crm-error' : undefined}
            />
            {submitted && !form.crm && (
              <p role="alert" id="crm-error" className="mt-1 text-red-600 text-sm">
                CRM é obrigatório
              </p>
            )}

            {/* Especialidades */}
            <label htmlFor="specialty" className="block font-medium text-neutral-900">
              Especialidade(s) <span className="text-red-500">*</span>
            </label>
            <input
              id="specialty"
              type="text"
              value={form.specialty || ''}
              onChange={(e) => handleInput('specialty', e.target.value)}
              placeholder="Ex: Cardiologia, Pediatria"
              className={`pr-4 py-3 w-full rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary ${
                submitted && !form.specialty ? 'border-red-500' : 'border-gray-300'
              }`}
              aria-required="true"
              aria-invalid={submitted && !form.specialty}
              aria-describedby={submitted && !form.specialty ? 'specialty-error' : undefined}
            />
            {submitted && !form.specialty && (
              <p role="alert" id="specialty-error" className="mt-1 text-red-600 text-sm">
                Especialidade é obrigatório
              </p>
            )}

            {/* Telefone */}
            <label htmlFor="phone" className="block font-medium text-neutral-900">
              Telefone
            </label>
            <input
              id="phone"
              type="tel"
              value={form.phone || ''}
              onChange={(e) => handleInput('phone', e.target.value)}
              placeholder="(11) 91234-5678"
              className="pr-4 py-3 w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />

            {/* Senha */}
            <label htmlFor="password" className="block font-medium text-neutral-900 mt-6">
              Senha<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" />
              <input
                id="password"
                type="password"
                value={form.password || ''}
                onChange={(e) => handleInput('password', e.target.value)}
                className={`pl-10 pr-4 py-3 w-full rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary ${
                  submitted && !form.password ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-required="true"
                aria-invalid={submitted && !form.password}
                aria-describedby={submitted && !form.password ? 'password-error' : undefined}
              />
              {submitted && !form.password && (
                <p role="alert" id="password-error" className="mt-1 text-red-600 text-sm">
                  Senha é obrigatória
                </p>
              )}
            </div>
          </div>
        ) : (
          /* Form Hospital */
          <div className="space-y-6">
            {/* Nome do hospital */}
            <label htmlFor="hospitalName" className="block font-medium text-neutral-900">
              Nome do Hospital <span className="text-red-500">*</span>
            </label>
            <input
              id="hospitalName"
              type="text"
              value={form.hospitalName || ''}
              onChange={(e) => handleInput('hospitalName', e.target.value)}
              className={`pr-4 py-3 w-full rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary ${
                submitted && !form.hospitalName ? 'border-red-500' : 'border-gray-300'
              }`}
              aria-required="true"
              aria-invalid={submitted && !form.hospitalName}
              aria-describedby={submitted && !form.hospitalName ? 'hospitalName-error' : undefined}
            />
            {submitted && !form.hospitalName && (
              <p role="alert" id="hospitalName-error" className="mt-1 text-red-600 text-sm">
                Nome do hospital é obrigatório
              </p>
            )}

            {/* CNPJ */}
            <label htmlFor="cnpj" className="block font-medium text-neutral-900">
              CNPJ / CNES <span className="text-red-500">*</span>
            </label>
            <input
              id="cnpj"
              type="text"
              value={form.cnpj || ''}
              onChange={(e) => handleInput('cnpj', e.target.value)}
              placeholder="00.000.000/0000-00"
              className={`pr-4 py-3 w-full rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary ${
                submitted && !form.cnpj ? 'border-red-500' : 'border-gray-300'
              }`}
              aria-required="true"
              aria-invalid={submitted && !form.cnpj}
              aria-describedby={submitted && !form.cnpj ? 'cnpj-error' : undefined}
            />
            {submitted && !form.cnpj && (
              <p role="alert" id="cnpj-error" className="mt-1 text-red-600 text-sm">
                CNPJ / CNES é obrigatório
              </p>
            )}

            {/* Endereço */}
            <label htmlFor="address" className="block font-medium text-neutral-900">
              Endereço completo <span className="text-red-500">*</span>
            </label>
            <input
              id="address"
              type="text"
              value={form.address || ''}
              onChange={(e) => handleInput('address', e.target.value)}
              className={`pr-4 py-3 w-full rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary ${
                submitted && !form.address ? 'border-red-500' : 'border-gray-300'
              }`}
              aria-required="true"
              aria-invalid={submitted && !form.address}
              aria-describedby={submitted && !form.address ? 'address-error' : undefined}
            />
            {submitted && !form.address && (
              <p role="alert" id="address-error" className="mt-1 text-red-600 text-sm">
                Endereço é obrigatório
              </p>
            )}

            {/* Telefone */}
            <label htmlFor="phone" className="block font-medium text-neutral-900">
              Telefone
            </label>
            <input
              id="phone"
              type="tel"
              value={form.phone || ''}
              onChange={(e) => handleInput('phone', e.target.value)}
              placeholder="(11) 91234-5678"
              className="pr-4 py-3 w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />

            {/* E-mail institucional */}
            <label htmlFor="email" className="block font-medium text-neutral-900">
              E-mail institucional <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" />
              <input
                id="email"
                type="email"
                value={form.email || ''}
                onChange={(e) => handleInput('email', e.target.value)}
                className={`pl-10 pr-4 py-3 w-full rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary ${
                  submitted && !form.email ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-required="true"
                aria-invalid={submitted && !form.email}
                aria-describedby={submitted && !form.email ? 'email-error' : undefined}
              />
              {submitted && !form.email && (
                <p role="alert" id="email-error" className="mt-1 text-red-600 text-sm">
                  E-mail é obrigatório
                </p>
              )}
            </div>

            {/* Senha */}
            <label htmlFor="password" className="block font-medium text-neutral-900 mt-6">
              Senha <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" />
              <input
                id="password"
                type="password"
                value={form.password || ''}
                onChange={(e) => handleInput('password', e.target.value)}
                className={`pl-10 pr-4 py-3 w-full rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary ${
                  submitted && !form.password ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-required="true"
                aria-invalid={submitted && !form.password}
                aria-describedby={submitted && !form.password ? 'password-error' : undefined}
              />
              {submitted && !form.password && (
                <p role="alert" id="password-error" className="mt-1 text-red-600 text-sm">
                  Senha é obrigatória
                </p>
              )}
            </div>
          </div>
        )}

        {/* Consentimentos */}
        <fieldset className="mt-8 border-t pt-6 space-y-4" aria-describedby="consent-desc">
          <legend className="text-lg font-semibold text-neutral-900 mb-2">Consentimentos (LGPD)</legend>
          <p id="consent-desc" className="text-sm text-gray-600 mb-4 max-w-prose">
            Autorizo a plataforma a coletar, armazenar e processar meus dados pessoais e, se aplicável, dados sensíveis para as finalidades descritas.
          </p>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="consent-essential"
              checked={consents.essential}
              onChange={() => toggleConsent('essential')}
              required
              aria-required="true"
            />
            <label htmlFor="consent-essential" className="select-none cursor-pointer">
              Consinto o uso dos dados essenciais para funcionamento da plataforma (obrigatório)
            </label>
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="consent-marketing"
              checked={consents.marketing}
              onChange={() => toggleConsent('marketing')}
            />
            <label htmlFor="consent-marketing" className="select-none cursor-pointer">
              Autorizo receber comunicações de marketing
            </label>
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="consent-health"
              checked={consents.healthData}
              onChange={() => toggleConsent('healthData')}
            />
            <label htmlFor="consent-health" className="select-none cursor-pointer">
              Autorizo o uso de dados de saúde para gerenciamento de plantões e comunicação operacional
            </label>
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={!isFormValid()}
          className="mt-8 w-full bg-success text-white py-3 rounded-2xl font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-600 transition"
          aria-disabled={!isFormValid()}
        >
          Concordo e Cadastrar
        </button>
      </form>
    </main>
  );
}