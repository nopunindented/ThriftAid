const { Router } = require('express');
const PostingController = require('../controllers/postingController');
const router = Router();

router.post('/create', PostingController.CreatePosting);
router.get('/allpostings', PostingController.GetPostings);
router.put('/single/:id', PostingController.OnePosting);
router.delete('/delete',PostingController.DeletePost);

module.exports = router;
