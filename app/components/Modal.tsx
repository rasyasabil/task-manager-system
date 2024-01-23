
interface ModalProps {
    modalOpen: boolean;
    setModalOpen: (open : boolean) => void;
    children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
  return (
      <div className={`modal ${modalOpen ? "modal-open" : ""}`}>
            <form 
            method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button 
                onClick={() => setModalOpen(false)}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕
            </button>
            </form>
                {children}
        </div>
        )
    }

export default Modal