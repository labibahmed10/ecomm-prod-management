import { model, Schema } from "mongoose";
import { IProduct, IProductInventory, IProductVariant } from "./product.interface";

const ProductVariantSchema: Schema = new Schema<IProductVariant>(
  {
    type: {
      type: String,
      required: [true, "Variant type is required"],
      trim: true,
      maxlength: [30, "Variant type cannot be more than 50 characters"],
    },
    value: {
      type: String,
      required: [true, "Variant value is required"],
      trim: true,
      maxlength: [30, "Variant value cannot be more than 50 characters"],
    },
  },
  { _id: false, versionKey: false }
);

const ProductInventorySchema: Schema = new Schema<IProductInventory>(
  {
    quantity: {
      type: Number,
      required: [true, "Inventory quantity is required"],
      min: [0, "Quantity cannot be negative"],
    },
    inStock: {
      type: Boolean,
      required: [true, "In stock status is required"],
      default: function (this: IProductInventory) {
        return this.quantity > 0;
      },
    },
  },
  { _id: false, versionKey: false }
);

const ProductSchema: Schema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [100, "Product name cannot be more than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
      maxlength: [600, "Product description cannot be more than 1000 characters"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      trim: true,
      maxlength: [50, "Category cannot be more than 50 characters"],
    },
    tags: {
      type: [String],
      required: [true, "At least one tag is required"],
    },
    variants: [ProductVariantSchema],
    inventory: {
      type: ProductInventorySchema,
      required: [true, "Inventory information is required"],
    },
  },
  { timestamps: false, versionKey: false }
);

export const ProductModel = model<IProduct>("Product", ProductSchema);
