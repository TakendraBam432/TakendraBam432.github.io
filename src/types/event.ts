export type EventImportance = 'neutral' | 'serious' | 'critical';

export interface Event {
  id: string;
  name: string;
  datetime: string;
  importance: EventImportance;
  createdAt: string;
}

export interface EventFormData {
  name: string;
  datetime: string;
  importance: EventImportance;
}