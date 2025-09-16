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
    <div className="min-h-screen bg-background cyber-grid">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 space-y-6">
          <div className="flex items-center justify-center gap-3">
            <div className="relative">
              <Zap className="w-12 h-12 text-neon-blue" />
              <div className="absolute inset-0 w-12 h-12 text-neon-blue animate-ping opacity-20">
                <Zap className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              Event Reminder
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Never miss an important event with futuristic notifications
          </p>
          
          {userName && (
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <User className="w-4 h-4" />
              <span>Welcome back, {userName}</span>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <Card className="glass-card p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-2">Ready to schedule?</h2>
                <p className="text-muted-foreground">Create your next important reminder</p>
              </div>
              <Button
                onClick={() => navigate('/create')}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground glow-border"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Event
              </Button>
            </div>
          </Card>
        </div>

        {/* Event List */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-6 h-6 text-neon-blue" />
            <h2 className="text-2xl font-semibold text-foreground">Your Events</h2>
          </div>
          
          <EventList events={events} onDeleteEvent={handleDeleteEvent} />
        </div>

        {/* Alert Component */}
        <EventAlert />
      </div>
    </div>
  );
};

export default Index;
