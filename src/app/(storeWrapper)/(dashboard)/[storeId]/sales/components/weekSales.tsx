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
import { sale } from "@/lib/types";
type Props = {
  weeklySales: Omit<sale, "product">[],
  lastWeekSales: Omit<sale, "product">[],

};



const WeekSales = (props: Props) => {

  const weeksTotal = props.weeklySales.reduce((acc, sale) => acc + sale.amount, 0);
  const formattedTotal = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format(weeksTotal);
  const lastWeekTotal = props.lastWeekSales.reduce((acc, sale) => acc + sale.amount, 0);

  const percentageIncrease = lastWeekTotal === 0 ? 100 : ((weeksTotal - lastWeekTotal) / lastWeekTotal) * 100;

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

export default WeekSales;
