-- CreateTable
CREATE TABLE "candidates" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "candidates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidates_availability" (
    "id" TEXT NOT NULL,
    "start_date" INTEGER NOT NULL,
    "end_date" INTEGER NOT NULL,
    "candidate_id" TEXT NOT NULL,

    CONSTRAINT "candidates_availability_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "candidates_availability" ADD CONSTRAINT "candidates_availability_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
