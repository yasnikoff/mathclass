import { useState } from "react"
import { Avatar } from "./Avatar"
import avatars from "./avatars"

const defaultSize = "45"

export type AvatarSelectedEvent = { svg: string }
export type AvatarSelectionProps = {
  size?: string
  onSelected?: (e: AvatarSelectedEvent) => void
}
export function AvatarSelection(props: AvatarSelectionProps) {
  const [selected, setSelected] = useState<number | undefined>(undefined)

  function selectAvatar(index: number) {
    setSelected(index === selected ? undefined : index)
    if (props.onSelected) {
      props.onSelected({ svg: index === selected ? "" : avatars[index] })
    }
  }

  const avatarsList = avatars.map((avatar, index) => {
    return (
      <span
        className="m-1"
        key={index}
        onClick={(e) => {
          e.preventDefault()
          selectAvatar(index)
        }}
        style={
          selected === index
            ? {
                border: "1px solid grey",
                borderRadius: "8px",
                cursor: "pointer",
              }
            : { cursor: "pointer" }
        }
      >
        <Avatar
          svg={avatar}
          width={props.size || defaultSize}
          height={props.size || defaultSize}
        ></Avatar>
      </span>
    )
  })
  return (
    <div className="my-3 mx-1 d-flex justify-content-center align-items-center">
      {avatarsList}
    </div>
  )
}
