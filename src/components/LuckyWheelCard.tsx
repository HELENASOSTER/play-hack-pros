import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';
import { useAudio } from '@/hooks/useAudio';

interface LuckyWheelCardProps {
  onLoginClick: () => void;
}

export const LuckyWheelCard = ({ onLoginClick }: LuckyWheelCardProps) => {
  const { playSound } = useAudio();

  const handleClick = () => {
    playSound('click');
    onLoginClick();
  };

  return (
    <div className="hack-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Zap className="w-8 h-8 text-primary" />
          <div>
            <h3 className="text-lg font-bold text-foreground">Roleta da Sorte</h3>
            <p className="text-sm text-muted-foreground">Gire e ganhe prêmios</p>
          </div>
        </div>
        <Button 
          onClick={handleClick}
          className="hack-button"
        >
          Login
        </Button>
      </div>
    </div>
  );
};