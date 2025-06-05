const ConfirmDialog = ({ onClose, message, onConfirm }) => {
    return (
        <div>
            <p>{message}</p>
            <div>
                <button onClick={() => {
                    onConfirm();
                    onClose()
                }} >Yes</button>
                <button onClick={onClose}>No</button>
            </div>
        </div>
    );
};

export default ConfirmDialog;
