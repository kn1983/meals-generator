interface PrimaryButtonProps {
  type: "button" | "submit" | "reset" | undefined;
  text: string;
  buttonOnClick?: (e: React.MouseEvent<HTMLElement>) => void;
  isSmall?: boolean;
}

const PrimaryButton = ({
  type,
  text,
  buttonOnClick,
  isSmall,
}: PrimaryButtonProps) => {
  return (
    <button
      type={type}
      className={`max-sm:w-full block bg-pink-600 hover:bg-pink-500 leading-none border-1 rounded ${
        isSmall ? "px-4 py-2 text-sm" : "px-8 py-3"
      }`}
      onClick={buttonOnClick}
    >
      {text}
    </button>
  );
};

export { PrimaryButton };
