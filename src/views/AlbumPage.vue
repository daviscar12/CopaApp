<template>
  <ion-page>
    <AppHeader title="Álbum da Copa" />
    <ion-content class="ion-padding album-content">
      <ion-card class="summary-card">
        <ion-card-content>
          <div class="summary-row">
            <div class="summary-stat">
              <h3>{{ stats?.total ?? 0 }}</h3>
              <p>Total</p>
            </div>
            <div class="summary-stat">
              <h3>{{ stats?.collected ?? 0 }}</h3>
              <p>Coletadas</p>
            </div>
            <div class="summary-stat">
              <h3>{{ stats?.pending ?? 0 }}</h3>
              <p>Faltando</p>
            </div>
            <div class="summary-stat">
              <h3>{{ stats?.favorites ?? 0 }}</h3>
              <p>Favoritas</p>
            </div>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
          </div>
          <div class="rank-card">
            <p>Ranking: <strong>{{ rankLabel }}</strong></p>
          </div>
        </ion-card-content>
      </ion-card>

      <ion-segment v-model="tab" color="primary" class="tab-segment">
        <ion-segment-button value="album">Coleção</ion-segment-button>
        <ion-segment-button value="favorites">Favoritas</ion-segment-button>
        <ion-segment-button value="history">Histórico</ion-segment-button>
      </ion-segment>

      <section class="tab-panel" v-if="tab !== 'history'">
        <ion-searchbar v-model="search" placeholder="Pesquisar jogador ou seleção" />

        <ion-segment v-model="filter" color="secondary" class="filter-segment">
          <ion-segment-button value="all">Todas</ion-segment-button>
          <ion-segment-button value="collected">Coletadas</ion-segment-button>
          <ion-segment-button value="pending">Pendentes</ion-segment-button>
        </ion-segment>

        <StickerList :stickers="stickersToShow" @toggle="toggleCollected" @favorite="toggleFavorite" />
      </section>

      <section class="tab-panel" v-else>
        <AlbumHistory :entries="history" :formatDate="formatDate" />
      </section>

      <div class="footer-link">
        <router-link to="/achievements">Ver Conquistas</router-link>
        <span class="separator">•</span>
        <router-link to="/about">Sobre o aplicativo</router-link>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue';
import StickerList from '../components/StickerList.vue';
import AlbumHistory from '../components/AlbumHistory.vue';
import { useAlbum } from '../composables/useAlbum';
import { ref, onMounted, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import { IonPage, IonContent, IonCard, IonCardContent, IonSearchbar, IonSegment, IonSegmentButton } from '@ionic/vue';

const router = useRouter();
const { current } = useAuth();
const {
  stickers,
  search,
  filter,
  stats,
  history,
  progressPercent,
  rankLabel,
  formatDate,
  refreshData,
  toggleCollectedSticker,
  toggleFavoriteSticker
} = useAlbum();

const tab = ref<'album' | 'favorites' | 'history'>('album');

const stickersToShow = computed(() => {
  if (tab.value === 'favorites') {
    return stickers.value.filter((s) => s.favorite);
  }
  return stickers.value;
});

async function toggleCollected(id: number) {
  if (!current.value?.id) {
    router.push('/login');
    return;
  }
  await toggleCollectedSticker(id, current.value.id);
}

async function toggleFavorite(id: number) {
  if (!current.value?.id) {
    router.push('/login');
    return;
  }
  await toggleFavoriteSticker(id, current.value.id);
}

watch([search, filter, tab, current], async () => {
  if (!current.value?.id) {
    return;
  }
  await refreshData(current.value.id);
}, { deep: true });

onMounted(async () => {
  if (!current.value?.id) {
    router.push('/login');
    return;
  }
  await refreshData(current.value.id);
});
</script>

<style scoped>
.album-content {
  background: linear-gradient(to bottom, #f9fbf9 0%, #f4f7f2 100%);
}
.top-cards {
  margin-bottom: 18px;
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
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
  padding: 12px 0;
}
.summary-stat {
  text-align: center;
  flex: 1 1 110px;
}
.summary-stat h3 {
  margin: 0;
  font-size: 24px;
  color: #006837;
  font-weight: 700;
}
.summary-stat p {
  margin: 6px 0 0;
  font-size: 12px;
  color: #00683799;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.progress-bar {
  height: 12px;
  background: rgba(255,255,255,0.7);
  border-radius: 8px;
  margin-top: 16px;
  overflow: hidden;
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
}
.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #006837 0%, #f7b500 100%);
  transition: width 0.4s ease;
}
.rank-card {
  margin-top: 14px;
  text-align: right;
  color: #003d1e;
  font-size: 14px;
}
.tab-segment {
  margin: 10px 0;
}
.filter-segment {
  margin: 10px 0 18px;
}
.tab-panel {
  min-height: 320px;
}
.footer-link {
  margin-top: 24px;
  text-align: center;
}
.footer-link a {
  color: #006837;
  font-weight: 600;
  text-decoration: none;
}
.footer-link a:hover {
  text-decoration: underline;
}
</style>
