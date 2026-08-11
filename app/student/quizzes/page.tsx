"use client";

import { useApiList } from "@/lib/useApiList";
import AsyncList from "@/components/AsyncList";
import { Icon } from "@/components/icons";
// Assuming you have a reusable QuizCard or QuizListItem component in your codebase
// If you don't have one yet, we layout the list item UI cleanly inside the mapper loop!

// 1. Declare the type contract shape for your quiz objects matching your backend models
interface Quiz {
  id: string;
  title: string;
  description?: string;
  due_date: string;
  is_published: boolean;
  total_questions?: number;
  // Add other matching API serialization parameter fields here
}

// 2. Ensure this function has the 'export default' prefix explicitly attached
export default function Page() {
  // 3. Request your quizzes backend tracking route
  const { data, loading, error, reload } = useApiList<Quiz>("/quizzes/");

  // 4. Safely extract the results array using your standard pagination fallback pattern
  const rawPayload = data as any;
  const quizzesArray: Quiz[] = rawPayload?.results ?? [];

  return (
    <>
      {/* Header Container Area */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-black">Available Quizzes</h1>
          <p className="text-sm text-[#667085] mt-1">Complete your assigned evaluations before their due dates.</p>
        </div>
      </div>

      {/* 5. Bind the validation rules directly to your isolated quizzesArray variable */}
      <AsyncList
        loading={loading}
        error={error}
        isEmpty={quizzesArray.length === 0}
        emptyText="No quizzes assigned yet."
        onRetry={reload}
      >
        {/* Render Grid Layout */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quizzesArray.map((q) => (
            <div 
              key={q.id} 
              className="rounded-xl border border-[#E4E7EC] bg-white p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div>
                {/* Upper Icon + Title Section */}
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-lg text-[#1B2430] line-clamp-1">
                    {q.title}
                  </h3>
                  <Icon name="quizzes" className="h-5 w-5 text-[#667085]" style={{ color: "var(--accent)" }} />
                </div>
                
                {/* Description Text */}
                <p className="mt-2 text-sm text-[#667085] line-clamp-2 min-h-[40px]">
                  {q.description || "No description provided for this evaluation."}
                </p>
              </div>

              {/* Lower Metadata Information Block */}
              <div className="mt-4 pt-4 border-t border-[#F2F4F7] flex items-center justify-between text-xs text-[#667085]">
                <span className="flex items-center gap-1.5 font-medium">
                  <Icon name="schedule" className="h-3.5 w-3.5" />
                  Due: {new Date(q.due_date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                  })}
                </span>
                
                {/* Interactive Action Trigger Link Button */}
                <button 
                  className="rounded-lg px-3 py-1.5 text-xs font-semibold text-white transition-colors duration-200 hover:opacity-90"
                  style={{ backgroundColor: "var(--accent)" }}
                >
                  Start Quiz
                </button>
              </div>
            </div>
          ))}
        </div>
      </AsyncList>
    </>
  );
}
