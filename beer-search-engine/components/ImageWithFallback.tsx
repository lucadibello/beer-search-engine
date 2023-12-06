"use client"

import Image, { ImageProps } from "next/image"
import { useEffect, useState } from "react"

interface ImageWithFallbackProps extends Omit<ImageProps, "onError"> {
  fallbackSrc: string
}

export default function ImageWithFallback(props: ImageWithFallbackProps) {
  const [error, setError] = useState<boolean>(false)

  // Splitting fallbackSrc from the rest of the props

  const { fallbackSrc, ...rest } = props

  useEffect(() => {
    setError(false)
  }, [props.src])

  // Render image with fallback if error
  return (
    <Image
      {...rest}
      alt={props.alt || "Image"}
      onError={() => setError(true)}
      src={error ? props.fallbackSrc : props.src}
      // If error, use the worse quality
      quality={error ? 25 : props.quality || 75}
    />
  )
}
