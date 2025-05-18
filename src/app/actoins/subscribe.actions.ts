"use server";
import { resend } from "@/lib/email";
import { z } from "zod";
import { publicActionsClient } from "@/lib/safe-actions";

const subscribeSchema = z.object({
  fullName: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Veuillez entrer un numéro de téléphone valide.",
  }),
});

export const subscribeActions = publicActionsClient
  .schema(subscribeSchema)
  .action(async ({ parsedInput }) => {
    await resend.emails.send({
      to: parsedInput.email,
      from: process.env.EMAIL_FROM ?? "",
      subject: "Confirmation d'abonnement",
      html: `<p>Bonjour ${parsedInput.fullName},</p>
               <p>Merci pour votre abonnement à notre service IPTV !</p>
               <p>Nous vous contacterons bientôt avec plus d'informations.</p>
               <p>Cordialement,</p>
               <p>L'équipe IPTV</p>`,
    });

    return {
      status: "success",
      message: `Merci ${parsedInput.fullName}, vous êtes maintenant abonné à notre service IPTV !`,
    };
  });
