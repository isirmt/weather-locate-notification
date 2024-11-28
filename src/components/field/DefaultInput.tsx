'use client'

type InputProps = {
  placeholder: string
  value: string
  setValue: (_value: string) => void
}

export default function DefaultInput(props: InputProps) {
  return <input
    value={props.value}
    placeholder={props.placeholder}
    onInput={(e) => {
      props.setValue(e.currentTarget.value)
    }}
    className="border bg-gray-50 rounded-sm p-1 w-48"
  />
}