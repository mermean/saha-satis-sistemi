-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "company" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "taxNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);
