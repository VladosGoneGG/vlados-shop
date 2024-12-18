const RatingSvg = (props: any) => {
	return (
		<svg
			key={props.i}
			xmlns='http://www.w3.org/2000/svg'
			fill='currentColor'
			viewBox='0 0 24 24'
			className='w-5 h-5'
		>
			<path d='M12 .587l3.668 7.435 8.211 1.195-5.939 5.788 1.402 8.169L12 18.896l-7.342 3.878 1.402-8.169-5.939-5.788 8.211-1.195z' />
		</svg>
	)
}

export default RatingSvg
