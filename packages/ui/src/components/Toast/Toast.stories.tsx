import { Button } from "../Button"
import { Toaster, toast } from "./index"

export default {
  title: "Components/Toast",
}

export const Overview = () => (
  <>
    <Button
      color="secondary"
      variant="outline"
      onClick={() => toast("Inquiry ID copied")}
    >
      Show toast
    </Button>
    <Toaster />
  </>
)

export const Variants = () => (
  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
    <Button color="secondary" variant="outline" onClick={() => toast("Changes saved")}>
      Default
    </Button>
    <Button color="secondary" variant="outline" onClick={() => toast.success("Inquiry ID copied")}>
      Success
    </Button>
    <Button color="secondary" variant="outline" onClick={() => toast.error("Failed to assign owner")}>
      Error
    </Button>
    <Button color="secondary" variant="outline" onClick={() => toast.warning("Session expires in 2 minutes")}>
      Warning
    </Button>
    <Button color="secondary" variant="outline" onClick={() => toast.info("New version available")}>
      Info
    </Button>
    <Toaster />
  </div>
)

export const WithDescription = () => (
  <>
    <Button
      color="secondary"
      variant="outline"
      onClick={() =>
        toast("Changes saved", {
          description: "Your profile is live for everyone on the team.",
        })
      }
    >
      Show toast
    </Button>
    <Toaster />
  </>
)

export const WithAction = () => (
  <>
    <Button
      color="secondary"
      variant="outline"
      onClick={() =>
        toast("Message sent", {
          description: "Delivered to #design channel.",
          action: {
            label: "Undo",
            onClick: () => toast.success("Message recalled"),
          },
        })
      }
    >
      Show toast with action
    </Button>
    <Toaster />
  </>
)

export const Promise = () => {
  const fakeSave = () =>
    new window.Promise<{ name: string }>((resolve) => {
      setTimeout(() => resolve({ name: "Profile" }), 1500)
    })

  return (
    <>
      <Button
        color="secondary"
        variant="outline"
        onClick={() =>
          toast.promise(fakeSave(), {
            loading: "Saving…",
            success: (data) => `${data.name} saved`,
            error: "Save failed",
          })
        }
      >
        Run promise
      </Button>
      <Toaster />
    </>
  )
}

export const LongContent = () => (
  <>
    <Button
      color="secondary"
      variant="outline"
      onClick={() =>
        toast("Your deployment is still running", {
          description:
            "This is a long message to show how the toast handles multi-line content without clipping or awkward wrapping. The title and description should both wrap cleanly.",
        })
      }
    >
      Long content
    </Button>
    <Toaster />
  </>
)

export const Dismissible = () => (
  <>
    <Button
      color="secondary"
      variant="outline"
      onClick={() =>
        toast("Auto-dismiss disabled", {
          description: "Use the × button to close this one.",
          duration: Infinity,
        })
      }
    >
      Persistent toast
    </Button>
    <Toaster />
  </>
)
