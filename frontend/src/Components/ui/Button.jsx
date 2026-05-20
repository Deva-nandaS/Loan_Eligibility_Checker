export const Button = ({
  children,
  onClick,
  type = "button",
  className = "bg-teal-900",
}) => {
  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
};
