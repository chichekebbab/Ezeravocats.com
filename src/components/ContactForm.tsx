import React, { useState } from 'react';
import { Check, AlertCircle, Loader2 } from 'lucide-react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Accepte 0X XX XX XX XX, +33 X XX XX XX XX, espaces, points, tirets, parenthèses
const PHONE_REGEX = /^[+\d][\d\s.\-()]{7,}$/;

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<Status>('idle');

  const validateField = (name: string, value: string): string | undefined => {
    const trimmed = value.trim();
    if (name === 'name') {
      if (!trimmed) return 'Veuillez indiquer votre nom.';
      if (trimmed.length < 2) return 'Le nom doit contenir au moins 2 caractères.';
    }
    if (name === 'email') {
      if (!trimmed) return "Veuillez indiquer votre email.";
      if (!EMAIL_REGEX.test(trimmed)) return "Format d'email invalide.";
    }
    if (name === 'phone') {
      if (!trimmed) return 'Veuillez indiquer un numéro de téléphone.';
      if (!PHONE_REGEX.test(trimmed)) return 'Format de téléphone invalide.';
    }
    if (name === 'message') {
      if (!trimmed) return 'Veuillez décrire votre demande.';
      if (trimmed.length < 10) return 'Merci de préciser votre demande (10 caractères minimum).';
    }
    return undefined;
  };

  const validateAll = (): FormErrors => {
    const next: FormErrors = {};
    (Object.keys(formData) as Array<keyof typeof formData>).forEach((key) => {
      const err = validateField(key, formData[key]);
      if (err) next[key] = err;
    });
    return next;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Re-valider à la volée seulement si le champ a déjà été touché
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allErrors = validateAll();
    setErrors(allErrors);
    setTouched({ name: true, email: true, phone: true, message: true });
    if (Object.keys(allErrors).length > 0) return;

    setStatus('submitting');
    try {
      const res = await fetch('https://formspree.io/f/xjkknejp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('submit_failed');

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTouched({});
      setErrors({});
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const inputBase =
    'mt-1 block w-full px-4 py-3 bg-gray-50 border-0 ring-1 ring-transparent focus:ring-1 focus:ring-primary text-gray-900 placeholder:text-gray-400 transition-shadow duration-150';
  const inputError = 'ring-red-400 focus:ring-red-500 bg-red-50/40';

  const inputClass = (field: keyof FormErrors) =>
    `${inputBase} ${errors[field] && touched[field] ? inputError : ''}`;

  const isSubmitting = status === 'submitting';

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6" aria-busy={isSubmitting}>
      {/* SUCCESS BANNER */}
      {status === 'success' && (
        <div
          role="status"
          aria-live="polite"
          className="flex items-start gap-3 p-4 bg-emerald-50 ring-1 ring-emerald-200 text-emerald-900"
        >
          <Check className="h-5 w-5 mt-0.5 flex-shrink-0 text-emerald-600" aria-hidden />
          <div className="text-sm leading-relaxed">
            <p className="font-medium">Message envoyé.</p>
            <p className="text-emerald-800/80">
              Nous vous répondons dans les plus brefs délais.
            </p>
          </div>
        </div>
      )}

      {/* ERROR BANNER */}
      {status === 'error' && (
        <div
          role="alert"
          aria-live="assertive"
          className="flex items-start gap-3 p-4 bg-red-50 ring-1 ring-red-200 text-red-900"
        >
          <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0 text-red-600" aria-hidden />
          <div className="text-sm leading-relaxed">
            <p className="font-medium">L'envoi a échoué.</p>
            <p className="text-red-800/80">
              Vous pouvez réessayer, ou nous écrire directement à{' '}
              <a
                href="mailto:myriam.douillet@ezeravocats.com"
                className="underline underline-offset-2 hover:text-red-950"
              >
                myriam.douillet@ezeravocats.com
              </a>
              .
            </p>
          </div>
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-light tracking-wide text-gray-600">
          Nom complet
        </label>
        <input
          type="text"
          name="name"
          id="name"
          autoComplete="name"
          required
          aria-invalid={!!(errors.name && touched.name)}
          aria-describedby={errors.name && touched.name ? 'name-error' : undefined}
          className={inputClass('name')}
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
        />
        {errors.name && touched.name && (
          <p id="name-error" className="mt-1.5 text-xs text-red-600">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-light tracking-wide text-gray-600">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          autoComplete="email"
          required
          aria-invalid={!!(errors.email && touched.email)}
          aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
          className={inputClass('email')}
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
        />
        {errors.email && touched.email && (
          <p id="email-error" className="mt-1.5 text-xs text-red-600">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-light tracking-wide text-gray-600">
          Téléphone
        </label>
        <input
          type="tel"
          name="phone"
          id="phone"
          autoComplete="tel"
          required
          aria-invalid={!!(errors.phone && touched.phone)}
          aria-describedby={errors.phone && touched.phone ? 'phone-error' : undefined}
          className={inputClass('phone')}
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
        />
        {errors.phone && touched.phone && (
          <p id="phone-error" className="mt-1.5 text-xs text-red-600">
            {errors.phone}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-light tracking-wide text-gray-600">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          rows={4}
          required
          aria-invalid={!!(errors.message && touched.message)}
          aria-describedby={errors.message && touched.message ? 'message-error' : undefined}
          className={inputClass('message')}
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
        />
        {errors.message && touched.message && (
          <p id="message-error" className="mt-1.5 text-xs text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-8 py-4 text-sm tracking-wider font-light text-white bg-gray-900 hover:bg-gray-700 transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            ENVOI EN COURS…
          </>
        ) : (
          'ENVOYER'
        )}
      </button>
    </form>
  );
}
