import { z } from "zod";

const OrderCreateSchema = z.object({
  body: z.object({
    email: z
      .string()
      .email({ message: "Invalid email address" })
      .trim()
      .refine((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), { message: "Invalid email format" }),
    productId: z.string(),
    price: z.number().nonnegative({ message: "Price must be a positive number" }),
    quantity: z.number().int().nonnegative({ message: "Quantity can not be less than 0" }),
  }),
});

export const ordersValidation = {
  OrderCreateSchema,
};
