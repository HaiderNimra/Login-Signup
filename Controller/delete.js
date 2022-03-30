var _ = require('lodash');
require('dotenv').config(); 


let del = async(req, res) => {
    try{
        await res.user.remove();
        res.json({message: 'Person Deleted'});
    } catch (err){
        res.status(500).json({message: err.message});
    }
    
}

module.exports = { del }