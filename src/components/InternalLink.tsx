import Link from "next/link";
import { ComponentPropsWithoutRef, forwardRef } from "react";

type Props = ComponentPropsWithoutRef<typeof Link>;

export const InternalLink = forwardRef<HTMLAnchorElement, Props>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <Link ref={ref} {...rest} className={`${className} link`}>
        {props.children}
      </Link>
    );
  },
);

InternalLink.displayName = "InternalLink";
