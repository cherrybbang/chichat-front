import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

export function useAuth() {
  const context = useContext(AuthContext) // AuthContext에서 값을 가져옴 (값 사용)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
