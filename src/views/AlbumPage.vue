<template>
  <ion-page>
    <AppHeader title="Álbum da Copa" />
    <ion-content class="ion-padding album-content">
      <ion-card class="summary-card">
        <ion-card-content>
          <div class="summary-row">
            <div class="summary-stat">
              <h3>{{ stickers.length }}</h3>
              <p>Total</p>
            </div>
            <div class="summary-stat">
              <h3>{{ collectedCount }}</h3>
              <p>Coletadas</p>
            </div>
            <div class="summary-stat">
              <h3>{{ stickers.length - collectedCount }}</h3>
              <p>Faltando</p>
            </div>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
          </div>
        </ion-card-content>
      </ion-card>

      <ion-searchbar v-model="search" placeholder="Pesquisar jogador ou seleção" />

      <ion-segment v-model="filter" color="primary">
        <ion-segment-button value="all">Todas</ion-segment-button>
        <ion-segment-button value="collected">Coletadas</ion-segment-button>
        <ion-segment-button value="pending">Pendentes</ion-segment-button>
      </ion-segment>

      <StickerList :stickers="filtered" @toggle="toggle" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue';
import StickerList from '../components/StickerList.vue';
import { useAlbum } from '../composables/useAlbum';
import { computed } from 'vue';
import { IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSearchbar, IonSegment, IonSegmentButton } from '@ionic/vue';

const { stickers, filtered, search, filter, toggleCollected } = useAlbum();

const collectedCount = computed(() => (stickers.value || []).filter((s: any) => s.collected).length);
const progressPercent = computed(() => Math.round((collectedCount.value / stickers.value.length) * 100) || 0);

function toggle(id: number) { toggleCollected(id); }
</script>

<style scoped>
.album-content {
  background: linear-gradient(to bottom, #f9fbf9 0%, #f4f7f2 100%);
}
.summary-card {
  background: linear-gradient(135deg, rgba(0,104,55,0.15) 0%, rgba(0,36,125,0.15) 100%);
  border: none;
  border-radius: 16px;
  box-shadow: 0 6px 16px rgba(0, 104, 55, 0.08);
  margin-bottom: 20px;
}
.summary-row {
  display: flex;
  justify-content: space-around;
  gap: 16px;
  padding: 12px 0;
}
.summary-stat {
  text-align: center;
  flex: 1;
}
.summary-stat h3 {
  margin: 0;
  font-size: 28px;
  color: #006837;
  font-weight: 700;
}
.summary-stat p {
  margin: 6px 0 0;
  font-size: 13px;
  color: #00683799;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.progress-bar {
  height: 10px;
  background: rgba(255,255,255,0.6);
  border-radius: 6px;
  margin-top: 16px;
  overflow: hidden;
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
}
.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #006837 0%, #f7b500 100%);
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 6px;
}
</style>
