import { GameCategory } from '@/types/game';
import { GameTile } from './GameTile';
import { Button } from '@/components/ui/button';
import { useTimer } from '@/hooks/useTimer';
import { useAudio } from '@/hooks/useAudio';
import { Game } from '@/types/game';

interface CategorySectionProps {
  category: GameCategory;
  onGameClick: (game: Game) => void;
  onViewAllClick: (category: GameCategory) => void;
}

export const CategorySection = ({ 
  category, 
  onGameClick, 
  onViewAllClick 
}: CategorySectionProps) => {
  const { formattedTime } = useTimer(category.validityMinutes);
  const { playSound } = useAudio();
  
  const displayGames = category.games.slice(0, 6);

  const handleViewAllClick = () => {
    playSound('whoosh');
    onViewAllClick(category);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3 px-4">
        <h2 className="text-xl font-bold text-foreground">
          {category.name}
        </h2>
        <div className="text-sm text-muted-foreground">
          Validade: {formattedTime}
        </div>
      </div>
      
      <div className="flex gap-3 overflow-x-auto px-4 pb-4">
        {displayGames.map((game) => (
          <GameTile
            key={game.id}
            game={game}
            onClick={onGameClick}
          />
        ))}
      </div>
      
      <div className="px-4">
        <Button
          onClick={handleViewAllClick}
          variant="outline"
          className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        >
          Ver Todos os {category.name.split(' ').slice(1).join(' ')} ({category.games.length})
        </Button>
      </div>
    </div>
  );
};