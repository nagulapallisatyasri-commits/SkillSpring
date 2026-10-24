import { MOCK_COURSES } from "@/data/mockCourses";
export const instant = false;
import { Suspense } from "react";
import CourseDetailsClient from "./CourseDetailsClient";

export function generateStaticParams() {
  return MOCK_COURSES.map((course) => ({
    id: course.id,
  }));
}

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <Suspense fallback={<div>Loading course details...</div>}>
      <CourseDetailsClient courseId={id} />
    </Suspense>
  );
}
