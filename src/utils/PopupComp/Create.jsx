import Modal from "../../components/Modal";
import useModal from "../../hooks/useModal";
import TaskForm from "../../components/TaskForm";

const Create = () => {
    const { isOpen, content, openModal, closeModal } = useModal();

    const openForm = () => {
        openModal(<TaskForm closeModal={closeModal} />);
    };

    return (
        <div>
            <button
                className="bg-gray-200 text-black text-lg font-medium px-2 py-1 rounded-md hover:bg-gray-300 transition-all"
                onClick={openForm}
            >
                New Task
            </button>

            <Modal isOpen={isOpen} onClose={closeModal}>
                {content}
            </Modal>
        </div>
    );
};

export default Create;
