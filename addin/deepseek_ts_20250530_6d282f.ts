export type ProjectType = 'web' | 'mobile' | 'desktop' | 'ai' | 'blockchain' | 'other';
export type Priority = 'low' | 'medium' | 'high' | 'critical';
export type Timeline = 'flexible' | 'moderate' | 'urgent';

export interface ProjectFormData {
  projectName: string;
  description: string;
  goals: string;
  features: string;
  projectType: ProjectType | null;
  technologies: string[];
  timeline: Timeline;
  priority: Priority;
  budget?: number;
  contactEmail: string;
}