import { FC } from "react";

export interface CardTagProps {
  children?: React.ReactNode;
}

export const CardTag: FC<CardTagProps> = ({ children }) => {
  return <p className="text-secondary">{children}</p>;
};

export default CardTag;
