import epxress from 'express';


import { addFood,listFood, removeFood} from '../controllers/food.controller.js';
const router = epxress.Router();
import { upload } from '../middlewares/multer.middleware.js';


router.post('/add',upload.single("foodImage"), addFood);
router.get('/list',listFood)
router.post('/remove/:id',removeFood) 
export default router;