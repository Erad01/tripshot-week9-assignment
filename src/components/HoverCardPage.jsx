import * as HoverCard  from "@radix-ui/react-hover-card";
import * as React from "react"
import HeaderPage from "./Header";

export default function HoverCardPage(){

 return (
	<HoverCard.Root>
		<HoverCard.Trigger>Check Out My Page</HoverCard.Trigger>
		<HoverCard.Portal>
			<HoverCard.Content>
                <HeaderPage />
			</HoverCard.Content>
		</HoverCard.Portal>
	</HoverCard.Root>
);
}