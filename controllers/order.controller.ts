import { Request, Response } from "express";
import { prisma } from "../app";

const CreateOrder = async (req: Request, res: Response) => {
  try {
    const { userId, eventId, status, totalAmount } = req.body;
    const printed = false;
    

    if (!userId || !eventId || !status || !totalAmount) {
      return res.status(400).json({
        status: "fail",
        message: "Missing required fields",
      });
    }
    const order = await prisma.order.create({
      data: {
        userId,
        eventId,
        status,
        totalAmount,
        printed
      },
    });

    res.status(201).json({
      status: "success",
      order,
    });
  } catch (error: any) {
    console.log(error.message)
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const getOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;

    const order = await prisma.order.findUnique({ where: { id: orderId }  });

    if (!order) {
      return res.status(404).json({
        status: "fail",
        message: "No existe una orden con ese id.",
      });
    }

    res.status(200).json({
      status: "success",
      order: {
        userId: order.userId,
        eventId: order.eventId,
        status: order.status,
        totalAmount: order.totalAmount,
      },
    });
  } catch (error : any) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const UpdateOrder = async (req: Request, res: Response) => {
  try {
    const { userId, status, totalAmount, eventId } = req.body;
    const { orderId } = req.params;

    console.log(req.body)
    if (!orderId || !status || !totalAmount) {
      return res.status(400).json({
        status: "fail",
        message: "Missing required fields",
      });
    }

    // Realizar operación en la base de datos
    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        userId,
        eventId,
        status,
        totalAmount,
      },
    });

    res.status(200).json({
      status: "success",
      order,
    });
  } catch (error : any ) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const DeleteOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;

    // Validaciones adicionales
    if (!orderId) {
      return res.status(400).json({
        status: "fail",
        message: "Missing required fields",
      });
    }

    // Realizar operación en la base de datos
    await prisma.order.delete({
      where: { id: orderId },
    });

    res.status(200).json({
      status: "success",
      message: "Order deleted successfully",
    });
  } catch (error : any) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export default {
  CreateOrder,
  getOrder,
  UpdateOrder,
  DeleteOrder
};
