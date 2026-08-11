import type { Role } from "@/types/auth";

export interface NavItem {
    label: string;
    href: string;
    icon: string;
}

export interface RoleTheme {
    label: string;
    accent: string;
    greetingNoun: string;
    nav: NavItem[];
}

export const roleTheme: Record<Role, RoleTheme> = {
    TEACHER: {
        label: "Teacher",
        accent: "blue",
        greetingNoun: "teacher",
        nav: [
            { label: "Dashboard", href: "/teacher/dashboard", icon: "home" },
            {label: "My Classes", href: "/teacher/my-classes", icon: "book"},
            {label: "Assignments", href: "/teacher/assignments", icon: "assignments"},
            {label: "Quizzes", href: "/teacher/quizzes", icon: "quizzes"},
            {label: "Live Classes", href: "/teacher/live-classes", icon: "live" },
            {label: "Notes", href: "/teacher/notes", icon: "book" },
            {label: "Enrollments", href: "/teacher/enrollments", icon: "enrollments" },
            {label: "Messages", href: "/teacher/messages", icon: "messages" },
            {label: "Notifications", href: "/teacher/notifications", icon: "notifications" },
            {label: "Profile", href: "/teacher/profile", icon: "profile" }
        ]    
    },

    ADMIN: {
        label: "Admin",
        accent: "red",
        greetingNoun: "administrator",
        nav: [
            { label: "Dashboard", href: "/admin/dashboard", icon: "home" },
            { label: "Users", href: "/admin/users", icon: "users" },
            { label: "Settings", href: "/admin/settings", icon: "settings" }
        ]
    },

    SUPERUSER: {
        label: "Super User",
        accent: "purple",
        greetingNoun: "super user",
        nav: [
            { label: "Dashboard", href: "/superuser/dashboard", icon: "home" },
        ]
    },

    STUDENT: {
        label: "Student",
        accent: "green",
        greetingNoun: "student",
        nav: [
            { label: "Dashboard", href: "/student/dashboard", icon: "home" },
            { label: "My Classes", href: "/student/my-classes", icon: "book" },
            { label: "Notes", href: "/student/notes", icon: "book" },
            { label: "Live Classes", href: "/student/live-classes", icon: "live" },
            { label: "Assignments", href: "/student/assignments", icon: "assignments" },
            { label: "Quizzes", href: "/student/quizzes", icon: "quizzes" },
            { label: "Notifications", href: "/student/notifications", icon: "notifications" },
            { label: "Profile", href: "/student/profile", icon: "profile" }
        ]
    },
}