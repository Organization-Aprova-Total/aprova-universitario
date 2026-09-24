import Link from "next/link";
import { enabledLandings } from "@/config/landings";

export const dynamic = "force-static";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl p-8 font-[family-name:var(--font-poppins)]">
      <h1 className="text-2xl font-bold">Landing pages</h1>
      <ul className="mt-4 list-disc pl-6">
        {enabledLandings().map((l) => (
          <li key={l.slug}><Link className="underline" href={l.path}>{l.title}</Link></li>
        ))}
      </ul>
    </main>
  );
}
