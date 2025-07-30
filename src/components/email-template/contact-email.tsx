import * as React from 'react';
import {
 Html,
 Head,
 Preview,
 Body,
 Container,
 Section,
 Row,
 Img,
 Link,
 Text,
 Button,
 Hr,
} from '@react-email/components';

interface ContactEmailProps {
 nome: string;
 email: string;
 assunto: string;
 mensagem: string;
}

export function ContactEmail({ nome, email, assunto, mensagem }: ContactEmailProps) {
 const previewText = `Nova mensagem de contato: ${assunto}`;

 // baseUrl para referenciar a logo hospedada, p.ex. na pasta public
 const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

 return (
  <Html lang="pt">
   <Head />
   <Preview>{previewText}</Preview>
   <Body style={main}>
    <Container style={container}>
     {/* Cabeçalho com logo clicável */}
     <Section style={headerSection}>
      <Link href="https://portifolio-v8.vercel.app/" target="_blank">
       <Img
        src={`${baseUrl}/logo.png`} // ou `/logo.png` se estiver na pasta public/
        width="120"
        height="auto"
        alt="Minha Logo"
        style={logo}
       />
      </Link>
     </Section>

     <Section style={titleSection}>
      <Text style={heading}>Nova mensagem de contato</Text>
     </Section>

     <Section>
      <Text style={label}><strong>Nome:</strong> {nome}</Text>
      <Text style={label}><strong>Email:</strong> {email}</Text>
      <Text style={label}><strong>Assunto:</strong> {assunto}</Text>
     </Section>

     <Hr style={hr} />

     <Section>
      <Text style={label}><strong>Mensagem:</strong></Text>
      <Text style={messageBox}>{mensagem}</Text>
     </Section>

     <Hr style={hr} />

     <Section style={footerSection}>
      <Text style={footerText}>
       Obrigado por entrar em contato! Responderemos em breve.
      </Text>
      <Button style={button} href={`mailto:${email}`} target="_blank">
       Enviar resposta
      </Button>
     </Section>
    </Container>
   </Body>
  </Html>
 );
}

// Defina suas cores baseadas no Global.css
const colors = {
 primary: 'hsl(240, 5.9%, 10%)',           // --primary
 secondary: 'hsl(240, 4.8%, 95.9%)',       // --secondary  
 background: 'hsl(0, 0%, 100%)',           // --background
 text: 'hsl(240, 10%, 3.9%)',             // --foreground
 border: 'hsl(240, 5.9%, 90%)',           // --border
 muted: 'hsl(240, 4.8%, 95.9%)',          // --muted
 mutedForeground: 'hsl(240, 5%, 64.9%)',  // --muted-foreground
};

const main = {
 backgroundColor: colors.background,
 fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
 margin: '0 auto',
 padding: '20px',
 maxWidth: '600px',
 backgroundColor: colors.background,
 borderRadius: '8px',
};

const headerSection = {
 paddingBottom: '16px',
 textAlign: 'left' as const,
};

const logo = {
 display: 'block',
};

const titleSection = {
 marginBottom: '16px',
 textAlign: 'center' as const,
};

const heading = {
 fontSize: '24px',
 fontWeight: 'bold' as const,
 color: colors.text,
};

const label = {
 fontSize: '16px',
 color: colors.text,
 marginBottom: '8px',
};

const messageBox = {
 backgroundColor: colors.muted,
 padding: '16px',
 borderRadius: '4px',
 fontSize: '16px',
 color: colors.text,
};

const hr = {
 borderColor: colors.border,
 margin: '24px 0',
};

const footerSection = {
 textAlign: 'center' as const,
 paddingTop: '16px',
};

const footerText = {
 fontSize: '14px',
 color: colors.mutedForeground,
 marginBottom: '16px',
};

const button = {
 backgroundColor: colors.primary,
 color: 'hsl(0, 0%, 98%)', // --primary-foreground
 padding: '12px 24px',
 borderRadius: '4px',
 fontSize: '16px',
 textDecoration: 'none',
};