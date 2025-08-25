import LoginButton from "@/components/navigation/LoginButton";
import RegisterButton from "@/components/navigation/RegisterButton";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
      <h1 className="text-4xl font-bold mb-4">TM - GA CRM</h1>
      <div className="mt-6 flex gap-4">
        <LoginButton />
        <RegisterButton />
        {/* <GoogleSignInButton /> */}
      </div>
    </div>
  );
}
