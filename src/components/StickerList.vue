<template>
  <div class="sticker-container">
    <div v-if="stickers.length === 0" class="empty-state">
      <p>Nenhuma figurinha encontrada</p>
    </div>
    <ion-grid v-else>
      <ion-row>
        <ion-col size="12" size-sm="6" size-md="4" size-lg="3" v-for="s in stickers" :key="s.id">
          <StickerCard :sticker="s" @toggle="toggle" />
        </ion-col>
      </ion-row>
    </ion-grid>
  </div>
</template>

<script setup lang="ts">
import StickerCard from './StickerCard.vue';
import { IonGrid, IonRow, IonCol } from '@ionic/vue';

interface Sticker { id: number; name: string; team: string; image?: string; collected?: boolean }

const { stickers } = defineProps<{ stickers: Sticker[] }>();
const emit = defineEmits<{
  (e: 'toggle', id: number): void
}>();

function toggle(id: number) { emit('toggle', id); }
</script>

<style scoped>
.sticker-container {
  padding: 8px 0;
}
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #ccc;
  font-size: 16px;
  font-weight: 500;
}
ion-grid {
  padding: 0 -8px;
}
ion-col {
  padding: 8px;
}
</style>
