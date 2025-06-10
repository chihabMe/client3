"use server"

import { z } from "zod"
import { revalidatePath } from "next/cache"
import { publicActionsClient } from "@/lib/safe-actions"
import { prisma } from "@/lib/db"
import { getClientCountry } from "@/lib/ip-tools"


// You'll need to import your Prisma client here
// import { prisma } from '@/lib/prisma'

const contactFormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  phoneNumber: z.string().optional(),
  message: z.string().min(10, {
    message: "Le message doit contenir au moins 10 caractères.",
  }),
})

export const submitContactAction = publicActionsClient.schema(contactFormSchema).action(async ({ parsedInput }) => {

  try {


    const country = await getClientCountry()
    await prisma.contact.create({
      data: {
        fullName: parsedInput.fullName,
        email: parsedInput.email,
        country: country ?? "None",
        phoneNumber: parsedInput.phoneNumber,
        message: parsedInput.message,

      },
    })

    // For now, just log the data
    console.log("Contact form submitted")

    // Revalidate any relevant paths if needed
    revalidatePath("/")
    revalidatePath("/admin")
    revalidatePath("/admin/contacts")

    return { success: true, message: "Message envoyé avec succès!" }
  } catch (error) {
    console.error("Error submitting contact form:", error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Données invalides",
        errors: error.errors,
      }
    }

    return {
      success: false,
      message: "Une erreur est survenue. Veuillez réessayer.",
    }
  }

})
