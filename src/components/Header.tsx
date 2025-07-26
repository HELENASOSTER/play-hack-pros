import { Button } from '@/components/ui/button';
import { useAudio } from '@/hooks/useAudio';

interface HeaderProps {
  onDepositClick: () => void;
}

export const Header = ({ onDepositClick }: HeaderProps) => {
  const { playSound } = useAudio();

  const handleDepositClick = () => {
    playSound('click');
    onDepositClick();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-background border-b border-border">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-primary">
            PLAY HACK
          </h1>
        </div>
        
        <Button 
          onClick={handleDepositClick}
          className="hack-button text-sm"
        >
          Depositar
        </Button>
      </div>
    </header>
  );
};