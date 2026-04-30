"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Camera, Calendar, MapPin, Users, Info, Sparkles } from "lucide-react";
import { CATEGORIES } from "../../data";

export default function CreateMeetingPage() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: "",
    location: "",
    maxMembers: 4,
    description: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.category || !formData.date) {
      alert("제목, 카테고리, 일시는 필수 입력 항목입니다.");
      return;
    }

    // 날짜 형식 변환 (2026-04-30 -> 2026년 4월 30일)
    const formatDate = (dateStr) => {
      if (!dateStr) return "";
      const date = new Date(dateStr);
      return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
    };

    const newMeeting = {
      ...formData,
      id: Date.now().toString(),
      members: 1,
      date: formatDate(formData.date),
      image: imagePreview || "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800&auto=format&fit=crop",
      categoryName: CATEGORIES.find(c => c.id === formData.category)?.name,
      author: {
        name: "나",
        level: 1,
        avatar: "ME",
      }
    };

    try {
      const response = await fetch("/api/meetings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMeeting),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert("모임 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error creating meeting:", error);
      alert("서버 오류가 발생했습니다.");
    }
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-white">
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
          <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-center relative">
            <Link href="/" className="absolute left-4 p-1 hover:bg-gray-100 rounded-full transition-smooth">
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </Link>
          </div>
        </header>

        <div className="flex flex-col items-center justify-center px-6 text-center pt-20">
          <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-8 animate-bounce shadow-inner text-main-orange">
            <Sparkles className="w-12 h-12" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">모임이 개설되었습니다!</h2>
          <p className="text-gray-500 mb-12 leading-relaxed max-w-[280px]">
            작성하신 취미 모임이 등록되었어요.<br />
            <span className="font-bold text-gray-800">함께 플레이할 동료들을 기다려봐요!</span>
          </p>
          <Link 
            href="/"
            className="block w-full max-w-xs bg-main-orange text-white py-4 rounded-2xl font-bold shadow-lg shadow-orange-100 transition-smooth hover:scale-[1.02]"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-32">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between relative">
          <Link href="/" className="p-1 hover:bg-gray-100 rounded-full transition-smooth">
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </Link>
          <h1 className="text-lg font-bold text-gray-900">새 모임 만들기</h1>
          <div className="w-8"></div> {/* Spacer */}
        </div>
      </header>

      <section className="max-w-md mx-auto p-4 space-y-6">
        {/* Image Upload Area */}
        <div className="relative group">
          <input 
            type="file" 
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="image-upload"
          />
          <label 
            htmlFor="image-upload"
            className={`w-full aspect-video rounded-3xl flex flex-col items-center justify-center gap-3 transition-smooth cursor-pointer overflow-hidden border-2 border-dashed ${
              imagePreview ? 'border-transparent' : 'border-gray-200 bg-white hover:border-main-orange hover:bg-orange-50/30'
            }`}
          >
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <>
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-orange-100 transition-smooth">
                  <Camera className="w-6 h-6 group-hover:text-main-orange text-gray-400" />
                </div>
                <span className="text-sm font-medium text-gray-400">대표 이미지 등록</span>
              </>
            )}
          </label>
          {imagePreview && (
            <button 
              onClick={() => setImagePreview(null)}
              className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-smooth"
            >
              <Users className="w-4 h-4 rotate-45" /> {/* Use as X icon */}
            </button>
          )}
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-3">모임 제목</label>
              <input 
                type="text" 
                name="title"
                placeholder="어떤 취미를 함께 즐길까요?"
                className="w-full p-4 bg-gray-50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-100"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-3">카테고리</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.filter(c => c.id !== "all").map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, category: cat.id }))}
                    className={`px-4 py-2 rounded-2xl text-xs font-medium transition-smooth ${
                      formData.category === cat.id
                        ? "bg-main-orange text-white shadow-md shadow-orange-100"
                        : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    {cat.icon} {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-6">
            {/* Date */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
                <Calendar className="w-4 h-4 text-main-orange" />
                일시
              </label>
              <input 
                type="datetime-local" 
                name="date"
                className="w-full p-4 bg-gray-50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-100"
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            {/* Location */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
                <MapPin className="w-4 h-4 text-main-orange" />
                장소
              </label>
              <input 
                type="text" 
                name="location"
                placeholder="어디서 모일까요? (예: 역삼동 테니스장)"
                className="w-full p-4 bg-gray-50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-100"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            {/* Max Members */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
                <Users className="w-4 h-4 text-main-orange" />
                최대 정원
              </label>
              <div className="flex items-center gap-4">
                <input 
                  type="range" 
                  name="maxMembers"
                  min="2" 
                  max="20"
                  className="flex-1 accent-main-orange"
                  value={formData.maxMembers}
                  onChange={handleChange}
                />
                <span className="text-sm font-bold text-main-orange w-8 text-center">{formData.maxMembers}명</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <label className="block text-sm font-bold text-gray-800 mb-3">모임 상세 설명</label>
            <textarea 
              name="description"
              placeholder="모임에 대한 자세한 내용을 적어주세요. 준비물이나 회비 등이 있다면 알려주세요!"
              className="w-full h-40 p-4 bg-gray-50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-100 resize-none"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
      </section>

      {/* Bottom Submit Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-lg border-t border-gray-100 max-w-md mx-auto z-50">
        <button 
          onClick={handleSubmit}
          className="w-full bg-main-orange text-white py-4 rounded-2xl font-bold shadow-lg shadow-orange-100 hover:scale-[1.02] active:scale-[0.98] transition-smooth"
        >
          모임 만들기
        </button>
      </div>
    </main>
  );
}
