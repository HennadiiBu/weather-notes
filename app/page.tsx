import Link from "next/link";
// import dynamic from "next/dynamic";
import HomeClient from "@/components/HomeClient";

// const HomeClient = dynamic(() => import("../components/HomeClient"), {
//   ssr: false,
// });

export default function Page() {
  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Weather Notes</h1>
        <Link href="/saved" className="p-2 border-2 rounded-2xl">
          Saved
        </Link>
      </div>
      <HomeClient />
    </div>
  );
}
