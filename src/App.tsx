import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";

const FeedPage = lazy(() => import("@/features/feed"));
const AuthPage = lazy(() => import("@/features/auth"));
const SettingsPage = lazy(() => import("@/features/settings"));
const DetailPage = lazy(() => import("@/features/licitacion-detail"));

function PageSkeleton() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-pulse space-y-4 w-full max-w-2xl p-8">
        <div className="h-8 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Routes>
        <Route path="/" element={<FeedPage />} />
        <Route path="/licitacion/:id" element={<DetailPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
