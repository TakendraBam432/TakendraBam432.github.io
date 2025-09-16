import { useState } from 'react';
import { EventFormData, EventImportance } from '@/types/event';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Zap } from 'lucide-react';

interface EventFormProps {
  onSubmit: (eventData: EventFormData) => void;
}

export const EventForm = ({ onSubmit }: EventFormProps) => {
  const [formData, setFormData] = useState<EventFormData>({
    name: '',
    datetime: '',
    importance: 'neutral'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.datetime) {
      onSubmit(formData);
      setFormData({
        name: '',
        datetime: '',
        importance: 'neutral'
      });
    }
  };

  const minDateTime = new Date().toISOString().slice(0, 16);

  return (
    <Card className="glass-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <Zap className="w-5 h-5 text-neon-blue" />
        <h2 className="text-xl font-semibold text-foreground">Schedule New Event</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="event-name" className="text-foreground">Event Name</Label>
          <Input
            id="event-name"
            type="text"
            placeholder="Enter event name..."
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-input/50 border-border/50 focus:border-primary"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="event-datetime" className="text-foreground">Date & Time</Label>
          <Input
            id="event-datetime"
            type="datetime-local"
            min={minDateTime}
            value={formData.datetime}
            onChange={(e) => setFormData({ ...formData, datetime: e.target.value })}
            className="bg-input/50 border-border/50 focus:border-primary"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="importance" className="text-foreground">Importance Level</Label>
          <Select
            value={formData.importance}
            onValueChange={(value: EventImportance) => 
              setFormData({ ...formData, importance: value })
            }
          >
            <SelectTrigger className="bg-input/50 border-border/50 focus:border-primary">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              <SelectItem value="neutral" className="status-neutral">Neutral</SelectItem>
              <SelectItem value="serious" className="status-serious">Serious</SelectItem>
              <SelectItem value="critical" className="status-critical">Extremely Serious</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-border"
        >
          <Plus className="w-4 h-4 mr-2" />
          Schedule Event
        </Button>
      </form>
    </Card>
  );
};