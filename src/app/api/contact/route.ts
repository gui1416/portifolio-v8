import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
 try {

  const { nome, email, assunto, mensagem } = await request.json();

  if (!nome || !email || !assunto || !mensagem) {
   return NextResponse.json({ error: 'Todos os campos são obrigatórios.' }, { status: 400 });
  }

  const { data, error } = await resend.emails.send({
   from: 'onboarding@resend.dev',
   to: 'projectsgithub07@gmail.com',
   subject: `Portfólio contact: ${assunto}`,
   html: `
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Assunto:</strong> ${assunto}</p>
        <p><strong>Mensagem:</strong><br/>${mensagem}</p>
      `,
  });

  if (error) {
   console.error('Erro ao enviar e-mail pela Resend:', error);
   return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log('E-mail enviado com sucesso:', data);
  return NextResponse.json({ message: 'Mensagem enviada com sucesso!' }, { status: 200 });

 } catch (err) {
  console.error('Erro geral no endpoint de contato:', err);
  return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 });
 }
}