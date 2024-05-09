"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import { useEffect } from "react";
// import styled from "styled-components";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "@/lib/firebase";
// import { app } from "../firebase";

interface ImageFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

export const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setvideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState(null);

  const uploadFile = (file: File, urlType: string) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;

    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    console.log(urlType);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl"
          ? setImgPerc(Math.round(progress))
          : setvideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev: any) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  useEffect(() => {
    image && uploadFile(image, "imageUrl");
  }, [image]);

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    else {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("handleUpload", inputs, formSchema);
    try {
      await axios.patch(`/api/courses/${courseId}`, inputs);
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course image
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an image
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-md"
              src={initialData.imageUrl}
            />
          </div>
        ))}
      {isEditing && (
        <div>
          {/* <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              console.log("URL", url);
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          /> */}
          {imgPerc > 0 ? (
            "Uploading image: " + imgPerc + "%"
          ) : (
            // <Input
            //   type="file"
            //   name="imageFile"
            //   accept="'image/*"
            //   onChange={(e) => setImage(e.target.files[0])}
            // />
            <input
              className="border border-soft text-text rounded-md px-4 py-2 bg-transparent z-10"
              type="file"
              name="imageFile"
              accept="'image/*"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleOnchange(e)
              }
            />
          )}
          <button onClick={handleUpload}>Upload</button>
          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  );
};
