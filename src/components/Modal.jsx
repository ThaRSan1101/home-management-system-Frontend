import React, { useEffect, useRef } from 'react';
import './Modal.css';

const ICONS = {
  success: <span className="modal-icon modal-success">✔️</span>,
  error: <span className="modal-icon modal-error">❌</span>,
  info: <span className="modal-icon modal-info">ℹ️</span>,
  warning: <span className="modal-icon modal-warning">⚠️</span>,
};

export default function Modal({ isOpen, onClose, children, type = 'info', title }) {
  const modalRef = useRef();

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    // Focus trap
    if (modalRef.current) modalRef.current.focus();
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose} aria-modal="true" role="dialog" tabIndex={-1}>
      <div
        className={`modal-content modal-${type}`}
        onClick={e => e.stopPropagation()}
        ref={modalRef}
        tabIndex={0}
        aria-label={title || type + ' notification'}
      >
        <div className="modal-header">
          {ICONS[type]}
          {title && <span className="modal-title">{title}</span>}
        </div>
        <div className="modal-body">{children}</div>
        <button className="modal-btn" onClick={onClose} autoFocus>OK</button>
      </div>
    </div>
  );
} 