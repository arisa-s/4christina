import { FC } from "react";

export interface ParagraphProps {
  children: React.ReactNode;
  type?: "primary" | "secondary";
}

export const Paragraph: FC<ParagraphProps> = ({
  children,
  type = "primary",
}) => {
  switch (type) {
    case "primary":
      return (
        <p className="font-ebGaramond text-lg md:text-xl break-word">
          {children}
        </p>
      );
    case "secondary":
      return <p className="md:text-lg text-secondary break-word">{children}</p>;
    default:
      return (
        <p className="font-ebGaramond text-lg md:text-xl break-word">
          {children}
        </p>
      );
  }
};

export default Paragraph;
