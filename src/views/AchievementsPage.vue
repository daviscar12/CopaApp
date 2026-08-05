<template>
  <ion-page>
    <AppHeader title="Conquistas" />
    <ion-content class="ion-padding achievements-content">
      <ion-card>
        <ion-card-header>
          <ion-card-subtitle>Progresso do Álbum</ion-card-subtitle>
          <ion-card-title>{{ stats?.collected ?? 0 }} / {{ stats?.total ?? 0 }} coletadas</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-progress-bar :value="(stats?.progress ?? 0) / 100"></ion-progress-bar>
          <p class="progress-label">{{ stats?.progress ?? 0 }}% concluído</p>
        </ion-card-content>
      </ion-card>

      <div class="section-header">
        <h2>Minhas Insígnias</h2>
      </div>

      <div v-if="achievements.length === 0" class="empty-state">
        <p>Carregando conquistas...</p>
      </div>

      <div v-else>
        <AchievementCard v-for="achievement in achievements" :key="achievement.id" :achievement="achievement" />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import AppHeader from '../components/AppHeader.vue';
import AchievementCard from '../components/AchievementCard.vue';
import { useAuth } from '../composables/useAuth';
import { fetchAchievements, refreshAchievements } from '../services/achievementService';
import type { AchievementItem } from '../models/achievement';
import type { AlbumStats } from '../models/album';
import { fetchAlbumStats } from '../services/albumService';
import { IonPage, IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonProgressBar } from '@ionic/vue';

const router = useRouter();
const { current } = useAuth();
const achievements = ref<AchievementItem[]>([]);
const stats = ref<AlbumStats | null>(null);

async function load() {
  if (!current.value?.id) {
    router.push('/login');
    return;
  }
  await refreshAchievements(current.value.id);
  achievements.value = await fetchAchievements(current.value.id);
  stats.value = await fetchAlbumStats(current.value.id);
}

onMounted(load);
</script>

<style scoped>
.achievements-content {
  background: linear-gradient(to bottom, #f5f7f9 0%, #eef4f2 100%);
}
.section-header {
  margin: 24px 0 12px;
}
.section-header h2 {
  margin: 0;
  color: #0f766e;
  font-size: 18px;
  font-weight: 700;
}
.progress-label {
  margin-top: 10px;
  color: #475569;
  font-size: 13px;
}
.empty-state {
  text-align: center;
  padding: 40px 0;
  color: #64748b;
}
</style>
