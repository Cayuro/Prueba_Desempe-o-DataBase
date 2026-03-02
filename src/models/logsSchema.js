import mongoose from "mongoose";

const logsSchema = new mongoose.Schema(
  {
    table: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    operation: {
      type: String,
      enum: ["INSERT", "UPDATE", "DELETE"],
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    query: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    versionKey: false,
    collection: "transaction_logs",
  }
);

export const logsSchemaModel = mongoose.model("TransactionLog", logsSchema);