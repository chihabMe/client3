import Link from "next/link"
import { ChevronRight } from "lucide-react"
import type { Content } from "@/types"
import ContentCard from "@/components/ui/card-content"

interface FeaturedContentProps {
  title: string
  description?: string
  contents: Content[]
  viewAllLink: string
}

export default function FeaturedContent({ title, description, contents, viewAllLink }: FeaturedContentProps) {
  return (
    <section className="container mx-auto py-16 px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Link href={viewAllLink} className="text-[#00ff2a] flex items-center gap-1 text-sm hover:underline">
          Voir tout <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
      {description && <p className="text-gray-400 max-w-2xl mb-12">{description}</p>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {contents.map((content) => (
          <ContentCard key={content.id} content={content} />
        ))}
      </div>
    </section>
  )
}
