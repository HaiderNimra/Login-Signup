
function admin(req, res, next){
    if(req.user.role!='admin') return res.status(403).send('Only Admin can Delete!');
    
 next();
}

module.exports= admin;