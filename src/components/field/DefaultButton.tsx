'use client'

import React from "react"

type InputProps = {
  children: React.ReactNode
  onClick: () => void
}

export default function DefaultButton(props: InputProps) {
  return <button
    className="bg-sky-700 text-white rounded p-1 w-48 hover:bg-sky-600 transition-colors"
    onClick={props.onClick}
  >
    {props.children}
  </button>
}