# Course Management Platform (Backend API)

This is the backend I built for managing a course platform. It handles users (with roles like Admin, Facilitator, Learner), courses, and course offerings. I used Node.js, Express, MySQL with Sequelize ORM, Redis for caching, and added localization support (English for now).

## What It Can Do

- Users can sign up and log in.
- Admins can create users, courses, and course offerings.
- Facilitators can see the courses they are teaching.
- Learners can view all available course offerings.
- Caching is added for performance (especially on fetching course lists).
- Supports multiple languages (currently English and French).
- Swagger docs are included for testing endpoints easily.

---

## Tech Stack I Used

- **Node.js + Express** – server and routing
- **MySQL + Sequelize** – database and ORM
- **Redis** – to cache some GET responses
- **JWT** – for login/authentication
- **i18n** – for localization
- **Swagger UI** – for API documentation and testing

---

## How to Run This (Local Setup)

### 1. Clone the project

```bash
git clone https://github.com/kkarangwa/course-management-platform
cd course-management-platform
