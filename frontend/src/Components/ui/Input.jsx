export const Input = ({
  label,
  className = "",
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm text-gray-600">
          {label}
        </label>
      )}

      <input
        {...props}
        className={`border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black ${className}`}
      />
    </div>
  );
};