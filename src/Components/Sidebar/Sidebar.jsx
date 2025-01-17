import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../Context/Context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onsent, prevPrompt, setRecentPrompt,newchat } = useContext(Context);


  const loadPrompt = async (prompt) =>{
    setRecentPrompt(prompt)
    await onsent(prompt)
  }
  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu "
          src={assets.menu_icon}
          alt=""
        />
        <div onClick={()=>newchat} className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>new chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompt.map((item, index) => {
              return(
                <div onClick={()=>loadPrompt(item)} className="recent-entry">
                  <img src={assets.message_icon} alt="" />
                  <p>{item}  ... </p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="bottom ">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} />
          {extended ? <p>help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} />
          {extended ? <p>Setting</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
