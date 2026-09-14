import { z } from 'zod';

/**
 * Numéros de téléphone français : mobiles (06/07) et fixes (01-05, 09),
 * avec ou sans indicatif international (+33 / 0033), séparateurs libres
 * (espace, point, tiret) entre les groupes de chiffres.
 * Exemples valides : "06 12 34 56 78", "0612345678", "+33 6 12 34 56 78",
 * "+33612345678", "01.42.34.56.78".
 */
export const FRENCH_PHONE_REGEX = /^(?:(?:\+33|0033)[\s.-]?|0)[1-9](?:[\s.-]?\d{2}){4}$/;

/** Longueur max saisissable dans le champ (couvre "+33 6 12 34 56 78" / "0033 6 12 34 56 78" avec espaces). */
export const FRENCH_PHONE_MAX_LENGTH = 20;

/** Un code postal français fait toujours 5 chiffres. */
export const FRENCH_POSTAL_CODE_MAX_LENGTH = 5;

/** Normalise un numéro FR saisi en un format E.164-like sans espaces : +336XXXXXXXX */
export function normalizeFrenchPhone(rawPhone: string): string {
  const digits = rawPhone.trim().replace(/[\s.-]/g, '');
  if (digits.startsWith('+33')) return digits;
  if (digits.startsWith('0033')) return `+33${digits.slice(4)}`;
  if (digits.startsWith('0')) return `+33${digits.slice(1)}`;
  return digits;
}

/**
 * Formate un numéro FR au fil de la saisie, en regroupant les chiffres par
 * paires comme à l'écrit : "0612345678" → "06 12 34 56 78",
 * "+33612345678" → "+33 6 12 34 56 78", "0033612345678" → "0033 6 12 34 56 78".
 * Ignore automatiquement toute lettre ou caractère invalide tapé au clavier.
 */
export function formatFrenchPhoneAsYouType(rawValue: string): string {
  const cleaned = rawValue.replace(/[^\d+]/g, '');

  if (cleaned.startsWith('+33')) {
    const digits = cleaned.slice(3).replace(/\D/g, '').slice(0, 9);
    if (digits.length === 0) return '+33';
    const groups = [digits[0], ...(digits.slice(1).match(/.{1,2}/g) ?? [])];
    return `+33 ${groups.join(' ')}`;
  }

  const allDigits = cleaned.replace(/\D/g, '');

  if (allDigits.startsWith('0033')) {
    const digits = allDigits.slice(4).slice(0, 9);
    if (digits.length === 0) return '0033';
    const groups = [digits[0], ...(digits.slice(1).match(/.{1,2}/g) ?? [])];
    return `0033 ${groups.join(' ')}`;
  }

  const local = allDigits.slice(0, 10);
  return (local.match(/.{1,2}/g) ?? []).join(' ');
}

/** Ne garde que des chiffres pour le code postal, coupé à 5 caractères. */
export function sanitizePostalCodeInput(value: string): string {
  return value.replace(/\D/g, '').slice(0, FRENCH_POSTAL_CODE_MAX_LENGTH);
}

export const frenchPhoneSchema = z
  .string()
  .trim()
  .min(1, 'Le numéro de téléphone est requis')
  .regex(
    FRENCH_PHONE_REGEX,
    'Numéro de téléphone invalide (format français attendu, ex : 06 12 34 56 78)'
  );

export const nameSchema = z
  .string()
  .trim()
  .min(2, 'Le nom doit contenir au moins 2 caractères')
  .max(100, 'Le nom est trop long (100 caractères max)');

export const emailSchema = z
  .string()
  .trim()
  .min(1, "L'email est requis")
  .email('Adresse email invalide');

export const frenchPostalCodeSchema = z
  .string()
  .trim()
  .regex(/^\d{5}$/, 'Code postal invalide (5 chiffres attendus, ex : 75001)');

export const citySchema = z
  .string()
  .trim()
  .min(1, 'La ville est requise')
  .max(100, 'Nom de ville trop long');

/** Étape "Où se situe le bien ?" du wizard d'estimation */
export const locationSchema = z.object({
  postalCode: frenchPostalCodeSchema,
  city: citySchema,
});

/** Étape "Vos coordonnées" du wizard d'estimation */
export const contactInfoSchema = z.object({
  name: nameSchema,
  phone: frenchPhoneSchema,
  email: emailSchema,
});

/** Formulaire de la page Contact */
export const contactFormSchema = z.object({
  name: nameSchema,
  phone: frenchPhoneSchema,
  email: emailSchema,
  propertyType: z.string().optional(),
  surface: z
    .string()
    .optional()
    .refine((v) => !v || /^\d+$/.test(v), { message: 'La surface doit être un nombre (en m²)' }),
  message: z.string().max(2000, 'Message trop long (2000 caractères max)').optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * Valide un objet avec un schéma Zod et retourne les erreurs sous forme de
 * { nomDuChamp: messageDErreur }, prêtes à afficher sous chaque champ.
 */
export function getFieldErrors<T>(schema: z.ZodType<T>, data: unknown): Record<string, string> {
  const result = schema.safeParse(data);
  if (result.success) return {};

  const fieldErrors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const key = String(issue.path[0] ?? '_form');
    if (!fieldErrors[key]) fieldErrors[key] = issue.message;
  }
  return fieldErrors;
}
