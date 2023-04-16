function checkRole(role) {
    return (req, res, next) => {
        if (req.session.userRole === role) {
            // The user is authorized, so call the next middleware function
            next();
        } else {
            // The user is not authorized, so redirect them to an error page
            // Set a flash message
            req.flash('error', 'You are not authorized to view this page');

            // Render the unauthorized template and pass the flash messages to it
            res.render('unauthorized', { docTitle: 'Unauthorized', userRole: req.session.userRole});
        }
    }
}
module.exports = checkRole;