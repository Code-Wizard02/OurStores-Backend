import {Router} from 'express';
import { UserController } from '../controllers/user.controller';
import { MongoUserRepository } from '../../persistence/mongo-user.repository';
import { GetUserByIdUseCase } from '../../../use-cases/User/get-user-by-id.use-case';


const router = Router();

router.get('/:id', UserController.getUserById);
router.patch('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export default router;
