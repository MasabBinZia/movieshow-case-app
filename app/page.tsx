import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Trending } from "@/types/Trending"
import { Card } from "@/components/ui/card"

async function getData() {
  const url = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    {
      headers: {
        accept: "application/json",
        Authorization: process.env.THEMOVIEDB_API as string,
      },
      next: {
        revalidate: 10,
      },
    }
  )
  return url.json()
}

export default async function IndexPage() {
  const data: Trending = await getData()
  return (
    <section className="px-32 py-12 flex flex-col justify-center items-center">
      <h1 className="text-center py-8 mb-4 text-4xl font-bold">
        Top Trending Movies
      </h1>
      <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
        {data.results.map((movie,index) => (
          <div key={index}>
            <Card className="h-[400px] lg:h-[400px] w-[300px] md:w-full lg:w-[400px]">
              <Link
                className="group relative block h-48 overflow-hidden bg-gray-100 md:h-64"
                href={`/movie/${movie.id}`}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt="image movie banner"
                  width={500}
                  height={500}
                  className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                />
              </Link>
              <div className="flex flex-1 flex-col p-4 sm:p-6">
                <h2 className="mb-2 text-lg font-semibold">
                  <Link
                    className="trasition duration-100 hover:text-blue-500 active:text-blue-600"
                    href={`/movie/${movie.id}`}
                  >
                    {movie.title}
                  </Link>
                </h2>
                <p className="line-clamp-2">{movie.overview}</p>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </section>
  )
}
