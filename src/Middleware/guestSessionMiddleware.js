import generateTemporaryGuestId from '../Controllers/wishlistController.js'; 

function guestSessionMiddleware(req, res, next) {
  if (!req.session.guestId) {
    req.session.guestId = generateTemporaryGuestId();
  }
  
  if (!req.session.guestSessionId) {
    req.session.guestSessionId = req.sessionID;
  }
  
  next();
}

export default guestSessionMiddleware;