import { Suspense } from "react";
import PaymentComplete from "../../components/PaymentComplete";

export default function PaymentCompletePage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <PaymentComplete />
    </Suspense>
  );
}
