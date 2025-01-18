"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/header/Header";
import NavBar from "@/components/nav-bar/NavBar";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLoginPage = pathname === "/login";
    return (
        <>
            {!isLoginPage && (
                <>
                    <Header />
                    <NavBar />
                </>
            )}
            {children}
        </>
    );
}
