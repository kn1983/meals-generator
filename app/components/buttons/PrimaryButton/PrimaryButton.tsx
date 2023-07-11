interface PrimaryButtonProps {
  type: "button" | "submit" | "reset" | undefined;
  text: string;
}

const PrimaryButton = ({ type, text }: PrimaryButtonProps) => {
  return (
    <button
      type={type}
      className="max-sm:w-full block bg-blue-800 hover:bg-blue-900 px-8 py-3 sm:ml-auto leading-none border-1"
    >
      {text}
    </button>
  );
};

export { PrimaryButton };
