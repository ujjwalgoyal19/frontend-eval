import ProblemCard from "../components/ProblemCard";
import { problems } from "../lib/problems";

export default function Home() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold">Frontend Eval Problems</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Select a problem to open
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {problems.map((p) => (
          <ProblemCard key={p.id} problem={p} />
        ))}
      </div>
    </div>
  );
}
