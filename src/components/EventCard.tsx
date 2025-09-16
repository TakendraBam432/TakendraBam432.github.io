import { Event } from '@/types/event';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2, Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface EventCardProps {
  event: Event;
  onDelete: (id: string) => void;
}

const importanceColors = {
  neutral: 'status-neutral',
  serious: 'status-serious',
  critical: 'status-critical'
};

const importanceLabels = {
  neutral: 'Neutral',
  serious: 'Serious',
  critical: 'Extremely Serious'
};

export const EventCard = ({ event, onDelete }: EventCardProps) => {
  const eventDate = new Date(event.datetime);
  const isUpcoming = eventDate > new Date();

  return (
    <Card className={`glass-card p-4 space-y-3 ${isUpcoming ? 'glow-border' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <h3 className="font-semibold text-lg text-foreground">{event.name}</h3>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{format(eventDate, 'MMM dd, yyyy')}</span>
            <Clock className="w-4 h-4 ml-2" />
            <span>{format(eventDate, 'HH:mm')}</span>
          </div>
          
          <Badge 
            variant="outline" 
            className={`${importanceColors[event.importance]} border-current`}
          >
            {importanceLabels[event.importance]}
          </Badge>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(event.id)}
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
      
      {isUpcoming && (
        <div className="text-xs text-neon-blue font-medium">
          📡 Notification scheduled
        </div>
      )}
    </Card>
  );
};