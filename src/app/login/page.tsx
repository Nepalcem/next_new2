import LoginForm from "./form";
import BackToHomeButton from "@/components/navigation/BackToHomeButton";
import RegisterButton from "@/components/navigation/RegisterButton";

export default function LoginPage() {
  return (
    <section className="flex items-center justify-center">
      <div className="w-[400px]">
        <LoginForm />
        <div className="mt-6 text-center">
          <span className="mr-2">Don&apos;t have an account?</span>
          <RegisterButton />
        </div>
        <div className="mt-4 text-center">
          <BackToHomeButton />
        </div>
      </div>
    </section>
  );
}
