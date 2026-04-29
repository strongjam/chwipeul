export const CATEGORIES = [
  { id: "all", name: "전체", icon: "🏠" },
  { id: "indoor", name: "실내스포츠", icon: "🏸" },
  { id: "outdoor", name: "실외스포츠", icon: "⚽" },
  { id: "nature", name: "아웃도어", icon: "⛰️" },
  { id: "culture", name: "문화/예술", icon: "🎨" },
  { id: "edu", name: "자기계발", icon: "📚" },
  { id: "game", name: "게임", icon: "🎮" },
];

export const MOCK_MEETINGS = [
  {
    id: "1",
    title: "초보 환영! 배드민턴 같이 쳐요",
    category: "indoor",
    categoryName: "실내스포츠",
    location: "강남구 역삼동 스포츠 센터",
    date: "2026년 5월 2일 (토)",
    time: "오후 7:00 ~ 9:00",
    members: 4,
    maxMembers: 6,
    description: "배드민턴을 처음 시작하시는 분들도 환영합니다! 가볍게 운동하며 친해지는 자리에요. 라켓이 없으신 분들은 대여도 가능하니 편하게 오세요.",
    preparations: ["개인 운동복", "운동화", "생수"],
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=800&auto=format&fit=crop",
    author: {
      name: "민수",
      level: 12,
      avatar: "M",
    }
  },
  {
    id: "2",
    title: "주말 한강 러닝 크루 모집",
    category: "nature",
    categoryName: "아웃도어",
    location: "서초구 반포동 한강공원",
    date: "2026년 5월 3일 (일)",
    time: "오전 8:00 ~ 10:00",
    members: 8,
    maxMembers: 20,
    description: "상쾌한 아침 공기를 마시며 함께 달려요! 초보자 페이스에 맞춰서 뛰니 걱정 마시고 참여하세요. 러닝 후 가벼운 브런치도 함께 합니다.",
    preparations: ["러닝화", "편한 복장", "열정"],
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=800&auto=format&fit=crop",
    author: {
      name: "러닝왕",
      level: 25,
      avatar: "R",
    }
  },
  {
    id: "3",
    title: "보드게임 카페 정기 모임",
    category: "game",
    categoryName: "게임",
    location: "마포구 서교동 보드놀이터",
    date: "2026년 5월 2일 (토)",
    time: "오후 2:00 ~ 5:00",
    members: 3,
    maxMembers: 4,
    description: "전략 보드게임을 즐기시는 분들을 찾습니다! 이번 모임에서는 '테라포밍 마스'를 플레이할 예정입니다. 룰 설명 해드리니 초보자도 환영해요.",
    preparations: ["즐거운 마음", "음료비"],
    image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=800&auto=format&fit=crop",
    author: {
      name: "보드게이머",
      level: 8,
      avatar: "B",
    }
  },
];
