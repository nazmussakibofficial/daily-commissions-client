const ConfirmationModal = ({ title, message, successAction, modalData, successButtonName }) => {
    return (
        <div>
            <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="py-4">{message}</p>
                    <div className="modal-action">
                        <label
                            onClick={() => successAction(modalData)}
                            htmlFor="confirmation-modal"
                            className="btn btn-primary uppercase">{successButtonName}</label>
                        <label htmlFor="confirmation-modal"
                            className="btn btn-primary uppercase">Cancel</label>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;