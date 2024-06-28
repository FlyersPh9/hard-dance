import { useLocation, useSearchParams } from "@remix-run/react";
import cx from "classnames";
import * as React from "react";
import { continentsDb } from "../data/countries";
import hosts from "../data/hosts.json";
import styles from "./TitleBar.module.css";

export const TitleBar = () => {
	const location = useLocation();
	const [searchParams, setSearchParams] = useSearchParams();

	// Upcoming events if and only if URL = /
	// const isShowingUpcomingEvents = window.location.pathname === "/";

	const pageLayout = location.pathname;

	const pageTitleDrawerItemsWrapper = React.useRef<HTMLDivElement>(null);

	//   return <div>Hello</div>;

	const [showFilters, setShowFilters] = React.useState(false);

	const isAnyFilterEnabled = Array.from(searchParams.keys()).length > 0;

	return (
		<div
			className={cx("page-title", {
				"event-page-title": pageLayout === "/event",
			})}
		>
			{/* {% if page.layout == 'event' %} */}
			{pageLayout === "/event" && (
				<div className="event-page-title-stacked">
					<h1
						//   style="view-transition-name: post-title-{{ page.title | slugify }};"
						style={{
							// TODO: Use real data
							viewTransitionName: "post-title-{{ page.title | slugify }}",
						}}
					>
						{/* {{ page.title }} */}
						TODO: page.title
					</h1>
					<span>
						{/* <!-- TODO: Have a {{ page.daterange }} variable --> */}
						{/* {{ page.datestart | date: "%B %d, %Y" }} {% if page.dateend %} - {{
        page.dateend | date: "%B %d, %Y" }} {% endif %} */}
						{/* TODO: Use real data */}
					</span>
				</div>
			)}

			{/* {% else %} */}

			{pageLayout !== "/event" && (
				<h1>
					{/* {{ page.title }} */}
					{/* TODO: Use real data */}
					Events
				</h1>
			)}
			{/* {% endif %} */}

			{/* {% if page.layout == 'events' %} */}
			{pageLayout === "/" ? (
				<>
					<div className="page-title-start">
						<a aria-label="View past events" className="button" href="/events/">
							<svg aria-hidden="true">
								<use xlinkHref="/assets/symbols.svg#past" />
							</svg>
							<span className="hide-on-mobile">Past</span>
						</a>

						{/* TODO: Re-add the add button */}
						{/* <button
							type="button"
							aria-label="Add event"
							className="button"
							// onclick="document.getElementById('add-event').show()"
							// TODO: Real onclick
						>
							<svg aria-hidden="true">
								<use xlinkHref="/assets/symbols.svg#add" />
							</svg>
							<span className="hide-on-mobile">Add</span>
						</button> */}
					</div>

					<div className="page-title-end">
						<a
							// TODO: Is aria-label needed when the link has text?
							aria-label="Subscribe to RSS feed"
							className="button"
							href="feed:{{ '/feed.xml' | absolute_url }}"
						>
							<svg aria-hidden="true">
								<use xlinkHref="/assets/symbols.svg#rss" />
							</svg>
							<span className="hide-on-mobile">Subscribe</span>
						</a>
						<button
							type="button"
							className="button"
							id="events-filter-drawer-button"
							aria-label="Show filter options"
							aria-controls="filters-drawer"
							aria-expanded={showFilters}
							onClick={() => setShowFilters((prev) => !prev)}
						>
							<div className={styles.filterIconWrapper}>
								<svg aria-hidden="true">
									<use xlinkHref="/assets/symbols.svg#options" />
								</svg>
								{isAnyFilterEnabled && (
									<div aria-hidden className={styles.filterActivatedMarker} />
								)}
							</div>
							<span className="hide-on-mobile">Filters</span>
							<svg aria-hidden="true">
								<use xlinkHref="/assets/symbols.svg#chevron-down" />
							</svg>
						</button>
					</div>
				</>
			) : pageLayout === "/archives" ? (
				// {% elsif page.layout == 'archives' %}

				<div className="page-title-start">
					<a aria-label="View upcoming events" className="button" href="/">
						<svg aria-hidden="true" style={{ transform: "scaleX(-1)" }}>
							<use xlinkHref="/assets/symbols.svg#past" />
						</svg>
						<span className="hide-on-mobile">Upcoming</span>
					</a>
				</div>
			) : // {% elsif page.layout == 'event' %}
			pageLayout === "/event" ? (
				<button
					type="button"
					className="button page-title-end"
					id="shareButton"
				>
					<svg aria-hidden="true">
						<use xlinkHref="/assets/symbols.svg#share" />
					</svg>
					<span className="hide-on-mobile">Share</span>
				</button>
			) : // {% endif %}
			undefined}

			{/* {% if page.layout == 'events' %} */}
			{pageLayout === "/" && (
				<div
					className="page-title-drawer"
					id="filters-drawer"
					style={{
						maxHeight: showFilters
							? pageTitleDrawerItemsWrapper.current?.getBoundingClientRect()
									.height ?? 0
							: 0,
					}}
				>
					<div
						ref={pageTitleDrawerItemsWrapper}
						className="page-title-drawer-items-wrapper"
						//   inert TODO: What is the JSX equivalent of this?
					>
						<div className="page-title-drawer-item">
							<label htmlFor="filter-virtual">
								Live streams available
								<input
									type="checkbox"
									// switch TODO: What is the JSX equivalent of this?
									name="virtual"
									id="filter-virtual"
									checked={searchParams.get("live") === "true"}
									onChange={(e) => {
										setSearchParams(
											(prev) => {
												if (e.target.checked) {
													prev.set("live", "true");
												} else {
													prev.delete("live");
												}
												return prev;
											},
											{ preventScrollReset: true },
										);
									}}
								/>
							</label>
						</div>

						<div className="page-title-drawer-item">
							<label htmlFor="filter-continent">
								Continent
								<select
									name="continent"
									id="filter-continent"
									// multiple
									// style={{ resize: "none" }}
									onChange={(e) => {
										setSearchParams(
											(prev) => {
												if (e.target.value === "all") {
													prev.delete("continent");
												} else {
													// const continentFilters = prev.getAll("continent");
													prev.set("continent", e.target.value);
												}
												return prev;
											},
											{ preventScrollReset: true },
										);
									}}
								>
									<option value="all" selected={!searchParams.get("continent")}>
										All
									</option>
									<hr />
									{/* {% for continent in site.continents %} */}
									{/* TODO: Use real data */}
									{Object.entries(continentsDb).map(
										([continentCode, continentValue]) => (
											<option
												key={continentCode}
												value={continentCode}
												selected={
													searchParams.get("continent") === continentCode
												}
											>
												{continentValue.name}
											</option>
										),
									)}

									{/* {% endfor %} */}
								</select>
							</label>
						</div>

						{/* <div className="page-title-drawer-item" id="filter-country-wrapper">
							<label htmlFor="filter-country">
								Country
								<select name="country" id="filter-country" />
							</label>
						</div> */}

						<div className="page-title-drawer-item">
							<label htmlFor="filter-host">
								Host
								<select
									name="host"
									id="filter-host"
									onChange={(e) => {
										setSearchParams(
											(prev) => {
												if (e.target.value === "all") {
													prev.delete("host");
												} else {
													// const continentFilters = prev.getAll("continent");
													prev.set("host", e.target.value);
												}
												return prev;
											},
											{ preventScrollReset: true },
										);
									}}
								>
									<option value="all" selected={!searchParams.get("host")}>
										All
									</option>
									<hr />
									{/* {% for host in site.event-hosts %} */}
									{/* TODO: Use real data */}

									{(hosts as string[]).map((host) => (
										<option
											key={host}
											value={host}
											selected={searchParams.get("host") === host}
										>
											{/* {{ host.name }} */}
											{host}
										</option>
									))}

									{/* {% endfor %} */}
								</select>
							</label>
						</div>
					</div>
				</div>
			)}
			{/* // {% endif %} */}
		</div>
	);
};
