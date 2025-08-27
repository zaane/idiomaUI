import './ErrorMessage.css';

interface ErrorMessageProps {
  message: string;
  variant?: 'error' | 'warning' | 'info';
  onDismiss?: () => void;
}

export function ErrorMessage({ 
  message, 
  variant = 'error',
  onDismiss 
}: ErrorMessageProps) {
  return (
    <div className={`error-message error-message--${variant}`}>
      <span className="error-message__text">{message}</span>
      {onDismiss && (
        <button 
          className="error-message__dismiss"
          onClick={onDismiss}
          aria-label="Dismiss message"
        >
          ✕
        </button>
      )}
    </div>
  );
}