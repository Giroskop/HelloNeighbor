import "antd/dist/antd.css"
import {
	ProfileOutlined,
	TeamOutlined,
	InboxOutlined,
	LogoutOutlined,
	FieldTimeOutlined,
	LeftSquareOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
} from '@ant-design/icons'
import { Typography, Button, Menu } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import Rater from './Rater'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { logoutUser } from '../../../redux/Actions/usersAC'
import { Link , useHistory} from 'react-router-dom'
const UserMenuSider = () => {
	useEffect(() => {
		window.gapi?.load("auth2", function () {
			window.gapi?.auth2
				.init({
					client_id: "213632962035-g4knv9je1q010p9lclqpuq2u73au46l3.apps.googleusercontent.com"
				})
				.then(
					() => console.log("init OK"),
					() => console.log("init error")
				)
		})
	}, [])
	const dispatch = useDispatch()
	const currentUser = useSelector(state => state.users.currentUser)
	const [test, setTest] = useState(true)
	const history = useHistory()

	const hideSidebar = e => {
		const elem = document.querySelector('.sidebar')
		const container = document.querySelector('.container--sidebar')
		elem.classList.toggle('sidebar--active')
		container.classList.toggle('container--sidebar--active')
		// if (test) {
		// 	elem.classList.toggle('sidebar-animation-hide')
		// 	setTest(prev => !prev)
		// 	const labelSpans = document.querySelectorAll('.ant-menu-title-content')
		// 	labelSpans.forEach(el => el.classList.toggle('hidden'))
		// } else {
		//   elem.classList.toggle('sidebar-animation-hide')
		//   elem.classList.toggle('sidebar-animation-show')
		//   setTest(prev => !prev)
		// }
	}

	const signOut = () => {
		console.log("ya tut")
		const GoogleAuth = window.gapi?.auth2?.getAuthInstance().then(
			() => {
				console.log("ya sdelal")
				localStorage.clear()
				dispatch(logoutUser())
				history.push("/")
				GoogleAuth?.signOut()
			},
			() => console.log("signout Error")
		)
	}
	return (
		<div className='container--sidebar container--sidebar--active'>
			<div className='sidebar sidebar--active'>
				<div className='sidebar__top'>
					<div span={24} className='sidebar__avatar-wrapper'>
						<Avatar
							className='sidebar__avatar'
							src={`http://localhost:3001/${currentUser.avatar}`}
							draggable={false}
						/>
					</div>
					<h4 className='sidebar__username'>{currentUser.name}</h4>
					<div className='rater'>
						<Rater />
					</div>
					<div className='social'>
						<a className='button social__link' href='https://www.instagram.com/arianagrande/' target='_blank'>
							<img src='/img/social-icons/instagramm.svg' alt='instagramm-icon' className='social__icon' />
						</a>
						<a className='button social__link' href='https://vk.com/hokage_kun' target='_blank'>
							<img src='/img/social-icons/vkontakte.svg' alt='' className='social__icon' />
						</a>
						<a className='button social__link' href='https://twitter.com/arianagrande' target='_blank'>
							<img src='/img/social-icons/twitter.svg' alt='' className='social__icon' />
						</a>
						<a className='button social__link' href='https://ru-ru.facebook.com/arianagrande/' target='_blank'>
							<img src='/img/social-icons/facebook.svg' alt='' className='social__icon' />
						</a>
					</div>
					<ul className='profileMenu'>
						<li key='1' className='profileMenu__item'>
							<Link className='profileMenu__item-link' to={'/friends'}>
								<TeamOutlined className='profileMenu__item-icon' />
								<span className='profileMenu__item-text'>Друзья</span>
							</Link>
							<span className='tooltip'>Друзья</span>
						</li>
						<li key='2' className='profileMenu__item'>
							<Link className='profileMenu__item-link' to={'/history'}>
								<InboxOutlined className='profileMenu__item-icon' />
								<span className='profileMenu__item-text'>История</span>
							</Link>
							<span className='tooltip'>История</span>
						</li>
						<li key='3' className='profileMenu__item'>
							<Link className='profileMenu__item-link' to={'/profile'}>
								<ProfileOutlined className='profileMenu__item-icon' />
								<span className='profileMenu__item-text'>Профиль</span>
							</Link>
							<span className='tooltip'>Профиль</span>
						</li>
						<li key='4' onClick={signOut} className='profileMenu__item'>
							<Link className='profileMenu__item-link'>
								<LogoutOutlined className='profileMenu__item-icon profileMenu__item-icon--logout' />
								<span className='profileMenu__item-text'>Выйти</span>
							</Link>
							<span className='tooltip'>Выйти</span>
						</li>
					</ul>
				</div>
				<button className='button sidebar__closeButton' onClick={hideSidebar}>
					<MenuFoldOutlined className='sidebar__closeButton-icon' />
					<span className='sidebar__closeButton-text'></span>
				</button>
			</div>
		</div>
	)
}
export default UserMenuSider