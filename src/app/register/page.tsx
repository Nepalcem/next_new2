

import RegisterForm from "./form";
import BackToHomeButton from "@/components/navigation/BackToHomeButton";
import LoginButton from "@/components/navigation/LoginButton";

export default async function RegisterPage() {

  return (
    <section className="flex items-center justify-center">
      <div className="w-[600px]">
        <RegisterForm />
        <div className="mt-6 text-center">
          <span className="mr-2">Already have an account?</span>
          <LoginButton />
        </div>
        <div className="mt-4 text-center">
          <BackToHomeButton />
        </div>
      </div>
    </section>
  );
}
