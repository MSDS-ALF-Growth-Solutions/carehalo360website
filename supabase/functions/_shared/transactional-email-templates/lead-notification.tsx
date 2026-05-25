import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface LeadNotificationProps {
  source?: string
  name?: string
  email?: string
  phone?: string
  location?: string
  notes?: string
}

const LeadNotificationEmail = ({ source, name, email, phone, location, notes }: LeadNotificationProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New {source || 'website'} lead: {name || email || 'unknown'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New lead from {source || 'website'}</Heading>
        <Section style={card}>
          {name && <Text style={row}><strong>Name:</strong> {name}</Text>}
          {email && <Text style={row}><strong>Email:</strong> {email}</Text>}
          {phone && <Text style={row}><strong>Phone:</strong> {phone}</Text>}
          {location && <Text style={row}><strong>Location:</strong> {location}</Text>}
          {notes && (
            <Text style={{ ...row, whiteSpace: 'pre-wrap' }}>
              <strong>Notes:</strong>{'\n'}{notes}
            </Text>
          )}
        </Section>
        <Text style={footer}>CareHalo360 internal notification</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: LeadNotificationEmail,
  subject: (data: Record<string, any>) =>
    `New ${data?.source || 'website'} lead${data?.name ? `: ${data.name}` : ''}`,
  to: 'dawoodshabbir734@gmail.com',
  displayName: 'Owner lead notification',
  previewData: {
    source: 'founding',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '713-555-0100',
    location: '77001 · Texas',
    notes: 'QUALIFIED: YES\nIn Texas: Texas\nReliable Wi-Fi: Yes',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: '"Hanken Grotesk", Arial, sans-serif', color: '#1D1D1B' }
const container = { padding: '40px 28px', maxWidth: '560px' }
const h1 = { fontSize: '24px', fontWeight: 600, color: '#1D1D1B', margin: '0 0 20px' }
const card = { backgroundColor: '#F1EAE0', borderRadius: '12px', padding: '20px 22px', margin: '20px 0' }
const row = { fontSize: '14px', lineHeight: '1.6', color: '#1D1D1B', margin: '0 0 8px' }
const footer = { fontSize: '12px', color: '#6B6B6B', margin: '28px 0 0' }
