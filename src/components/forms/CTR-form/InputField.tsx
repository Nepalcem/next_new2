type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function InputField({ label, error, ...props }: Props) {
  return (
    <div>
      <label
        htmlFor={props.name}
        className="block text-xs font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        {...props}
        id={props.name}
        className={`w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-violet-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
