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
    <div className="min-h-screen bg-background cyber-grid">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-6 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
          </Button>
          
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="relative">
                <Zap className="w-10 h-10 text-neon-blue" />
                <div className="absolute inset-0 w-10 h-10 text-neon-blue animate-ping opacity-20">
                  <Zap className="w-10 h-10" />
                </div>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                Create New Event
              </h1>
            </div>
            <p className="text-muted-foreground">
              Schedule your next important reminder
            </p>
          </div>
        </div>

        {/* Form */}
        <Card className="glass-card p-8">
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
                className="bg-input/50 border-border/50 focus:border-primary"
                required
              />
            </div>
            
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
            
            <div className="flex gap-4 pt-4">
              <Button 
                type="button"
                variant="outline"
                onClick={() => navigate('/')}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground glow-border"
              >
                <Plus className="w-4 h-4 mr-2" />
                Schedule Event
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CreateEvent;