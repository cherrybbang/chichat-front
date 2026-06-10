import { createContext } from 'react'
import type { Session, User } from '@supabase/supabase-js'

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