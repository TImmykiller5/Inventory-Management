import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { purchase } from "@/lib/types";
type Props = {
  weeklyPurchase: Omit<purchase, "product">[];
  lastWeekPurchase: Omit<purchase, "product">[];
};

const weekPurchase = (props: Props) => {
  const weekTotal = props.weeklyPurchase.reduce((acc, purchase) => acc + purchase.amount,0);
  const formattedTotal = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format(weekTotal);
  const lastWeekTotal = props.lastWeekPurchase.reduce((acc, purchase) => acc + purchase.amount,0);

  const percentageIncrease = lastWeekTotal === 0 ? 100 : ((weekTotal - lastWeekTotal) / lastWeekTotal) * 100;

  return (
      <Card x-chunk="dashboard-05-chunk-1">
        <CardHeader className="pb-2">
          <CardDescription>This Week</CardDescription>
          <CardTitle className="text-3xl break-words">{formattedTotal}</CardTitle>

        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
          {percentageIncrease}% {percentageIncrease > 0 ? "increase" : "decrease"} from last week
          </div>
        </CardContent>
        <CardFooter>
          <Progress value={percentageIncrease} aria-label={`${percentageIncrease}% increase`} />
        </CardFooter>
      </Card>
  );
};

export default weekPurchase;
