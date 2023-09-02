export const dynamic = "force-dynamic"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { db } from "@/app/db"
import { revalidatePath } from "next/cache"
import { SubmitButton } from "@/components/SubmitButton"


async function getData(id: string) {
  const data = await db.comment.findMany({
    where: {
      movieId: id,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return data
}

async function postData(formData: FormData) {
  "use server"
  const data = await db.comment.create({
    data: {
      message: formData.get("comment") as string,
      movieId: formData.get("id") as string,
    },
  })
  revalidatePath("/movie/[id]")
}

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getData(params.id)
  return (
    <div className="rounded-lg boder p-3">
      <h1 className="text-xl font-semibold mb-5">Your Opiniion</h1>
      <div>
        <form action={postData} className="space-y-3">
          <Textarea name="comment" placeholder="Add your comment" />
          <Input type="hidden" name="id" value={params.id} />
          <SubmitButton/>
        </form>
        <div className="mt-5 flex flex-col gap-y-3">
          {data.map((post) => (
            <div key={post.id}>
              <p>{post.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
