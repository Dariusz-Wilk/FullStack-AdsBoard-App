const express = require('express');
const router = express.Router();

const ads = require('../controllers/ads.controller');

router.get('/ads', ads.getAllAds);
router.get('/ads/:id', ads.getAdById);
router.post('/ads', ads.addNewAd);
router.put('/ads/:id', ads.editAdById);
router.delete('/ads/:id', ads.deleteAd);
router.get('/ads/search/:searchPhrase', ads.searchAd);

module.exports = router;
