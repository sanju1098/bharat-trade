import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import {
  useStockData,
  mockStocks,
  generatePriceHistory,
} from "@/utils/stocksApi";
import { StockCard } from "@/components/stocks/StockCard";
import { StockChart } from "@/components/stocks/StockChart";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Stocks = () => {
  const stocks = useStockData(mockStocks);
  const [selectedStock, setSelectedStock] = React.useState(stocks[0]);
  const [searchQuery, setSearchQuery] = React.useState("");

  const stocksWithHistory = stocks.map((stock) => {
    return {
      ...stock,
      priceHistory: generatePriceHistory(30, stock.price, 2),
    };
  });

  const filteredStocks = stocksWithHistory.filter(
    (stock) =>
      stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageLayout title="Stocks">
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search stocks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Top section - Stocks and Market Cap */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStocks.map((stock) => (
            <StockCard
              key={stock.symbol}
              stock={stock}
              priceHistory={stock.priceHistory}
              onClick={() => setSelectedStock(stock)}
              className={
                selectedStock.symbol === stock.symbol
                  ? "ring-2 ring-primary"
                  : ""
              }
            />
          ))}
        </div>

        {/* Bottom section - Chart */}
        <div className="space-y-4">
          <StockChart
            symbol={selectedStock.symbol}
            name={selectedStock.name}
            currentPrice={selectedStock.price}
            volatility={2.5}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card rounded-lg p-4 shadow">
              <h3 className="font-medium text-sm text-muted-foreground">
                Market Cap
              </h3>
              <p className="text-xl font-semibold mt-1">
                ₹{(selectedStock.marketCap / 1000000000).toFixed(2)}B
              </p>
            </div>
            <div className="bg-card rounded-lg p-4 shadow">
              <h3 className="font-medium text-sm text-muted-foreground">
                Volume
              </h3>
              <p className="text-xl font-semibold mt-1">
                {(selectedStock.volume / 1000000).toFixed(2)}M
              </p>
            </div>
            <div className="bg-card rounded-lg p-4 shadow">
              <h3 className="font-medium text-sm text-muted-foreground">
                52W Range
              </h3>
              <p className="text-xl font-semibold mt-1">
                ₹{(selectedStock.price * 0.8).toFixed(2)} - ₹
                {(selectedStock.price * 1.2).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Stocks;
