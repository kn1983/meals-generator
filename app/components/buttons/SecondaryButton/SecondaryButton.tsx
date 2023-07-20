interface SecondaryButtonProps {
  type: "button" | "submit" | "reset" | undefined;
  text: string;
  buttonOnClick?: (e: React.MouseEvent<HTMLElement>) => void;
  isSmall: boolean;
}

const SecondaryButton = ({
  type,
  text,
  buttonOnClick,
  isSmall,
}: SecondaryButtonProps) => {
  return (
    <button
      type={type}
      className={`max-sm:w-full block bg-pink-400 hover:bg-pink-500 leading-none border-1 rounded ${
        isSmall ? "px-4 py-2 text-sm" : "px-8 py-3"
      }`}
      onClick={buttonOnClick}
    >
      {text}
    </button>
  );
};

export { SecondaryButton };
