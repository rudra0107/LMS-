"use client";

import * as z from "zod";
import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import { Pencil, PlusCircle, Video } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter, MuxData } from "@prisma/client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "@/lib/firebase";

interface ChapterVideoFormProps {
  initialData: Chapter & { muxData?: MuxData | null };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

export const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const [video, setVideo] = useState<File | null>(null);
  const [videoPercent, setVideoPercent] = useState(0);
  const [inputs, setInputs] = useState({});

  const [showPercent, setShowPercent] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const uploadFile = (file: File, urlType: string) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;

    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    console.log(urlType);
    console.log(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setShowPercent(true);
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setVideoPercent(Math.round(progress));
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
          console.log(downloadURL);
          setInputs((prev: any) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    else {
      setVideo(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Event Handler: ", e);

    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        inputs
      );
      console.log("Inputs", inputs);

      toast.success("Chapter updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  // const onSubmit = async (values: z.infer<typeof formSchema>) => {
  //   try {
  //     await axios.patch(
  //       `/api/courses/${courseId}/chapters/${chapterId}`,
  //       values
  //     );
  //     toast.success("Chapter updated");
  //     toggleEdit();
  //     router.refresh();
  //   } catch {
  //     toast.error("Something went wrong");
  //   }
  // };

  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter video
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a video
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit video
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <Video className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <MuxPlayer playbackId={initialData?.muxData?.playbackId || ""} />
          </div>
        ))}
      {isEditing && (
        <div>
          {/* <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          /> */}

          <input
            className="border border-soft text-text rounded-md px-4 py-2 bg-transparent z-10"
            type="file"
            name="imageFile"
            accept="'image/*"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleOnchange(e)
            }
          />
          {showPercent ? (
            <>
              <p>{videoPercent}% uploaded</p>
              <Button onClick={handleUpload}>Upload</Button>
            </>
          ) : (
            <></>
          )}

          <div className="text-xs text-muted-foreground mt-4">
            Upload this chapter&apos;s video
          </div>
        </div>
      )}
      {initialData.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Videos can take a few minutes to process. Refresh the page if video
          does not appear.
        </div>
      )}
    </div>
  );
};
