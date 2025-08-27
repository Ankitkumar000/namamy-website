export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-4">
          <div className="w-8 h-8 border-4 border-makhana-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}