
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  description: "Media4IPTV vous offre un accès rapide et fiable à des milliers de chaînes TV, films, séries et sports en direct via IPTV. Compatible avec tous les appareils. Support 24h/24.",
  title: "media4iptv chaînes"
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
