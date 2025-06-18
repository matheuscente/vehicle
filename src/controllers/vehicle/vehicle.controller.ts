import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../../errors/valiation.error";
import { NotFoundError } from "../../errors/not-found.error";

interface iUser {
  nome: string;
  email: string;
}

interface iUserBD extends iUser {
  id: number;
}

let id: number = 0;
const users: iUserBD[] = [];

export class ControllerVehicle {
  static getAll(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

  static getById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId: number = Number(req.params.id);
      const user: iUserBD | undefined = users.find(
        (user) => user.id === userId
      );
      if (!user) {
        throw new NotFoundError('not found user in this id')
      }
      res.status(200).json({ user });
    } catch (err) {
      next(err);
      
    }
  }

  static create(req: Request, res: Response, next: NextFunction) {
    try {
      const newUser: iUserBD = {
        id: ++id,
        nome: req.body.nome,
        email: req.body.email,
      };

      if (!newUser.nome || newUser.nome.length === 0) {
        throw new ValidationError('invalid name')
        } else if(!newUser.email ||newUser.email.length === 0) {
          throw new ValidationError('invalid email')
        }
         

      users.push(newUser);
      res.status(201).json({ message: "usuario criado com sucesso" });
    } catch (err) {
      next(err);
    }
  }

  static update(req: Request, res: Response, next: NextFunction) {
    try {
      const userId: number = Number(req.params.id);

      const indexItem = users.findIndex((user) => user.id === userId);

      if (indexItem !== -1) {
        users[indexItem].email = req.body.email ?? users[indexItem].email;
        users[indexItem].nome = req.body.nome ?? users[indexItem].nome;

        res.status(201).json({ message: "usuario modificado com sucesso" });
        return;
      }
      res.status(201).json({ message: "usuario não encontrado" });
    } catch (err) {
      next(err);
    }
  }

  static delete(req: Request, res: Response, next: NextFunction) {
    try {
      const userId: number = Number(req.params.id);
      const indexItem = users.findIndex((user) => user.id === userId);

      if (indexItem !== -1) {
        users.splice(indexItem, 1);
        res.status(200).json({ message: "usuario deletado" });
        return;
      }
      res.status(400).json({ message: "usuario nao encontrado" });
    } catch (err) {
      next(err);
    }
  }
}
