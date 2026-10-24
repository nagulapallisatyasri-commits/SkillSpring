import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "SkillSpring — Learn Today. Build Tomorrow.",
  description:
    "SkillSpring is a premium educational learning management portal featuring verified curricula, modular lessons, hands-on practice, and automated evaluation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <div className="app-container">
          <Suspense
            fallback={
              <header className="navbar" id="navbar" style={{ height: "72px" }}>
                <div className="navbar-inner">
                  <div className="brand-logo">
                    <span className="logo-badge">SS</span>
                    <span className="brand-text">SkillSpring</span>
                  </div>
                </div>
              </header>
            }
          >
            <Navbar />
          </Suspense>
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
