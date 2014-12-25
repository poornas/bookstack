module.exports = function(req,res,ok) {
  if (req.session.authenticated) {
    return ok();
  }
  else {
    var requiredLoginErr = [{ name: "requireLogin", message: "You must be signed in."}];
    req.session.flash = {
      err: requiredLoginErr
    }
    res.redirect('/session/new');
    return;
  }
};
