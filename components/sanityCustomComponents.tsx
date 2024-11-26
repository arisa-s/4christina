export const sanityCustomComponents = {
  types: {
    image: ({ value }: { value: any }) => (
      <img src={value.asset.url} alt={value.alt || "Image"} />
    ),
  },
  marks: {
    link: ({ children, value }: { children: React.ReactNode; value: any }) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        {children}
      </a>
    ),
  },
  block: {
    normal: ({ children }: { children: React.ReactNode }) => (
      <p className="mb-3 text-primary">{children}</p>
    ),
    h1: ({ children }: { children: React.ReactNode }) => (
      <h1 className="text-4xl font-bold my-4">{children}</h1>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="text-3xl font-semibold my-3">{children}</h2>
    ),
  },
};
