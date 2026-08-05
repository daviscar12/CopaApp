<template>
  <ion-card :class="{ unlocked: achievement.unlocked }" class="achievement-card">
    <ion-card-header>
      <ion-card-subtitle>
        <ion-icon :icon="icon" />
        {{ achievement.name }}
      </ion-card-subtitle>
      <ion-badge :color="achievement.unlocked ? 'success' : 'medium'">
        {{ achievement.unlocked ? 'Desbloqueada' : 'Bloqueada' }}
      </ion-badge>
    </ion-card-header>
    <ion-card-content>
      <p>{{ achievement.description }}</p>
      <p v-if="achievement.unlocked" class="unlocked-at">Desbloqueada em {{ formattedUnlockedAt }}</p>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { IonBadge, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonIcon } from '@ionic/vue';
import { trophy, sparkles, star, flash, ribbon, ribbonOutline, medal, checkmarkCircle } from 'ionicons/icons';
import type { AchievementItem } from '../models/achievement';

const { achievement } = defineProps<{ achievement: AchievementItem }>();

const iconMap: Record<string, any> = {
  trophy,
  sparkles,
  star,
  flash,
  ribbon,
  ribbonOutline,
  medal,
  checkmarkCircle
};

const icon = computed(() => iconMap[achievement.icon] || trophy);
const formattedUnlockedAt = computed(() => {
  if (!achievement.unlockedAt) {
    return '';
  }
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(achievement.unlockedAt));
});
</script>

<style scoped>
.achievement-card {
  margin-bottom: 14px;
  border-radius: 16px;
  overflow: hidden;
}
.achievement-card.unlocked {
  border: 1px solid #22c55e;
}
ion-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}
ion-card-subtitle {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  color: #0f766e;
}
ion-card-content p {
  margin: 0 0 8px;
  font-size: 14px;
  color: #334155;
}
.unlocked-at {
  font-size: 12px;
  color: #0f766e;
  margin-top: 4px;
}
</style>
