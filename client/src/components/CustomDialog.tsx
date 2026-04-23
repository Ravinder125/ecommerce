type CustomDialogProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const CustomDialog = ({ children, isOpen, onClose }: CustomDialogProps) => {
    return (
        <dialog open={isOpen} onBlur={onClose}>
            {children}
        </dialog>
    )
}

export default CustomDialog