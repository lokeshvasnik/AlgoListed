import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CCHeader from "../Components/CCHeader";
import LeftMenu from "../Components/LeftMenu";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { codingSheetsFilters } from "../Components/codingSheetsFilters";
import axios from "axios";
import { LinearProgress } from "@material-ui/core";


const CodingSheets = () => {
	const [data, setData] = useState([]);
	const [completedCount, setCompletedCount] = useState(0);
	const [filter, setFilter] = useState("Striver's SDE Sheet"); // later on change to Discuss Coding Sheets
	const [filterDomain, setFilterDomain] = useState("striver-sde-sheet");

	useEffect(() => {
		setData([]);
		// axios.get(`https://algolisted.cyclic.app/coding-sheets/all`)
		axios.get(`https://algolisted.cyclic.app/coding-sheets/sheet/${filterDomain}`)
			.then((res) => {
				setData(res.data);
				console.log("searching for ", filterDomain);
				console.log("All data : ", res.data);
			})
			.catch((err) => console.log(err));
		setCompletedCount(0);
	}, [filter]);

	const handleFilter = (e) => {
		setFilter(e.target.textContent);
	};

	const handleFilterDomain = (item) => {
		setFilterDomain(item.domainFilter);
	};

	const toggleCompleted = (index) => {
		// update the "completed" field for the coding sheet at the specified index
		const updatedData = [...data];
		updatedData[index].completed = !updatedData[index].completed;
		setData(updatedData);
		setCompletedCount(
			(prevCount) => prevCount + (updatedData[index].completed ? 1 : -1)
		);
	};

	const progressBarPercent = data.length == 0 ? 0 : ((completedCount / data.length) * 100).toFixed(0);

	const filters = codingSheetsFilters.map((item) => {
		return (
			<div onClick={(e) => { handleFilter(e); handleFilterDomain(item); }} key={item.id}
				className={item.text == filter ? "filter selected" : "filter"}>
				{item.text}
			</div>
		);
	});

	return (
		<GrandContainer>
			<MobContainer>
				We are still working on Responsive Version of the website, please view
				the site with width more than 1100px, a standard laptop or tablet
				landscape.
				<img
					src="https://media4.giphy.com/media/13FrpeVH09Zrb2/giphy.gif"
					alt=""
				/>
			</MobContainer>
			<Container>
				<CCHeader />
				<LeftMenu marked={"coding-sheets"} />
				<div className="cc-middle-content">
					<h1 className="main-heading">Coding Sheets</h1>
					<p className="heading-supporter">
						Coding Sheets is a website that offers a range of software engineering practice sheets to select from in a single location. The discussion section, which will be available soon, will provide support and guidance while working on a specific sheet. Another upcoming feature will be a comprehensive analysis of each sheet, similar to the one found on the Monkeytype website.
					</p>
					<div className="message">
						<div className="icon"></div>
						<div className="text">
							Want to contribute or have any suggestion about the website{" "}
							<a href="/">click here</a>
						</div>
					</div>

					<Filters>{filters}</Filters>


					{
						filter == "Two Pointers LC" ? 
						(
							<SheetMessage>
								<div className="text">
									This section is a set of problems based on a well-known blog post about using the two pointer technique on LeetCode, <a target={"_blank"} href="https://leetcode.com/discuss/study-guide/1688903/Solved-all-two-pointers-problems-in-100-days">show blog on leetcode</a>. The blog post includes a selection of high-quality questions that are organized by similarity.
								</div>
							</SheetMessage>
						) : (
							<></>
						)
						
					}

					<Progress>
						<div className="text">Progress : </div>
						<div className="value">{`${progressBarPercent}%`}</div>
						<div className="bar">
							<div
								className="fill"
								style={{ width: `${progressBarPercent}%` }}
							></div>
						</div>
					</Progress>
					<div className="table">
						{
							data.length === 0 ? (
								<>
									<LinearProgress />
								</>
							) : (
								data.map((item, index) => {
									return (
										<div key={item.name} className={item.completed ? "link-row done-row" : "link-row"} >
											{" "}
											<div className="link-row-left">
												<div className="count">{index + 1}</div>
												<div className="main-row-content">
													<a href={item.quesLink} target="_blank" rel="noreferrer">
														{item.quesName}
													</a>
													<div className="tags">
														{item.specialTag != "-" ? <div className="tag special-tag">{item.specialTag}</div> : <></>}
														{item.tags.map((tagItem, tagIndex) => {
															return <div className="tag" key={tagIndex}>{tagItem}</div>;
														})}
													</div>
												</div>
											</div>
											<div className="done-btn">
												<CheckCircleOutlineIcon
													onClick={() => toggleCompleted(index)}
												/>
											</div>
										</div>
									);
								})
							)
						}
					</div>
				</div>
			</Container>
		</GrandContainer>
	);
};

export default CodingSheets;

const GrandContainer = styled.div``;

const MobContainer = styled.div`
	width: 100vw;
	padding: 40px;
	text-align: center;
	font-size: 2rem;
	font-weight: 500;

	img {
		width: calc(100% - 80px);
		margin: 40px;
		border-radius: 5px;
		display: block;
	}

	@media only screen and (min-width: 1099px) {
		display: none;
	}
`;

const Container = styled.div`
	@media only screen and (max-width: 1099px) {
		display: none;
	}

	display: flex;
	justify-content: space-between;
	padding-left: 200px;

	a {
		color: #18489f;
	}

	.cc-middle-content {
		min-height: 100vh;
		width: 100%;
		/* padding: 80px min(120px, 5vw) 50px min(120px, 5vw); */
		padding: 80px 120px 50px 120px;
		position: relative;
		width: 100%;
		max-width: 1360px;
		min-width: 850px;
		margin: auto;

		@media only screen and (max-width: 1200px) {
			padding: 80px 50px 50px 50px;
		}

		.main-heading {
			font-size: 1.65rem;
			font-weight: 600;
			color: #292929;
		}

		.heading-supporter {
			font-size: 1.05rem;
			margin-bottom: 10px;
			font-weight: 400;
			color: #696168;

			a {
				color: #18489f;
				font-size: 0.95rem;
				font-weight: 300;
				margin-left: 0.25rem;
			}
		}

		.message {
			display: inline-block;
			/* display: flex; */
			/* align-items: center; */
			background-color: #d5f7e1;
			border-radius: 5px;
			padding: 10px;
			margin: 20px 0 10px 0;

			.text {
				font-size: 0.8rem;
				color: #13803b;
				font-weight: 300;
			}
		}

		.table {
			margin: 15px 0;
			width: 100%;
			/* background-color: #fbf7f7; */
			border: 1px solid #d1d5db;
			border-radius: 5px;
			/* padding: 0 15px; */
			display: flex;
			flex-direction: column;
			background-color: white;
			border-bottom-color: transparent;

			.link-row {
				padding: 20px 20px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-top-left-radius: 5px;
				border-top-right-radius: 5px;
				border-bottom: 1px solid #d1d5db;

				.link-row-left {
					display: flex;
					align-items: center;

					.count {
						font-size: 1.25rem;
						font-family: Inter var, ui-sans-serif, system-ui, -apple-system,
							BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial,
							Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji,
							Segoe UI Symbol, Noto Color Emoji;
						margin-right: 20px;
						font-weight: 500;
					}

					.main-row-content {
						a {
							font-size: 0.9rem;
							font-weight: 500;
							text-decoration: none;
							/* color: inherit; */

							&:hover {
								text-decoration: underline;
							}
						}

						.tags {
							margin: 0;
							margin-top: 5px;
							display: flex;

							.tag {
								background-color: #f3f4f7;
								color: inherit;
								padding: 2.5px 7.5px;
								border-radius: 100px;
								font-size: 0.7rem;
								margin-right: 5px;
                                border: 1px solid #cac3c3;
							}

							.special-tag {
								/* background-color: #ffeac2; */
								color: inherit;
								/* background-color: black; */
								/* color: white; */
								font-weight: 500;
								border: 1px solid #111;
							}
						}
					}
				}

				.done-btn {
					.MuiSvgIcon-root {
						fill: #b5a6a6;
						font-size: 2.25rem;

						&:hover {
							transition-duration: 250ms;
							fill: orange;
							cursor: pointer;
						}
					}
				}
			}

			.done-row {
				background-color: #dcf8eb;

				.done-btn {
					.MuiSvgIcon-root {
						fill: orange;
						font-size: 2.25rem;
					}
				}
			}

			.no-bottom-border {
				border-bottom: 1px solid transparent;
			}
		}
	}
`;
const Filters = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin: 80px 0 10px 0;

	.filter {
		padding: 7.5px 15px;
		font-size: 0.8rem;
		border: 1px solid #b9afaf;
		border-radius: 500px;
		margin: 0px 5px 5px 0px;
		font-weight: 300;

		&:hover {
			border-color: #201f1f;
			background-color: #201f1f;
			color: #ebdddd;
			transition-duration: 250ms;
			cursor: pointer;
		}
	}

	.selected {
		/* background-color: #ded7d7;
    color: #111; */
		border-color: #201f1f;
		background-color: #201f1f;
		color: #ebdddd;
	}
`;

const Progress = styled.div`
	display: flex;
	align-items: center;
	margin: 30px 0 0 0;

	.text {
		font-size: 0.9rem;
		font-weight: 500;
	}

	.value {
		margin: 0 10px;
		font-size: 0.8rem;
		font-weight: 500;
		letter-spacing: 0.1rem;
	}

	.bar {
		width: 400px;
		height: 10px;
		border-radius: 100px;
		background-color: whitesmoke;
		border: 1px solid pink;
		overflow: hidden;

		.fill {
			height: 100%;
			border-radius: 100px;
			background-color: #ffa500;
		}
	}
`;

const SheetMessage = styled.div`
	padding: 10px;
	margin: 10px 0 0px 0;
	/* border: 1px solid black; */
	border-radius: 5px;
	/* background-color: #c9e8ff; */
	background-color: #f0f0f0;

	.text{
		font-size: 0.75rem;
	}
`