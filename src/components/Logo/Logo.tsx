import clsx from 'clsx'
import React from 'react'

import logoImg from '../../../public/logo.png'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="TLF Logo"
      width={328}
      height={276}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('w-full h-[64px]', className)}
      src={logoImg.src}
    />
  )
}
