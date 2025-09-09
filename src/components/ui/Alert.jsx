import React from 'react';
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

const Alert = ({ 
  type = 'info', 
  message, 
  title,
  dismissible = false,
  onDismiss,
  className = '' 
}) => {
  const types = {
    success: {
      icon: CheckCircle,
      classes: 'bg-green-50 text-green-800 border-green-200',
      iconClasses: 'text-green-500',
    },
    error: {
      icon: AlertCircle,
      classes: 'bg-red-50 text-red-800 border-red-200',
      iconClasses: 'text-red-500',
    },
    warning: {
      icon: AlertTriangle,
      classes: 'bg-yellow-50 text-yellow-800 border-yellow-200',
      iconClasses: 'text-yellow-500',
    },
    info: {
      icon: Info,
      classes: 'bg-blue-50 text-blue-800 border-blue-200',
      iconClasses: 'text-blue-500',
    },
  };

  const { icon: Icon, classes, iconClasses } = types[type];

  return (
    <div className={`p-4 rounded-lg border flex items-start space-x-3 ${classes} ${className}`}>
      <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${iconClasses}`} />
      <div className="flex-1 min-w-0">
        {title && (
          <h4 className="text-sm font-medium mb-1">{title}</h4>
        )}
        <p className="text-sm">{message}</p>
      </div>
      {dismissible && (
        <button
          onClick={onDismiss}
          className={`flex-shrink-0 ml-auto hover:opacity-70 transition-opacity ${iconClasses}`}
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default Alert;