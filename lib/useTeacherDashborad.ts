"use client";

import {useEffect, useState} from "react";
import { api } from "@/lib/api";
import type { TeacherClass } from "@/types/class";

export function useTeacherDashboard() {
  const [classes, setClasses] = useState<TeacherClass[]>([]);
  const [assignmentCount, setAssignmentsCount] = useState(0);//initialization
  const [quizCount, setQuizCount] = useState(0);//initialization
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);


  return { classes, assignmentCount, quizCount, loading, error };
}
