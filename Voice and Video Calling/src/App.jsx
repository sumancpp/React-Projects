import React, { useEffect, useRef } from 'react';
import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function App() {
  const zpRef = useRef(null);
  const userID = "user" + Math.floor(Math.random() * 1000); 
  const userName = "someone_" + userID;
  const appID = 1967802579;
  const serverSecret = "d2017147de8c7b9c6ec89f45c16f4ac2";
  const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, null, userID, userName);

  useEffect(() => {
    const zp = ZegoUIKitPrebuilt.create(TOKEN);
    zpRef.current = zp;
    zp.addPlugins({ ZIM });
  }, []);

  function invite(callType) {
    const targetUser = {
      userID: prompt("Enter callee's userId"),
      userName: prompt("Enter callee's userName")
    };
    zpRef.current.sendCallInvitation({
      callees: [targetUser],
      callType,
      timeout: 60,
    }).then((res) => {
      console.warn(res);
    }).catch((err) => {
      console.warn(err);
    });
  }

  return (
    <div className='w-full h-screen bg-gradient-to-b from-[#2c3943] to-black flex items-center justify-center'>
      <div className='w-[500px] h-[400px] rounded-2xl bg-[#060708] border-2 border-[gray] flex flex-col items-center justify-center
      gap-[20px]'> 
       <h2 className='text-[white] text-[20px]'><span className='text-blue-500'>UserName: </span>{userName}</h2>
       <h2 className='text-[white] text-[20px]'><span className='text-blue-500'>UserId: </span>{userID}</h2>

       <button className='w-[200px] h-[50px] rounded-2xl bg-white text-black cursor-pointer text-20px' onClick={()=>invite(ZegoUIKitPrebuilt.InvitationTypeVoiceCall)}>Voice Call</button>
       <button className='w-[200px] h-[50px] cursor-pointer rounded-2xl bg-white text-black text-20px'onClick={()=>invite(ZegoUIKitPrebuilt.InvitationTypeVideoCall)}>Video Call</button>
      </div>
      
    </div>
  );
}
export default App;
