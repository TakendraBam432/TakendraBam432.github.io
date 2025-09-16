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
        <Calendar className="w-16 h-16 text-muted-foreground mx-auto opacity-50" />
        <div>
          <h3 className="text-lg font-semibold text-foreground">No Events Scheduled</h3>
          <p className="text-muted-foreground">Create your first event to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {upcomingEvents.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-neon-blue" />
            <h3 className="text-lg font-semibold text-foreground">Upcoming Events</h3>
            <span className="text-sm text-muted-foreground">({upcomingEvents.length})</span>
          </div>
          <div className="grid gap-4">
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
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-muted-foreground">Past Events</h3>
            <span className="text-sm text-muted-foreground">({pastEvents.length})</span>
          </div>
          <div className="grid gap-4">
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