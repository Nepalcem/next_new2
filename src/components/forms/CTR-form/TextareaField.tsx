type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

export function TextareaField({ label, error, ...props }: Props) {
  return (
    <div className="md:col-span-2">
      <label
        htmlFor={props.name}
        className="block text-xs font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <textarea
        {...props}
        id={props.name}
        className={`w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-violet-500 resize-none ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
