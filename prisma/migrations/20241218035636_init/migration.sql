-- CreateTable
CREATE TABLE "ImageMetrics" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "src" TEXT NOT NULL,
    "loadTime" REAL NOT NULL,
    "size" INTEGER NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "error" BOOLEAN NOT NULL DEFAULT false,
    "isZoomed" BOOLEAN NOT NULL DEFAULT false
);
