// middleware/membership.ts
export const requireMembership = async (req, res, next) => {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session) {
      return res.redirect('/auth/signin?callbackUrl=' + encodeURIComponent(req.url));
    }
    
    if (!session.user.hasActiveSubscription && req.nextUrl.pathname.startsWith('/members')) {
      return res.redirect('/tools?error=membership_required');
    }
    
    next();
  };