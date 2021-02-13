import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Typography, Box } from '@material-ui/core';

interface TabPanelProps {
	children: React.ReactNode;
	index: any;
	value: any;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index: any) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

interface props {
	src: string
}

const ImgComp: React.FunctionComponent<props> = ({ src }) => {
	const imgStyles = {
		width: `${100}%`,
		height: `${100}%`
	};
	return <img src={src} alt="slide-img" style={imgStyles} />;
};

function Slider() {
	const sliderArr = [
		<ImgComp src="https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80" />,
		<ImgComp src="https://images.unsplash.com/photo-1470341223622-1019832be824?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2288&q=80" />,
		<ImgComp src="https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2094&q=80" />,
		<ImgComp src="https://images.unsplash.com/photo-1534161308652-fdfcf10f62c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2174&q=80" />
	];
	const id = [
		1, 2, 3, 4
	];

	const [x, setX] = useState(0);
	const [title, setTitle] = useState("옷차림");
	const [value, setValue] = React.useState(0);

	const goLeft = () => {
		if (x === 0) {
			setX(-100 * (sliderArr.length - 1));
			setValue(3);
		} else {
			setX(x + 100);
			setValue(value - 1);
		}
	};
	const goRight = () => {
		if (x === -100 * (sliderArr.length - 1)) {
			setX(0);
			setValue(0);
		} else {
			setX(x - 100);
			setValue(value + 1);
		}
	};
	const goPage = (page: number) => {
		if (page === 0) {
			setX(0);
		} else if (page === 1) {
			setX(-100);
		} else if (page === 2) {
			setX(-200);
		} else if (page === 3) {
			setX(-300);
		}
	};

	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
		goPage(newValue);
	};

	return (
		<div className="wrap">
			<div className="textArea">
				<Typography variant="h3">
					한눈에 보는
					<br />
					당신의 반려동물
				</Typography>
			</div>
			<div className="tabArea">
				<Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
					<Tab label="옷차림" {...a11yProps(0)} />
					<Tab label="사료량" {...a11yProps(1)} />
					<Tab label="예방접종" {...a11yProps(2)} />
					<Tab label="음식검색" {...a11yProps(3)} />
				</Tabs>
				<TabPanel value={value} index={0}>
					<span className="h4">오늘은 어떤 옷을 입을까요?</span>
					<br />
					<span className="h5">오늘의 날씨에 맞는 반려견의 옷차림을 추천해드려요.</span>
				</TabPanel>
				<TabPanel value={value} index={1}>
					<span className="h4">얼마나 먹어야 할까요?</span>
					<br />
					<span className="h5">당신의 반려견에 맞는 사료량을 계산해드려요.</span>
				</TabPanel>
				<TabPanel value={value} index={2}>
					<span className="h4">어떤 예방접종이 필요할까요?</span>
					<br />
					<span className="h5">당신의 반려견의 예방접종 일정을 관리해드려요.</span>
				</TabPanel>
				<TabPanel value={value} index={3}>
					<span className="h4">이것을 먹어도 될까요?</span>
					<br />
					<span className="h5">반려견이 먹어도 되는 음식을 알려드려요.</span>
				</TabPanel>
			</div>
			<div className="slider">
				{sliderArr.map((item, index) => (
					<div key={id[index]} className="slide" style={{ transform: `translateX(${x}%)` }}>
						{item}
					</div>
				))}
				<button type="button" id="goLeft" onClick={goLeft}>
					&lt;
				</button>
				<button type="button" id="goRight" onClick={goRight}>
					&gt;
				</button>
			</div>

		</div>
	);
}

export default Slider;
