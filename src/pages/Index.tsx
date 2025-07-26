import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { DepositBanner } from '@/components/DepositBanner';
import { StatusBar } from '@/components/StatusBar';
import { WarningBanner } from '@/components/WarningBanner';
import { DailyRewardCard } from '@/components/DailyRewardCard';
import { LuckyWheelCard } from '@/components/LuckyWheelCard';
import { ProgressBar } from '@/components/ProgressBar';
import { CategorySection } from '@/components/CategorySection';
import { CategoryModal } from '@/components/CategoryModal';
import { HackScreen } from '@/components/HackScreen';
import { NotificationToast } from '@/components/NotificationToast';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { gameCategories, getOnlineUsersCount } from '@/data/games';
import { GameCategory, Game } from '@/types/game';
import { useNotifications } from '@/hooks/useNotifications';
import { useAudio } from '@/hooks/useAudio';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<GameCategory | null>(null);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [onlineUsers, setOnlineUsers] = useState(getOnlineUsersCount());
  const { notifications, removeNotification } = useNotifications();
  const { playSound } = useAudio();

  // Update online users count periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineUsers(getOnlineUsersCount());
    }, 15000); // Every 15 seconds

    return () => clearInterval(interval);
  }, []);

  const handleDepositClick = () => {
    playSound('click');
    window.open('https://www.playbonds.com/register?affiliate_id=68716979a553d300286de4b4', '_blank');
  };

  const handleLoginClick = () => {
    playSound('click');
    window.open('https://www.playbonds.com/register?affiliate_id=68716979a553d300286de4b4', '_blank');
  };

  const handleRefreshClick = () => {
    playSound('click');
    window.location.reload();
  };

  const handleGameClick = (game: Game) => {
    if (game.status === 'TOMANDO') return;
    
    playSound('whoosh');
    setSelectedGame(game);
    setSelectedCategory(null);
  };

  const handleViewAllClick = (category: GameCategory) => {
    setSelectedCategory(category);
  };

  const handleCloseModal = () => {
    setSelectedCategory(null);
  };

  const handleBackFromGame = () => {
    setSelectedGame(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header onDepositClick={handleDepositClick} />
      
      {/* Main Content */}
      <div className="pt-20 pb-8">
        {/* Deposit Banner */}
        <DepositBanner onDepositClick={handleDepositClick} />
        
        {/* Status Bar */}
        <StatusBar onlineUsers={onlineUsers} />
        
        {/* Warning Banner */}
        <WarningBanner />
        
        {/* Cards Section */}
        <div className="space-y-4 px-4 mb-8">
          <DailyRewardCard onLoginClick={handleLoginClick} />
          <LuckyWheelCard onLoginClick={handleLoginClick} />
        </div>
        
        {/* Choose Game Section */}
        <div className="px-4 mb-8">
          <div className="text-center space-y-4">
            <h2 className="text-xl font-bold">
              <span className="text-foreground">ESCOLHA O JOGO COM A </span>
              <span className="text-green-400">BARRA VERDE</span>
              <span className="text-foreground"> PARA TER O </span>
              <span className="text-green-400">MAIOR LUCRO</span>
            </h2>
            
            <ProgressBar percentage={100} className="h-3" />
            
            <Button
              onClick={handleRefreshClick}
              className="hack-button flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Atualizar Página
            </Button>
          </div>
        </div>
        
        {/* Game Categories */}
        <div className="space-y-8">
          {gameCategories.map((category) => (
            <CategorySection
              key={category.id}
              category={category}
              onGameClick={handleGameClick}
              onViewAllClick={handleViewAllClick}
            />
          ))}
        </div>
      </div>
      
      {/* Modals */}
      {selectedCategory && (
        <CategoryModal
          category={selectedCategory}
          onClose={handleCloseModal}
          onGameClick={handleGameClick}
        />
      )}
      
      {selectedGame && (
        <HackScreen
          game={selectedGame}
          onBack={handleBackFromGame}
        />
      )}
      
      {/* Notifications */}
      <div className="fixed top-20 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <NotificationToast
            key={notification.id}
            notification={notification}
            onRemove={removeNotification}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;