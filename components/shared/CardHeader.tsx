import { FC } from "react";

export interface CardHeaderProps {
  children?: React.ReactNode;
}

export const CardHeader: FC<CardHeaderProps> = ({ children }) => {
  return (
    <h2 className="text-base md:text-lg font-medium text-primary">
      {children}
    </h2>
  );
};

export default CardHeader;
