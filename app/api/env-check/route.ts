export const runtime = "nodejs";

export async function GET() {
  return Response.json({
    hasResendKey: Boolean(process.env.RESEND_API_KEY),
    hasTo: Boolean(process.env.CONTACT_TO_EMAIL),
    hasFrom: Boolean(process.env.CONTACT_FROM_EMAIL),
  });
}