import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";

import { IconBadge } from "@/components/icon-badge";
import { formatPrice } from "@/lib/format";
import ReadmoreReadless from "./providers/readmore-readless";
import { CourseProgress } from "@/components/course-progress";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  progress: number | null;
  category: string;
}

export const CourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category,
}: CourseCardProps) => {
  return (
    <Link href={`/courses/${id}`}>
      {/* <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image
            fill
            className="object-cover"
            alt={title}
            src={imageUrl}
          />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
            {title}
          </div>
          <p className="text-xs text-muted-foreground">
            {category}
          </p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="sm" icon={BookOpen} />
              <span>
                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
              </span>
            </div>
          </div>
          {progress !== null ? (
            <CourseProgress
              variant={progress === 100 ? "success" : "default"}
              size="sm"
              value={progress}
            />
          ) : (
            <p className="text-md md:text-sm font-medium text-slate-700">
              {formatPrice(price)}
            </p>
          )}
        </div>
      </div> */}
      <div className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-2xl hover:cursor-pointer transition-transform hover:scale-105">
        <div className="relative mx-4 mt-4 overflow-hidden text-white shadow-2xl rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
          <Image
            className="object-cover h-[186px] w-[266px]"
            alt={title}
            src={imageUrl}
            width={265}
            height={166}
          />
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h5 className="block font-sans text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
              {/* <ReadmoreReadless text={title.toLocaleUpperCase()} /> */}
              {title.toLocaleUpperCase()}
            </h5>
            {/* <p className="flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="-mt-0.5 h-5 w-5 text-yellow-700"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              ></path>
            </svg>
            5.0
          </p> */}
          </div>
          <p className="block font-sans text-base antialiased font-light leading-relaxed text-gray-700">
            {category}
          </p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="sm" icon={BookOpen} />
              <span>
                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
              </span>
            </div>
          </div>
          {progress !== null ? (
            <CourseProgress
              variant={progress === 100 ? "success" : "default"}
              size="sm"
              value={progress}
            />
          ) : (
            <p className="text-md md:text-sm font-medium text-slate-700">
              {formatPrice(price)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

// return (
//   <>
//     <div className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-2xl hover:cursor-pointer transition-transform hover:scale-105">
//       <div className="relative mx-4 mt-4 overflow-hidden text-white shadow-2xl rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
//         <Image fill className="object-cover" alt={title} src={imageUrl} />
//       </div>
//       <div className="p-6">
//         <div className="flex items-center justify-between mb-3">
//           <h5 className="block font-sans text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
//             {title.toLocaleUpperCase()}
//           </h5>
//           {/* <p className="flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="currentColor"
//               className="-mt-0.5 h-5 w-5 text-yellow-700"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
//                 clipRule="evenodd"
//               ></path>
//             </svg>
//             5.0
//           </p> */}
//         </div>
//         <p className="block font-sans text-base antialiased font-light leading-relaxed text-gray-700">
//           {category}
//         </p>
//         <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
//           <div className="flex items-center gap-x-1 text-slate-500">
//             <IconBadge size="sm" icon={BookOpen} />
//             <span>
//               {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
//             </span>
//           </div>
//         </div>
//         {progress !== null ? (
//           <CourseProgress
//             variant={progress === 100 ? "success" : "default"}
//             size="sm"
//             value={progress}
//           />
//         ) : (
//           <p className="text-md md:text-sm font-medium text-slate-700">
//             {formatPrice(price)}
//           </p>
//         )}
//       </div>
//     </div>
//   </>
// );
