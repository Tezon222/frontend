"use client";

import type { UrlObject } from "node:url";
import { cnMerge } from "@/lib/utils/cn";
import type { InferProps } from "@zayne-labs/toolkit/react/utils";
import { isString } from "@zayne-labs/toolkit/type-helpers";
import { useRouter } from "next-nprogress-bar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const isRelativeLink = (value: UrlObject | string | undefined | null): value is string => {
	return isString(value) && !value.startsWith("/");
};

function NavLink(
	props: InferProps<typeof Link> & {
		transitionType?: "navbar" | "regular" | "no-transition";
		relative?: boolean;
	}
) {
	const { children, className, onClick, transitionType = "no-transition", href, ...restOfProps } = props;

	const router = useRouter();
	const pathname = usePathname();

	if (!isString(href) && isRelativeLink(href.pathname)) {
		Reflect.set(href, "pathname", `${pathname}/${href.pathname}`);
	}

	return (
		<Link
			href={isRelativeLink(href) ? `${pathname}/${href.replaceAll(" ", "")}` : href}
			className={cnMerge(
				transitionType !== "no-transition" && "navLink-transition relative",
				transitionType === "navbar" && "nav-mobile",
				className
			)}
			onClick={(event) => {
				event.preventDefault();

				router.push(event.currentTarget.href);

				onClick?.(event);
			}}
			{...restOfProps}
		>
			{children}
		</Link>
	);
}

export default NavLink;
