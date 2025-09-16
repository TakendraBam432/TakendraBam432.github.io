import { Event } from '@/types/event';
import { EventCard } from './EventCard';
import { Calendar, AlertTriangle } from 'lucide-react';

interface EventListProps {
  events: Event[];
  onDeleteEvent: (id: string) => void;
}

export const EventList = ({ events, onDeleteEvent }: EventListProps) => {
  const upcomingEvents = events
    .filter(event => new Date(event.datetime) > new Date())
    .sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime());
    
  const pastEvents = events
    .filter(event => new Date(event.datetime) <= new Date())
    .sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime());

  if (events.length === 0) {
    return (
      <div className="text-center py-12 space-y-4">
        <Calendar className="w-12 h-12 text-muted-foreground mx-auto opacity-50" />
        <div>
          <h3 className="text-base font-medium text-foreground">No reminders yet</h3>
          <p className="text-sm text-muted-foreground">Tap the button above to create one</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {upcomingEvents.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <AlertTriangle className="w-4 h-4 text-neon-blue" />
            <h3 className="text-sm font-medium text-foreground">Upcoming</h3>
            <span className="text-xs text-muted-foreground">({upcomingEvents.length})</span>
          </div>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                onDelete={onDeleteEvent}
              />
            ))}
          </div>
        </div>
      )}
      
      {pastEvents.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-medium text-muted-foreground">Past</h3>
            <span className="text-xs text-muted-foreground">({pastEvents.length})</span>
          </div>
          <div className="space-y-3">
            {pastEvents.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                onDelete={onDeleteEvent}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};