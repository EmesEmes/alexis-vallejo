import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Alexis Vallejo",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#fafaf8]">
      <div className="max-w-4xl mx-auto px-6 py-12">{children}</div>
    </div>
  );
}
