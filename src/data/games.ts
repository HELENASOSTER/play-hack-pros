import { Game, GameCategory } from '@/types/game';

const generateRandomChance = (): number => {
  const weights = [
    { min: 0, max: 25, weight: 10 },   // TOMANDO
    { min: 26, max: 60, weight: 30 },  // EMPATANDO
    { min: 61, max: 100, weight: 60 }  // PAGANDO
  ];
  
  const totalWeight = weights.reduce((sum, w) => sum + w.weight, 0);
  const random = Math.random() * totalWeight;
  
  let currentWeight = 0;
  for (const weight of weights) {
    currentWeight += weight.weight;
    if (random <= currentWeight) {
      return Math.floor(Math.random() * (weight.max - weight.min + 1)) + weight.min;
    }
  }
  
  return 75; // fallback
};

const generateStatus = (chance: number): Game['status'] => {
  if (chance <= 25) return 'TOMANDO';
  if (chance <= 60) return 'EMPATANDO';
  return 'PAGANDO';
};

const generateActivePlayers = (status: Game['status']): number => {
  const baseMultiplier = status === 'PAGANDO' ? 3 : status === 'EMPATANDO' ? 2 : 1;
  return Math.floor(Math.random() * 1000 * baseMultiplier) + 50;
};

const createGame = (id: string, name: string, icon: string, category: Game['category']): Game => {
  const chancePercent = generateRandomChance();
  const status = generateStatus(chancePercent);
  const activePlayers = generateActivePlayers(status);
  
  return {
    id,
    name,
    icon,
    status,
    chancePercent,
    activePlayers,
    category
  };
};

// PG Slots Games
const pgSlots: Game[] = [
  createGame('pg-1', 'Fortune Tiger', '🐅', 'slots-pg'),
  createGame('pg-2', 'Fortune Ox', '🐂', 'slots-pg'),
  createGame('pg-3', 'Bikini Paradise', '🏖️', 'slots-pg'),
  createGame('pg-4', 'Lucky Neko', '🐱', 'slots-pg'),
  createGame('pg-5', 'Dragon Legend', '🐲', 'slots-pg'),
  createGame('pg-6', 'Genie\'s 3 Wishes', '🧞', 'slots-pg'),
  createGame('pg-7', 'Honey Trap', '🍯', 'slots-pg'),
  createGame('pg-8', 'Mahjong Ways', '🀄', 'slots-pg'),
  createGame('pg-9', 'Wild Bandito', '🤠', 'slots-pg'),
  createGame('pg-10', 'Emperor\'s Favour', '👑', 'slots-pg'),
  createGame('pg-11', 'Phoenix Rises', '🔥', 'slots-pg'),
  createGame('pg-12', 'Tree of Fortune', '🌲', 'slots-pg'),
  createGame('pg-13', 'Candy Burst', '🍭', 'slots-pg'),
  createGame('pg-14', 'Jungle Delight', '🌴', 'slots-pg'),
  createGame('pg-15', 'Opera Dynasty', '🎭', 'slots-pg'),
  createGame('pg-16', 'Crypto Gold', '💰', 'slots-pg'),
  createGame('pg-17', 'Legend of Perseus', '⚔️', 'slots-pg'),
  createGame('pg-18', 'Treasures of Aztec', '🏺', 'slots-pg'),
  createGame('pg-19', 'Wild Heist', '💎', 'slots-pg'),
  createGame('pg-20', 'Safari Wilds', '🦁', 'slots-pg'),
  createGame('pg-21', 'Mermaid Riches', '🧜', 'slots-pg'),
  createGame('pg-22', 'Supermarket Spree', '🛒', 'slots-pg'),
  createGame('pg-23', 'Win Win Won', '🎰', 'slots-pg'),
  createGame('pg-24', 'Battleground Royale', '⚡', 'slots-pg')
];

// Pragmatic Play Slots
const pragmaticSlots: Game[] = [
  createGame('pp-1', 'Sweet Bonanza', '🍭', 'slots-pragmatic'),
  createGame('pp-2', 'Gates of Olympus', '⚡', 'slots-pragmatic'),
  createGame('pp-3', 'Sugar Rush', '🧁', 'slots-pragmatic'),
  createGame('pp-4', 'Starlight Princess', '✨', 'slots-pragmatic'),
  createGame('pp-5', 'The Dog House', '🐕', 'slots-pragmatic'),
  createGame('pp-6', 'Wild West Gold', '🤠', 'slots-pragmatic'),
  createGame('pp-7', 'Great Rhino Megaways', '🦏', 'slots-pragmatic'),
  createGame('pp-8', 'Fruit Party', '🍓', 'slots-pragmatic'),
  createGame('pp-9', 'Pirate Gold', '🏴‍☠️', 'slots-pragmatic'),
  createGame('pp-10', 'John Hunter', '🗿', 'slots-pragmatic'),
  createGame('pp-11', 'Madame Destiny', '🔮', 'slots-pragmatic'),
  createGame('pp-12', 'Wolf Gold', '🐺', 'slots-pragmatic'),
  createGame('pp-13', 'Buffalo King', '🦬', 'slots-pragmatic'),
  createGame('pp-14', 'Aztec Gems', '💎', 'slots-pragmatic'),
  createGame('pp-15', 'Fire Strike', '🔥', 'slots-pragmatic'),
  createGame('pp-16', 'Money Train', '🚂', 'slots-pragmatic'),
  createGame('pp-17', 'Mustang Gold', '🐎', 'slots-pragmatic'),
  createGame('pp-18', 'Chilli Heat', '🌶️', 'slots-pragmatic'),
  createGame('pp-19', 'Diamond Strike', '💎', 'slots-pragmatic'),
  createGame('pp-20', 'Vegas Magic', '🎩', 'slots-pragmatic')
];

// Crash Games
const crashGames: Game[] = [
  createGame('crash-1', 'Aviator', '✈️', 'crash'),
  createGame('crash-2', 'JetX', '🚀', 'crash'),
  createGame('crash-3', 'Spaceman', '🚀', 'crash'),
  createGame('crash-4', 'Crash X', '💥', 'crash'),
  createGame('crash-5', 'Lucky Jet', '✈️', 'crash'),
  createGame('crash-6', 'Space XY', '🛸', 'crash'),
  createGame('crash-7', 'Rocket Blast', '🚀', 'crash'),
  createGame('crash-8', 'Moon Princess', '🌙', 'crash'),
  createGame('crash-9', 'Solar Flare', '☀️', 'crash'),
  createGame('crash-10', 'Cosmic Crash', '🌟', 'crash'),
  createGame('crash-11', 'Thunder Strike', '⚡', 'crash'),
  createGame('crash-12', 'Neon Blast', '💫', 'crash')
];

export const gameCategories: GameCategory[] = [
  {
    id: 'slots-pg',
    name: '🎰 Slots PG',
    icon: '🎰',
    games: pgSlots,
    validityMinutes: Math.floor(Math.random() * 5) + 1
  },
  {
    id: 'slots-pragmatic',
    name: '🎲 Slots Pragmatic Play',
    icon: '🎲',
    games: pragmaticSlots,
    validityMinutes: Math.floor(Math.random() * 5) + 1
  },
  {
    id: 'crash',
    name: '💥 Crash Games',
    icon: '💥',
    games: crashGames,
    validityMinutes: Math.floor(Math.random() * 5) + 1
  }
];

export const getAllGames = (): Game[] => {
  return gameCategories.flatMap(category => category.games);
};

export const getGameById = (id: string): Game | undefined => {
  return getAllGames().find(game => game.id === id);
};

export const getOnlineUsersCount = (): number => {
  const games = getAllGames();
  const pagandoCount = games.filter(g => g.status === 'PAGANDO').length;
  const empatiandoCount = games.filter(g => g.status === 'EMPATANDO').length;
  
  // Weight online users based on game status distribution
  const baseUsers = 50;
  const statusMultiplier = (pagandoCount * 3) + (empatiandoCount * 2);
  
  return Math.min(4583, baseUsers + Math.floor(Math.random() * statusMultiplier * 10));
};