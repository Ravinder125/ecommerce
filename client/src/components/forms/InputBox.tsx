import { useState } from "react";
import { MdDelete } from "react-icons/md";

type BaseInputProps = {
    label?: string;
    type?: React.HTMLInputTypeAttribute;
    name: string;
    value?: string | File;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    isPassword?: boolean;
    inputRef?: React.RefObject<HTMLInputElement | null>;
    action?: React.MouseEventHandler;
    min?: number;
    max?: number;
    imgPrev?: string;
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
    min = 0,
    max = 100000,
    imgPrev = ""

}: BaseInputProps) {


    return (
        <div className="input-box">
            {type !== "file" && !(value instanceof File) ? (
                <>
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
                        {...(type === "number" && { min, max })}
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

                    {imgPrev ? (
                        <div className="image-preview">
                            <div>
                                <img src={imgPrev} alt="preview" />
                                <MdDelete onClick={action} />
                            </div>
                        </div>
                    ) : (
                        <label
                            htmlFor={name}
                            className="image-input"
                        >
                            Choose an avatar
                        </label>
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
