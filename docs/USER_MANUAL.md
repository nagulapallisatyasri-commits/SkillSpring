# SkillSpring — Application User Manual

> **User Manual & Feature Guide**  
> **Application:** SkillSpring Learning Management Portal  
> **Target Audience:** Students, Instructors, and Academic Reviewers

---

## 1. Accessing the Portal

1. Open your web browser (Google Chrome, Microsoft Edge, or Safari).
2. Enter the application URL in the address bar:
   ```text
   http://localhost:3000
   ```
3. The SkillSpring Homepage will load displaying the top navigation bar, the hero banner, and the course catalogue.

---

## 2. Navigating the Homepage

- **Top Navigation Bar:**
  - **Brand Logo:** Click to return to the home catalogue from any page.
  - **Catalogue Link:** Quick navigation to browse all courses.
  - **My Learning Link:** Takes you directly to your personalized student dashboard.
- **Hero Banner:**
  - Introduces the platform mission: *"Learn Today. Build Tomorrow."*
  - Features quick statistics regarding verified curriculum tracks and active cohorts.
- **Promotional Track Carousel:**
  - Automatically highlights featured domain tracks (Web Development, Data Science, Artificial Intelligence, Core Programming, Career Skills).
  - Use previous/next arrows or bullet indicators to manually slide through banners.

---

## 3. Searching and Filtering Courses

- **Keyword Search:**
  - Locate the search input box (`#search-input`) above the catalogue grid.
  - Type keywords such as `"Python"`, `"React"`, or `"Data"`.
  - The course grid dynamically updates to show only matching courses in real-time.
- **Category Filter:**
  - Click any category pill (e.g., *Programming*, *Web Development*, *Data Science*, *Software Testing*) to isolate specific tech stacks.
- **Difficulty Filter:**
  - Filter courses based on skill level: *Beginner*, *Intermediate*, or *Advanced*.
- **Empty State:**
  - If no course matches your search query, an informative message (`"No courses found matching your criteria"`) is displayed with a button to reset your filters.

---

## 4. Viewing Course Details

1. On any course card, click the **"View Details"** or **"Explore Curriculum"** button.
2. The browser navigates to `/courses/[courseId]` (e.g., `/courses/python-automation`).
3. **Left Curriculum Sidebar:** Displays the course modules, lesson checklist, and completion progress bar.
4. **Right Content Area:**
   - Course title, summary, instructor name, and estimated duration.
   - **Seat Availability Badge:** Displays remaining seats or indicates if the course is full.
   - **Prerequisites & Learning Outcomes:** Summarizes foundational knowledge required and skills gained.

---

## 5. Enrolling in a Course

1. On the course details page, locate the **"Enrol Now"** button.
2. Click **"Enrol Now"**.
3. **Success State:**
   - A success notification confirms your enrolment.
   - The available seat count automatically decrements.
   - The course is registered in your personal profile.
4. **Full Course Handling:**
   - If a course has 0 available seats, the button is visibly disabled and marked **"Course Full"**.
   - Attempting to enrol will show a warning alert explaining that maximum capacity has been reached.

---

## 6. Accessing "My Learning" Dashboard

1. Click **"My Learning"** in the top navigation bar or navigate to `/my-learning`.
2. The dashboard presents:
   - **Summary KPI Cards:** Total enrolled courses, completed modules, lessons finished, and average progress.
   - **Continue Learning:** Quick cards to immediately resume active lessons.
   - **Enrolled Courses Table:** Detailed summary table listing:
     - Course Title
     - Enrolment Date / Status
     - Completion Progress Bar (%)
     - Action button to continue the course.

---

## 7. Interactive Lesson Player

1. From the course view or My Learning, open a lesson (e.g., `/learn/python-automation/lesson/lesson-1-intro`).
2. **Reading the Module:** Review concepts, formatted code blocks, and key takeaways.
3. **Completing a Lesson:**
   - Scroll to the bottom and click **"Mark as Complete"**.
   - The button updates to show a completed checkmark.
   - Your course progress bar updates dynamically.
4. **Locked Lessons:**
   - Modules with prerequisite requirements display a lock icon in the sidebar.
   - Clicking a locked module presents an alert explaining that prior lessons must be completed first.

---

## 8. Taking Quizzes & Assessing Knowledge

1. Navigate to the course quiz module (e.g., `/learn/python-automation/quiz`).
2. Select your answer for each multiple-choice question using the radio buttons.
3. Click **"Submit Assessment"**.
4. **Evaluation & Feedback:**
   - The quiz engine computes your score instantly (e.g., `Score: 2/2 (100%)`).
   - A color-coded feedback banner displays **"Passed"** (Green) or **"Needs Improvement"** (Red) along with explanations for each question.
