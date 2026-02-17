import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Fanvue Creator Hub Pro",
    description: "Next-gen dashboard for AI creators",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className} style={{ margin: 0, padding: 0, background: '#000' }}>
                {children}
            </body>
        </html>
    );
}
