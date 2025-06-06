import useModal from "../../hooks/useModal";
import Modal from "../../components/Modal";
import TaskForm from "../../components/TaskForm";
import { useDispatch } from "react-redux";
import { updateTask } from "../../features/task/taskSlice"; // example

const Edit = ({ task }) => {
    const { isOpen, content, openModal, closeModal } = useModal();
    const dispatch = useDispatch();

    const handleEdit = () => {
        openModal(
            <TaskForm
                defaultValues={{
                    title: task.title,
                    description: task.description,
                    dueDate: task.dueDate,
                    status: task.status,
                }}
                onSubmit={(updatedData) => {
                    dispatch(updateTask({ id: task.id, ...updatedData }));
                    closeModal();
                }}
            />
        );
    };

    return (
        <div>
            <h3>{task.title}</h3>
            <button
                onClick={handleEdit}
                className="text-sm text-blue-600 hover:underline"
            >
                Edit
            </button>

            <Modal isOpen={isOpen} onClose={closeModal}>
                {content}
            </Modal>
        </div>
    );
};

export default Edit;
