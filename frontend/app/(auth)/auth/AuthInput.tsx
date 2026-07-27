type AuthInputProps = {
  label: string;
  type: string;
  placeholder: string;
  autoComplete: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
};

export default function AuthInput({
  label,
  type,
  placeholder,
  autoComplete,
  value,
  error,
  onChange,
}: AuthInputProps) {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="auth-input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}