import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../Context/Context'

function Main() {


const {
    onsent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput
}  = useContext(Context);

  return (
    <div className='main'>
     <div className='nav'>
        <p>Gimini</p>
        <img src={assets.user_icon} alt=''/>
     </div>
     <div className='main-container'>


     {!showResult 
     ? <>
     <div className='greet'>
            <p><span>Hellow, Dev</span></p>
            <p>How can i help you</p>
        </div>
        <div className='cards'>
            <div className='card'>
                <p>Suggest a beautiful places to see on an upcomingroad trip </p>
                <img src={assets.compass_icon} alt=''></img>
            </div>
            <div className='card'>
                <p>Beriefe summarized this concept : urban planning  </p>
                <img src={assets.bulb_icon} alt=''></img>
            </div>
            <div className='card'>
                <p>How to work hard  </p>
                <img src={assets.message_icon} alt=''></img>
            </div>
            <div className='card'>
                <p>The best thing in the world is money   </p>
                <img src={assets.code_icon} alt=''></img>
            </div>
        </div>
     </>
     :
     <div className='result'>
        <div className='result-title'>
      <img src={assets.user_icon} alt=''/>
      <p>{recentPrompt}</p>
        </div>
        <div className='result-data'>
<img src={assets.gemini_icon} alt=''/>
{loading
?<div className='loader'>
<hr/>
<hr/>
<hr/>
</div>
:<p dangerouslySetInnerHTML={{__html:resultData}}></p>
}
        </div>
     </div>
     }
       
        <div className='main-bottom'>
            <div className='search-box'>
                <input onChange={(e)=>setInput(e.target.value)}  value={input} type='text' placeholder='Enter the prompt'/>
                <div>
                    <img src={assets.gallery_icon} alt=''/>
                    <img src={assets.mic_icon} alt=''/>
                   {input? <img onClick={()=>onsent()} src={assets.send_icon} alt=''/>: null}
                    
                </div>
            </div>
            <p className='bottom-info'>
                Gimini  may display inaccurate iinfo, including about people, so double-check its respponces .your privacy and giminy app;
            </p>
        </div>
     </div>
    </div>
  )
}

export default Main



