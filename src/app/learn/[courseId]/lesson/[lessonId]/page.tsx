import { MOCK_COURSES } from "@/data/mockCourses";
import LessonPlayerClient from "./LessonPlayerClient";

export function generateStaticParams() {
  const paths: { courseId: string; lessonId: string }[] = [];
  MOCK_COURSES.forEach((course) => {
    course.lessons.forEach((lesson) => {
      paths.push({
        courseId: course.id,
        lessonId: lesson.id,
      });
    });
  });
  return paths;
}

export default function LessonPage({ params }: { params: { courseId: string; lessonId: string } }) {
  const { courseId, lessonId } = params;
  return (
    <LessonPlayerClient
      courseId={courseId}
      lessonId={lessonId}
    />
  );
}
