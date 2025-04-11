export const PLAN_LIMITS = {
    free: {
      dailyUsage: 10, // Number of times a tool can be used per day
      maxDuration: 30, // Maximum duration in minutes per session
      concurrentUse: 1, // Number of tools that can be used simultaneously
      features: ['basic'],
    },
    premium: {
      dailyUsage: 100,
      maxDuration: 240,
      concurrentUse: 3,
      features: ['basic', 'advanced', 'priority'],
    },
  } as const;
  
  export type PlanType = keyof typeof PLAN_LIMITS;
  export type FeatureType = (typeof PLAN_LIMITS.premium.features)[number];
  
  export const LIMIT_THRESHOLDS = {
    warningThreshold: 0.8, // Show warning at 80% usage
    criticalThreshold: 0.95, // Show critical warning at 95% usage
  };