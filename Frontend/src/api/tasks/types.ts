export type TaskStatus = 'new' | 'in_progress' | 'pending' | 'completed'

export interface TaskRequest {
  id: number
  project_name: string
  description: string
  complexity: 'simple' | 'medium' | 'hard'
  features_count: number
  need_design: boolean
  need_integration: boolean
  has_spec: boolean
  application_type: 'web' | 'mobile' | 'desktop'
  estimated_time: number
  estimated_budget: number
  email: string
  phone: string
  status: TaskStatus
  status_display: string
  created_at: string
  updated_at: string
} 