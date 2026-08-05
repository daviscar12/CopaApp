import { computed, ref } from 'vue';
import type { Sticker } from '../models/sticker';
import type { AlbumHistoryEntry, AlbumStats } from '../models/album';
import { fetchAlbumStats, fetchHistory, fetchStickers, toggleCollected, toggleFavorite } from '../services/albumService';

const stickers = ref<Sticker[]>([]);
const search = ref('');
const filter = ref<'all' | 'collected' | 'pending' | 'favorites'>('all');
const viewMode = ref<'album' | 'stats'>('album');
const stats = ref<AlbumStats | null>(null);
const history = ref<AlbumHistoryEntry[]>([]);

async function loadStickers(userId: number) {
  stickers.value = await fetchStickers(userId, { search: search.value, filter: filter.value });
}

async function loadStats(userId: number) {
  stats.value = await fetchAlbumStats(userId);
}

async function loadHistory(userId: number) {
  history.value = await fetchHistory(userId, 12);
}

async function refreshData(userId: number) {
  await Promise.all([loadStickers(userId), loadStats(userId), loadHistory(userId)]);
}

async function toggleCollectedSticker(stickerId: number, userId: number) {
  await toggleCollected(userId, stickerId);
  await refreshData(userId);
}

async function toggleFavoriteSticker(stickerId: number, userId: number) {
  await toggleFavorite(userId, stickerId);
  await refreshData(userId);
}

const favoriteCount = computed(() => stats.value?.favorites ?? 0);
const collectedCount = computed(() => (stickers.value || []).filter((s) => s.collected).length);
const progressPercent = computed(() => stats.value?.progress ?? 0);
const rankLabel = computed(() => {
  const progress = stats.value?.progress ?? 0;
  if (progress >= 100) return 'Diamante';
  if (progress >= 80) return 'Platina';
  if (progress >= 60) return 'Ouro';
  if (progress >= 30) return 'Prata';
  return 'Bronze';
});

function formatDate(datetime: string) {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }).format(new Date(datetime));
}

export function useAlbum() {
  return {
    stickers,
    search,
    filter,
    viewMode,
    stats,
    history,
    favoriteCount,
    collectedCount,
    progressPercent,
    rankLabel,
    formatDate,
    loadStickers,
    loadStats,
    loadHistory,
    refreshData,
    toggleCollectedSticker,
    toggleFavoriteSticker
  };
}
