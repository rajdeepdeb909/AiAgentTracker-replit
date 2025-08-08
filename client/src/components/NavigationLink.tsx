import React from 'react';
import { useLocation } from 'wouter';
import { ExternalLink, User, FileText } from 'lucide-react';

interface NavigationLinkProps {
  type: 'technician' | 'order';
  id: string;
  name: string;
  className?: string;
  showIcon?: boolean;
  compact?: boolean;
}

export default function NavigationLink({ 
  type, 
  id, 
  name, 
  className = "", 
  showIcon = true, 
  compact = false 
}: NavigationLinkProps) {
  const [, setLocation] = useLocation();

  const handleNavigation = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (type === 'technician') {
      // Navigate to personalized coaching with technician pre-filter
      setLocation(`/coaching-engine?technician=${encodeURIComponent(id)}`);
    } else if (type === 'order') {
      // Open order details modal instead of navigating away
      // For now, show order details in current page context
      const event = new CustomEvent('openOrderDetails', { detail: { orderId: id } });
      window.dispatchEvent(event);
    }
  };

  const baseClasses = compact 
    ? "inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 underline cursor-pointer transition-colors"
    : "inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 px-2 py-1 rounded cursor-pointer transition-all";

  return (
    <span 
      onClick={handleNavigation}
      className={`${baseClasses} ${className}`}
      title={`View ${type === 'technician' ? 'technician profile and coaching' : 'order details'}`}
    >
      {showIcon && (
        type === 'technician' ? 
          <User className="w-3 h-3" /> : 
          <FileText className="w-3 h-3" />
      )}
      <span className={compact ? "text-xs" : "text-sm"}>{name}</span>
      <ExternalLink className="w-3 h-3 opacity-60" />
    </span>
  );
}