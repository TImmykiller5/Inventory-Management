import React from 'react'
import WeekPurchase from './components/weekPurchase'
import MonthPurchase from './components/monthPurchase'
import { product, purchase, store } from '@/lib/types'
import PurchaseDetails from './components/purchaseDetails'
import CreatePurchase from './components/createPurchase'
import PurchaseTable from './components/purchaseClient'


type Props = {
  products: Partial<product>[],
  purchase: purchase[],
  stores: store[],
  monthlyPurchase: Omit<purchase, "product">[],
  weeklyPurchase: Omit<purchase, "product">[],
  lastWeekPurchase: Omit<purchase, "product">[],
  lastTwoMonthPurchase: Omit<purchase, "product">[],
}

const Blocks = (props: Props) => {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid  auto-rows-max  items-start gap-4 md:gap-8 lg:col-span-3">
            <div className="grid gap-4 md:grid-cols-2  lg:grid-cols-2 xl:grid-cols-4">
              <CreatePurchase stores={props.stores} products={props.products} />
              <WeekPurchase lastWeekPurchase={props.lastWeekPurchase} weeklyPurchase={props.weeklyPurchase}  />
              <MonthPurchase lastTwoMonthPurchase={props.lastTwoMonthPurchase} monthlyPurchase={props.monthlyPurchase} />
            </div>
           
            <PurchaseTable purchase={props.purchase} />
          </div>
          {/* <div>
            <PurchaseDetails />
          </div> */}
    </main>
  )
}

export default Blocks