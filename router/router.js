// routes/auth.js
const express = require('express');
const { verifyOtp } = require('../controller/otpController');
const upload = require("../middleware/imageUpload");
const updateCandidateData =  require('../controller/UpdateUserDetails');
const ImageMiddleware   =  require('../middleware/imageUpload');
const { registerOrLogin } = require('../controller/LoginAndRegister');
const {AdminregisterOrLogin} =  require('../controller/AdminLogin')
const { update } = require('../controller/AdminChangePassword');
const { createOrUpdateTerms, getTermsAndConditions } = require('../controller/TermsAndCondition');
const {createOrUpdatePolicy,getPrivacyPolicy} =  require('../controller/PrivacyPolicy');
const {authenticateToken , authenticateAdmin} = require('../middleware/auth');
const {user, getUserAdmin} =  require('../controller/AdminUserData');
const router = express.Router();
router.post('/register', registerOrLogin );
router.patch('/update', authenticateToken , ImageMiddleware , updateCandidateData);
router.post('/AdminRegister', AdminregisterOrLogin);
router.post('/updatePassword/:id', authenticateToken, authenticateAdmin, update); 
router.post('/terms', authenticateAdmin , createOrUpdateTerms);
router.get('/terms', authenticateToken , getTermsAndConditions);
router.post('/privacyPolicy', authenticateAdmin , createOrUpdatePolicy );
router.get('/privacyPolicy', authenticateToken , getPrivacyPolicy);
router.post('/user', authenticateAdmin , user);
router.get('/user', authenticateToken , getUserAdmin);


module.exports = router;