'use client';

import clsx from 'clsx'
import { Fragment, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Button } from '@plexui/ui/components/Button'
import { ArrowUp, Check, Copy, Wave } from '@plexui/ui/components/Icon'
import { TextLink } from '@plexui/ui/components/TextLink'
import {
  Animate,
  AnimateLayout,
  AnimateLayoutGroup,
  SlotTransitionGroup,
  TransitionGroup,
} from '@plexui/ui/components/Transition'

type BoxProps = React.ComponentPropsWithoutRef<'div'>;
const PrimarySquare = ({ className, ...rest }: BoxProps) => (
  <div className={clsx('story-example-primary rounded-lg shadow-xl', className)} {...rest} />
)
const SecondaryLine = ({ className, ...rest }: BoxProps) => (
  <div className={clsx('story-example-secondary rounded-lg', className)} {...rest} />
)
const PrimaryLine = ({ className, ...rest }: BoxProps) => (
  <div className={clsx('story-example-primary rounded-lg shadow-xl', className)} {...rest} />
)
const SecondarySquare = ({ className, ...rest }: BoxProps) => (
  <div className={clsx('story-example-secondary rounded-lg', className)} {...rest} />
)

export function AnimateFadeDemo() {
  const [show, setShow] = useState(true)
  return (
    <div className="w-[200px]">
      <div className="w-[100px] mx-auto mb-6">
        <Button block color="primary" variant="outline" onClick={() => setShow(!show)}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </div>
      <Animate className="w-[200px] h-[200px]">
        {show && <PrimarySquare key="s" className="w-[200px] h-[200px]" />}
      </Animate>
    </div>
  )
}

export function AnimateGrowDemo() {
  const [show, setShow] = useState(true)
  return (
    <div className="w-[200px]">
      <div className="w-[100px] mx-auto mb-6">
        <Button block color="primary" variant="outline" onClick={() => setShow(!show)}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </div>
      <Animate
        className="w-[200px] h-[200px]"
        enter={{ scale: 1 }}
        exit={{ scale: 0.5, blur: 20 }}
      >
        {show && <PrimarySquare key="s" className="w-[200px] h-[200px]" />}
      </Animate>
    </div>
  )
}

export function AnimateContinuousDemo() {
  const [show, setShow] = useState(true)
  return (
    <div className="w-[200px]">
      <div className="w-[100px] mx-auto mb-6">
        <Button block color="primary" variant="outline" onClick={() => setShow(!show)}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </div>
      <Animate
        className="w-[200px] h-[200px]"
        initial={{ x: 120, skewX: 30 }}
        enter={{ duration: 800 }}
        exit={{ x: -120, skewX: -8, duration: 500 }}
      >
        {show && <PrimarySquare key="s" className="w-[200px] h-[200px]" />}
      </Animate>
    </div>
  )
}

export function AnimateCrossFadeDemo() {
  const [copied, setCopied] = useState(false)
  const copiedTimeout = useRef<number | null>(null)

  const handleClick = () => {
    if (copied) return
    setCopied(true)
    copiedTimeout.current = window.setTimeout(() => setCopied(false), 1300)
  }

  return (
    <Button size="2xl" iconSize="xl" variant="soft" color="secondary" onClick={handleClick}>
      <Animate
        className="w-[var(--button-icon-size)] h-[var(--button-icon-size)]"
        enter={{ scale: 1, delay: 150, duration: 300 }}
        exit={{ scale: 0.6, duration: 150 }}
      >
        {copied ? <Check key="copied" /> : <Copy key="copy" />}
      </Animate>
    </Button>
  )
}

export function AnimateLayoutHeightDemo() {
  const [show, setShow] = useState(false)
  return (
    <div className="w-[450px] max-w-full mx-auto">
      <div className="w-[100px] mx-auto mb-6">
        <Button block color="primary" variant="outline" onClick={() => setShow(!show)}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </div>
      <SecondaryLine className="w-full h-12" />
      <AnimateLayout transitionClassName="pt-4">
        {show && <PrimaryLine key="box" className="w-full h-[80px]" />}
      </AnimateLayout>
      <SecondaryLine className="w-full h-12 mt-4" />
    </div>
  )
}

export function AnimateLayoutWidthDemo() {
  const [show, setShow] = useState(false)
  return (
    <div>
      <div className="w-[100px] mx-auto mb-6">
        <Button block color="primary" variant="outline" onClick={() => setShow(!show)}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </div>
      <div className="flex">
        <SecondarySquare className="w-[200px] h-[200px]" />
        <AnimateLayout
          dimension="width"
          transitionClassName="pl-6"
          enter={{ delay: 200 }}
          layoutExit={{ delay: 75 }}
        >
          {show && <PrimarySquare key="box" className="w-[200px] h-[200px]" />}
        </AnimateLayout>
        <SecondarySquare className="w-[200px] h-[200px] ml-6" />
      </div>
    </div>
  )
}

function AccordionItemDemo({ header, children }: { header: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="border-0 border-b border-solid border-gray-150 hover:border-gray-350 overflow-hidden"
      style={{ transition: 'border-color .15s ease' }}
      data-state={open ? 'open' : 'closed'}
    >
      <div
        className="flex justify-between items-center pt-4 pb-3 cursor-pointer select-none"
        onClick={() => setOpen(!open)}
      >
        <div className="font-[500]">{header}</div>
        <span className="text-secondary text-lg" aria-hidden>{open ? '−' : '+'}</span>
      </div>
      <AnimateLayout
        initial={{ blur: 0 }}
        enter={{ y: 0, delay: 150, duration: 450 }}
        exit={{ y: -8, blur: 2 }}
        layoutEnter={{ duration: 350 }}
        layoutExit={{ duration: 300 }}
      >
        {open && (
          <div key="content" className="pb-4 text-secondary text-[15px] leading-[1.6]">
            {children}
          </div>
        )}
      </AnimateLayout>
      <div className="mt-1" />
    </div>
  )
}

export function AnimateLayoutAccordionDemo() {
  return (
    <div className="max-w-[500px] mx-auto">
      <AccordionItemDemo header="Which model should I use?">
        <p>
          We recommend starting with our standard model for everyday tasks. The standard model
          generally performs better on a wide range of tasks, while the mini variant is fast and
          inexpensive for simpler tasks. Explore which models provide the best trade-off for your
          usage.
        </p>
      </AccordionItemDemo>
      <AccordionItemDemo header="Do you offer an enterprise package or SLAs?">
        <p>
          We offer different tiers of access to our enterprise customers that include SLAs, lower
          latency, and more. Please <TextLink underline color="secondary" href="#">contact our sales team</TextLink> to learn more.
        </p>
      </AccordionItemDemo>
      <AccordionItemDemo header="Will I be charged for API usage in the Playground?">
        <p>Yes, we treat Playground usage the same as regular API usage.</p>
      </AccordionItemDemo>
    </div>
  )
}

export function AnimateLayoutTalkButtonDemo() {
  const [recording, setRecording] = useState(false)
  const [sending, setSending] = useState(false)

  const handleClick = () => {
    if (!recording) {
      setRecording(true)
      return
    }
    setSending(true)
    window.setTimeout(() => {
      setSending(false)
      setRecording(false)
    }, 800)
  }

  return (
    <Button
      color={recording ? 'danger' : 'primary'}
      size="xl"
      iconSize="lg"
      onClick={handleClick}
      loading={sending}
    >
      <AnimateLayout dimension="width" transitionClassName="h-full flex items-center gap-2">
        {recording ? (
          <ArrowUp key="recording" />
        ) : (
          <Fragment key="record">
            <Wave /> Talk
          </Fragment>
        )}
      </AnimateLayout>
    </Button>
  )
}

export function AnimateLayoutGroupVerticalDemo() {
  const [list, setList] = useState<{ id: string }[]>([])

  const handleRemove = (idToRemove: string) => {
    setList((c) => c.filter((item) => item.id !== idToRemove))
  }

  return (
    <div>
      <div className="text-center mb-6">
        <Button
          color="primary"
          className="w-[100px]"
          variant="outline"
          onClick={(evt) => {
            evt.preventDefault()
            setList((current) => [...current, { id: Math.random().toString(36).slice(2, 11) }])
          }}
        >
          Add item
        </Button>
        <p className="mt-2 opacity-50">(Click to remove)</p>
      </div>
      <div className="w-[450px] max-w-full">
        <div className="py-2">
          <SecondaryLine className="h-[50px]" />
        </div>
        <AnimateLayoutGroup
          initial={{ y: -10, opacity: 0, blur: 0 }}
          enter={{ y: 0, delay: 150, duration: 600 }}
          exit={{ scale: 0.8, blur: 10, duration: 400 }}
          layoutEnter={{ duration: 400, timingFunction: 'ease' }}
          layoutExit={{ delay: 150 }}
        >
          {list.map(({ id }) => (
            <div className="py-2" key={id}>
              <PrimaryLine className="h-[50px] cursor-pointer" onClick={() => handleRemove(id)} />
            </div>
          ))}
        </AnimateLayoutGroup>
        <div className="py-2">
          <SecondaryLine className="h-[50px]" />
        </div>
      </div>
    </div>
  )
}

export function AnimateLayoutGroupHorizontalDemo() {
  const [list, setList] = useState<{ id: string }[]>([])

  const handleRemove = (idToRemove: string) => {
    setList((c) => c.filter((item) => item.id !== idToRemove))
  }

  return (
    <div>
      <div className="text-center mb-6">
        <Button
          color="primary"
          className="w-[100px]"
          variant="outline"
          onClick={(evt) => {
            evt.preventDefault()
            setList((current) => [...current, { id: Math.random().toString(36).slice(2, 11) }])
          }}
        >
          Add item
        </Button>
        <p className="mt-2 opacity-50">(Click to remove)</p>
      </div>
      <div className="h-[120px] flex">
        <div className="px-2">
          <SecondarySquare className="w-[80px] h-[80px]" />
        </div>
        <AnimateLayoutGroup dimension="width">
          {list.map(({ id }) => (
            <div className="px-2" key={id}>
              <PrimarySquare
                className="w-[80px] h-[80px] cursor-pointer"
                onClick={() => handleRemove(id)}
              />
            </div>
          ))}
        </AnimateLayoutGroup>
        <div className="px-2">
          <SecondarySquare className="w-[80px] h-[80px]" />
        </div>
      </div>
    </div>
  )
}

export function SlotTransitionGroupBaseDemo() {
  const [show, setShow] = useState(true)
  return (
    <div className="w-[200px]">
      <div className="w-[100px] mx-auto mb-6">
        <Button block color="primary" variant="outline" onClick={() => setShow(!show)}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </div>
      <div className="h-[200px]">
        <SlotTransitionGroup enterDuration={2000} exitDuration={1000}>
          {show && (
            <div key="s" className="w-[200px] h-[200px] bg-gray-300 rounded-lg storybook-tg" />
          )}
        </SlotTransitionGroup>
      </div>
    </div>
  )
}

export function TransitionGroupBaseDemo() {
  const [show, setShow] = useState(true)
  return (
    <div className="w-[200px]">
      <div className="w-[100px] mx-auto mb-6">
        <Button block color="primary" variant="outline" onClick={() => setShow(!show)}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </div>
      <div className="h-[200px]">
        <TransitionGroup
          className="storybook-tg rounded-lg"
          enterDuration={2000}
          exitDuration={1000}
        >
          {show && <div key="s" className="w-[200px] h-[200px] bg-gray-300 rounded-lg" />}
        </TransitionGroup>
      </div>
    </div>
  )
}
