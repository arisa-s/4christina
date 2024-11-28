import { FC } from "react";

export interface HeaderProps {
  children?: React.ReactNode;
  type?: "1" | "2" | "3";
}

export const Header: FC<HeaderProps> = ({ children, type = "1" }) => {
  switch (type) {
    case "1":
      return (
        <h1 className="text-3xl md:text-4xl font-medium text-primary">
          {children}
        </h1>
      );
    case "2":
      return (
        <h2 className="text-2xl md:text-3xl font-medium text-primary">
          {children}
        </h2>
      );
    case "3":
      return (
        <h3 className="text-xl md:text-2xl font-medium text-primary">
          {children}
        </h3>
      );
    default:
      return <h1 className="text-4xl font-medium text-primary">{children}</h1>;
  }
};

export default Header;
