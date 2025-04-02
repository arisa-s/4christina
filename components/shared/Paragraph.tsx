import { FC } from "react";

export interface ParagraphProps {
  children: React.ReactNode;
  type?: "primary" | "secondary";
  className?: string;
}

export const Paragraph: FC<ParagraphProps> = ({
  children,
  type = "primary",
  className,
}) => {
  switch (type) {
    case "primary":
      return (
        <p className={`font-ebGaramond md:text-lg break-word ${className}`}>
          {children}
        </p>
      );
    case "secondary":
      return (
        <p className={`md:text-lg text-secondary break-word ${className}`}>
          {children}
        </p>
      );
    default:
      return (
        <p
          className={`font-ebGaramond text-lg md:text-xl break-word ${className}`}
        >
          {children}
        </p>
      );
  }
};

export default Paragraph;
