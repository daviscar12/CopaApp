export interface Contact {
  id: number;
  name: string;
  email: string;
  telefone?: string;
}

export interface ContactFormData {
  nome: string;
  email: string;
  telefone: string;
}
