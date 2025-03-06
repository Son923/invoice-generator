"use client"

import { IndieBoosting as OriginalIndieBoosting } from '@indieboosting/react'

type IndieboostingProps = {
  id: string
  direction?: 'horizontal' | 'vertical'
  maxProducts?: number
  noTitle?: boolean
  className?: string
}

export function IndieBoostingWrapper(props: IndieboostingProps) {
  return <OriginalIndieBoosting {...props} />
}