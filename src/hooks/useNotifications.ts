import { useState, useEffect, useCallback } from 'react';
import { NotificationData } from '@/types/game';
import { getAllGames } from '@/data/games';
import { useAudio } from '@/hooks/useAudio';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const { playSound } = useAudio();

  const generateNotification = useCallback((): NotificationData => {
    const games = getAllGames().filter(g => g.status === 'PAGANDO');
    const randomGame = games[Math.floor(Math.random() * games.length)];
    
    const usernames = [
      'User724', 'Player892', 'Winner341', 'Lucky777', 'Gamer456',
      'Victor123', 'Champion88', 'Ace999', 'Pro_Player', 'MasterX',
      'GoldWinner', 'LuckyDay', 'BigWin22', 'Fortune99', 'SlotKing'
    ];
    
    const baseAmount = Math.random() * 500 + 50; // R$ 50-550
    const multiplier = randomGame ? (randomGame.chancePercent / 100) * 2 : 1;
    const amount = baseAmount * multiplier;
    
    return {
      id: Date.now().toString(),
      username: usernames[Math.floor(Math.random() * usernames.length)],
      amount: Math.round(amount * 100) / 100,
      gameName: randomGame?.name || 'Fortune Tiger',
      timestamp: new Date()
    };
  }, []);

  const addNotification = useCallback((notification: NotificationData) => {
    setNotifications(prev => [notification, ...prev].slice(0, 5)); // Keep max 5
    playSound('ding');
  }, [playSound]);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  // Auto-generate notifications
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% chance every interval
        const notification = generateNotification();
        addNotification(notification);
      }
    }, 8000); // Every 8 seconds

    return () => clearInterval(interval);
  }, [generateNotification, addNotification]);

  return {
    notifications,
    addNotification,
    removeNotification
  };
};