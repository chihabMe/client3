
import { Search, Filter } from "lucide-react"
import { entertainmentChannels, sportsChannels, newsChannels } from "@/data/contents"
import ContentCard from "@/components/ui/card-content"

export default function ChannelsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="container mx-auto pt-40 py-12 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">All Channels</h1>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8">
          Browse our extensive collection of premium channels from around the world, all available in one subscription.
        </p>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search channels..."
              className="w-full bg-gray-900 border border-gray-800 rounded-md py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-[#00ff2a] focus:border-transparent"
            />
          </div>
          <button className="flex items-center justify-center gap-2 bg-gray-900 border border-gray-800 rounded-md py-2 px-4 text-white hover:bg-gray-800 transition-colors">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold mb-6">Entertainment Channels</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {entertainmentChannels.map((channel) => (
            <ContentCard key={channel.id} content={channel} />
          ))}
        </div>
      </section>

      <section className="container mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold mb-6">Sports Channels</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {sportsChannels.map((channel) => (
            <ContentCard key={channel.id} content={channel} />
          ))}
        </div>
      </section>

      <section className="container mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold mb-6">News Channels</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {newsChannels.map((channel) => (
            <ContentCard key={channel.id} content={channel} />
          ))}
        </div>
      </section>

    </div>
  )
}
