import type { AchievementItem } from '../models/achievement';
import { listAchievementsForUser, recalculateUserAchievements } from '../database';

export async function fetchAchievements(userId: number): Promise<AchievementItem[]> {
  return listAchievementsForUser(userId);
}

export async function refreshAchievements(userId: number): Promise<AchievementItem[]> {
  await recalculateUserAchievements(userId);
  return listAchievementsForUser(userId);
}
