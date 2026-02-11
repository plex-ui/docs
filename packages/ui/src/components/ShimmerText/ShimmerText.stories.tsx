import { useState } from "react"
import { type Meta } from "@storybook/react"
import { ShimmerText, ShimmerableText } from "./"

const meta = {
  title: "Components/ShimmerText",
  component: ShimmerText,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ShimmerText>

export default meta

export const Base = () => (
  <ShimmerText className="text-2xl font-semibold">
    Thinking...
  </ShimmerText>
)

Base.parameters = {
  docs: {
    description: {
      story: "Basic shimmer text with continuous animation.",
    },
  },
}

export const Heading = () => (
  <ShimmerText as="h2" className="text-3xl font-bold">
    Loading content
  </ShimmerText>
)

Heading.parameters = {
  docs: {
    description: {
      story: "Shimmer applied to a heading element.",
    },
  },
}

export const Paragraph = () => (
  <ShimmerText as="p" className="text-base max-w-md">
    This paragraph has a shimmer effect applied to indicate that content is being generated or loaded.
  </ShimmerText>
)

Paragraph.parameters = {
  docs: {
    description: {
      story: "Shimmer on a paragraph of text.",
    },
  },
}

export const Shimmerable = () => {
  const [shimmer, setShimmer] = useState(true)
  return (
    <div className="flex flex-col gap-4 items-center">
      <ShimmerableText shimmer={shimmer} className="text-xl font-medium">
        Streaming response text...
      </ShimmerableText>
      <button
        onClick={() => setShimmer((s) => !s)}
        className="px-3 py-1.5 text-sm rounded-lg border border-default"
      >
        {shimmer ? "Stop shimmer" : "Start shimmer"}
      </button>
    </div>
  )
}

Shimmerable.parameters = {
  docs: {
    description: {
      story:
        "ShimmerableText can be toggled on/off. The animation gracefully completes its current cycle before pausing.",
    },
  },
}

export const InlineSpan = () => (
  <p className="text-base">
    The AI is currently{" "}
    <ShimmerText as="span" className="font-semibold">
      generating a response
    </ShimmerText>{" "}
    for your query.
  </p>
)

InlineSpan.parameters = {
  docs: {
    description: {
      story: "Shimmer applied to an inline span within a paragraph.",
    },
  },
}
