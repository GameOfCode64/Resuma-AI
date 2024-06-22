"use client";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { experienceSchema } from "@/lib/formschema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import ExpCustominput from "@/components/ExpCustominput";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "@/components/ui/button";
import { Activity, CalendarIcon } from "lucide-react";
import { addDays, format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { DateRange } from "react-day-picker";
import { Textarea } from "../ui/textarea";

const Experience = () => {
  const { userId } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  const form = useForm<z.infer<typeof experienceSchema>>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {},
  });

  const onSubmit = async (values: z.infer<typeof experienceSchema>) => {
    try {
      setIsLoading(true);
      console.log(values);
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="full px-1 mt-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-2 md:gap-8 lg:gap-12 gap-5">
            <ExpCustominput
              name="role"
              placeholder="Backend devloper"
              label="WHAT WAS YOUR ROLE AT THE COMPANY?"
              control={form.control}
            />
            <ExpCustominput
              name="companyName"
              placeholder="Mirosoft"
              label="FOR WHICH COMPANY DID YOU WORK?"
              control={form.control}
            />
            <ExpCustominput
              name="compunyLocation"
              placeholder="New York"
              label="WHERE WAS THE COMPANY LOCATED?"
              control={form.control}
            />

            <FormField
              control={form.control}
              name="workingDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-[18px]">
                    HOW LONG WERE YOU WITH THE COMPANY?
                  </FormLabel>
                  <Popover>
                    <FormControl>
                      <div className="">
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground text-left"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date?.from ? (
                              date.to ? (
                                <>
                                  {format(date.from, "LLL dd, y")} -{" "}
                                  {format(date.to, "LLL dd, y")}
                                </>
                              ) : (
                                format(date.from, "LLL dd, y")
                              )
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={2}
                          />
                        </PopoverContent>
                      </div>
                    </FormControl>
                  </Popover>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="descripation"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Role Descripation</FormLabel>
                    <Button className="flex items-center justify-center  bg-gradient-to-r from-cyan-500 rounded-3xl to-[#9254cc]">
                      <Activity className="mr-2" /> Generate
                    </Button>
                  </div>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none focus-visible:ring-[#9254cc]"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full md:w-auto lg:w-auto mt-6 bg-[#9254cc] hover:bg-[#9254cc]/90 md:px-6"
          >
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Experience;
