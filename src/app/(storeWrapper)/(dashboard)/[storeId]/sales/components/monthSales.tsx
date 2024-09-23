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
  monthlySales: Omit<sale, "product">[],
  lastTwoMonthSales: Omit<sale, "product">[],
};

const MonthSales = (props: Props) => {

  const monthTotal = props.monthlySales.reduce((acc, sale) => acc + sale.amount, 0);
  const formattedTotal = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format(monthTotal);
  const lastMonthTotal = props.lastTwoMonthSales.reduce((acc, sale) => acc + sale.amount, 0);

  const percentageIncrease = lastMonthTotal === 0 ? 100 : ((monthTotal - lastMonthTotal) / lastMonthTotal) * 100;
  return (
      <Card x-chunk="dashboard-05-chunk-2 ">
        <CardHeader className="pb-2">
          <CardDescription>This Month</CardDescription>
          <CardTitle className="text-3xl break-words" >{formattedTotal}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            {/* +10% from last month */}
            {percentageIncrease}% {percentageIncrease > 0 ? "increase" : "decrease"} from last month
          </div>
        </CardContent>
        <CardFooter>
          <Progress value={percentageIncrease} aria-label={`${percentageIncrease}% increase`} />
        </CardFooter>
      </Card>
  );
};

export default MonthSales;
