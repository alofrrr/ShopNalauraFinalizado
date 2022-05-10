import React from 'react'

function HeaderIcon({ Icon, active }) {
	return (
		<div className="flex items-center cursor-pointer md:px-4 sm:h-10  active:border-purple-300  group">
			<Icon className={`h-6 text-gray-400 text-center sm:h-9 mx-auto group-hover:text-purple-300 ${active && 'text-purple-300'}`} />
		</div>
	)
}

export default HeaderIcon
