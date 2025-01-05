'use client'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import styles from "./page.module.css";
import { User, UserContextType, useUser } from '@/shared/user-context/UserContext';

export default function Home() {
  const data: UserContextType = useUser();
  const userData: User = data.user!;
  return (
    <div className={styles.page}>
      {userData &&
        <div>
          {userData.email}
          {userData.id}
        </div>
      }

    </div>
  );
}
