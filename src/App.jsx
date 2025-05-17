import { Outlet } from "react-router-dom";
import BottomBar from "./pages/components/bottombar";


const App = () => {
  return (
    <div className='bg-[#0e1116] font-[poppins] text-[#f5f5f5] w-full min-h-screen h-full relative'>
      <Outlet />
      <BottomBar/>
    </div>
  );
}

export default App;