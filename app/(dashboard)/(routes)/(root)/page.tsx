import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { SearchInput } from "@/components/search-input";
import { getCourses } from "@/actions/get-courses";
import { CoursesList } from "@/components/courses-list";
import Hero from "@/components/hero";
import HeroSection from "@/components/heroSection";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// import

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Categories } from "./_components/categories";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  // console.log(categories);

  const CSCourses = await getCourses({
    userId,
    categoryId: categories[1].id,
  });

  const filmingCourses = await getCourses({
    userId,
    categoryId: categories[3].id,
  });

  const engineeringCourses = await getCourses({
    userId,
    categoryId: categories[2].id,
  });

  return (
    <>
      <Hero />
      <div className="p-6 space-y-4">
        <div>
          <h2 className="text-3xl font-bold ml-14 my-4">
            Computer Science Courses
          </h2>
          <CoursesList items={CSCourses} />
        </div>
        <div>
          <h2 className="text-3xl font-bold ml-14 my-4">Filming Courses</h2>
          <CoursesList items={filmingCourses} />
        </div>
        <div>
          <h2 className="text-3xl font-bold ml-14 my-4">Engineering Courses</h2>
          <CoursesList items={engineeringCourses} />
        </div>
      </div>
      <div className="flex justify-center">
        <Link href="/search">
          <Button
            variant="secondary"
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-gray-800 text-gray-800 hover:border-gray-500 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:border-white dark:text-white dark:hover:text-neutral-300 dark:hover:border-neutral-300 mb-7"
          >
            Get All Coures
          </Button>
        </Link>
      </div>
      <div className="my-2">
        <HeroSection />
      </div>
      <div className="my-4">
        <Footer />
      </div>
    </>
  );
};

export default SearchPage;
