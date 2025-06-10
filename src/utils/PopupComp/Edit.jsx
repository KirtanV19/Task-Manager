import useModal from "../../hooks/useModal";
import Modal from "../../components/Modal";
import TaskForm from "../../components/TaskForm";
import { useDispatch } from "react-redux";
// import { updateTask } from "../../features/task/taskSlice"; // example

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
                    userId: task.userId
                }}
            // onSubmit={(updatedData) => {
            //     dispatch(updateTask({ id: task.id, ...updatedData }));
            //     closeModal();
            // }}
            />
        );
    };

    return (
        <div>
            <button
                onClick={handleEdit}
                className="text-sm rounded-md font-semibold px-2 py-1 text-white bg-green-600 hover:bg-green-700"
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
