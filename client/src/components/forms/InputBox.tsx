import { MdDelete } from "react-icons/md";

type BaseInputProps = {
    label?: string;
    type?: React.HTMLInputTypeAttribute;
    name: string;
    value?: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    isPassword?: boolean;
    inputRef?: React.RefObject<HTMLInputElement |null>;
    action?: React.MouseEventHandler;
};

export function InputBox({
    label,
    type = "text",
    isPassword = false,
    name,
    value,
    placeholder,
    onChange,
    required = false,
    inputRef,
    action,
}: BaseInputProps) {
    return (
        <div className="input-box">
            {type !== "file" ? (
                <>
                    {label && <label htmlFor={name}>{label}</label>}
                    <input
                        id={name}
                        name={name}
                        type={isPassword ? "password" : type}
                        value={value ?? ""}
                        placeholder={placeholder}
                        onChange={onChange}
                        required={required}
                    />
                </>
            ) : (
                <>
                    <input
                        hidden
                        type="file"
                        id={name}
                        ref={inputRef}
                        onChange={onChange}
                    />

                    {value ? (
                        <div className="image-preview">
                            <div>
                                <img src={value} alt="preview" />
                                <MdDelete onClick={action} />
                            </div>
                        </div>
                    ) : (
                        <div
                            className="image-input"
                            onClick={() => inputRef?.current?.click()}
                        >
                            Choose an avatar
                        </div>
                    )}
                </>
            )}
        </div>
    );
}


export function createTypedInput<T>() {
    return function InputTypedBox(
        props: Omit<BaseInputProps, "name"> & { name: keyof T }
    ) {
        return <InputBox {...props} name={String(props.name)} />;
    };
}
