'use client';
import React from 'react';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { auth, db, storage } from './config';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, password: string, name: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, 'profissionais', userCredential.user.uid), {
      uid: userCredential.user.uid,
      name,
      email,
      createdAt: new Date(),
      role: 'profissional',
    });
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  const handleResetPassword = async (email: string) => {
    const { sendPasswordResetEmail } = await import('firebase/auth');
    await sendPasswordResetEmail(auth, email);
  };

  const value = { user, loading, signIn, signUp, signOut: handleSignOut, resetPassword: handleResetPassword };
  return React.createElement(AuthContext.Provider, { value }, children);
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

export async function getProfissional(uid: string) {
  const docRef = doc(db, 'profissionais', uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
}

export async function updateProfissional(uid: string, data: Record<string, unknown>) {
  await updateDoc(doc(db, 'profissionais', uid), data);
}

export async function createAgendamento(data: Record<string, unknown>) {
  const { collection, addDoc } = await import('firebase/firestore');
  const docRef = await addDoc(collection(db, 'agendamentos'), { ...data, createdAt: new Date() });
  return docRef.id;
}

export async function getAgendamentos(profissionalId?: string) {
  const { collection, query, where, getDocs, orderBy } = await import('firebase/firestore');
  const q = profissionalId
    ? query(collection(db, 'agendamentos'), where('profissionalId', '==', profissionalId), orderBy('createdAt', 'desc'))
    : query(collection(db, 'agendamentos'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getProfissionais() {
  const { collection, getDocs } = await import('firebase/firestore');
  const snapshot = await getDocs(collection(db, 'profissionais'));
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function createCliente(data: Record<string, unknown>, profissionalId: string) {
  const { collection, addDoc } = await import('firebase/firestore');
  const docRef = await addDoc(collection(db, 'clientes'), { ...data, profissionalId, createdAt: new Date() });
  return docRef.id;
}

export async function getClientes(profissionalId?: string) {
  const { collection, query, where, getDocs } = await import('firebase/firestore');
  const q = profissionalId
    ? query(collection(db, 'clientes'), where('profissionalId', '==', profissionalId))
    : query(collection(db, 'clientes'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function uploadImagem(uri: string, path: string) {
  const { ref, uploadBytes, getDownloadURL } = await import('firebase/storage');
  const storageRef = ref(storage, path);
  const response = await fetch(uri);
  const blob = await response.blob();
  await uploadBytes(storageRef, blob);
  return getDownloadURL(storageRef);
}
