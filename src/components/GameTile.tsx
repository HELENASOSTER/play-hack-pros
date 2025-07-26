import { Game } from '@/types/game';
import { ProgressBar } from './ProgressBar';
import { useAudio } from '@/hooks/useAudio';

interface GameTileProps {
  game: Game;
  onClick: (game: Game) => void;
}

export const GameTile = ({ game, onClick }: GameTileProps) => {
  const { playSound } = useAudio();
  const isDisabled = game.status === 'TOMANDO';

  const handleClick = () => {
    if (isDisabled) return;
    
    playSound('click');
    onClick(game);
  };

  const getStatusClass = () => {
    switch (game.status) {
      case 'PAGANDO':
        return 'status-pagando';
      case 'EMPATANDO':
        return 'status-empatando';
      case 'TOMANDO':
        return 'status-tomando';
      default:
        return '';
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={`game-tile ${isDisabled ? 'opacity-50' : ''}`}
    >
      <div className="text-3xl mb-2">{game.icon}</div>
      
      <div className="text-2xl font-bold text-primary mb-1">
        {game.chancePercent}%
      </div>
      
      <h3 className="text-sm font-semibold text-foreground mb-2 line-clamp-2">
        {game.name}
      </h3>
      
      <div className={`status-badge ${getStatusClass()} mb-3`}>
        {game.status}
      </div>
      
      <ProgressBar percentage={game.chancePercent} className="mb-2" />
      
      <div className="text-xs text-muted-foreground">
        {game.activePlayers} jogadores
      </div>
    </button>
  );
};