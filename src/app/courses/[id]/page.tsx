import { MOCK_COURSES } from "@/data/mockCourses";
import CourseDetailsClient from "./CourseDetailsClient";

export function generateStaticParams() {
  return MOCK_COURSES.map((course) => ({
    id: course.id,
  }));
}

export default function CoursePage({ params }: { params: { id: string } }) {
  const { id } = params;
  return <CourseDetailsClient courseId={id} />;
}
