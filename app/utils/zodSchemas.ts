import { z } from "zod";

export const OnBoardingSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  address: z.string().min(2, "Address is required"),
});

export const InvoiceSchema = z.object({
  invoiceName: z.string().min(1, "Invoice name is required"),
  total: z.number().min(1, "Enter a valid number"),
  status: z.enum(["PAID", "PENDING"]).default("PENDING"),
  date: z.string().min(1, "Date is required"),
  dueDate: z.number().min(0, "Due Date is required"),
  fromName: z.string().min(1, "Your name is required"),
  fromEmail: z.string().email("Enter a valid email"),
  fromAddress: z.string().min(1, "your address is required"),
  clientName: z.string().min(1, "Client name is required"),
  clientEmail: z.string().email("Enter a valid email"),
  clientAddress: z.string().min(1, "Client address is required"),
  currency: z.string().min(1, "Currency is required"),
  invoiceNumber: z.number().min(1, "Minimum invoice number is 1"),
  notes: z.string().optional(),
  invoiceItemDescription: z.string().min(1, "Description is required"),
  invoiceItemQuantity: z.number().min(1, "Quantity minimum is 1"),
  invoiceItemRate: z.number().min(1, "Rate min is 1"),
});
