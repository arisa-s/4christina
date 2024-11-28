import { FC } from "react";

export interface BlogContainerProps {
  children: React.ReactNode;
}

export const BlogContainer: FC<BlogContainerProps> = ({ children }) => {
  return (
    <article className="min-h-screen max-w-3xl mx-auto md:pt-6 lg:pt-12 space-y-6">
      {children}
    </article>
  );
};

export default BlogContainer;
