<template>
  <ion-list>
    <ion-item v-if="entries.length === 0">
      <ion-label>
        <h3>Nenhuma atividade registrada ainda.</h3>
        <p>Registre figurinhas para ver o histórico aqui.</p>
      </ion-label>
    </ion-item>
    <ion-item v-for="entry in entries" :key="entry.id" button>
      <ion-label>
        <h3>{{ entry.name }} - {{ entry.team }}</h3>
        <p>{{ actionLabel(entry.action) }} • {{ formatDate(entry.createdAt) }}</p>
      </ion-label>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
import { IonItem, IonLabel, IonList } from '@ionic/vue';
import type { AlbumHistoryEntry } from '../models/album';

const { entries, formatDate } = defineProps<{ entries: AlbumHistoryEntry[]; formatDate: (value: string) => string }>();

function actionLabel(action: string) {
  switch (action) {
    case 'collected':
      return 'Figurinha coletada';
    case 'removed':
      return 'Figurinha removida';
    case 'favorite':
      return 'Favorito marcado';
    case 'unfavorite':
      return 'Favorito removido';
    default:
      return 'Ação registrada';
  }
}
</script>

<style scoped>
ion-item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

ion-label h3 {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
}

ion-label p {
  margin: 5px 0 0;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.55);
}
</style>
