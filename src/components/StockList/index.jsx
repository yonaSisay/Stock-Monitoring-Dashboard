import React, { useEffect, useState } from "react";
import StockItem from "../StockItem";
import { Icon } from "@iconify/react";
import "./index.scss";

const LOCAL_STORAGE_KEY = "stockListSettings";

const StockList = () => {
	const [stocks, setStocks] = useState([]);
	const [minChange, setMinChange] = useState("");
	const [maxChange, setMaxChange] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [sortConfig, setSortConfig] = useState({
		key: "name",
		direction: "ascending",
	});

	useEffect(() => {
		const savedSettings = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
		if (savedSettings) {
			setMinChange(savedSettings.minChange);
			setMaxChange(savedSettings.maxChange);
			setSearchQuery(savedSettings.searchQuery);
			setSortConfig(savedSettings.sortConfig);
		}
	}, []);

	useEffect(() => {
		const fetchStocks = async () => {
			const response = await fetch("http://localhost:5000/stocks");
			const data = await response.json();
			return data;
		}

		const loadStocks = async () => {
			const data = await fetchStocks();
			setStocks(data);
		};
		loadStocks();
	}, []);

	const handleMinChange = (e) => {
		const value = Number(e.target.value);
		if (value <= Number(maxChange) || maxChange === "") {
			setMinChange(value);
		}
	};

	const handleMaxChange = (e) => {
		const value = Number(e.target.value);
		if (value >= Number(minChange) || minChange === "") {
			setMaxChange(value);
		}
	};

	const handleSort = (key) => {
		setSortConfig((prevConfig) => ({
			key,
			direction:
				prevConfig.key === key && prevConfig.direction === "ascending"
					? "descending"
					: "ascending",
		}));
	};

	const persistSettings = () => {
		const settings = {
			minChange,
			maxChange,
			searchQuery,
			sortConfig,
		};
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(settings));
		alert("Settings persisted!");
	};

	const sortedStocks = [...stocks].sort((a, b) => {
		if (!sortConfig.key) return 0;

		const aValue = a[sortConfig.key];
		const bValue = b[sortConfig.key];
		const directionMultiplier = sortConfig.direction === "ascending" ? 1 : -1;

		if (typeof aValue === "number" && typeof bValue === "number") {
			return (aValue - bValue) * directionMultiplier;
		}
		return aValue.localeCompare(bValue) * directionMultiplier;
	});

	const filteredStocks = sortedStocks
		.filter((stock) => {
			const change = Math.abs(stock.change);
			const isWithinMin = minChange === "" || change >= minChange;
			const isWithinMax = maxChange === "" || change <= maxChange;
			return isWithinMin && isWithinMax;
		})
		.filter(
			(stock) =>
				stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				stock.symbol.toLowerCase().includes(searchQuery.toLowerCase())
		);

	return (
		<div className="stock-list">
			<div className="filters">
				<div>
					<input
						type="text"
						className="search-field"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder="Search by name or symbol"
					/>
					<input
						type="number"
						value={minChange}
						onChange={handleMinChange}
						placeholder="Min %"
						className="range"
					/>
					<input
						type="number"
						value={maxChange}
						onChange={handleMaxChange}
						placeholder="Max %"
						className="range"
					/>
				</div>
				<button className="persist-button" onClick={persistSettings}>
					Save Preferences
				</button>
			</div>

			<table className="stock-table">
				<thead>
					<tr>
						{["symbol", "name", "price", "change","volume"].map((key) => (
							<th
								key={key}
								onClick={() => handleSort(key)}
								className={
									sortConfig.key === key ? `sorted-${sortConfig.direction}` : ""
								}
							>
								<span className="header-content">
									{sortConfig.key === key && (
										<div>
											<Icon
												icon={
													sortConfig.direction === "ascending"
														? "bi:sort-up"
														: "bi:sort-down"
												}
												width={"1.2rem"}
											/>
										</div>
									)}
									<span> {key.charAt(0).toUpperCase() + key.slice(1)}</span>
								</span>
							</th>
						))}
					</tr>
				</thead>

				<tbody>
					{filteredStocks.map((stock) => (
						<StockItem key={stock.symbol} stock={stock} />
					))}
				</tbody>
			</table>
		</div>
	);
};

export default StockList;
