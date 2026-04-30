"use client";

import { useState, use } from "react";
import Link from "next/link";
import { ChevronLeft, MessageCircle, Phone, Info, CheckCircle2, Home as HomeIcon, MapPin, Users } from "lucide-react";
import { MOCK_MEETINGS } from "../../../data";

export default function ApplyPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const { id } = params;
  const [meeting, setMeeting] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const res = await fetch(`/api/meetings/${id}`);
        if (res.ok) {
          const data = await res.json();
          setMeeting(data);
        }
      } catch (error) {
        console.error("Failed to fetch meeting:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMeeting();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">불러오는 중...</p>
      </div>
    );
  }

  if (!meeting) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold mb-4">모임을 찾을 수 없습니다.</h2>
        <Link href="/" className="text-main-orange font-bold">홈으로 돌아가기</Link>
      </div>
    );
  }

  // 신청 완료 화면
  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-white">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
          <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-center relative">
            <Link href="/" className="absolute left-4 p-1 hover:bg-gray-100 rounded-full transition-smooth">
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </Link>
          </div>
        </header>

        <div className="flex flex-col items-center justify-center px-6 text-center pt-20 pb-32">
          <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-8 animate-bounce shadow-inner">
            <CheckCircle2 className="w-12 h-12 text-main-orange" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">신청서가 전달되었습니다!</h2>
          <p className="text-gray-500 mb-12 leading-relaxed max-w-[280px]">
            {meeting.author.name} 호스트님께 신청서가 전달되었어요.<br />
            <span className="font-bold text-gray-800">호스트의 승인을 잠시만 기다려주세요.</span>
          </p>
          <div className="w-full space-y-4 max-w-xs">
            <Link 
              href="/"
              className="block w-full bg-main-orange text-white py-4 rounded-2xl font-bold shadow-lg shadow-orange-100 transition-smooth hover:scale-[1.02]"
            >
              다른 취미 더 찾아보기
            </Link>
            <button className="block w-full py-4 text-gray-400 font-bold text-sm hover:text-gray-600 transition-smooth">
              신청 내역 확인하기
            </button>
          </div>
        </div>

        {/* Footer Nav (Mobile Style) */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-100 px-8 py-4 flex justify-between items-center max-w-md mx-auto z-50">
          <Link href="/" className="flex flex-col items-center gap-1 text-gray-400">
            <HomeIcon className="w-6 h-6" />
            <span className="text-[10px]">홈</span>
          </Link>
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <MapPin className="w-6 h-6" />
            <span className="text-[10px]">내 주변</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-main-orange">
            <Users className="w-6 h-6" />
            <span className="text-[10px] font-bold">내 모임</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
            <span className="text-[10px]">프로필</span>
          </button>
        </nav>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-4">
          <Link href={`/meeting/${id}`} className="p-1 hover:bg-gray-100 rounded-full transition-smooth">
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </Link>
          <h1 className="text-lg font-bold text-gray-900">모임 신청하기</h1>
        </div>
      </header>

      {/* Meeting Summary Card */}
      <section className="max-w-md mx-auto p-4">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4">
          <img 
            src={meeting.image} 
            alt={meeting.title} 
            className="w-20 h-20 rounded-xl object-cover"
          />
          <div className="flex flex-col justify-center">
            <p className="text-xs text-main-orange font-bold mb-1">{meeting.categoryName}</p>
            <h2 className="text-sm font-bold text-gray-800 line-clamp-1">{meeting.title}</h2>
            <p className="text-xs text-gray-400 mt-1">{meeting.date} · {meeting.location}</p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="max-w-md mx-auto px-4 mt-4 space-y-6">
        {/* Message to Host */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-4">
            <MessageCircle className="w-4 h-4 text-main-orange" />
            호스트에게 한마디
          </label>
          <textarea 
            placeholder="간단한 자기소개나 모임에 대한 궁금한 점을 적어주세요. (예: 배드민턴 초보인데 참여 가능한가요?)"
            className="w-full h-32 p-4 bg-gray-50 rounded-2xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-100 resize-none transition-smooth"
            maxLength={200}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <p className={`text-[10px] mt-2 text-right ${message.length >= 200 ? 'text-red-500 font-bold' : 'text-gray-400'}`}>
            {message.length} / 200자
          </p>
        </div>

        {/* Contact Info */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-4">
            <Phone className="w-4 h-4 text-main-orange" />
            연락처 확인
          </label>
          <div className="flex gap-2">
            <input 
              type="tel" 
              defaultValue="010-1234-5678"
              className="flex-1 p-4 bg-gray-50 rounded-2xl text-sm text-gray-800 focus:outline-none"
            />
            <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-2xl text-xs font-bold">
              수정
            </button>
          </div>
          <p className="text-[11px] text-gray-400 mt-3 flex items-start gap-1">
            <Info className="w-3 h-3 mt-0.5" />
            연락처는 모임 참여가 확정된 후 호스트에게만 공개됩니다.
          </p>
        </div>
      </section>

      {/* Bottom Sticky Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-lg border-t border-gray-100 max-w-md mx-auto z-50">
        <button 
          onClick={() => message.trim() && setIsSubmitted(true)}
          disabled={!message.trim()}
          className={`w-full py-4 rounded-2xl font-bold shadow-lg transition-smooth ${
            message.trim() 
              ? "bg-main-orange text-white shadow-orange-100 cursor-pointer hover:scale-[1.02] active:scale-[0.98]" 
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          신청서 보내기
        </button>
      </div>
    </main>
  );
}
