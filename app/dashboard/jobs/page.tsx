import PageHeader from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

function Jobs() {
  return (
    <div>
      <PageHeader
        title="Job Offers"
        rightComponent={
          <Link href={"/dashboard/jobs/new"}>
            <Button size={"sm"}>Create New</Button>
          </Link>
        }
      />
      <Card className="mt-5">
        <CardContent className="pt-5">
          <p>Job Lists</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default Jobs;
