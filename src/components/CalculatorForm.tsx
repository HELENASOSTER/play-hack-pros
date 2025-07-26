import { useState } from 'react';
import { Game } from '@/types/game';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CalculatorFormProps {
  game: Game;
}

export const CalculatorForm = ({ game }: CalculatorFormProps) => {
  const [deposit, setDeposit] = useState('');
  const [multiplier, setMultiplier] = useState('1');

  const depositValue = parseFloat(deposit) || 0;
  const multiplierValue = parseFloat(multiplier) || 1;
  
  const minReturn = depositValue * (game.chancePercent / 100);
  const maxReturn = depositValue * multiplierValue;
  
  // High multipliers only available for games with good chance percentage
  const maxMultiplier = game.chancePercent >= 75 ? 10 : 5;
  const multiplierOptions = Array.from({ length: maxMultiplier }, (_, i) => i + 1);

  return (
    <div className="hack-card space-y-6">
      <div className="text-center">
        <div className="text-4xl mb-4">{game.icon}</div>
        <h2 className="text-2xl font-bold text-foreground">
          Calculadora de Ganho - {game.name}
        </h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="deposit" className="text-foreground">
            Valor de Depósito (R$)
          </Label>
          <Input
            id="deposit"
            type="number"
            placeholder="0.00"
            value={deposit}
            onChange={(e) => setDeposit(e.target.value)}
            className="hack-input mt-2"
          />
        </div>
        
        <div>
          <Label htmlFor="multiplier" className="text-foreground">
            Multiplicador Máximo
            {game.chancePercent >= 75 && (
              <span className="text-primary ml-2">(Máximo desbloqueado!)</span>
            )}
          </Label>
          <Select value={multiplier} onValueChange={setMultiplier}>
            <SelectTrigger className="hack-input mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {multiplierOptions.map((mult) => (
                <SelectItem key={mult} value={mult.toString()}>
                  {mult}x
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {depositValue > 0 && (
        <div className="space-y-3 p-4 bg-primary/10 border border-primary/30 rounded-lg">
          <h3 className="text-lg font-bold text-primary">Projeção de Retorno</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Retorno mínimo:</span>
              <span className="font-bold text-green-400">
                R$ {minReturn.toFixed(2)}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Retorno máximo:</span>
              <span className="font-bold text-primary">
                R$ {maxReturn.toFixed(2)}
              </span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Lucro potencial:</span>
              <span className="font-bold text-primary">
                R$ {(maxReturn - depositValue).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}
      
      {game.chancePercent < 75 && (
        <div className="text-center text-sm text-muted-foreground p-3 bg-muted/10 rounded-lg">
          💡 Multiplicadores maiores disponíveis para jogos com 75%+ de chance
        </div>
      )}
    </div>
  );
};