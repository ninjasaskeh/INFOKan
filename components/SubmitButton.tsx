"use client";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface IAppProps {
  text: string;
  variant?:
    | "secondary"
    | "default"
    | "outline"
    | "ghost"
    | "link"
    | "destructive"
    | null
    | undefined;
}
const SubmitButton = ({ text, variant }: IAppProps) => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled className="w-full" variant={variant}>
          <Loader2 className="size-4 mr-2 animate-spin" />
          Please wait...
        </Button>
      ) : (
        <Button variant={variant} type="submit" className="w-full">
          {text}
        </Button>
      )}
    </>
  );
};
export default SubmitButton;
