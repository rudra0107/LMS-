import { Category, Course } from "@prisma/client";

import { CourseCard } from "@/components/course-card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

interface CoursesListProps {
  items: CourseWithProgressWithCategory[];
}

export const CoursesList = ({ items }: CoursesListProps) => {
  return (
    <div>
      <div className="w-full px-12">
        <Carousel className="">
          <CarouselContent>
            <div className="card-list w-85vw grid grid-cols-4 gap-10 mt-4 mb-4 ml-2 mr-2">
              {items.map((item) => (
                <CarouselItem
                  className="md:basis-1/2 lg:basis-1/3"
                  key={item.id}
                >
                  <CourseCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    imageUrl={item.imageUrl!}
                    chaptersLength={item.chapters.length}
                    price={item.price!}
                    progress={item.progress}
                    category={item?.category?.name!}
                  />
                </CarouselItem>
              ))}
            </div>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No courses found
        </div>
      )}
    </div>
  );
};
