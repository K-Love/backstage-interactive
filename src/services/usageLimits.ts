import prisma from '@/lib/prisma';
import { PLAN_LIMITS, PlanType } from '@/config/planLimits';

export class UsageLimitsService {
  static async checkUserLimits(userId: string, toolId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        subscriptions: {
          where: {
            toolId,
            status: 'active',
          },
        },
        toolUsage: {
          where: {
            toolId,
            startTime: {
              gte: new Date(new Date().setHours(0, 0, 0, 0)),
            },
          },
        },
      },
    });

    if (!user) throw new Error('User not found');

    const subscription = user.subscriptions[0];
    if (!subscription) throw new Error('No active subscription found');

    const plan = subscription.plan as PlanType;
    const limits = PLAN_LIMITS[plan];
    const todayUsage = user.toolUsage.length;

    const activeUsage = await prisma.toolUsage.count({
      where: {
        userId,
        status: 'active',
        endTime: null,
      },
    });

    return {
      canUse: todayUsage < limits.dailyUsage && activeUsage < limits.concurrentUse,
      currentUsage: todayUsage,
      limit: limits.dailyUsage,
      remainingUses: limits.dailyUsage - todayUsage,
      activeUsage,
      concurrentLimit: limits.concurrentUse,
      plan,
    };
  }

  static async getDailyUsageStats(userId: string) {
    const today = new Date(new Date().setHours(0, 0, 0, 0));
    
    const usage = await prisma.toolUsage.groupBy({
      by: ['toolId'],
      where: {
        userId,
        startTime: {
          gte: today,
        },
      },
      _count: {
        _all: true,
      },
    });

    return usage;
  }
}