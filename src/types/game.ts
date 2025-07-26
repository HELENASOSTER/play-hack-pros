export type GameStatus = 'PAGANDO' | 'EMPATANDO' | 'TOMANDO';

export interface Game {
  id: string;
  name: string;
  icon: string;
  status: GameStatus;
  chancePercent: number;
  activePlayers: number;
  category: 'slots-pg' | 'slots-pragmatic' | 'crash';
}

export interface GameCategory {
  id: string;
  name: string;
  icon: string;
  games: Game[];
  validityMinutes: number;
}

export interface NotificationData {
  id: string;
  username: string;
  amount: number;
  gameName: string;
  timestamp: Date;
}