import { ref } from 'vue';

type User = { id: number; name: string; email: string; password: string };

const users = ref<User[]>([]);
const current = ref<User | null>(null);

export function useAuth() {
  function register(payload: { name: string; email: string; password: string }) {
    const exists = users.value.find(u => u.email === payload.email);
    if (exists) throw new Error('E-mail já cadastrado');
    const user: User = { id: Date.now(), ...payload };
    users.value.push(user);
    current.value = user;
    return user;
  }

  function login(payload: { email: string; password: string }) {
    const user = users.value.find(u => u.email === payload.email && u.password === payload.password);
    if (!user) throw new Error('Credenciais inválidas');
    current.value = user;
    return user;
  }

  function logout() { current.value = null; }

  function resetPassword(email: string) {
    const user = users.value.find(u => u.email === email);
    if (!user) throw new Error('E-mail não encontrado');
    
    return true;
  }

  return { users, current, register, login, logout, resetPassword };
}
