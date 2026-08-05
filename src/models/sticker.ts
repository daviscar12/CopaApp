export interface Sticker {
  id: number;
  name: string;
  team: string;
  image?: string;
  collected?: boolean;
  favorite?: boolean;
}
