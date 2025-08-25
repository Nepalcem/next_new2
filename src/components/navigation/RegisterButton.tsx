import Link from "next/link";

export default function RegisterButton() {
  return (
    <Link href="/auth">
      <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition cursor-pointer">
        Register
      </button>
    </Link>
  );
}
