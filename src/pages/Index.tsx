import { useState } from 'react';
import { Event, EventFormData } from '@/types/event';
import { EventForm } from '@/components/EventForm';
import { EventList } from '@/components/EventList';
import { EventAlert } from '@/components/EventAlert';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useNotifications } from '@/hooks/useNotifications';
import { useToast } from '@/hooks/use-toast';
import { Zap, Calendar } from 'lucide-react';

const Index = () => {
  const [events, setEvents] = useLocalStorage<Event[]>('event-reminders', []);
  const { toast } = useToast();
  
  useNotifications(events);

  const handleCreateEvent = (eventData: EventFormData) => {
    const newEvent: Event = {
      id: crypto.randomUUID(),
      ...eventData,
      createdAt: new Date().toISOString(),
    };

    setEvents(prev => [...prev, newEvent]);
    
    toast({
      title: "🚀 Event Scheduled",
      description: `${newEvent.name} has been added to your reminders`,
    });
  };

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
        <div className="text-center mb-12 space-y-4">
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
        </div>

        {/* Event Form */}
        <div className="mb-8">
          <EventForm onSubmit={handleCreateEvent} />
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
