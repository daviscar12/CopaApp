export interface AlbumStats {
  total: number;
  collected: number;
  pending: number;
  favorites: number;
  progress: number;
}

export interface AlbumHistoryEntry {
  id: number;
  stickerId: number;
  action: 'collected' | 'removed' | 'favorite' | 'unfavorite';
  createdAt: string;
  name: string;
  team: string;
  image?: string;
}
