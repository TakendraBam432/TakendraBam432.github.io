import { Event } from '@/types/event';
import { EventList } from '@/components/EventList';
import { EventAlert } from '@/components/EventAlert';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useNotifications } from '@/hooks/useNotifications';
import { useEventCleanup } from '@/hooks/useEventCleanup';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Zap, Calendar, Plus, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Index = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useLocalStorage<Event[]>('event-reminders', []);
  const [userName] = useLocalStorage<string>('user-name', '');
  const { toast } = useToast();
  
  useNotifications(events);
  useEventCleanup(events, setEvents);

  const handleDeleteEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
    
    toast({
      title: "🗑️ Event Deleted",
      description: "Event has been removed from your reminders",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-sm mx-auto">
        {/* Mobile Header */}
        <div className="sticky top-0 bg-background/80 backdrop-blur-lg border-b border-border/50 p-4 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-neon-blue" />
              <h1 className="text-lg font-bold text-foreground">Reminders</h1>
            </div>
            {userName && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                <span>{userName}</span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Create Button */}
          <Button
            onClick={() => navigate('/create')}
            size="lg"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-14 text-base font-semibold"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Reminder
          </Button>

          {/* Event List */}
          <div className="space-y-4">
            <EventList events={events} onDeleteEvent={handleDeleteEvent} />
          </div>
        </div>

        {/* Alert Component */}
        <EventAlert />
      </div>
    </div>
  );
};

export default Index;
