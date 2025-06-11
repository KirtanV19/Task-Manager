// Component for Confirm-Dialog

import useModal from "../../hooks/useModal";
import Modal from "../../components/Modal";
import ConfirmDialog from "../Popups/ConfirmDialog";
import { fetchTasks } from "../../redux/slices/task.slice";
import { useDispatch } from "react-redux";
import { api } from "../../api/client";

const Delete = ({ taskId }) => {
    const { isOpen, content, openModal, closeModal } = useModal();
    const dispatch = useDispatch();

    const handleDelete = async () => {
        try {
            await api.TASKS.delete({ id: taskId });
            dispatch(fetchTasks({}))
            closeModal()
        } catch (error) {
            console.error(error);

        }
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
                className="bg-red-600 text-white font-semibold text-sm px-2 py-1 rounded-md hover:bg-red-700"
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
