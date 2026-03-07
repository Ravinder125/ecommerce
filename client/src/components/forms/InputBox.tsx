
type BaseInputProps = {
    label?: string;
    type?: React.HTMLInputTypeAttribute;
    name: string;
    value?: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    isPassword?: boolean;
    min?: number;
    max?: number;
    autoComplete?: "off" | "on";
    maxLength?: number;
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
    min = 0,
    max = 100000,
    autoComplete = "off",
    maxLength

}: BaseInputProps) {


    return (
        <div className="input-box">
            {label &&
                <label
                    htmlFor={name}
                >
                    {label}</label>
            }
            <input
                id={name}
                name={name}
                type={isPassword ? "password" : type}
                value={value ?? ""}
                placeholder={placeholder}
                onChange={onChange}
                required={required}

                autoComplete={autoComplete}
                {...(type === "number" && { min, max, maxLength })}
            />

        </div >
    );
}


export function createTypedInput<T>() {
    return function InputTypedBox(
        props: Omit<BaseInputProps, "name"> & { name: keyof T }
    ) {
        return <InputBox {...props} name={String(props.name)} />;
    };
}

