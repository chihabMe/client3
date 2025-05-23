"use client" // Keep if using Next.js app router and client-side logic is needed

import { useState, useEffect } from "react"
import { Search, Globe, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import channelsData from "@/data/channels.json"

type ChannelType = "sports" | "movies" | "news" | "entertainment" | "documentaries" | "kids"

export default function ChannelsPage() {
  const [selectedCountry, setSelectedCountry] = useState<string>("All")
  const [selectedType, setSelectedType] = useState<ChannelType | "all">("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const getFilteredChannels = () => {
    let filteredCountries = channelsData.countries
    if (selectedCountry !== "All") {
      filteredCountries = filteredCountries.filter((c) => c.name === selectedCountry)
    }
    const allChannels = filteredCountries.flatMap((country) =>
      Object.entries(country.channelTypes).flatMap(([type, channels]) =>
        channels.map((channel) => ({
          country: country.name,
          type: type as ChannelType,
          name: channel,
        }))
      )
    )

    let filteredChannels = allChannels
    if (selectedType !== "all") {
      filteredChannels = filteredChannels.filter((channel) => channel.type === selectedType)
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filteredChannels = filteredChannels.filter(
        (channel) =>
          channel.name.toLowerCase().includes(query) ||
          channel.country.toLowerCase().includes(query) ||
          channel.type.toLowerCase().includes(query),
      )
    }
    return filteredChannels
  }

  const getChannelsByCountry = () => {
    const grouped: Record<string, Array<{ type: ChannelType; name: string }>> = {}
    getFilteredChannels().forEach((channel) => {
      if (!grouped[channel.country]) grouped[channel.country] = []
      grouped[channel.country].push({ type: channel.type, name: channel.name })
    })
    return grouped
  }

  const getChannelsByType = () => {
    const grouped: Record<ChannelType, Array<{ country: string; name: string }>> = {
      sports: [],
      movies: [],
      news: [],
      entertainment: [],
      documentaries: [],
      kids: [],
    }
    getFilteredChannels().forEach((channel) => {
      grouped[channel.type].push({ country: channel.country, name: channel.name })
    })
    return grouped
  }

  const getCountries = () => ["All", ...channelsData.countries.map((c) => c.name)]

  const channelTypes: Array<{ value: ChannelType | "all"; label: string }> = [
    { value: "all", label: "All Types" },
    { value: "sports", label: "Sports" },
    { value: "movies", label: "Movies" },
    { value: "news", label: "News" },
    { value: "entertainment", label: "Entertainment" },
    { value: "documentaries", label: "Documentaries" },
    { value: "kids", label: "Kids" },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4">Loading channels...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <section className="container mx-auto pt-40 py-12 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">All Channels</h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Browse our extensive collection of premium channels from around the world, all available in one subscription.
        </p>

        <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search channels..."
              className="w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-4 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-white border-gray-300 text-black hover:bg-gray-100 flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>{selectedCountry}</span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border border-gray-300 text-black">
              <DropdownMenuRadioGroup value={selectedCountry} onValueChange={setSelectedCountry}>
                {getCountries().map((country) => (
                  <DropdownMenuRadioItem key={country} value={country} className="cursor-pointer hover:bg-gray-100">
                    {country}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>

      <section className="container mx-auto px-4 mb-8">
        <Tabs
          defaultValue="all"
          value={selectedType}
          onValueChange={(value) => setSelectedType(value as ChannelType | "all")}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-7 bg-gray-200 p-1 rounded-lg mb-8">
            {channelTypes.map((type) => (
              <TabsTrigger
                key={type.value}
                value={type.value}
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                {type.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {channelTypes.map((type) => (
            <TabsContent key={type.value} value={type.value} className="mt-0">
              {type.value === "all" ? (
                Object.entries(getChannelsByCountry()).map(([country, channels]) => (
                  <div key={country} className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 flex items-center">
                      <Globe className="mr-2 h-5 w-5" /> {country}
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                      {channels.map((channel, index) => (
                        <div
                          key={`${country}-${channel.name}-${index}`}
                          className="bg-gray-100 rounded-lg p-4 hover:bg-gray-200 transition-colors cursor-pointer"
                        >
                          <h3 className="font-semibold text-black">{channel.name}</h3>
                          <p className="text-xs text-gray-500 capitalize">{channel.type}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div>
                  <h2 className="text-2xl font-bold mb-6 capitalize">{type.label}</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {getChannelsByType()[type.value as ChannelType].map((channel, index) => (
                      <div
                        key={`${channel.country}-${channel.name}-${index}`}
                        className="bg-gray-100 rounded-lg p-4 hover:bg-gray-200 transition-colors cursor-pointer"
                      >
                        <h3 className="font-semibold text-black">{channel.name}</h3>
                        <p className="text-xs text-gray-500">{channel.country}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </div>
  )
}
