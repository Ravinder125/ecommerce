
const TextArea = ({ ...props }: React.ComponentProps<"textarea">) => {
    return (
        <textarea
            {...props}
        // id={name}
        // name={name}
        // // type={isPassword ? "password" : type}
        // value={value ?? ""}
        // placeholder={placeholder}
        // onChange={((e) => onChange(e.target.value as React.ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement>))}
        // required={required}
        // {...(type === "number" && { min, max })}
        />
    )
}

export default TextArea