import { NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';
import { Resend } from 'resend';
import { ContactEmail } from '@/components/email-template/contact-email';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || request.ip || 'unknown';

  const { success } = await rateLimit.limit(ip);
  if (!success) {
    return NextResponse.json(
      { error: 'Você está enviando mensagens muito rápido. Tente novamente mais tarde.' },
      { status: 429 }
    );
  }

  const { nome, email, assunto, mensagem } = await request.json();
  if (!nome || !email || !assunto || !mensagem) {
    return NextResponse.json({ error: 'Todos os campos são obrigatórios.' }, { status: 400 });
  }

  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'projectsgithub07@gmail.com',
    subject: `Portfólio contact: ${assunto}`,
    react: ContactEmail({ nome, email, assunto, mensagem }),
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Mensagem enviada com sucesso!' }, { status: 200 });
}
