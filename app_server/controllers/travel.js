var fs = require('fs');

var trips = JSON.parse(fs.readFileSync('./data/trips.json','utf8'));

/* GET travel view */
const travel = (req, res) => {
    console.log('Inside app_server, controllers, travel.js, travel function.');
    res.render('travel', { title: 'Travlr Getaways' });
    };
    
module.exports = {
    travel
};