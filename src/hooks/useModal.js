import { useState } from "react";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(null);

  const openModel = (modalContent) => {
    setContent(modalContent);
    setIsOpen(true);
  };

  const closeModel = () => {
    setIsOpen(false);
    setContent(null);
  };

  return { isOpen, setIsOpen, content, setContent, openModel, closeModel };
};

export default useModal;
