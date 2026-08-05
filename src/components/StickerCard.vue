<template>
  <ion-card class="sticker-card" :class="{ collected: sticker.collected }">
    <div class="sticker-content">
      <div class="sticker-img">
        <img :src="sticker.image || 'https://picsum.photos/seed/default/150/200'" :alt="sticker.name" />
        <div v-if="sticker.collected" class="sticker-badge">✓ Coletada</div>
      </div>
      <div class="sticker-info">
        <h3>{{ sticker.name }}</h3>
        <p>{{ sticker.team }}</p>
      </div>
        <div class="sticker-actions">
        <ion-button fill="clear" color="secondary" @click="toggleCollected" class="sticker-btn">
          <ion-icon :icon="sticker.collected ? checkmarkCircle : addCircle"></ion-icon>
        </ion-button>
        <ion-button fill="clear" color="warning" @click.stop="toggleFavorite" class="sticker-btn favorite-btn">
          <ion-icon :icon="sticker.favorite ? star : starOutline"></ion-icon>
        </ion-button>
      </div>
    </div>
  </ion-card>
</template>

<script setup lang="ts">
import { IonCard, IonButton, IonIcon } from '@ionic/vue';
import { checkmarkCircle, addCircle, star, starOutline } from 'ionicons/icons';

interface Sticker { id: number; name: string; team: string; image?: string; collected?: boolean; favorite?: boolean }
const { sticker } = defineProps<{ sticker: Sticker }>();
const emit = defineEmits<{
  (e: 'toggle', id: number): void;
  (e: 'favorite', id: number): void;
}>();

function toggleCollected() {
  emit('toggle', sticker.id);
}

function toggleFavorite() {
  emit('favorite', sticker.id);
}
</script>

<style scoped>
.sticker-card {
  border: none;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
  background: linear-gradient(180deg, #fdfdfd 0%, #f4f7f2 100%);
}
.sticker-card:hover {
  box-shadow: 0 18px 32px rgba(0, 0, 0, 0.18);
  transform: translateY(-6px);
}
.sticker-card.collected {
  background: linear-gradient(180deg, rgba(237, 249, 237, 0.95), rgba(220, 245, 220, 0.95));
  border-left: 5px solid #006837;
}
.sticker-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px;
}
.sticker-img {
  position: relative;
  overflow: hidden;
  border-radius: 18px;
  background: radial-gradient(circle at top, rgba(247, 181, 0, 0.18), rgba(0, 104, 55, 0.12));
  height: 170px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.7);
}
img {
  max-width: 100%;
  max-height: 100%;
  display: block;
  object-fit: contain;
  border-radius: 14px;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
  transition: transform 0.35s ease;
}
.sticker-card:hover img {
  transform: scale(1.01);
}
.sticker-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #006837;
  color: #fff;
  padding: 5px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  box-shadow: 0 4px 12px rgba(0, 104, 55, 0.25);
}
.sticker-info h3 {
  margin: 0;
  font-size: 15px;
  color: #333;
  font-weight: 600;
  line-height: 1.2;
}
.sticker-info p {
  margin: 4px 0 0;
  font-size: 12px;
  color: #999;
  font-weight: 500;
}
.sticker-btn {
  align-self: center;
  transition: transform 0.2s ease;
}
.sticker-btn:active {
  transform: scale(0.9);
}
</style>
