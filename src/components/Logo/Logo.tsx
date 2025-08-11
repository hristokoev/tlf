import clsx from 'clsx'
import React from 'react'

import logoImg from '../../../public/logo.png'
import logoImgBlack from '../../../public/logo-black.png'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  isWhiteBackgroundPage?: boolean
}

export const Logo = (props: Props) => {
  const {
    loading: loadingFromProps,
    priority: priorityFromProps,
    className,
    isWhiteBackgroundPage,
  } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'
  const logoSrc = isWhiteBackgroundPage ? logoImgBlack : logoImg

  return (
    <img
      alt="TLF Logo"
      width={76}
      height={64}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('h-[64px]', className)}
      src={logoSrc.src}
    />
  )
}

export const Icon = (props: Props) => {
  const {
    loading: loadingFromProps,
    priority: priorityFromProps,
    className,
    isWhiteBackgroundPage,
  } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'
  const logoSrc = isWhiteBackgroundPage ? logoImgBlack : logoImg

  return (
    <img
      alt="TLF Logo"
      width={76}
      height={64}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('h-[16px]', className)}
      src={logoSrc.src}
    />
  )
}
