import { getAlbumStatsForUser, listStickerHistoryForUser, listStickersForUser, toggleStickerCollectedForUser, toggleStickerFavoriteForUser } from '../database';
import type { AlbumHistoryEntry, AlbumStats } from '../models/album';
import type { Sticker } from '../models/sticker';

export async function fetchStickers(userId: number, options?: { search?: string; filter?: 'all' | 'collected' | 'pending' | 'favorites' }) {
  return listStickersForUser(userId, options) as Promise<Sticker[]>;
}

export async function fetchAlbumStats(userId: number) {
  return getAlbumStatsForUser(userId) as Promise<AlbumStats>;
}

export async function fetchHistory(userId: number, limit = 15) {
  return listStickerHistoryForUser(userId, limit) as Promise<AlbumHistoryEntry[]>;
}

export async function toggleCollected(userId: number, stickerId: number) {
  return toggleStickerCollectedForUser(userId, stickerId);
}

export async function toggleFavorite(userId: number, stickerId: number) {
  return toggleStickerFavoriteForUser(userId, stickerId);
}
