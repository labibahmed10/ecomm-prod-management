import { z } from "zod";

const ProductVariantSchema = z.object({
  type: z.string().min(1, "Variant type is required").max(30, "Variant type cannot be more than 30 characters").trim(),
  value: z.string().min(1, "Variant value is required").max(30, "Variant value cannot be more than 30 characters").trim(),
});

const ProductInventorySchema = z.object({
  quantity: z.number().int().min(0, "Quantity cannot be negative").positive("Inventory quantity is required"),
  inStock: z.boolean(),
});

const ProductSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Product name is required").max(50, "Product name cannot be more than 50 characters").trim(),
    description: z.string().min(1, "Product description is required").max(600, "Product description cannot be more than 600 characters").trim(),
    price: z.number().min(0, "Price cannot be negative").positive("Product price is required"),
    category: z.string().min(1, "Product category is required").max(50, "Category cannot be more than 50 characters").trim(),
    tags: z
      .string()
      .min(1, "Tags cannot be empty")
      .max(20, "Tag cannot be more than 20 characters")
      .trim()
      .array()
      .nonempty("At least one tag is required"),
    variants: z.array(ProductVariantSchema),
    inventory: ProductInventorySchema,
  }),
});
