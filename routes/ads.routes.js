const express = require('express');
const router = express.Router();
const imageUpload = require('../utils/imageUpload');
const authMiddleware = require('../utils/authMiddleware');

const ads = require('../controllers/ads.controller');

router.get('/ads', ads.getAllAds);
router.get('/ads/:id', ads.getAdById);
router.post('/ads', authMiddleware, imageUpload.single('image'), ads.addNewAd);
router.put('/ads/:id', imageUpload.single('image'), ads.editAdById);
router.delete('/ads/:id', ads.deleteAd);
router.get('/ads/search/:searchPhrase', ads.searchAd);

module.exports = router;
