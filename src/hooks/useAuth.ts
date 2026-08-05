import { ref } from 'vue';
import type { User } from '../models/user';
import { loginUser, registerUser, resetPasswordByEmail } from '../services/authService';

const current = ref<User | null>(null);

export function useAuth() {
  async function register(payload: { name: string; email: string; password: string }) {
    const created = await registerUser(payload.name, payload.email, payload.password);
    if (!created) {
      throw new Error('Não foi possível criar a conta');
    }

    current.value = {
      id: Number(created.id),
      name: String(created.nome),
      email: String(created.login),
      password: payload.password
    };

    return current.value;
  }

  async function login(payload: { email: string; password: string }) {
    const user = await loginUser(payload.email, payload.password);
    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    current.value = {
      id: Number(user.id),
      name: String(user.nome),
      email: String(user.login),
      password: payload.password
    };

    return current.value;
  }

  function logout() {
    current.value = null;
  }

  async function resetPassword(email: string) {
    const exists = await resetPasswordByEmail(email);
    if (!exists) {
      throw new Error('E-mail não encontrado');
    }
    return true;
  }

  return {
    current,
    register,
    login,
    logout,
    resetPassword
  };
}
