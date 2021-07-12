import { Router } from 'express';
import UserRouter from './User/UserRouter';

class MainRouter {
  private _router = Router();
  private _userRouter = UserRouter

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  /**
   * Connect routes to their matching routers.
   */
  private _configure() {
    this._router.use('/user', this._userRouter);
  }
}

export = new MainRouter().router;