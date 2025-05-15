"use client"

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

// Define types based on the JSON structure
type ChannelType = "sports" | "movies" | "news" | "entertainment" | "documentaries" | "kids"
type Country = {
  name: string
  channelTypes: {
    [key in ChannelType]: string[]
  }
}


export default function ChannelsPage() {
  const [selectedCountry, setSelectedCountry] = useState<string>("All")
  const [selectedType, setSelectedType] = useState<ChannelType | "all">("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    // Simulate loading time to show the loading state
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [])

  // Filter channels based on selected country, type, and search query
  const getFilteredChannels = () => {
    let filteredCountries = channelsData.countries

    // Filter by country if not "All"
    if (selectedCountry !== "All") {
      filteredCountries = filteredCountries.filter((country) => country.name === selectedCountry)
    }

    // Create a flat array of channel objects with country, type, and name
    const allChannels = filteredCountries.flatMap((country) => {
      return Object.entries(country.channelTypes).flatMap(([type, channels]) => {
        return channels.map((channel) => ({
          country: country.name,
          type: type as ChannelType,
          name: channel,
        }))
      })
    })

    // Filter by type if not "all"
    let filteredChannels = allChannels
    if (selectedType !== "all") {
      filteredChannels = filteredChannels.filter((channel) => channel.type === selectedType)
    }

    // Filter by search query
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

  // Group channels by country for display
  const getChannelsByCountry = () => {
    const filteredChannels = getFilteredChannels()
    const channelsByCountry: Record<string, Array<{ type: ChannelType; name: string }>> = {}

    filteredChannels.forEach((channel) => {
      if (!channelsByCountry[channel.country]) {
        channelsByCountry[channel.country] = []
      }
      channelsByCountry[channel.country].push({
        type: channel.type,
        name: channel.name,
      })
    })

    return channelsByCountry
  }

  // Group channels by type for display
  const getChannelsByType = () => {
    const filteredChannels = getFilteredChannels()
    const channelsByType: Record<ChannelType, Array<{ country: string; name: string }>> = {
      sports: [],
      movies: [],
      news: [],
      entertainment: [],
      documentaries: [],
      kids: [],
    }

    filteredChannels.forEach((channel) => {
      channelsByType[channel.type].push({
        country: channel.country,
        name: channel.name,
      })
    })

    return channelsByType
  }

  // Get all available countries for the dropdown
  const getCountries = () => {
    return ["All", ...channelsData.countries.map((country) => country.name)]
  }

  // Get all channel types for the tabs
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
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00ff2a] mx-auto"></div>
          <p className="mt-4">Loading channels...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="container mx-auto pt-40 py-12 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">All Channels</h1>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8">
          Browse our extensive collection of premium channels from around the world, all available in one subscription.
        </p>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search channels..."
              className="w-full bg-gray-900 border border-gray-800 rounded-md py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-[#00ff2a] focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="bg-gray-900 border-gray-800 text-white hover:bg-gray-800 flex items-center gap-2"
              >
                <Globe className="h-4 w-4" />
                <span>{selectedCountry}</span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-900 border-gray-800 text-white">
              <DropdownMenuRadioGroup value={selectedCountry} onValueChange={setSelectedCountry}>
                {getCountries().map((country) => (
                  <DropdownMenuRadioItem key={country} value={country} className="cursor-pointer hover:bg-gray-800">
                    {country}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>

      {/* Channel Types Tabs */}
      <section className="container mx-auto px-4 mb-8">
        <Tabs
          defaultValue="all"
          value={selectedType}
          onValueChange={(value) => setSelectedType(value as ChannelType | "all")}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-7 bg-gray-900 p-1 rounded-lg mb-8">
            {channelTypes.map((type) => (
              <TabsTrigger
                key={type.value}
                value={type.value}
                className="data-[state=active]:bg-[#00ff2a] data-[state=active]:text-black"
              >
                {type.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Content for each tab */}
          {channelTypes.map((type) => (
            <TabsContent key={type.value} value={type.value} className="mt-0">
              {type.value === "all" ? (
                // Display by country when "All Types" is selected
                Object.entries(getChannelsByCountry()).map(([country, channels]) => (
                  <div key={country} className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 flex items-center">
                      <Globe className="mr-2 h-5 w-5" /> {country}
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                      {channels.map((channel, index) => (
                        <div
                          key={`${country}-${channel.name}-${index}`}
                          className="bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition-colors cursor-pointer"
                        >
                          <div className="aspect-square bg-gray-800 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                            <div className="text-[#00ff2a] text-4xl font-bold">{channel.name.charAt(0)}</div>
                          </div>
                          <h3 className="font-semibold text-white">{channel.name}</h3>
                          <p className="text-xs text-gray-400 capitalize">{channel.type}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                // Display by type for specific type tabs
                <div>
                  <h2 className="text-2xl font-bold mb-6 capitalize">{type.label}</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {getChannelsByType()[type.value as ChannelType].map((channel, index) => (
                      <div
                        key={`${channel.country}-${channel.name}-${index}`}
                        className="bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition-colors cursor-pointer"
                      >
                        <div className="aspect-square bg-gray-800 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                          <div className="text-[#00ff2a] text-4xl font-bold">{channel.name.charAt(0)}</div>
                        </div>
                        <h3 className="font-semibold text-white">{channel.name}</h3>
                        <p className="text-xs text-gray-400">{channel.country}</p>
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
