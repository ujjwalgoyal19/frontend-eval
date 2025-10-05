import { Link } from "react-router";
import type { Problem } from "../lib/problems";
import { Button } from "./ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function ProblemCard({ problem }: { problem: Problem }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{problem.title}</CardTitle>
        <CardDescription>{problem.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button asChild variant="outline">
          <Link to={problem.path}>Open</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
