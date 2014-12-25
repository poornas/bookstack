module.exports = function(req, res, ok) {
  var sessionUserMatchesId = req.session.User.id == req.param('id');
  var isAdmin = req.session.User.admin;
  console.log(req.session.User.id + " ;;;" + req.param('id'));

  if (!(sessionUserMatchesId || isAdmin)) {
    var noRightsError  = [{name: 'noRights', message: 'You must be an admin'}];
    req.session.flash = {
      err: noRightsError
    }
    res.redirect('/session/new');
    return;
  }
  console.log('here,,,,about to call redirect callback');
  return ok();
};
