import { useEffect, useState } from 'react';
import { supabase } from './config';
import { Database } from '@/packages/supabase-schema/src/types/database.types';

export type Profile = Database['public']['Tables']['professionals']['Row'];
export type Client = Database['public']['Tables']['clients']['Row'];
export type Appointment = Database['public']['Tables']['appointments']['Row'];
export type Service = Database['public']['Tables']['services']['Row'];
export type Transaction = Database['public']['Tables']['transactions']['Row'];

export function useSupabase() {
  return supabase;
}

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => authListener?.subscription.unsubscribe();
  }, []);

  return { user, loading, supabase };
}

export function useProfessionals() {
  const [data, setData] = useState<Profile[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('professionals')
      .select('*')
      .then(({ data, error }) => {
        setData(data ?? null);
        setLoading(false);
      });
  }, []);

  return { data, loading };
}

export function useClients() {
  const [data, setData] = useState<Client[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('clients')
      .select('*')
      .then(({ data, error }) => {
        setData(data ?? null);
        setLoading(false);
      });
  }, []);

  return { data, loading };
}

export function useAppointments() {
  const [data, setData] = useState<Appointment[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('appointments')
      .select('*, clients(*), services(*)')
      .order('scheduled_start', { ascending: true })
      .then(({ data, error }) => {
        setData(data ?? null);
        setLoading(false);
      });
  }, []);

  return { data, loading };
}

export function useServices() {
  const [data, setData] = useState<Service[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('services')
      .select('*')
      .then(({ data, error }) => {
        setData(data ?? null);
        setLoading(false);
      });
  }, []);

  return { data, loading };
}

export function useTransactions() {
  const [data, setData] = useState<Transaction[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('transactions')
      .select('*')
      .order('transaction_date', { ascending: false })
      .then(({ data, error }) => {
        setData(data ?? null);
        setLoading(false);
      });
  }, []);

  return { data, loading };
}
