import { useEffect, useState } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import { AuthContext } from './AuthContext'

// 실제 인증 로직과 상태 관리

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 앱 로드 시 현재 세션과 사용자 정보를 가져옴
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // 인증 상태 변화를 감시 (로그인, 로그아웃 이벤트 실시간 감지)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error: error?.message ?? null }
  }

  async function signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({ email, password })
    return {
      error: error?.message ?? null,
      needsConfirmation: !error && data.session === null, // 이메일 인증 대기 상태
    }
  }

  async function signOut() {
    await supabase.auth.signOut()
  }

  return (
    // AuthContext.Provider 컨텍스트에 user, session, loading, signIn, signUp, signOut 값을 담아서 하위 컴포넌트들이 사용할 수 있게 함.
    <AuthContext.Provider value={{ user, session, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}