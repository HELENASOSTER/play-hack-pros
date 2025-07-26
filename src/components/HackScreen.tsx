import { useState } from 'react';
import { Game } from '@/types/game';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IframeViewer } from './IframeViewer';
import { CalculatorForm } from './CalculatorForm';
import { useAudio } from '@/hooks/useAudio';

interface HackScreenProps {
  game: Game | null;
  onBack: () => void;
}

export const HackScreen = ({ game, onBack }: HackScreenProps) => {
  const [showIframe, setShowIframe] = useState(false);
  const { playSound } = useAudio();

  if (!game) return null;

  const handleBack = () => {
    playSound('whoosh');
    onBack();
  };

  const handlePlayNow = () => {
    playSound('click');
    setShowIframe(true);
  };

  const handleIframeBack = () => {
    playSound('click');
    setShowIframe(false);
  };

  if (showIframe) {
    return (
      <IframeViewer
        url="https://www.playbonds.com/register?affiliate_id=68716979a553d300286de4b4"
        onBack={handleIframeBack}
      />
    );
  }

  const tips = [
    "Este é o momento ideal para apostar com base nos padrões detectados",
    "Nossa análise indica alta probabilidade de ganhos neste período",
    "Recomendamos apostas graduais para maximizar os retornos",
    "O algoritmo detectou padrões favoráveis para este jogo"
  ];

  const randomTip = tips[Math.floor(Math.random() * tips.length)];

  return (
    <div className="fixed inset-0 z-40 bg-background flex flex-col">
      <div className="flex items-center p-4 border-b border-border">
        <Button
          onClick={handleBack}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Button>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <Tabs defaultValue="tips" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="tips">Dicas Avançadas</TabsTrigger>
            <TabsTrigger value="calculator">Calculadora de Ganho</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tips" className="space-y-6">
            <div className="hack-card">
              <div className="text-center space-y-4">
                <div className="text-4xl">{game.icon}</div>
                <h1 className="text-2xl font-bold text-foreground">
                  Dicas Avançadas – {game.name}
                </h1>
              </div>
              
              <div className="space-y-4 mt-6">
                <div className="text-lg">
                  Momento ideal para jogar:{' '}
                  <span className="font-bold text-primary">{game.chancePercent}%</span>
                </div>
                
                <p className="text-muted-foreground">
                  {randomTip}
                </p>
                
                <div className="text-lg">
                  Jogadores ativos agora:{' '}
                  <span className="font-bold text-primary">{game.activePlayers}</span>
                </div>
              </div>
              
              <Button
                onClick={handlePlayNow}
                className="hack-button w-full text-xl py-6 mt-8"
              >
                JOGUE AGORA
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="calculator">
            <CalculatorForm game={game} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};