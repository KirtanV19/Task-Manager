import React from "react";
import { Dialog } from "radix-ui";
import { Cross2Icon } from "@radix-ui/react-icons";

const Modal = ({ isOpen, onClose, children }) => {
    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-black/40 fixed inset-0" />
                <Dialog.Content className="bg-white p-6 rounded-xl shadow-xl fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg focus:outline-none">
                    <Dialog.Close
                        className="absolute top-3 right-3 text-gray-500 hover:text-black"
                        asChild
                    >
                        <button aria-label="Close">
                            <Cross2Icon />
                        </button>
                    </Dialog.Close>
                    {children}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default Modal;
