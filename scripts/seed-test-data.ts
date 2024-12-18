// scripts/seed-test-data.ts
import prisma from '../lib/prisma'

async function main() {
  // Create some test metrics
  await prisma.imageMetrics.createMany({
    data: [
      {
        src: '/images/test1.jpg',
        loadTime: 150,
        size: 1024 * 100, // 100KB
        timestamp: new Date(),
      },
      {
        src: '/images/test2.jpg',
        loadTime: 200,
        size: 1024 * 200, // 200KB
        timestamp: new Date(),
      },
      // Add more test data as needed
    ],
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })