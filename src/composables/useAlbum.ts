import { ref, computed } from 'vue';
import { listStickersForUser, toggleStickerCollectedForUser } from '../service/database';

interface Sticker { id: number; name: string; team: string; image?: string; collected?: boolean }

const stickers = ref<Sticker[]>([]);
const search = ref('');
const filter = ref<'all'|'collected'|'pending'>('all');

async function loadStickers(userId: number) {
  const data = await listStickersForUser(userId, { search: search.value, filter: filter.value });
  stickers.value = data;
}

async function toggleCollected(id: number, userId: number) {
  await toggleStickerCollectedForUser(userId, id);
  await loadStickers(userId);
}

const filtered = computed(() => stickers.value);

export function useAlbum() {
  return { stickers, search, filter, filtered, loadStickers, toggleCollected };
}
