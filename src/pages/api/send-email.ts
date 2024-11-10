import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    
    // Your email sending logic here
    
    return new Response(JSON.stringify({
      message: 'Email sent successfully'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      message: 'Failed to send email'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};

// Optional: Handle GET requests with an error
export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({
    message: 'This endpoint only accepts POST requests'
  }), {
    status: 405, // Method Not Allowed
    headers: {
      'Content-Type': 'application/json'
    }
  });
};