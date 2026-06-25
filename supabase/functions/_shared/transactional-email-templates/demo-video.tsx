import * as React from 'npm:react@18.3.1'
import {
  Body, Button, Container, Head, Heading, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'CareHalo360'
const VIDEO_URL = 'https://carehalo360.com/carehalo360-demo-final-music.mp4'

interface DemoVideoProps {
  name?: string
}

const DemoVideoEmail = ({ name }: DemoVideoProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your {SITE_NAME} demo video</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>
          {name ? `Hi ${name},` : 'Hi there,'}
        </Heading>
        <Text style={text}>
          Thanks for asking. Here is the 30-second CareHalo360 demo —
          a real fall, a real call, a real SMS.
        </Text>
        <Section style={{ textAlign: 'center', margin: '28px 0' }}>
          <Button href={VIDEO_URL} style={button}>
            Watch the demo
          </Button>
        </Section>
        <Text style={text}>
          Or open it directly:{' '}
          <a href={VIDEO_URL} style={link}>{VIDEO_URL}</a>
        </Text>
        <Section style={card}>
          <Text style={cardText}>
            No wearable. No recorded video. Just calm, private fall
            detection that calls and texts you the moment it matters.
          </Text>
        </Section>
        <Text style={text}>
          Questions? Reply to this email or text us at 713-517-6792.
        </Text>
        <Text style={footer}>The {SITE_NAME} team</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: DemoVideoEmail,
  subject: 'Your CareHalo360 demo video',
  displayName: 'Demo video request',
  previewData: { name: 'Jane' },
} satisfies TemplateEntry

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '"Hanken Grotesk", Arial, sans-serif',
  color: '#1D1D1B',
}
const container = { padding: '40px 28px', maxWidth: '560px' }
const h1 = { fontSize: '24px', fontWeight: 600, color: '#1D1D1B', margin: '0 0 16px' }
const text = { fontSize: '15px', lineHeight: '1.6', color: '#1D1D1B', margin: '0 0 14px' }
const card = { backgroundColor: '#F1EAE0', borderRadius: '12px', padding: '18px 20px', margin: '20px 0' }
const cardText = { fontSize: '14px', lineHeight: '1.6', color: '#1D1D1B', margin: 0 }
const button = {
  backgroundColor: '#0F766E',
  color: '#ffffff',
  fontSize: '15px',
  fontWeight: 600,
  padding: '12px 22px',
  borderRadius: '10px',
  textDecoration: 'none',
}
const link = { color: '#0F766E', textDecoration: 'underline', wordBreak: 'break-all' as const }
const footer = { fontSize: '12px', color: '#6B6B6B', margin: '28px 0 0' }
