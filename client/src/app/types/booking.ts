export interface Message {
  user: string;
  message: string;
  timestamp: string;
}

export interface Attachment {
  filename: string;
  url: string;
}

export interface Booking {
  id: number;
  description?: string;
  scheduled_start?: string;
  messages: Message[];
  attachments: Attachment[];
}
