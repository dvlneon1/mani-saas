import { z } from 'zod';

export const phoneSchema = z.string().regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, 'Telefone inválido');
export const cpfSchema = z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido');
export const cnpjSchema = z.string().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'CNPJ inválido');

export const emailSchema = z.string().email('Email inválido');
export const passwordSchema = z.string().min(8, 'Mínimo 8 caracteres');

export const clientSchema = z.object({
  name: z.string().min(2, 'Nome obrigatório'),
  phone: phoneSchema,
  email: emailSchema.optional(),
  notes: z.string().optional(),
});

export type ClientInput = z.infer<typeof clientSchema>;
