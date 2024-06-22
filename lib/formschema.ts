import { z } from "zod";

// Form Schema
export const formSchema = z.object({
  resumename: z.string().min(2).max(50).nonempty("Resume name is required"),
  domain: z.string().nonempty("Domain is required"),
  experience: z.string().nonempty("Experience is required"),
});

export const contactSchema = z.object({
  fullname: z.string().optional(),
  email: z.string().email().optional(),
  phoneno: z.string().optional(),
  linkedin: z.string().optional(),
  portfolio: z.string().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  cite: z.string().optional(),
  resumeId: z.string().optional(),
});

export const experienceSchema = z.object({
  role: z.string(),
  companyName: z.string(),
  workingDays: z.number(),
  compunyLocation: z.string(),
  descripation: z.string(),
});
