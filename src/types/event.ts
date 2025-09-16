export type EventImportance = 'neutral' | 'serious' | 'critical';

export interface Event {
  id: string;
  name: string;
  datetime: string;
  importance: EventImportance;
  userName: string;
  createdAt: string;
}

export interface EventFormData {
  name: string;
  datetime: string;
  importance: EventImportance;
}