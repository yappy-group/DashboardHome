import { Card, CardContent } from "@/components/ui/card";

export default function Placeholder({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] space-y-4 text-center">
      <div className="p-4 bg-gray-100 rounded-full">
        <div className="w-12 h-12 border-2 border-dashed border-gray-300 rounded-full" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <p className="text-gray-500 max-w-md">
        This feature is currently under development. Check back soon for updates.
      </p>
    </div>
  );
}
