import Link from "next/link";
import { FC } from "react";

export const SiteFooter: FC = () => {
  return (
    <footer className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
      <p className="text-xs text-muted uppercase">
        Built by Nekonote LLC from scratch 🐾🐾
      </p>

      {/* TODO: ask for social media links */}
      <div className="flex space-x-6">
        <SocialLink
          href="mailto:Christinasoorumaa@icloud.com"
          label="Christinasoorumaa@icloud.com"
        />
      </div>
    </footer>
  );
};

const SocialLink: FC<{ href: string; label: string }> = ({ href, label }) => {
  return (
    <Link
      href={href}
      className="uppercase text-xs text-muted hover:text-primary font-light"
    >
      {label}
    </Link>
  );
};

export default SiteFooter;
