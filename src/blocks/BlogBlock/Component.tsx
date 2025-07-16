import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { BlogBlock as BlogBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import { formatDateTime } from '@/utilities/formatDateTime'
import { Button } from '@/components/ui/button'

export const BlogBlock: React.FC<BlogBlockProps> = async (props) => {
  const { type, heading, title, description, media } = props
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    limit: 4,
  })

  const postsDocs = posts.docs

  return (
    <section
      className="relative bg-white container py-24"
      style={{ backgroundImage: 'url(/hero-bg.png)', backgroundSize: 'cover' }}
    >
      <div className="flex gap-16 flex-col">
        {type === 'compact' ? (
          <span className="uppercase">{heading}</span>
        ) : (
          <div className=" flex justify-between gap-8">
            <div className="flex flex-col justify-between gap-16 max-w-4xl">
              <span className="uppercase">{heading}</span>
              <h2 className="text-5xl font-bold uppercase line-clamp-3 leading-normal">{title}</h2>
              <p className="text-lg line-clamp-3">{description}</p>
            </div>
            <Media resource={media} className="h-[690px]" imgClassName="object-cover h-full" />
            <div className="absolute right-12 top-0 h-full w-4 py-16 flex flex-col items-center justify-center space-y-6 z-20 ">
              <div className="bg-black w-[0.5px] h-full"></div>
            </div>
          </div>
        )}
        <div className="mt-16 flex flex-col gap-8">
          <div className="mx-auto grid grid-cols-4 gap-8">
            {postsDocs.map((post) => (
              <div key={post.id} className="w-full bg-background text-white flex flex-col gap-4">
                <Media
                  resource={post.media}
                  className="w-full"
                  imgClassName="h-[287px] object-cover"
                />
                <div className="px-4 py-2">
                  <h2 className="text-xl line-clamp-4">{post.title}</h2>
                </div>
                <div className="mt-auto px-4 mb-4">
                  <p className="text-gray-300 text-sm">
                    {post.publishedAt && formatDateTime(post.publishedAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="self-end">
            <Button variant="secondary" size="lg">
              Ukazát více
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
