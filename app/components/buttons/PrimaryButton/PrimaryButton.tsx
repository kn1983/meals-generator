interface PrimaryButtonProps {
  type: "button" | "submit" | "reset" | undefined;
  text: string;
  buttonOnClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const PrimaryButton = ({ type, text, buttonOnClick }: PrimaryButtonProps) => {
  return (
    <button
      type={type}
      className="max-sm:w-full block bg-blue-800 hover:bg-blue-900 px-8 py-3 sm:ml-auto leading-none border-1 rounded"
      onClick={buttonOnClick}
    >
      {text}
    </button>
  );
};

export { PrimaryButton };
