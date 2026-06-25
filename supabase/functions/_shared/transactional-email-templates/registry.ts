/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'

export interface TemplateEntry {
  component: React.ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  to?: string
  displayName?: string
  previewData?: Record<string, any>
}

import { template as waitlistConfirmation } from './waitlist-confirmation.tsx'
import { template as leadNotification } from './lead-notification.tsx'
import { template as demoVideo } from './demo-video.tsx'

export const TEMPLATES: Record<string, TemplateEntry> = {
  'waitlist-confirmation': waitlistConfirmation,
  'lead-notification': leadNotification,
  'demo-video': demoVideo,
}
