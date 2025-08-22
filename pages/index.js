import Link from "next/link";
import styles from "../styles/Landing.module.css";

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Welcome to TodoList App</h1>
        <p className={styles.subtitle}>
          ساده و سریع کارهات رو مدیریت کن ✨  
          این اپلیکیشن بهت کمک می‌کنه کارهای روزمره‌ت رو یادداشت کنی و همیشه منظم باشی.
        </p>

        <Link href="/todos">
          <button className={styles.button}>برو به تودوها ➝</button>
        </Link>
      </div>
    </main>
  );
}
