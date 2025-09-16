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
  neutral: 'Normal',
  serious: 'Important', 
  critical: 'Critical'
};

export const EventCard = ({ event, onDelete }: EventCardProps) => {
  const eventDate = new Date(event.datetime);
  const isUpcoming = eventDate > new Date();

  return (
    <Card className={`p-4 space-y-3 ${isUpcoming ? 'border-primary/50' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1 min-w-0">
          <h3 className="font-medium text-base text-foreground truncate">{event.name}</h3>
          
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{format(eventDate, 'MMM dd')}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{format(eventDate, 'HH:mm')}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Badge 
              variant="outline" 
              className={`${importanceColors[event.importance]} border-current text-xs`}
            >
              {importanceLabels[event.importance]}
            </Badge>
            
            {isUpcoming && (
              <span className="text-xs text-neon-blue font-medium">
                📡 Active
              </span>
            )}
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(event.id)}
          className="text-destructive hover:text-destructive hover:bg-destructive/10 ml-2 p-2"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};