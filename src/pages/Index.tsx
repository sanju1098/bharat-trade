import React, { useState } from "react";
import {
  useStockData,
  mockStocks,
  mockNews,
  generatePriceHistory,
} from "@/utils/stocksApi";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { StockCard } from "@/components/stocks/StockCard";
import { StockChart } from "@/components/stocks/StockChart";
import { NewsCard } from "@/components/news/NewsCard";
import { StatsCard } from "@/components/layout/StatsCard";
import { BarChart3, TrendingDown, TrendingUp, Wallet2 } from "lucide-react";

const Index = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedStock, setSelectedStock] = useState(mockStocks[0]);

  // Use our hooks to get real-time mock data
  const stocks = useStockData(mockStocks);

  // Generate chart data for stock cards
  const stocksWithHistory = stocks.map((stock) => {
    return {
      ...stock,
      priceHistory: generatePriceHistory(30, stock.price, 2),
    };
  });

  const topGainer = [...stocks].sort(
    (a, b) => b.changePercent - a.changePercent
  )[0];
  const topLoser = [...stocks].sort(
    (a, b) => a.changePercent - b.changePercent
  )[0];

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 flex">
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />

        <main className="flex-1 transition-all duration-300">
          <div className="container max-w-full p-4 lg:p-6 animate-fade-in">
            <h1 className="text-2xl font-bold mb-6">Market Dashboard</h1>

            {/* Stats Row */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 animate-slide-up"
              style={{ "--delay": "100ms" } as React.CSSProperties}
            >
              <StatsCard
                title="Market Cap"
                value="$13.42T"
                trend={0.47}
                icon={<Wallet2 />}
                className="bg-primary/5"
              />
              <StatsCard
                title="Trading Volume"
                value="487.32M"
                description="Today's volume"
                icon={<BarChart3 />}
                className="bg-primary/5"
              />
              <StatsCard
                title="Top Gainer"
                value={topGainer.symbol}
                trend={topGainer.changePercent}
                trendLabel={topGainer.name}
                icon={<TrendingUp />}
                className="bg-success/5"
              />
              <StatsCard
                title="Top Loser"
                value={topLoser.symbol}
                trend={topLoser.changePercent}
                trendLabel={topLoser.name}
                icon={<TrendingDown />}
                className="bg-danger/5"
              />
            </div>

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left column - Stock list */}
              <div
                className="lg:col-span-1 space-y-4 animate-slide-up"
                style={{ "--delay": "200ms" } as React.CSSProperties}
              >
                <h2 className="text-xl font-semibold">Watchlist</h2>
                <div className="space-y-4">
                  {stocksWithHistory.slice(0, 3).map((stock) => (
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
              </div>

              {/* Right column - Chart and news */}
              <div
                className="lg:col-span-2 space-y-4 animate-slide-up"
                style={{ "--delay": "300ms" } as React.CSSProperties}
              >
                <StockChart
                  symbol={selectedStock.symbol}
                  name={selectedStock.name}
                  currentPrice={selectedStock.price}
                  volatility={2.5}
                />
                <NewsCard news={mockNews} className="mt-6" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
