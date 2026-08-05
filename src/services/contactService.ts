import { addContato as createContato, deleteContatoById, findContatoById, listContatos as fetchContatos, updateContato as saveContato } from '../database';
import type { Contact } from '../models/contact';

export async function getContacts() {
  return fetchContatos() as Promise<Contact[]>;
}

export async function addContact(name: string, email: string, telefone: string) {
  await createContato(name, email, telefone);
}

export async function updateContact(id: number, name: string, email: string, telefone: string) {
  await saveContato(id, name, email, telefone);
}

export async function deleteContact(id: number) {
  await deleteContatoById(id);
}

export async function getContactById(id: number) {
  return findContatoById(id) as Promise<Contact | null>;
}
