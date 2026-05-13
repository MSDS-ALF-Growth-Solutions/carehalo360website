import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'CareHalo360'

interface WaitlistConfirmationProps {
  name?: string
}

const WaitlistConfirmationEmail = ({ name }: WaitlistConfirmationProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>You're on the {SITE_NAME} waitlist</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>
          {name ? `Thank you, ${name}.` : 'Thank you for joining.'}
        </Heading>
        <Text style={text}>
          You're on the {SITE_NAME} waitlist. We'll be in touch soon with next
          steps and early access details.
        </Text>
        <Section style={card}>
          <Text style={cardText}>
            CareHalo360 is a calm, privacy-first companion that helps families
            and caregivers stay connected — without surveillance or stored video.
          </Text>
        </Section>
        <Text style={text}>
          If you have questions in the meantime, just reply to this email.
        </Text>
        <Text style={footer}>— The {SITE_NAME} team</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: WaitlistConfirmationEmail,
  subject: "You're on the CareHalo360 waitlist",
  displayName: 'Waitlist confirmation',
  previewData: { name: 'Jane' },
} satisfies TemplateEntry

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '"Hanken Grotesk", Arial, sans-serif',
  color: '#1D1D1B',
}
const container = { padding: '40px 28px', maxWidth: '560px' }
const h1 = {
  fontSize: '28px',
  fontWeight: 500,
  letterSpacing: '-0.02em',
  color: '#1D1D1B',
  margin: '0 0 20px',
}
const text = {
  fontSize: '15px',
  lineHeight: '1.6',
  color: '#1D1D1B',
  margin: '0 0 18px',
}
const card = {
  backgroundColor: '#F1EAE0',
  borderRadius: '12px',
  padding: '20px 22px',
  margin: '20px 0',
}
const cardText = {
  fontSize: '14px',
  lineHeight: '1.6',
  color: '#1D1D1B',
  margin: 0,
}
const footer = {
  fontSize: '13px',
  color: '#6B6B6B',
  margin: '28px 0 0',
}
