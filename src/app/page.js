"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, MapPin, Plus, Users, Calendar, Filter, Home as HomeIcon } from "lucide-react";

import { CATEGORIES, MOCK_MEETINGS } from "./data";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [meetings, setMeetings] = useState([]);
  const [sortBy, setSortBy] = useState("newest"); // newest, popular
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/meetings");
      const data = await response.json();
      // Combine mock and user data if backend is empty, or just use backend data
      // For this implementation, we assume backend handles all persistence
      setMeetings(data);
    } catch (error) {
      console.error("Failed to fetch meetings:", error);
      setMeetings(MOCK_MEETINGS); // Fallback to mock data on error
    } finally {
      setIsLoading(false);
    }
  };

  const filteredMeetings = (activeCategory === "all" 
    ? meetings 
    : meetings.filter(meeting => meeting.category === activeCategory))
    .sort((a, b) => {
      if (sortBy === "popular") {
        return b.members - a.members;
      }
      return 0; // Default is newest (handled by backend order)
    });

  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-main-orange tracking-tight">취플</h1>
          <div className="flex gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Search className="w-6 h-6 text-gray-600" />
            </button>
            <div className="w-10 h-10 bg-point-yellow rounded-full flex items-center justify-center text-white font-bold shadow-sm">
              MY
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section / Location */}
      <section className="max-w-md mx-auto px-4 py-6">
        <div className="flex items-center gap-2 text-gray-500 mb-6">
          <MapPin className="w-4 h-4" />
          <span className="text-sm font-medium">강남구 역삼동 주변</span>
        </div>
        
        <div className="bg-gradient-to-br from-main-orange to-orange-400 rounded-3xl p-6 text-white shadow-lg shadow-orange-100">
          <h2 className="text-xl font-bold mb-2">오늘의 취미를 플레이하세요!</h2>
          <p className="text-sm opacity-90 mb-4">내 주변에서 함께 플레이할 동료를 찾아보세요.</p>
          <button className="bg-white text-main-orange px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:scale-105 transition-transform">
            지금 시작하기
          </button>
        </div>
      </section>

      {/* Category Chips */}
      <section className="max-w-md mx-auto px-4 flex flex-wrap gap-2 py-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-2xl text-xs font-medium cursor-pointer transition-smooth ${
              activeCategory === cat.id
                ? "bg-main-orange text-white shadow-md shadow-orange-100"
                : "bg-white text-gray-600 border border-gray-100 hover:border-orange-200"
            }`}
          >
            <span className="mr-1">{cat.icon}</span> {cat.name}
          </button>
        ))}
      </section>

      {/* Meeting List */}
      <section className="max-w-md mx-auto px-4 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">추천 취미 모임</h3>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setSortBy(sortBy === "newest" ? "popular" : "newest")}
              className="text-xs px-3 py-1 bg-white border border-gray-100 rounded-full text-gray-500 flex items-center gap-1 hover:border-orange-200 transition-smooth"
            >
              <Filter className="w-3 h-3" />
              {sortBy === "newest" ? "최신순" : "인기순"}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {isLoading ? (
            <div className="py-20 text-center animate-pulse">
              <p className="text-gray-400 text-sm">로딩 중...</p>
            </div>
          ) : filteredMeetings.length > 0 ? (
            filteredMeetings.map((meeting) => (
              <Link 
                key={meeting.id} 
                href={`/meeting/${meeting.id}`}
                className="block bg-white rounded-3xl overflow-hidden shadow-soft border border-gray-50 group hover:shadow-md transition-smooth"
              >
              <div className="relative h-48 w-full overflow-hidden">
                <img 
                  src={meeting.image} 
                  alt={meeting.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium">
                  {CATEGORIES.find(c => c.id === meeting.category)?.name || meeting.categoryName}
                </div>
              </div>
              <div className="p-5">
                <h4 className="font-bold text-gray-800 mb-3 line-clamp-1">{meeting.title}</h4>
                <div className="flex flex-col gap-2 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{meeting.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{meeting.location}</span>
                    </div>
                    <div className="flex items-center gap-1 font-semibold text-main-orange">
                      <Users className="w-4 h-4" />
                      <span>{meeting.members}/{meeting.maxMembers}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="py-20 text-center">
            <p className="text-gray-400 text-sm">해당 카테고리의 모임이 아직 없어요.</p>
            <p className="text-gray-400 text-xs mt-1">첫 번째 플레이어가 되어보세요!</p>
          </div>
        )}
        </div>
      </section>

      {/* Floating Action Button */}
      <Link 
        href="/meeting/create"
        className="fixed bottom-24 right-6 w-14 h-14 bg-main-orange text-white rounded-full flex items-center justify-center shadow-xl shadow-orange-200 hover:scale-110 active:scale-95 transition-transform z-50 cursor-pointer"
      >
        <Plus className="w-8 h-8" />
      </Link>

      {/* Footer Nav (Mobile Style) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-100 px-8 py-4 flex justify-between items-center max-w-md mx-auto z-50">
        <button className="flex flex-col items-center gap-1 text-main-orange">
          <HomeIcon className="w-6 h-6" />
          <span className="text-[10px] font-bold">홈</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400">
          <MapPin className="w-6 h-6" />
          <span className="text-[10px]">내 주변</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400">
          <Users className="w-6 h-6" />
          <span className="text-[10px]">내 모임</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400">
          <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
          <span className="text-[10px]">프로필</span>
        </button>
      </nav>
    </main>
  );
}
