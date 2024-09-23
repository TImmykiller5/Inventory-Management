import React from 'react'
import CreateSales from './components/createSales'
import WeekSales from './components/weekSales'
import MonthSales from './components/monthSales'
import SalesTable from './components/SalesClient'
import SalesDetails from './components/salesDetails'
import { product, sale, store } from '@/lib/types'

type Props = {
  products: Partial<product>[],
  sales: sale[],
  stores: store[],
  monthlySales: Omit<sale, "product">[],
  weeklySales: Omit<sale, "product">[],
  lastWeekSales: Omit<sale, "product">[],
  lastTwoMonthSales: Omit<sale, "product">[],
}

const Blocks = (props: Props) => {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-3">
            <div className="grid gap-4 md:grid-cols-2 mdd:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <CreateSales stores={props.stores} products={props.products} />
              <WeekSales lastWeekSales={props.lastWeekSales} weeklySales={props.weeklySales} />
              <MonthSales lastTwoMonthSales={props.lastTwoMonthSales} monthlySales={props.monthlySales} />
            </div>
           
            <SalesTable sales={props.sales} />
          </div>
          {/* <div>
            <SalesDetails />
          </div> */}
    </main>
  )
}

export default Blocks