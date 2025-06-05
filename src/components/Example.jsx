import useModal from "../hooks/useModal";
import Modal from "./Modal";
import ConfirmDialog from "./ConfirmDialog";

const Example = () => {
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
            <button onClick={showConfirmDelete}>Delete</button>

            <Modal isOpen={isOpen} onClose={closeModal}>
                {content}
            </Modal>
        </div>
    );
};

export default Example;