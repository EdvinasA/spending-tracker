import CategoryWrapper from "./CategoryWrapper";
import { cookies } from "next/headers";

export default async function Page() {
    const cookieStore = await cookies();
    const userEmail = cookieStore.get("email")?.value || "";

    return <CategoryWrapper userEmail={userEmail} />;
}
