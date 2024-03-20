interface SvgIconProps extends React.ComponentProps<"svg"> {
  name: string;
  prefix?: string;
  color?: string;
}

/* 统一使用class不设置内联样式避免样式设置冲突 */
export default function SvgIcon({
  name,
  prefix = "icon",
  // color = "currentColor",
  ...props
}: SvgIconProps) {
  const symbolId = `#${prefix}-${name}`;

  return (
    <svg {...props} aria-hidden="true">
      <use href={symbolId} /* fill={color} */ />
    </svg>
  );
}
