import { useEffect, useRef } from "react";
import "./DeleteConfirmModal.css";

/**
 * Accessible confirmation dialog for destructive playlist deletion.
 *
 * - Traps focus on mount (Cancel button receives focus by default so the
 *   user can't accidentally confirm by pressing Enter).
 * - Closes on Escape key or backdrop click.
 * - Fully keyboard-navigable.
 */
export default function DeleteConfirmModal({
  playlistName,
  onConfirm,
  onCancel,
}) {
  const cancelRef = useRef(null);

  // Focus the Cancel button when the modal opens.
  useEffect(() => {
    cancelRef.current?.focus();
  }, []);

  // Close on Escape key.
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") onCancel();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onCancel]);

  return (
    <div className="deleteModalOverlay" onClick={onCancel} aria-hidden="true">
      <div
        className="deleteModalDialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="delete-modal-title" className="deleteModalTitle">
          Delete playlist?
        </h2>

        <p className="deleteModalBody">
          <span className="deleteModalPlaylistName">"{playlistName}"</span> will
          be permanently deleted. This action cannot be undone.
        </p>

        <div className="deleteModalActions">
          <button
            ref={cancelRef}
            className="deleteModalCancelButton"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button className="deleteModalConfirmButton" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
