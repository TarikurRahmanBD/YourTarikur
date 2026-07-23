import Link from "next/link";

const projectLinks = [
  { label: "Phoenix", href: "/projects/phoenix" },
  { label: "Hyperbot", href: "/projects/hyperbot" },
];

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ backgroundColor: "var(--bg-color)" }}
    >
      <p
        className="text-6xl font-bold mb-4"
        style={{ color: "var(--text-color)" }}
      >
        404
      </p>
      <p
        className="text-lg opacity-60 mb-12 px-6 text-center"
        style={{ color: "var(--text-color)" }}
      >
        The page you&apos;re looking for doesn&apos;t exist. Pick something from
        here:
      </p>

      <div className="flex flex-col items-center gap-6">
        <Link
          href="/"
          className="text-2xl font-semibold opacity-80 hover:opacity-100 transition-opacity"
          style={{ color: "var(--text-color)" }}
        >
          Homepage
        </Link>

        <div
          className="w-16 h-px opacity-30 my-2"
          style={{ backgroundColor: "var(--text-color)" }}
        />

        <p
          className="text-xs font-semibold uppercase tracking-widest opacity-40 mb-2"
          style={{ color: "var(--text-color)" }}
        >
          Projects
        </p>
        {projectLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-2xl font-semibold opacity-80 hover:opacity-100 transition-opacity"
            style={{ color: "var(--text-color)" }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
