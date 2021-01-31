/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from "react";
import NextLink from "next/link";

export default function Link({ href, children, ...props }) {
  return (
    <NextLink href={href} passHref>
      <a {...props}>{children}</a>
    </NextLink>
  );
}
