import { Users } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface StatusBarProps {
  onlineUsers: number;
}

export const StatusBar = ({ onlineUsers }: StatusBarProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg mx-4 mb-4">
      <div className="flex items-center space-x-2 text-sm">
        <Users className="w-4 h-4 text-primary" />
        <span className="text-foreground">
          <span className="font-bold text-primary">{onlineUsers}</span> online
        </span>
      </div>
      
      <Select defaultValue="playbonds">
        <SelectTrigger className="w-32 h-8 text-xs bg-background border-border">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-popover border-border">
          <SelectItem value="playbonds">Playbonds</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};