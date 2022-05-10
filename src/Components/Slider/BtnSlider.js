import React from 'react'
import './Slider.css'
import leftArrow from './icons/leftArrow.svg'
import rightArrow from './icons/rightArrow.svg'

export default function BtnSlider({ direction, moveSlide }) {
	return (
		<button
			onClick={moveSlide}
			className={direction === 'next' ? 'btn-slide next' : 'btn-slide prev'}
		>
			<img src={direction === 'next' ? rightArrow : leftArrow} />
		</button>
	)
}
