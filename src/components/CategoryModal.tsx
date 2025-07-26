import { GameCategory, Game } from '@/types/game';
import { GameTile } from './GameTile';
import { X } from 'lucide-react';
import { useAudio } from '@/hooks/useAudio';

interface CategoryModalProps {
  category: GameCategory | null;
  onClose: () => void;
  onGameClick: (game: Game) => void;
}

export const CategoryModal = ({ category, onClose, onGameClick }: CategoryModalProps) => {
  const { playSound } = useAudio();

  if (!category) return null;

  const handleClose = () => {
    playSound('whoosh');
    onClose();
  };

  const handleGameClick = (game: Game) => {
    playSound('whoosh');
    onGameClick(game);
  };

  return (
    <div className="category-modal">
      <div className="container mx-auto p-4 h-full flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">
            {category.name}
          </h1>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-card rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-foreground" />
          </button>
        </div>
        
        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {category.games.map((game) => (
              <GameTile
                key={game.id}
                game={game}
                onClick={handleGameClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};