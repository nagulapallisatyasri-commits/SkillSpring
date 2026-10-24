import { MOCK_COURSES } from "@/data/mockCourses";
import CourseQuizClient from "./CourseQuizClient";

export function generateStaticParams() {
  return MOCK_COURSES.map((course) => ({
    courseId: course.id,
  }));
}

export default function QuizPage({ params }: { params: { courseId: string } }) {
  const { courseId } = params;
  return <CourseQuizClient courseId={courseId} />;
}
