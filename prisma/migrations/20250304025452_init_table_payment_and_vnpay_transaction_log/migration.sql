-- CreateTable
CREATE TABLE "payment" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "currency" VARCHAR(10) NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "payment_for" VARCHAR(50) NOT NULL,
    "payment_method" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3),

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vnpay_transaction_log" (
    "id" BIGSERIAL NOT NULL,
    "paymentId" BIGINT NOT NULL,
    "vnp_amount" DECIMAL(12,0) NOT NULL,
    "vnp_bank_code" VARCHAR(20) NOT NULL,
    "vnp_transaction_no" VARCHAR(50) NOT NULL,
    "vnp_response_code" VARCHAR(10) NOT NULL,
    "vnp_tmn_code" VARCHAR(20) NOT NULL,
    "vnp_pay_date" TIMESTAMPTZ(3) NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "vnpay_transaction_log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vnpay_transaction_log_paymentId_key" ON "vnpay_transaction_log"("paymentId");

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vnpay_transaction_log" ADD CONSTRAINT "vnpay_transaction_log_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
