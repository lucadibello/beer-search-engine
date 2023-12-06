"use client"

import Image, { ImageProps } from "next/image"
import { useEffect, useState } from "react"
import Loader from "./Loader"

interface ImageWithFallbackProps extends ImageProps {
  fallbackSrc: string
}

export default function ImageWithFallback(props: ImageWithFallbackProps) {
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  // Splitting fallbackSrc from the rest of the props
  const { fallbackSrc, ...rest } = props

  useEffect(() => {
    setError(false)
    setLoading(true)
  }, [props.src])

  // Render image with fallback if error
  return (
    <>
      <Image
        {...rest}
        alt={props.alt || "Image"}
        onError={(e) => {
          setError(true)
          setLoading(false)
          // Call the onError prop if exists
          props.onError && props.onError(e)
        }}
        src={error ? fallbackSrc : props.src}
        onLoad={(e) => {
          setLoading(false)
          // Call the onLoad prop if exists
          props.onLoad && props.onLoad(e)
        }}
        // If error, use the worse quality
        quality={error ? 25 : props.quality || 75}
        // If loading, show the loader
        style={{
          opacity: loading ? 0 : 1,
          transition: "opacity 0.3s ease-in-out",
        }}
      />
      {loading && <Loader text="" />}
    </>
  )
}
