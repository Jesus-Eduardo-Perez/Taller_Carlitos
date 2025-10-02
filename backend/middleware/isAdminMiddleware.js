const isAdminMiddleware = (req, res, next) => {
    if (req.user && req.user.user_type === 1) {
      return next();
    } else {
      return res.status(403).json({ error: 'Acceso denegado. Solo los administradores pueden acceder.' });
    }
  };
  
  module.exports = isAdminMiddleware;
  