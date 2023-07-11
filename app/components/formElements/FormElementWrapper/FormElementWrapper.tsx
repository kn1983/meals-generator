interface FormElementWrapper {
  children: React.ReactNode;
}

const FormElementWrapper = ({ children }: FormElementWrapper) => {
  return <div className="mb-6">{children}</div>;
};

export { FormElementWrapper };
