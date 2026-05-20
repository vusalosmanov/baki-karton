export default ({ env }: { env: any }) => ({
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
          user: env('GMAIL_USER'), // .env faylında qeyd edəcəyik
          pass: env('GMAIL_PASS'), // .env faylında qeyd edəcəyik
        },
      },
      settings: {
        defaultFrom: 'no-reply@bakikarton.az',
        defaultReplyTo: 'info@bakikarton.az',
      },
    },
  },
});