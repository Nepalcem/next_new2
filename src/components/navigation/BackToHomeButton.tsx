import Link from "next/link";

export default function BackToHomeButton() {
  return (
    <Link href="/">
      <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 transition cursor-pointer">
        Back to Home Page
      </button>
    </Link>
  );
}