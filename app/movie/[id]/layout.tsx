import { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"

import { Movie } from "@/types/Movie"

async function getData(id: string) {
  const url = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    {
      headers: {
        accept: "application/json",
        Authorization: process.env.THEMOVIEDB_API as string,
      },
      next: {
        revalidate: 60,
      },
    }
  )
  return url.json()
}

export default async function MovieId({
  params,
  children,
}: {
  children: ReactNode
  params: { id: string }
}) {
  const data: Movie = await getData(params.id)

  return (
    <div className="min-h-screen p-10">
      <div className="h-[60vh] relative">
        <Image
          src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
          className="object-cover w-full rounded-lg"
          alt="img of movie"
          fill
        />
      </div>
      <h1 className="text-center text-4xl pt-5 font-bold">{data.title}</h1>
      <div className="flex gap-x-10 mt-10">
        <div className="w-1/2 font-medium">
          <h1>
            <span className="underline">Homepage:</span>
            <Link href={data.homepage} target="_blank">
              link
            </Link>
          </h1>
          <h1>
            <span className="underline">Original Language:</span>
            {data.original_language}
          </h1>
          <p>
            <span className="underline">Overview:</span>
            {data.overview}
          </p>
          <p>
            <span className="underline">Release Date:</span>
            {data.release_date}
          </p>
        </div>
        <div className="w-1/2 font-medium">{children}</div>
      </div>
    </div>
  )
}
