import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";
import { designationSchema } from "@/lib/formschema";

interface CustominputProps {
  control: Control<z.infer<typeof designationSchema>>;
  name: FieldPath<z.infer<typeof designationSchema>>;
  placeholder: string;
  label: string;
}

const DesCustominput = ({
  control,
  name,
  placeholder,
  label,
}: CustominputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-nowrap">{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="my-4 w-full focus:ring-[#FF0000] focus-visible:ring-1 focus-visible:ring-[#9254cc] rounded-mdprim-input"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DesCustominput;
