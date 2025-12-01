const adminDashboardModel = require('../models/adminDashboardModel');

module.exports = {
    getDeskUtilisationByDate(req, res){
        try{
            const date_str = req.params.date;
            const result = adminDashboardModel.getDeskUtilisationByDate(date_str);
            res.json(result);
        }catch{
            console.error("Error fetching desk utilisation metrics", error);
            res.status(500).json({ error: 'Failed to fetch desk utilisation data!' });
        }
    },

    getMemberUtilisationData(req, res){
        try{
            const result = adminDashboardModel.getMemberUtilisationData();
            res.json(result);
        }catch{
            console.error("Error fetching member utilisation metrics", error);
            res.status(500).json({ error: 'Failed to fetch member utilisation data!' });
        }
    }
};

