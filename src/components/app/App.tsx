import { useState, CSSProperties } from "react";
import { ArticleStateType, defaultArticleState } from "src/constants/articleProps";
import clsx from "clsx";
import styles from 'src/styles/index.module.scss';
import { ArticleParamsForm } from "../article-params-form";
import { Article } from "../article";

export const App = () => {
	const [pageState, setPageState] =
		useState<ArticleStateType>(defaultArticleState);

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': pageState.fontFamilyOption.value,
					'--font-size': pageState.fontSizeOption.value,
					'--font-color': pageState.fontColor.value,
					'--container-width': pageState.contentWidth.value,
					'--bg-color': pageState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm  setPageState={setPageState}/>
			<Article />
		</div>
	);
};