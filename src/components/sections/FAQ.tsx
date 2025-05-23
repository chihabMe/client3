import React from "react";
import * as motion from "motion/react-m";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import faqData from "@/data/faq.json";

const FAQ = () => {

  return (
    <section id="faq" className="py-20 ">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-800 max-w-2xl mx-auto">
            Trouvez des réponses aux questions les plus fréquentes concernant notre service, nos forfaits d’abonnement et nos fonctionnalités.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqData.questions.map((faq, index) => (
              <motion.div
                key={faq.id}
                custom={index}
                transition={{ delay: index * 0.1 }}
              >
                <AccordionItem
                  value={faq.id}
                  className="border border-gray-800 rounded-xl overflow-hidden bg-white/5"
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-white/5 transition-colors md:text-lg font-medium text-black data-[state=open]:text-[#0055A4]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-sm md:text-base text-gray-800">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
