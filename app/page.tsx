import Computers from '@/components/Computers'
import SignIn from '@/components/auth/SignIn'

export default function Home() {
  return (
    <main>
      <SignIn />
      <Computers />
    </main>
  )
}
