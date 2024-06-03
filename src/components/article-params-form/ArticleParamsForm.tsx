import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useState, useRef } from 'react';
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
	OptionType,
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

	const togglePanel = () => {
		setIsPanelOpen(!isPanelOpen);
	};

	useOutsideClickClose({
		isOpen: isPanelOpen,
		rootRef,
		onClose: () => setIsPanelOpen(false),
		onChange: setIsPanelOpen
	});

	const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setPageState(options)
		setIsPanelOpen(!isPanelOpen)
	};

	const applyDefaultOptions = () => {
		setPageState(defaultArticleState)
		setOptions(defaultArticleState)
		setIsPanelOpen(!isPanelOpen)
	};

	const handleChange = (optionName: string) => {
		return function (value: OptionType) {
			return setOptions({...options, [optionName]: value})
		}
	};

	return (
		<>
			<div ref={rootRef}>
				<ArrowButton onClick={togglePanel} isPanelOpened={isPanelOpen}/>
				<aside className={clsx(styles.container, isPanelOpen && styles.container_open)}>
					<form className={styles.form} onSubmit={submitForm}>
					<Text size={31} weight={800} uppercase={true}>Задайте параметры</Text>
            		<Select title='Шрифт' options={fontFamilyOptions} selected={options.fontFamilyOption} onChange={handleChange('fontFamilyOption')}/>
					<RadioGroup name='fontSize' title='Размер шрифта' options={fontSizeOptions} selected={options.fontSizeOption} onChange={handleChange('fontSizeOption')}/>
					<Select title='Цвет шрифта' options={fontColors} selected={options.fontColor} onChange={handleChange('fontColor')}/>
					<Separator />
					<Select title='Цвет фона' options={backgroundColors} selected={options.backgroundColor} onChange={handleChange('backgroundColor')}/>
					<Select title='Ширина контента' options={contentWidthArr} selected={options.contentWidth} onChange={handleChange('contentWidth')}/>
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
