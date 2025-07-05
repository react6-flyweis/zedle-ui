import { Suspense } from "react";
import { SignupForm } from "../components/SignUPForm";

export default function LoginPage() {
  return (
    <div className="w-full">
      <Suspense>
        <SignupForm />
      </Suspense>
    </div>
  );
}
