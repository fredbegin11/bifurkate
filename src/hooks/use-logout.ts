import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth-store';

export const useLogout = () => {
  const clearSession = useAuthStore((state) => state.clearSession);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return () => {
    clearSession();
    queryClient.clear();
    navigate('/', { replace: true });
  };
};
