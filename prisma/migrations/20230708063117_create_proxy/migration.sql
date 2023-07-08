-- CreateTable
CREATE TABLE "Proxy" (
    "id" SERIAL NOT NULL,
    "host" TEXT NOT NULL,
    "port" INTEGER NOT NULL,

    CONSTRAINT "Proxy_pkey" PRIMARY KEY ("id")
);
