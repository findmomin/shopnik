import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { stripe } from '../../../lib/stripe/stripe';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // If it's not a post request
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    // Create Checkout Sessions from body params
    const params: Stripe.Checkout.SessionCreateParams = {
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: req.body.lineItems,
      success_url: `${req.headers.origin}/?clear=${req.body.clear}`,
      cancel_url: `${req.headers.origin}${req.body.cancelUrl}`,
    };
    req.body.email ? (params.customer_email = req.body.email) : null;

    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create(params);

    res.status(200).json(checkoutSession);
  } catch (err) {
    // Handling error
    res.status(500).json({
      statusCode: (err as any).statusCode || 500,
      message: (err as any).message,
    });
  }
};

export default handler;
