import { useEffect } from 'react';
import { NotificationData } from '@/types/game';

interface NotificationToastProps {
  notification: NotificationData;
  onRemove: (id: string) => void;
}

export const NotificationToast = ({ notification, onRemove }: NotificationToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(notification.id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [notification.id, onRemove]);

  return (
    <div className="notification-toast">
      <div className="text-sm font-medium">
        🎉 {notification.username} acabou de ganhar{' '}
        <span className="font-bold">R$ {notification.amount.toFixed(2)}</span>{' '}
        no jogo {notification.gameName}
      </div>
    </div>
  );
};