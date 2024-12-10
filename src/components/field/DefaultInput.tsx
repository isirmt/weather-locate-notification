'use client';

type InputProps = {
  placeholder: string;
  value: string;
  // eslint-disable-next-line no-unused-vars
  setValue: (value: string) => void;
};

export default function DefaultInput(props: InputProps) {
  return (
    <input
      value={props.value}
      placeholder={props.placeholder}
      onInput={(e) => {
        props.setValue(e.currentTarget.value);
      }}
      className='w-48 rounded-sm border bg-gray-50 p-1'
    />
  );
}
