export type AvatarProps = {
  svg: string | undefined
  width: string
  height: string
}
export function Avatar(props: AvatarProps) {
  const blob = new Blob(
    [
      props.svg ||
        `<svg
    xmlns="http://www.w3.org/2000/svg"
    width="120"
    height="120"
    fill="#404040"
    className="bi bi-file-person-fill"
    viewBox="0 0 16 16"
  >
    <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-1 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm-3 4c2.623 0 4.146.826 5 1.755V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1.245C3.854 11.825 5.377 11 8 11z" />
  </svg>`,
    ],
    { type: "image/svg+xml" },
  )
  let url = URL.createObjectURL(blob)

  return (
    <img
      src={url}
      alt="User avatar"
      width={props.width}
      height={props.height}
    />
  )
}
