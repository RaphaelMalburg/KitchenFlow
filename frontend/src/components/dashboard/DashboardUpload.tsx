import { MutableRefObject } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadImageAPI } from "@/apis/RosterImages";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface DashboardImageUploadProps {
  closeHandle: MutableRefObject<HTMLElement | null>;
}

const maxSize = 2 * 1024 * 1024; // 2MB

const formSchema = z.object({
  image: z
    .any()
    .refine((file) => file?.size <= maxSize, "File size should be less than 2MB")
    .refine((file) => ["image/jpeg", "image/png", "image/gif"].includes(file?.type), "Only .jpg, .png, and .gif files are allowed"),
});

type FormSchemaType = z.infer<typeof formSchema>;

const DashboardImageUpload: React.FC<DashboardImageUploadProps> = ({ closeHandle }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormSchemaType) => {
    const formData = new FormData();
    formData.append("image", data.image);

    try {
      await uploadImageAPI(formData);
    } catch (error) {
      console.log(error);
    } finally {
      closeHandle.current?.click();
      window.location.reload();
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getErrorMessage = (error: any): string | undefined => {
    if (typeof error === "string") {
      return error;
    }
    if (error && "message" in error && typeof error.message === "string") {
      return error.message;
    }
    return undefined;
  };

  return (
    <div className="grid gap-4">
      <h1>Upload Roster</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Only image files</Label>
        <Controller
          name="image"
          control={control}
          defaultValue={null}
          render={({ field }) => (
            <Input
              id="picture"
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setValue("image", e.target.files[0]);
                  field.onChange(e.target.files[0]);
                }
              }}
            />
          )}
        />
        {errors.image && <p className="text-red-500">{getErrorMessage(errors.image)}</p>}
        <Button type="submit">Upload</Button>
      </form>
    </div>
  );
};

export default DashboardImageUpload;
