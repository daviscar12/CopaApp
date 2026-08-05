import { addUsuario, findUsuarioByLogin, realizarLogin } from '../database';

export async function registerUser(name: string, email: string, password: string) {
  return addUsuario(name, email, password);
}

export async function loginUser(email: string, password: string) {
  return realizarLogin(email, password);
}

export async function resetPasswordByEmail(email: string) {
  const user = await findUsuarioByLogin(email);
  return !!user;
}
