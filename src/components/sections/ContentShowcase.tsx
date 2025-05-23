import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import SportEvents from "./ContentShowCase/SportEvents"

// Movie + TV interfaces
export interface TopRatedMoviesResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}
export interface Movie {
  adult: boolean
  backdrop_path: string | null
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string | null
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjE4NzE4YTM1ZGY1NDExNjkxMWZmZjk3MmJjMDk4ZCIsIm5iZiI6MTYyMTk3MzQzMC4xNjgsInN1YiI6IjYwYWQ1OWI2ZmNlYzJlMDA3OTNkNmQ3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NGMKU3fb0QRQS55iFpeuf6jqrClvdNrn7K49qPwy2rU"

const BASE_URL = "https://api.themoviedb.org/3"

export const getTopRatedMovies = async (): Promise<TopRatedMoviesResponse> => {
  const response = await fetch(`${BASE_URL}/movie/top_rated?language=fr-FR&page=1`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  })
  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.statusText}`)
  }
  return await response.json()
}

export const getTopRatedTVShows = async (): Promise<TopRatedMoviesResponse> => {
  const response = await fetch(`${BASE_URL}/tv/top_rated?language=fr-FR&page=1`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  })
  if (!response.ok) {
    throw new Error(`Failed to fetch TV shows: ${response.statusText}`)
  }
  return await response.json()
}

const ContentShowcase = async () => {
  const movies = await getTopRatedMovies()
  const tvShows = await getTopRatedTVShows()

  return (
    <section id="features" className="py-20 bg-white">

        <div className="mt-20 ">
          <SportEvents />
        </div>
      <div className="max-w-screen-3xl mx-auto px-4 md:px-8">

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6  text-black    leading-tight">
            Regardez vos films, séries TV et chaînes en direct
          </h2>
          <p className="text-slate-700 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Profitez d&rsquo;un abonnement IPTV haute qualité : films récents, séries populaires, chaînes TV du monde entier
            et événements sportifs en direct
          </p>
        </div>

        {/* Movies Section */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-8 px-2">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-800 border-l-4 border-purple-600 pl-4">
              Films populaires
            </h3>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 px-2 md:px-4 scroll-smooth hide-scrollbar">
            {movies.results
              .filter((show) => !show.adult)
              .slice(0, 10)
              .map((show) => (
                <div key={show.id} className="snap-start flex-shrink-0 w-64 md:w-80">
                  <Card className="overflow-hidden rounded-xl border border-slate-200 shadow-md bg-white h-[400px] md:h-[450px] transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                    <CardContent className="p-0 h-full relative">
                      <Image
                        width={320}
                        height={480}
                        src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                        alt={show.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-end">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="text-white font-bold text-xl line-clamp-1">{show.title}</h4>
                            <span className="bg-blue-500 text-white font-semibold px-2 py-1 rounded-md text-sm">
                              {show.vote_average.toFixed(1)}★
                            </span>
                          </div>
                          <p className="text-slate-200 text-sm line-clamp-2">{show.overview}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
          </div>
        </div>

        {/* TV Shows Section */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-8 px-2">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-800 border-l-4 border-blue-500 pl-4">
              Séries les mieux notées
            </h3>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 px-2 md:px-4 scroll-smooth hide-scrollbar">
            {tvShows.results.slice(0, 10).map((show) => (
              <div key={show.id} className="snap-start flex-shrink-0 w-64 md:w-72">
                <Card className="overflow-hidden rounded-xl border border-slate-200 shadow-md bg-white h-[400px] md:h-[450px] transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                  <CardContent className="p-0 h-full relative">
                    <Image
                      width={320}
                      height={480}
                      src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                      alt={show.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-end">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-white font-bold text-xl line-clamp-1">{show.title}</h4>
                          <span className="bg-blue-800 text-white font-semibold px-2 py-1 rounded-md text-sm">
                            {show.vote_average.toFixed(1)}★
                          </span>
                        </div>
                        <p className="text-slate-200 text-sm line-clamp-2">{show.overview}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Sports Section */}
      </div>
    </section>
  )
}

export default ContentShowcase
