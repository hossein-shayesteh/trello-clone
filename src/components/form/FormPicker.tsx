"use client";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { Check, Loader2 } from "lucide-react";
import { unsplash } from "@/src/lib/unsplash/unsplash";
import { cn } from "@/src/lib/utils";
import { boardImages } from "@/src/constant/board-images";
import FormErrors from "@/src/components/form/FromErrors";

// Define the props for the FormPicker component
interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

// FormPicker component
const FormPicker = ({ errors, id }: FormPickerProps) => {
  // State to store images fetched from Unsplash or default images
  const [images, setImages] = useState<Record<string, any>>([]);
  // State to track the loading status
  const [isLoading, setIsLoading] = useState(true);
  // State to track the selected image
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  // Get the form submission status
  const { pending } = useFormStatus();

  // useEffect hook to fetch images from Unsplash on component mount
  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Fetch random images from a specific Unsplash collection
        const result = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        });
        if (result && result.response) {
          const resultImages = result.response as Array<Record<string, any>>;
          setImages(resultImages);
        } else {
          console.log("Failed to fetch images from Unsplash.");
        }
      } catch (e) {
        console.log(e);
        // Fallback to default images if Unsplash fetch fails
        setImages(boardImages);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages().then();
  }, []);

  // Show a loading spinner while images are being fetched
  if (isLoading)
    return (
      <div className={"flex items-center justify-center p-6"}>
        <Loader2 className={"h-6 w-6 animate-spin text-sky-700"} />
      </div>
    );

  // Render the image selection grid
  return (
    <div className={"relative"}>
      <div className={"mb-2 grid grid-cols-3 gap-2"}>
        {images.map((image: any) => (
          <div
            className={cn(
              "relative aspect-video cursor-pointer bg-muted transition hover:opacity-75",
              pending && "cursor-auto opacity-50 hover:opacity-50",
            )}
            key={image.id}
            onClick={() => {
              if (pending) return;
              setSelectedImage(image.id);
            }}
          >
            {selectedImage === image.id && (
              <div
                className={
                  "absolute inset-y-0 flex h-full w-full items-center justify-center bg-black/30 "
                }
              >
                <Check className={"h-4 w-4 text-white"} />
              </div>
            )}
            <input
              id={id}
              name={id}
              type={"radio"}
              className={"hidden"}
              checked={selectedImage === image.id}
              disabled={pending}
              value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.html}`}
            />
            <img
              src={image.urls.thumb}
              alt={"Unsplash image."}
              className={"h-full w-full rounded-sm object-cover "}
            />
            <Link
              href={image.links.html}
              target={"_blank"}
              className={
                "absolute bottom-0 w-full truncate bg-black/50 p-1 text-[10px] text-white opacity-0 hover:underline hover:opacity-100"
              }
            >
              {image.user.name}
            </Link>
          </div>
        ))}
      </div>
      <FormErrors id={"image"} errors={errors} />
    </div>
  );
};
export default FormPicker;
