"use client";

import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useNasa } from "@/providers/NasaProvider/useNasa";
import { PickerRangeLabel } from "./PickerRangeLabel";

export function DatePicker() {
	const { range, selectRange } = useNasa();

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					data-empty={!range}
					className="data-[empty=true]:text-muted-foreground w-fit justify-start text-left font-normal"
				>
					<CalendarIcon />
					<PickerRangeLabel />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar
					mode="range"
					selected={range}
					onSelect={selectRange}
					required
				/>
			</PopoverContent>
		</Popover>
	);
}
