import arrow from 'src/images/arrow.svg';
import clsx from 'clsx';

import styles, { container } from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

interface TArrowButtonProps {
	onClick?: OnClick;
	isPanelOpened: boolean
}

export const ArrowButton = ({onClick, isPanelOpened} : TArrowButtonProps) => {

	return (
		/* Не забываем указывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, isPanelOpened && styles.container_open)}
			onClick = {onClick}>
			<img src={arrow} alt='иконка стрелочки' className={clsx(styles.arrow, isPanelOpened && styles.arrow_open)} />
		</div>
	);
};
