module.exports = function(req,res, ok) {
  if ( req.session.User && req.session.User.admin) {
    return ok();
  } else {
    var requireAdminAccessError = [{name:'requireAdminRights', message : "You must be an admin."}];
    req.session.flash =
    {
      err: requireAdminAccessError
    }
    res.redirect('/session/new');
    return;
  }
  
};
