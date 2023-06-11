import { Dispatch, FC, SetStateAction } from "react";

type InputFieldProps = {
  type: string;
  label: string;
  id: string;
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  errorMessage?: string;
};

const InputField: FC<InputFieldProps> = ({
  type,
  label,
  id,
  placeholder,
  value,
  setValue,
  errorMessage,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        name={id}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
        className="px-4 py-2 text-white bg-gray-700 rounded"
      />
      <label htmlFor={id} className="text-red-500">
        {errorMessage}
      </label>
    </div>
  );
};

export default InputField;
