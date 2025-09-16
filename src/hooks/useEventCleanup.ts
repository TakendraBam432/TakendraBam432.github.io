import { useEffect } from 'react';
import { Event } from '@/types/event';

export const useEventCleanup = (events: Event[], setEvents: (events: Event[]) => void) => {
  useEffect(() => {
    const cleanup = () => {
      const now = new Date();
      const updatedEvents = events.filter(event => {
        const eventTime = new Date(event.datetime);
        const timeSinceEvent = now.getTime() - eventTime.getTime();
        // Delete events that finished more than 1 minute ago
        return timeSinceEvent < 60000; // 1 minute in milliseconds
      });
      
      if (updatedEvents.length !== events.length) {
        setEvents(updatedEvents);
      }
    };

    // Run cleanup every minute
    const interval = setInterval(cleanup, 60000);
    // Run cleanup on mount
    cleanup();

    return () => clearInterval(interval);
  }, [events, setEvents]);
};