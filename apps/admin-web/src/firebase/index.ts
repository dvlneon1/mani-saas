export { app, auth, db, storage } from './config';
export { AuthProvider, useAuth } from './auth-wrapper';
export { getProfissional, updateProfissional, createAgendamento, getAgendamentos, getProfissionais, createCliente, getClientes, uploadImagem } from './hooks';
export type { AuthContextType } from './hooks';
