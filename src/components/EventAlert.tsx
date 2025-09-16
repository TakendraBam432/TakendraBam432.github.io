import { useEffect, useState } from 'react';
import { Event } from '@/types/event';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, X, Volume2 } from 'lucide-react';
import { format } from 'date-fns';

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

export const EventAlert = () => {
  const [alertEvent, setAlertEvent] = useState<Event | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleEventAlert = (e: CustomEvent<Event>) => {
      setAlertEvent(e.detail);
      setIsOpen(true);
      
      // Play notification sound
      const notificationAudio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvWEaATVs1/LM');
      notificationAudio.loop = true;
      notificationAudio.play().catch(console.error);
      setAudio(notificationAudio);
    };

    window.addEventListener('eventAlert', handleEventAlert as EventListener);
    
    return () => {
      window.removeEventListener('eventAlert', handleEventAlert as EventListener);
    };
  }, []);

  const handleStop = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setAudio(null);
    }
    setIsOpen(false);
    setAlertEvent(null);
  };

  if (!alertEvent) return null;

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent 
        className="max-w-md glass-card border-primary/50 animate-pulse-glow"
      >
        <div className="space-y-6 p-2">
          <div className="flex items-center justify-center">
            <div className="relative">
              <AlertCircle className="w-16 h-16 text-primary animate-pulse" />
              <Volume2 className="w-6 h-6 text-accent absolute -top-1 -right-1 animate-bounce" />
            </div>
          </div>
          
          <div className="text-center space-y-3">
            <h2 className="text-2xl font-bold text-foreground">🚨 EVENT ALERT</h2>
            <h3 className="text-xl font-semibold text-primary">{alertEvent.name}</h3>
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {format(new Date(alertEvent.datetime), 'MMM dd, yyyy • HH:mm')}
              </p>
              
              <Badge 
                variant="outline" 
                className={`${importanceColors[alertEvent.importance]} border-current text-lg px-3 py-1`}
              >
                {importanceLabels[alertEvent.importance]}
              </Badge>
            </div>
          </div>
          
          <Button 
            onClick={handleStop}
            className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground text-lg py-3"
            size="lg"
          >
            <X className="w-5 h-5 mr-2" />
            STOP ALERT
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};