import { Button } from '@/components/ui/button';
import { Gift } from 'lucide-react';
import { useAudio } from '@/hooks/useAudio';

interface DailyRewardCardProps {
  onLoginClick: () => void;
}

export const DailyRewardCard = ({ onLoginClick }: DailyRewardCardProps) => {
  const { playSound } = useAudio();

  const handleClick = () => {
    playSound('click');
    onLoginClick();
  };

  return (
    <div className="hack-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Gift className="w-8 h-8 text-primary" />
          <div>
            <h3 className="text-lg font-bold text-foreground">Recompensa Diária</h3>
            <p className="text-sm text-muted-foreground">Ganhe bônus todos os dias</p>
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