import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/theme";
import LoginLayout from "@/app/login/LoginLayout";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Spending tracker",
    description: "Spending tracker for everything",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppRouterCacheProvider
            options={{key: 'css', enableCssLayer: true}}
        >
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <LoginLayout>{children}</LoginLayout>
            </ThemeProvider>
        </AppRouterCacheProvider>
        </body>
        </html>
    );
}
