import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAudio } from '@/hooks/useAudio';

interface IframeViewerProps {
  url: string;
  onBack: () => void;
}

export const IframeViewer = ({ url, onBack }: IframeViewerProps) => {
  const { playSound } = useAudio();

  const handleBack = () => {
    playSound('click');
    onBack();
  };

  return (
    <div className="iframe-container">
      <div className="flex items-center p-4 bg-background border-b border-border">
        <Button
          onClick={handleBack}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Button>
        <h2 className="ml-4 text-lg font-semibold text-foreground">
          Playbonds
        </h2>
      </div>
      
      <iframe
        src={url}
        className="flex-1 w-full border-0"
        title="Playbonds Casino"
        allow="fullscreen; payment; geolocation"
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-presentation"
      />
    </div>
  );
};