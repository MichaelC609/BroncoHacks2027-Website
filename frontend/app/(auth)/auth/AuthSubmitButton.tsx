type AuthSubmitButtonProps = {
  isSubmitting: boolean;
  loadingText: string;
  defaultText: string;
};

export default function AuthSubmitButton({
  isSubmitting,
  loadingText,
  defaultText,
}: AuthSubmitButtonProps) {
  return (
    <button type="submit" className="button auth-button" disabled={isSubmitting}>
      {isSubmitting ? loadingText : defaultText}
    </button>
  );
}