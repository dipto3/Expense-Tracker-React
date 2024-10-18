export default function Button({ type, className, children,target, href }) {
    if (type === "submit") {
      return (
        <>
          <button className={className} type={type}>
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
   