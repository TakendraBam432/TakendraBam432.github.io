import { useEffect } from 'react';
import { Event } from '@/types/event';

export const useNotifications = (events: Event[]) => {
  useEffect(() => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  const scheduleNotification = (event: Event) => {
    const eventTime = new Date(event.datetime);
    const now = new Date();
    const timeDiff = eventTime.getTime() - now.getTime();

    if (timeDiff > 0) {
      setTimeout(() => {
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification(`🚨 Event Reminder for ${event.userName}`, {
            body: `${event.name} - ${event.importance.toUpperCase()} priority`,
            icon: '/favicon.ico',
            tag: event.id,
            requireInteraction: true,
            silent: false
          });
        }
        
        // Trigger custom event for popup
        window.dispatchEvent(new CustomEvent('eventAlert', { 
          detail: event 
        }));
      }, timeDiff);
    }
  };

  useEffect(() => {
    events.forEach(scheduleNotification);
  }, [events]);

  return { scheduleNotification };
};