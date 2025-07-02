import { Suspense } from "react";
import { LoginForm } from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="w-full">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
