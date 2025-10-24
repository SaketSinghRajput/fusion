import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : undefined;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const TO_EMAIL = process.env.FROM_EMAIL || "thefusionwebsolution@gmail.com";

let transporter: nodemailer.Transporter | undefined;
if (SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465, // true for 465, false for other ports
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);

      console.log("New contact submission received:", {
        id: submission.id,
        name: submission.name,
        email: submission.email,
        service: submission.service,
      });

      // Compose email body
      const subject = `New contact form submission from ${submission.name}`;
      const html = `
        <h2>New Contact Submission</h2>
        <p><strong>Name:</strong> ${submission.name}</p>
        <p><strong>Email:</strong> ${submission.email}</p>
        <p><strong>Phone:</strong> ${submission.phone || "(not provided)"}</p>
        <p><strong>Service:</strong> ${submission.service || "(not provided)"}</p>
        <p><strong>Message:</strong></p>
        <p>${submission.message || "(no message)"}</p>
        <hr />
        <p>ID: ${submission.id}</p>
        <p>Received: ${submission.createdAt.toISOString()}</p>
      `;

      // If transporter is configured, attempt to send email. Otherwise log the content to console.
      if (transporter) {
        try {
          await transporter.sendMail({
            from: SMTP_USER,
            to: TO_EMAIL,
            subject,
            html,
            replyTo: submission.email,
          });
          console.log("Contact submission emailed to", TO_EMAIL);
        } catch (mailErr) {
          console.error("Failed to send contact email:", mailErr);
        }
      } else {
        console.log("SMTP not configured — email contents:\n", { subject, html });
      }

      res.json({ 
        success: true, 
        message: "Contact form submitted successfully",
        id: submission.id 
      });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(400).json({ 
        success: false, 
        error: error instanceof Error ? error.message : "Invalid form data" 
      });
    }
  });

  app.get("/api/contact/submissions", async (_req, res) => {
    try {
      const submissions = await storage.getAllContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      res.status(500).json({ error: "Failed to fetch submissions" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
