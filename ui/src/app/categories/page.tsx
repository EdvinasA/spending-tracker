import Category from "@/components/category/Category";
import { cookies } from "next/headers";

export default async function Page() {
    const cookieStore = await cookies();
    const userEmail = cookieStore.get("email")?.value || "";
    const token = cookieStore.get("token")?.value || "";

    console.log(token);

    return <Category token={token} userEmail={userEmail} />;
}
