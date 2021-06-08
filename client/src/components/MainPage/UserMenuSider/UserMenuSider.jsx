
import "antd/dist/antd.css";
import {
  FacebookOutlined,
  InstagramOutlined,
  ProfileOutlined,
  TeamOutlined,
  HistoryOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Typography, Button, Menu } from "antd";

import Avatar from "antd/lib/avatar/avatar";
import Rater from "./Rater/Rater";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { logoutUser } from "../../../redux/Actions/usersAC";

const UserMenuSider = () => {
  useEffect(() => {
    window.gapi?.load("auth2", function () {
      window.gapi?.auth2
        .init({
          client_id:
            "213632962035-g4knv9je1q010p9lclqpuq2u73au46l3.apps.googleusercontent.com",
        })
        .then(
          () => console.log("init OK"),
          () => console.log("init error")
        );
    });

  }, []);

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.currentUser);

  useEffect(() => {}, []);


  const id = localStorage?.id;


  const { Title } = Typography;
  const size = "large";

  const hideSidebar = (e) => {
    const elem = e.target.parentElement.parentElement;
    elem.classList.toggle("sidebar-hidden");
    const labelSpans = document.querySelectorAll(".ant-menu-title-content");
    labelSpans.forEach((el) => el.classList.toggle("hidden"));
  };

  const signOut = () => {
    const GoogleAuth = window.gapi?.auth2?.getAuthInstance().then(
      () => {
        console.log("sasdasd");
        localStorage.clear();
        dispatch(logoutUser());
        GoogleAuth.signOut();
      },
      () => console.log("signout Error")
    );
  };


  return (
    <div className="sidebar">
      <div className="sidebar_null"></div>

      <div className="sidebar__top">
        <div span={24} className="avatar">
          <Avatar
            size={180}
            src="https://gameguru.ru/clf/43/ef/08/2e/news.1610973171890.jpg"
            draggable={false}
          />
        </div>
        <h3 level={4}>{currentUser.name}</h3>
        <div className="rater">
          <Rater />
        </div>
        <div className="socialsButtons">
          <Button type="dashed" icon={<FacebookOutlined />} size={size} />
          <Button
            type="dashed"
            className="buttons"
            icon={<InstagramOutlined />}
            size={size}
          />
        </div>
        <Menu className="profileMenu">
          <Menu.Item
            key="1"
            className="userLinksButton"
            icon={<ProfileOutlined className="profileIcon" />}
            title="Profile"
          >
            Profile
          </Menu.Item>
          <Menu.Item
            key="2"
            className="userLinksButton"
            icon={<TeamOutlined />}
            title="Friends"
          >
            Friends
          </Menu.Item>
          <Menu.Item
            key="3"
            className="userLinksButton"
            icon={<HistoryOutlined />}
            title="History"
          >
            History
          </Menu.Item>
          <Menu.Item
            key="4"
            onClick={signOut}
            className="userLinksButton"
            icon={<LogoutOutlined />}
            title="Logout"
          >
            Logout
          </Menu.Item>
        </Menu>

      <div className='sidebar__top'>
      <div span={24} className='avatar'>
        <Avatar size={180} src={`http://localhost:3001/${currentUser.avatar}`} draggable={false} /> 

      </div>
      <div className="sidebar__bottom">
        <button className="button sidebar__bottom-button" onClick={hideSidebar}>
          asd
        </button>
      </div>


      <div  className='socialsButtons'>
        <Button type="dashed"  icon={<FacebookOutlined />} size={size} />
        <Button type="dashed" className='buttons' icon={<InstagramOutlined />} size={size} />
      </div>
      <Menu className='profileMenu'>
        <Menu.Item key="1" className='userLinksButton'  icon={<ProfileOutlined className='profileIcon'/>} title='Profile'>
          <Link to={'/profile'}>Profile</Link>
        </Menu.Item>
        <Menu.Item key="2" className='userLinksButton' icon={<TeamOutlined />} title='Friends'>
          <Link to={'/friends'}>Friends</Link>
        </Menu.Item>
        <Menu.Item key="3" className='userLinksButton'icon={<HistoryOutlined />} title='History'>
          <Link to={'/history'}>History</Link>
        </Menu.Item>
        <Menu.Item key="4" onClick={signOut} className='userLinksButton'icon={<LogoutOutlined />} title='Logout'>
          Logout
        </Menu.Item>
      </Menu>
    </div>
    <div className="sidebar__bottom">
      <button className='button sidebar__bottom-button' onClick={hideSidebar}>asd</button>
    </div>

    </div>
  );
};

export default UserMenuSider;
