interface ITextAreaProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  placeholder?: string;
}

export const TextArea: React.FC<ITextAreaProps> = ({
  onChange,
  value,
  placeholder,
}) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="input-primary min-h-[200px] overflow-hidden"
    />
  );
};
