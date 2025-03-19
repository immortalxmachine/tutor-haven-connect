
export interface SessionFeedback {
  rating: number;
  comment: string;
}

export interface Session {
  id: string;
  studentName: string;
  subject: string;
  topic: string;
  date: string;
  time: string;
  status: "upcoming" | "pending" | "completed";
  notes: string;
  communicationMode: "text" | "voice" | "video";
  feedback?: SessionFeedback;
  tutor_id?: string;
}
