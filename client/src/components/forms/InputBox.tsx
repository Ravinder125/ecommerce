import { MdDelete } from "react-icons/md";
import React from "react";

type InputBoxProps = {
    label?: string;
    type?: React.HTMLInputTypeAttribute;
    name: string;
    value: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    isPassword?: boolean;
    inputRef?: React.RefObject<HTMLInputElement | null>;
    action?: React.MouseEventHandler;
};

export const InputBox: React.FC<InputBoxProps> = ({
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
}) => {
    return (
        <div className="input-box">
            {type !== "file" ? (
                <>
                    {label && <label htmlFor={name}>{label}</label>}
                    <input
                        id={name}
                        name={name}
                        type={isPassword ? "password" : type}
                        value={value}
                        placeholder={placeholder}
                        onChange={onChange}
                        required={required}
                    />
                </>
            ) : (
                <>
                    <input
                        style={{ display: "none" }}
                        type="file"
                        id={name}
                        ref={inputRef}
                        onChange={onChange}
                    />

                    {value ? (
                        <div className="image-preview">
                            <div>
                                <img
                                    src={typeof value === "string" ? value : ""}
                                    alt="preview"
                                />
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
};
