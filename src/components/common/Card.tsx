import type { HTMLAttributes, PropsWithChildren } from 'react';

export function Card({ className = '', children, ...props }: PropsWithChildren<HTMLAttributes<HTMLElement>>) {
  return <section className={`az-card ${className}`} {...props}>{children}</section>;
}

export function CardHeader({ className = '', children, ...props }: PropsWithChildren<HTMLAttributes<HTMLElement>>) {
  return <header className={`az-card__header ${className}`} {...props}>{children}</header>;
}

export function CardTitle({ className = '', children, ...props }: PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>) {
  return <h3 className={`az-card__title ${className}`} {...props}>{children}</h3>;
}

export function CardContent({ className = '', children, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return <div className={`az-card__content ${className}`} {...props}>{children}</div>;
}

export function CardFooter({ className = '', children, ...props }: PropsWithChildren<HTMLAttributes<HTMLElement>>) {
  return <footer className={`az-card__footer ${className}`} {...props}>{children}</footer>;
}

export default Card;
