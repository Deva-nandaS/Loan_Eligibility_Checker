export const Button = ({
  children,
  onClick,
  type = "button",
  className = "bg-teal-900",
  disabled
}) => {
  return (
    <button type={type} onClick={onClick} className={className} disabled={disabled}>
      {children} 
    </button>
  );
};
