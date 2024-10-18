export default function Button({
  onSmash,
  type,
  className,
  children,
  target,
  href,
}) {
  if (type === "submit") {
    return (
      <>
        <button className={className} type={type} onClick={onSmash}>
          {children}
        </button>
      </>
    );
  }
  return (
    <a href={href} className={className} target={target}>
      {children}
    </a>
  );
}
