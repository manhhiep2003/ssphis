/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { RoleService } from "../services/role.service";
import { ROLES_MESSAGES } from "../constants/messages";
import HTTP_STATUS from "../constants/httpStatus";

export class RoleController {
  static async getAllRoles(req: Request, res: Response) {
    try {
      const roles = await RoleService.getAllRoles();
      res.status(HTTP_STATUS.OK).json({
        message: ROLES_MESSAGES.RETRIEVE_SUCCESS,
        data: roles,
      });
    } catch (error: any) {
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({
          message: ROLES_MESSAGES.RETRIEVE_FAILURE,
          error: error.message,
        });
    }
  }

  static async getRoleById(req: Request, res: Response) {
    try {
      const role = await RoleService.getRoleById(Number(req.params.id));
      if (role) {
        res.status(HTTP_STATUS.OK).json({
          message: ROLES_MESSAGES.RETRIEVE_SINGLE_SUCCESS,
          data: role,
        });
      } else {
        res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ message: ROLES_MESSAGES.NOT_FOUND });
      }
    } catch (error: any) {
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({
          message: ROLES_MESSAGES.RETRIEVE_SINGLE_FAILURE,
          error: error.message,
        });
    }
  }

  static async createRole(req: Request, res: Response) {
    try {
      const role = await RoleService.createRole(req.body);
      res.status(HTTP_STATUS.CREATED).json({
        message: ROLES_MESSAGES.CREATE_SUCCESS,
        data: role,
      });
    } catch (error: any) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: ROLES_MESSAGES.CREATE_FAILURE, error: error.message });
    }
  }

  static async updateRole(req: Request, res: Response) {
    try {
      const role = await RoleService.updateRole(
        Number(req.params.id),
        req.body
      );
      res.status(HTTP_STATUS.OK).json({
        message: ROLES_MESSAGES.UPDATE_SUCCESS,
        data: role,
      });
    } catch (error: any) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: ROLES_MESSAGES.UPDATE_FAILURE, error: error.message });
    }
  }

  static async deleteRole(req: Request, res: Response) {
    try {
      await RoleService.deleteRole(Number(req.params.id));
      res
        .status(HTTP_STATUS.NO_CONTENT)
        .json({ message: ROLES_MESSAGES.DELETE_SUCCESS });
    } catch (error: any) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: ROLES_MESSAGES.DELETE_FAILURE, error: error.message });
    }
  }
}
