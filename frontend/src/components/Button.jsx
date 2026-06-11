import { Link } from 'react-router-dom';

const variants = {
  primary: 'bg-craft text-white hover:bg-[#9d6220] dark:hover:bg-clay dark:hover:text-ink',
  secondary: 'bg-white text-ink ring-1 ring-ink/10 hover:bg-paper dark:bg-white/10 dark:text-white dark:ring-white/15 dark:hover:bg-white/15',
  ghost: 'text-ink hover:bg-white/60 dark:text-white dark:hover:bg-white/10'
};

export function Button({ to, children, variant = 'primary', className = '', ...props }) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold transition focus-ring ${variants[variant]} ${className}`;
  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
