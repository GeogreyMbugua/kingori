import { Container } from "@/components/ui/Container";
import styles from "./Footer.module.css";

interface FooterProps {
  readonly siteName: string;
}

export function Footer({ siteName }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <Container>
        <p data-type="meta">
          © {new Date().getFullYear()} {siteName}
        </p>
      </Container>
    </footer>
  );
}
