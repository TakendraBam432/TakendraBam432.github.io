import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventFormData, EventImportance } from '@/types/event';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Plus, Zap, User } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useToast } from '@/hooks/use-toast';

export interface ExtendedEventFormData extends EventFormData {
  userName: string;
}

const CreateEvent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userName, setUserName] = useLocalStorage<string>('user-name', '');
  
  const [formData, setFormData] = useState<ExtendedEventFormData>({
    name: '',
    datetime: '',
    importance: 'neutral',
    userName: userName || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.datetime && formData.userName) {
      // Save user name for future use
      setUserName(formData.userName);
      
      // Get existing events and add new one
      const existingEvents = JSON.parse(localStorage.getItem('event-reminders') || '[]');
      const newEvent = {
        id: crypto.randomUUID(),
        name: formData.name,
        datetime: formData.datetime,
        importance: formData.importance,
        userName: formData.userName,
        createdAt: new Date().toISOString(),
      };
      
      const updatedEvents = [...existingEvents, newEvent];
      localStorage.setItem('event-reminders', JSON.stringify(updatedEvents));
      
      toast({
        title: "🚀 Event Scheduled",
        description: `${newEvent.name} has been added to your reminders`,
      });
      
      navigate('/');
    }
  };

  const minDateTime = new Date().toISOString().slice(0, 16);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-sm mx-auto">
        {/* Mobile Header */}
        <div className="sticky top-0 bg-background/80 backdrop-blur-lg border-b border-border/50 p-4 z-10">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-neon-blue" />
              <h1 className="text-lg font-bold text-foreground">New Reminder</h1>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="p-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="user-name" className="text-foreground flex items-center gap-2">
                <User className="w-4 h-4" />
                Your Name
              </Label>
              <Input
                id="user-name"
                type="text"
                placeholder="Enter your name..."
                value={formData.userName}
                onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                className="h-12 text-base"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="event-name" className="text-foreground">Event</Label>
              <Input
                id="event-name"
                type="text"
                placeholder="What's the reminder for?"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-12 text-base"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="event-datetime" className="text-foreground">When</Label>
              <Input
                id="event-datetime"
                type="datetime-local"
                min={minDateTime}
                value={formData.datetime}
                onChange={(e) => setFormData({ ...formData, datetime: e.target.value })}
                className="h-12 text-base"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="importance" className="text-foreground">Priority</Label>
              <Select
                value={formData.importance}
                onValueChange={(value: EventImportance) => 
                  setFormData({ ...formData, importance: value })
                }
              >
                <SelectTrigger className="h-12 text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="neutral" className="status-neutral">Normal</SelectItem>
                  <SelectItem value="serious" className="status-serious">Important</SelectItem>
                  <SelectItem value="critical" className="status-critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="pt-6 space-y-3">
              <Button 
                type="submit" 
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-14 text-base font-semibold"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Reminder
              </Button>
              <Button 
                type="button"
                variant="outline"
                size="lg"
                onClick={() => navigate('/')}
                className="w-full h-12"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;