import { Button } from '@/components/ui/button';
import { useAudio } from '@/hooks/useAudio';

interface DepositBannerProps {
  onDepositClick: () => void;
}

export const DepositBanner = ({ onDepositClick }: DepositBannerProps) => {
  const { playSound } = useAudio();

  const handleClick = () => {
    playSound('click');
    onDepositClick();
  };

  return (
    <div className="bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-lg p-6 mx-4 mb-4">
      <div className="text-center space-y-3">
        <h2 className="text-xl font-bold text-primary">
          Deposite R$ 28,94 e ative o app com máxima eficácia!
        </h2>
        <p className="text-sm text-muted-foreground">
          Valor ideal para maximizar seus ganhos e desbloquear todos os recursos
        </p>
        <Button 
          onClick={handleClick}
          className="hack-button w-full text-lg py-4"
        >
          Depositar Agora
        </Button>
      </div>
    </div>
  );
};