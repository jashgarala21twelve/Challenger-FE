import { toast } from "@/hooks/use-toast";

const Toast = (
  variant:
    | "default"
    | "destructive"
    | "success"
    | "info"
    | "warning" = "default",
  title: string,
  description?: string,

  duration: number = 3000
) => {
  const variantStyles: Record<string, string> = {
    default: "",
    destructive: "bg-red-600 text-white",
    success: "bg-green-600 text-white",
    info: "bg-primary text-white",
    warning: "bg-yellow-500 text-black",
  };

  toast({
    title,
    description,
    className: variantStyles[variant] || "",
    duration,
  });
};

export default Toast;
