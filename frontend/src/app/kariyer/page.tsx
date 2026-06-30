import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Kariyer",
  description: "Shinko kariyer sayfası insan kaynakları sayfasına yönlendirilir.",
  alternates: {
    canonical: "/insan-kaynaklari",
  },
};

export default function KariyerPage() {
  redirect("/insan-kaynaklari");
}
