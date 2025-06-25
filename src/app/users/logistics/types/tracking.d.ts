export interface ITrackingStep {
  id: string;
  title: string;
  location: {
    city?: string;
    state?: string;
    country?: string;
    description?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  status: "completed" | "current" | "pending";
  date?: string;
  time?: string;
  delay?: string;
}
