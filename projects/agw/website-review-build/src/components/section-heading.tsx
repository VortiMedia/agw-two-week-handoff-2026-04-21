type SectionHeadingProps = {
  label: string;
  title: string;
  body?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  label,
  title,
  body,
  align = "left",
}: SectionHeadingProps) {
  const isCentered = align === "center";

  return (
    <div className={isCentered ? "mx-auto text-center" : undefined}>
      <p className="section-label">{label}</p>
      <h2 className={`section-title mt-4 ${isCentered ? "mx-auto" : ""}`}>
        {title}
      </h2>
      {body ? (
        <p className={`body-copy mt-5 max-w-3xl ${isCentered ? "mx-auto" : ""}`}>
          {body}
        </p>
      ) : null}
    </div>
  );
}
