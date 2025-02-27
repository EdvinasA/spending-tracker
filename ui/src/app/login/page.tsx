import { cookies } from "next/headers";
import LoginComponent from "./LoginComponent";

export default async function Login() {
    const cookieStore = await cookies();

    const saveToken = (token: string) => {
        cookieStore.set("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 600 * 600 * 24 * 30,
        });
    };

    return (
        <LoginComponent saveToken={saveToken} />
    )
}
