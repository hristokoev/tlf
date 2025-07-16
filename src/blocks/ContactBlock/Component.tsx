import type { Form as PluginForm } from '@payloadcms/plugin-form-builder/types'

import type { ContactBlock as ContactBlockProps } from '@/payload-types'
import { FormBlock } from '../Form/Component'
import { Media } from '@/components/Media'

export const ContactBlock: React.FC<ContactBlockProps> = (props) => {
  const { heading, title, description, form, media } = props

  return (
    <section className="relative container py-24">
      <div className="flex justify-between gap-16">
        <div className="flex flex-col justify-between gap-16">
          <span className="uppercase text-white">{heading}</span>
          <div>
            <h2 className="text-5xl font-bold uppercase text-white">{title}</h2>
            <p className="text-xl mt-4 text-white">{description}</p>
          </div>
          {/* @ts-expect-error */}
          <FormBlock enableIntro={false} form={form} />
        </div>
        <div className="mr-16">
          <Media resource={media} className="w-[600px] h-full" imgClassName="object-cover h-full" />
        </div>
        <div className="absolute right-12 top-0 h-full w-4 py-16 flex flex-col items-center justify-center space-y-6 z-20">
          <div className="bg-white w-[0.5px] h-full"></div>
        </div>
      </div>
    </section>
  )
}
