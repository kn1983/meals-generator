interface PrimaryButtonProps {
  type: "button" | "submit" | "reset" | undefined;
  text: string;
  buttonOnClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const PrimaryButton = ({ type, text, buttonOnClick }: PrimaryButtonProps) => {
  return (
    <button
      type={type}
      className="max-sm:w-full block bg-pink-600 hover:bg-pink-500 px-8 py-3 leading-none border-1 rounded"
      onClick={buttonOnClick}
    >
      {text}
    </button>
  );
};

export { PrimaryButton };
