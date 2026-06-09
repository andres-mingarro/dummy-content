import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";

const BASE_URL = "https://dummycontent.app";

export const metadata: Metadata = {
  alternates: {
    canonical: BASE_URL,
  },
};

export default function Home() {
  return <HomePageClient />;
}
