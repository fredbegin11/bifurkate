import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type StravaSession = {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
};

type AuthState = {
  session: StravaSession | null;
  setSession: (session: StravaSession) => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      session: null,
      setSession: (session) => set({ session }),
      clearSession: () => set({ session: null }),
    }),
    { name: 'bifurkate-auth' },
  ),
);
