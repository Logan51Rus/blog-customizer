import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useState, useRef, SyntheticEvent } from 'react';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import {fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps'
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

interface setPage {
	setPageState: React.Dispatch<React.SetStateAction<ArticleStateType>>
}

export const ArticleParamsForm = ({setPageState}: setPage) => {

	const [isPanelOpen, setIsPanelOpen] = useState(false);
	const [options, setOptions] = useState<ArticleStateType>(defaultArticleState);
	const rootRef = useRef<HTMLDivElement>(null);
	const selectRef = useRef<HTMLDivElement>(null)

	const togglePanel = () => {
		setIsPanelOpen(!isPanelOpen);
	};

	useOutsideClickClose({
		isOpen: isPanelOpen,
		rootRef,
		onClose: () => setIsPanelOpen(false),
		onChange: setIsPanelOpen
	});

	const submitForm = (e: SyntheticEvent) => {
		e.preventDefault();
		setPageState(options)
		setIsPanelOpen(!isPanelOpen)
	};

	const applyDefaultOptions = () => {
		setPageState(defaultArticleState)
		setOptions(defaultArticleState)
		setIsPanelOpen(!isPanelOpen)
	};

	return (
		<>
			<div ref={rootRef}>
				<ArrowButton onClick={togglePanel} isPanelOpened={isPanelOpen}/>
				<aside className={clsx(styles.container, isPanelOpen && styles.container_open)}>
					<form className={styles.form} onSubmit={submitForm}>
					<Text size={31} weight={800} uppercase={true}>Задайте параметры</Text>
					<div ref={selectRef} onClick={(e) => e.stopPropagation()}>
            		<Select title='Шрифт' options={fontFamilyOptions} selected={options.fontFamilyOption} onChange={(selected) => setOptions((prevState) => ({
                        ...prevState,
              			fontFamilyOption: selected
            			}))}/>
          			</div>
					<RadioGroup name='fontSize' title='Размер шрифта' options={fontSizeOptions} selected={options.fontSizeOption} onChange={(value) => setOptions((prevState) => ({
						...prevState,
						fontSizeOption: value
					}))}/>
					<div ref={selectRef} onClick={(e) => e.stopPropagation()}>
					<Select title='Цвет шрифта' options={fontColors} selected={options.fontColor} onChange={(selected) => setOptions((prevState) => ({
						...prevState,
						fontColor: selected
					}))}/>
					</div>
					<Separator />
					<div ref={selectRef} onClick={(e) => e.stopPropagation()}>
					<Select title='Цвет фона' options={backgroundColors} selected={options.backgroundColor} onChange={(selected) => setOptions((prevState) => ({
						...prevState,
						backgroundColor: selected
					}))}/>
					</div>
					<div ref={selectRef} onClick={(e) => e.stopPropagation()}>
					<Select title='Ширина контента' options={contentWidthArr} selected={options.contentWidth} onChange={(selected) => setOptions((prevState) => ({
						...prevState,
						contentWidth: selected
					}))}/>
					</div>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={applyDefaultOptions}/>
						<Button title='Применить' type='submit' />
					</div>
				</form>
				</aside>
			</div>
		</>
	);
};
