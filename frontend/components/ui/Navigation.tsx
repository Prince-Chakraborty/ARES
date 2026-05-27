"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "⚡ Swarm" },
    { href: "/architecture", label: "🏗 Architecture" },
    { href: "/responsible-ai", label: "🛡️ Responsible AI" },
  ];

  return (
    <div style={{
      display: "flex",
      gap: "4px",
      background: "#18181b",
      border: "1px solid #27272a",
      borderRadius: "10px",
      padding: "4px"
    }}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          style={{
            padding: "6px 16px",
            borderRadius: "7px",
            fontSize: "13px",
            fontWeight: "500",
            background: pathname === link.href ? "#27272a" : "transparent",
            color: pathname === link.href ? "#fff" : "#71717a",
            transition: "all 0.2s",
            textDecoration: "none"
          }}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
