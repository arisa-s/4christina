import { FC } from "react";

export interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

export const Link: FC<LinkProps> = ({
  href,
  children,
  className,
  target = "_blank",
  rel = "noopener noreferrer",
}) => {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`font-ebGaramond text-lg md:text-xl text-primary hover:underline hover:text-red-800 cursor-pointer ${className}`}
    >
      {children}
    </a>
  );
};

export default Link;
