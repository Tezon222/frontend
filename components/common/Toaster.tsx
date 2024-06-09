"use client";

import { useThemeStore } from "@/store/themeStore";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const SonnerToaster = (props: ToasterProps) => {
	const theme = useThemeStore((state) => state.theme as ToasterProps["theme"]);

	return (
		<Sonner
			theme={theme}
			// eslint-disable-next-line tailwindcss/no-custom-classname
			className="toaster group"
			position="bottom-right"
			duration={3000}
			closeButton={true}
			pauseWhenPageIsHidden={true}
			toastOptions={{
				classNames: {
					toast: "group toast max-lg:mx-auto max-lg:group-[.toaster]:max-w-[356px] group-[.toaster]:bg-shadcn-background group-[.toaster]:text-shadcn-foreground group-[.toaster]:border-shadcn-border group-[.toaster]:shadow-lg",

					success:
						"group success data-[type=success]:group-[.toaster]:bg-sonner-success-bg data-[type=success]:group-[.toaster]:text-sonner-success-text data-[type=success]:border-sonner-success-border",

					error: "group error data-[type=error]:group-[.toaster]:bg-sonner-error-bg data-[type=error]:group-[.toaster]:text-sonner-error-text data-[type=error]:group-[.toaster]:border-sonner-error-border",

					title: "group-[.toaster]:text-[16px] group-[.toaster]:font-bold",

					description:
						"group-[.toaster]:text-[14px] group-[.toast]:text-shadcn-muted-foreground group-[.toast.error]:text-inherit group-[.toast.success]:text-inherit",

					closeButton:
						"group-[.toaster]:bg-inherit group-[.toaster]:text-inherit group-[.toaster]:border-inherit data-[close-button]:group-[.toaster]:hover:border-inherit data-[close-button]:group-[.toaster]:hover:bg-inherit",

					actionButton:
						"group-[.toast]:bg-shadcn-primary group-[.toast]:text-shadcn-primary-foreground",

					cancelButton: "group-[.toast]:bg-shadcn-muted group-[.toast]:text-shadcn-muted-foreground",
				},
			}}
			{...props}
		/>
	);
};

export default SonnerToaster;