import { createContext } from 'react'  // 커스텀 훅 선언
import type { Session, User } from '@supabase/supabase-js'

// 타입과 Context 객체만 정의

// 어떤 값을 담을지 타입 설명
interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signUp: (email: string, password: string) => Promise<{ error: string | null; needsConfirmation: boolean }>
  signOut: () => Promise<void>
}

// 값을 담을 컨텍스트 생성
export const AuthContext = createContext<AuthContextType | null>(null)


// 커스텀 훅을 만들면 AuthProvider로 감싸진 컴포넌트에서 useAuth()를 호출하여 AuthContext의 값을 쉽게 가져올 수 있음.