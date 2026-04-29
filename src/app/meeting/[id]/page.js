import Link from "next/link";
import { ChevronLeft, Share2, MapPin, Calendar, Users, Info, ShieldCheck } from "lucide-react";
import { MOCK_MEETINGS } from "../../data";

export default async function MeetingDetail({ params }) {
  // Next.js 15+ 에서는 params가 Promise이므로 await가 필요합니다.
  const { id } = await params;
  const meeting = MOCK_MEETINGS.find((m) => m.id === id);

  // 만약 해당하는 모임이 없을 경우에 대한 처리
  if (!meeting) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold mb-4">모임을 찾을 수 없습니다.</h2>
        <Link href="/" className="text-main-orange font-bold">홈으로 돌아가기</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white pb-24">
      {/* Top Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 max-w-md mx-auto">
        <Link href="/" className="p-2 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 transition-smooth">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <button className="p-2 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 transition-smooth">
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {/* Image Header */}
      <div className="relative h-80 w-full overflow-hidden max-w-md mx-auto">
        <img 
          src={meeting.image} 
          alt={meeting.title} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="max-w-md mx-auto px-6 -mt-8 relative z-10 bg-white rounded-t-[32px] pt-8">
        <div className="inline-block bg-orange-50 text-main-orange px-3 py-1 rounded-full text-xs font-bold mb-4">
          {meeting.categoryName}
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-6 leading-tight">
          {meeting.title}
        </h1>

        {/* Meeting Info Grid */}
        <div className="grid grid-cols-1 gap-4 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">{meeting.date}</p>
              <p className="text-xs text-gray-500">{meeting.time}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">{meeting.location}</p>
              <p className="text-xs text-gray-500">정확한 장소는 참여 확정 후 공개</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">모집 인원 {meeting.members}/{meeting.maxMembers}명</p>
              <p className="text-xs text-gray-500">현재 {meeting.maxMembers - meeting.members}자리 남음</p>
            </div>
          </div>
        </div>

        <hr className="border-gray-100 mb-8" />

        {/* Author Info */}
        <div className="flex items-center justify-between mb-8 bg-gray-50 p-4 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-main-orange rounded-full flex items-center justify-center text-white font-bold">
              {meeting.author.avatar}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">{meeting.author.name}</p>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <ShieldCheck className="w-3 h-3 text-blue-500" />
                <span>본인 인증 완료</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400 mb-1">플레이 레벨</p>
            <p className="text-sm font-bold text-main-orange">Lv.{meeting.author.level}</p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Info className="w-5 h-5 text-gray-400" /> 모임 상세 내용
          </h3>
          <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-wrap">
            {meeting.description}
          </p>
        </div>

        {/* Preparations */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-3">준비물</h3>
          <div className="flex flex-wrap gap-2">
            {meeting.preparations.map((item, index) => (
              <span key={index} className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg text-xs font-medium">
                • {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Sticky Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-lg border-t border-gray-100 max-w-md mx-auto z-50">
        <Link 
          href={`/meeting/${meeting.id}/apply`}
          className="block w-full bg-main-orange text-white py-4 rounded-2xl font-bold text-center shadow-lg shadow-orange-100 hover:scale-[1.02] active:scale-[0.98] transition-smooth cursor-pointer"
        >
          모임 참여 신청하기
        </Link>
      </div>
    </main>
  );
}
