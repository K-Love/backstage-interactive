// pages/api/stripe/create-checkout-session.ts
export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions);
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    
    const session = await stripe.checkout.sessions.create({
      customer: session.user.stripeCustomerId,
      payment_method_types: ['card'],
      line_items: [{
        price: req.body.priceId,
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.NEXTAUTH_URL}/members/onboarding?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/tools`,
    });
  
    res.status(200).json({ id: session.id });
  }