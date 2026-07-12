import type { Metadata } from "next";
import AdminLoginForm from "@/components/AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-sky flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <p className="font-display text-2xl font-semibold text-ink mb-1">
          Aero<span className="text-spark">Swift</span>
        </p>
        <h1 className="text-lg font-medium text-ink/80 mb-6">Admin sign in</h1>
        <div className="rounded-xl border border-mist bg-white p-6 shadow-sm">
          <AdminLoginForm />
        </div>
      </div>
    </div>
  );
}
