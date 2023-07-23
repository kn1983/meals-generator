interface PrimaryButtonProps {
  type: "button" | "submit" | "reset" | undefined;
  text: string;
  buttonOnClick?: (e: React.MouseEvent<HTMLElement>) => void;
  isSmall?: boolean;
  fullWidth?: boolean;
}

const PrimaryButton = ({
  type,
  text,
  buttonOnClick,
  isSmall,
  fullWidth,
}: PrimaryButtonProps) => {
  return (
    <button
      type={type}
      className={`max-sm:w-full block bg-pink-600 hover:bg-pink-500 leading-none border-1 rounded ${
        isSmall ? "px-4 py-2 text-sm" : "px-8 py-3 "
      } ${fullWidth && "w-full"}`}
      onClick={buttonOnClick}
    >
      {text}
    </button>
  );
};

export { PrimaryButton };
