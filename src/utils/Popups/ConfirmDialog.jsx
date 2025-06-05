const ConfirmDialog = ({ onClose, message, onConfirm }) => {
    return (
        <div className="space-y-6">
            <p className="text-center text-lg text-gray-800">{message}</p>

            <div className="flex justify-center gap-6">
                <button
                    onClick={() => {
                        onConfirm(); // Do the action (e.g. delete)
                        onClose(); // Close modal after confirm
                    }}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                    Yes
                </button>
                <button
                    onClick={onClose}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                    No
                </button>
            </div>
        </div>
    );
};

export default ConfirmDialog;
