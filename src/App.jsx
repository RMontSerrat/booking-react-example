import './App.css'
import { RecoilRoot } from 'recoil';
import { ModalProvider } from '@/hooks/useModal';
import { Booking } from '@/features/Booking';

function App() {
  return (
    <RecoilRoot>
      <ModalProvider>
        <Booking />
      </ModalProvider>
    </RecoilRoot> 
  )
}

export default App
