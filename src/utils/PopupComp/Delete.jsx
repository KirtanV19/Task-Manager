// Component for Confirm-Dialog

import useModal from "../../hooks/useModal";
import Modal from "../../components/Modal";
import ConfirmDialog from "../Popups/ConfirmDialog";

const Delete = () => {
    const { isOpen, content, openModal, closeModal } = useModal();

    const handleDelete = () => {
        console.log("Deleted!");
    };

    const showConfirmDelete = () => {
        openModal(
            <ConfirmDialog
                message="Are you sure want to delete?"
                onConfirm={handleDelete}
                onClose={closeModal}
            />
        );
    };

    return (
        <div>
            <button
                className="bg-red-600 text-white font-semibold text-sm p-1 rounded-md hover:bg-red-700"
                onClick={showConfirmDelete}
            >
                Delete
            </button>

            <Modal isOpen={isOpen} onClose={closeModal}>
                {content}
            </Modal>
        </div>
    );
};

export default Delete;
