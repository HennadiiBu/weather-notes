import "./globals.css";
import ServiceWorkerRegister from "./sw";

export const metadata = {
  title: "Weather Notes",
  description: "App to search weather and save notes for different cities.",
  manifest: "manifest.json",
  appleWebApp: {
    title: "Weather Notes",
    statusBarStyle: "black-translucent",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
      <ServiceWorkerRegister />
    </html>
  );
}
