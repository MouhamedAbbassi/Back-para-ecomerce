import generateTemporaryGuestId from '../Services/wishlistService.js'; 

function guestSessionMiddleware(req, res, next) {
  if (!req.session.guestId) {
    req.session.guestId = generateTemporaryGuestId();
    console.log('Initialized guestId:', req.session.guestId);
  }
  
  if (!req.session.guestSessionId) {
    req.session.guestSessionId = req.sessionID;
  }
  
  next();
}

export default guestSessionMiddleware;