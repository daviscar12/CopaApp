export interface AchievementDefinition {
  id: number;
  name: string;
  description: string;
  icon: string;
}

export interface AchievementItem extends AchievementDefinition {
  unlocked: boolean;
  unlockedAt?: string | null;
}
