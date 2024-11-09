import { Resend } from 'resend';

// Initialize Resend with your API key
const resend = new Resend(import.meta.env.RESEND_API_KEY);

export async function POST({ request }) {
  try {
    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const service = formData.get('service');
    const message = formData.get('message');

    // Validate required fields
    if (!name || !email || !service || !message) {
      return new Response(
        JSON.stringify({ message: 'All fields are required' }), 
        { status: 400 }
      );
    }

    // Send email using Resend
    await resend.emails.send({
      from: 'Contact Form <contact@yourdomain.com>', // Update this with your verified domain
      to: 'hello@nasifsalaam.com', // Your email address
      replyTo: 'salaam.nasif@gmail.com',
      subject: `New Contact Form Submission: ${service}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return new Response(
      JSON.stringify({ message: 'Email sent successfully' }), 
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({ message: 'Error sending email' }), 
      { status: 500 }
    );
  }
}