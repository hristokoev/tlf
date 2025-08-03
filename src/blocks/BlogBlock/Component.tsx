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
      className="relative bg-white container py-12 md:py-24"
      style={{ backgroundImage: 'url(/hero-bg.png)', backgroundSize: 'cover' }}
    >
      <div className="flex gap-8 md:gap-16 flex-col">
        {/* Header Section */}
        {type === 'compact' ? (
          <span className="uppercase text-sm md:text-base">{heading}</span>
        ) : (
          <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-16">
            {/* Content Section */}
            <div className="flex flex-col justify-between gap-8 md:gap-16 max-w-full lg:max-w-4xl">
              <span className="uppercase text-sm md:text-base">{heading}</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase line-clamp-3 leading-tight md:leading-normal">
                {title}
              </h2>
              <p className="text-base md:text-lg line-clamp-3 leading-relaxed max-w-3xl">
                {description}
              </p>
            </div>

            {/* Media Section - Hidden on mobile, shown on desktop */}
            <div className="hidden lg:block relative flex-shrink-0">
              <Media
                resource={media}
                className="w-[300px] xl:w-[400px] h-[500px] xl:h-[690px]"
                imgClassName="object-cover h-full w-full"
              />

              {/* Decorative Line - Desktop Only */}
              <div className="absolute right-[-48px] xl:right-[-48px] top-0 h-full w-4 py-16 flex flex-col items-center justify-center space-y-6 z-20">
                <div className="bg-black w-[0.5px] h-full"></div>
              </div>
            </div>
          </div>
        )}

        {/* Posts Grid Section */}
        <div className="mt-8 md:mt-16 flex flex-col gap-6 md:gap-8">
          {/* Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {postsDocs.map((post) => (
              <article
                key={post.id}
                className="w-full bg-background text-white flex flex-col gap-3 md:gap-4 group hover:transform hover:scale-105 transition-transform duration-300"
              >
                {/* Post Image */}
                <div className="overflow-hidden">
                  <Media
                    resource={post.media}
                    className="w-full"
                    imgClassName="h-[200px] sm:h-[220px] md:h-[240px] lg:h-[287px] object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Post Content */}
                <div className="px-3 md:px-4 py-2 flex-1 flex flex-col">
                  <h3 className="text-lg md:text-xl line-clamp-3 md:line-clamp-4 leading-tight mb-auto">
                    {post.title}
                  </h3>

                  {/* Post Date */}
                  <div className="mt-4 pt-3 border-t border-gray-600">
                    <time className="text-gray-300 text-xs md:text-sm">
                      {post.publishedAt && formatDateTime(post.publishedAt)}
                    </time>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Show More Button */}
          <div className="flex justify-center lg:justify-end mt-4 md:mt-8">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              Ukazat více
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
