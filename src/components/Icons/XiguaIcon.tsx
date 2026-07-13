interface IconProps {
  className?: string;
}

export default function XiguaIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.3 10.2l-6.4 4.5c-.3.2-.7 0-.7-.4V7.7c0-.4.4-.6.7-.4l6.4 4.5c.3.2.3.6 0 .8z" />
    </svg>
  );
}
